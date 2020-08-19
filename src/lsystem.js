class LSystem {
    /**
     * axiom:string - the initial state
     * productions:{string: string} - rules for variable replacement
     * alphabet:{string: set} - replacable and constant variables
     */
    constructor(axiom, productions, variable_alphabet, constant_alphabet, iterations=1) {
        this.axiom = axiom;
        this.productions = productions;
        this.variable = variable_alphabet;
        this.constant = constant_alphabet;
        this.iterations = iterations;
    }

    draw_helper = (string, iteration) => {
        if (iteration == this.iterations) {
            console.log(string)
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
        this.draw_helper(acc, iteration + 1)
    }

    draw = () => {
        return this.draw_helper(this.axiom, 0)
    }
}