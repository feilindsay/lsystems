//TODO: stochastic & conditional productions
class LSystem {
    /**
     * 
     * @param {string} axiom - the initial state
     * @param {dict {string: string}} productions - rules for variable replacement
     * @param {set} variable_alphabet - replacable variables
     * @param {set} constant_alphabet - constant variables
     * @param {int} angle - angle of rotation when turning
     * @param {int} iterations - number of iterations
     */
    constructor(axiom, productions, variable_alphabet, constant_alphabet, angle, length, iterations=1,) {
        this.axiom = axiom || '';
        this.productions = productions || {};
        this.variable = variable_alphabet || new Set();
        this.constant = constant_alphabet || new Set();
        this.angle = angle || Math.PI/2;
        this.length = length || 10
        this.iterations = iterations;
        this.string = this.draw();
    }

    #draw_helper = (string, iteration) => {
        if (iteration == this.iterations) {
            return string;
        }

        var acc = '';
        for (let i = 0; i < string.length; i ++) {
            var c = string.charAt(i);
            if (this.variable.has(c)) {
                acc += this.productions[c];
            }
            else if (this.constant.has(c)) {
                acc += c;
            }
        }
        return this.#draw_helper(acc, iteration + 1)
    }

    draw = () => {
        return this.#draw_helper(this.axiom, 0)
    }
}

export default LSystem