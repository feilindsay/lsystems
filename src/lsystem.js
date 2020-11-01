//TODO: stochastic & conditional productions
class LSystem {
    /**
     * 
     * @param {string} axiom - the initial state
     * @param {dict {string: string or [dict]}} productions - rules for variable replacement
     *      if determinant, key value is string
     *      if stochastic, key value is a list of dictionaries with prob (float) and str (string) entries
     * @param {set} variable_alphabet - replacable variables
     * @param {set} constant_alphabet - constant variables
     * @param {int} angle - angle of rotation when turning
     * @param {float} length - length of each line segment
     * @param {int} iterations - number of iterations
     */
    constructor(axiom, productions, variable_alphabet, constant_alphabet, angle, length, iterations) {
        this.axiom = axiom || '';
        this.productions = productions || {};
        this.variable = variable_alphabet || new Set();
        this.constant = constant_alphabet || new Set();
        this.angle = angle || Math.PI/2;
        this.length = length || .01;
        this.iters = iterations || 0;
    }

    set iterations(i) { this.iters = i; this.draw()}

    #draw_helper = (string, iteration) => {
        if (iteration == this.iters) {
            return string;
        }

        var acc = '';
        for (let i = 0; i < string.length; i ++) {
            var c = string.charAt(i);
            if (this.constant.has(c)) {
                acc += c;
            }
            else if (this.variable.has(c)) {
                var prod = this.productions[c];
                if (typeof prod === 'string' || prod instanceof String) {
                    //determinant
                    acc += prod;
                }
                else if (prod instanceof Array) {
                    //stochastic
                    var prob = Math.random();
                    var p_acc = 0;
                    for (const stoch of prod) {
                        if (prob < (stoch.prob + p_acc)) {
                            acc += stoch.str;
                            break;
                        }
                        p_acc += stoch.prob;
                    }
                }
            }
        }
        return this.#draw_helper(acc, iteration + 1);
    }

    /**
     * create the LSystem string and store value in this.string
     */
    draw = () => {
        this.string = this.#draw_helper(this.axiom, 0);
    }
}

export default LSystem