// TODO: stochastic & conditional productions
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
  constructor (axiom, productions, variableAlphabet, constantAlphabet, angle, length, iterations) {
    this.axiom = axiom || ''
    this.productions = productions || {}
    this.variable = variableAlphabet || new Set()
    this.constant = constantAlphabet || new Set()
    this.angle = angle || Math.PI / 2
    this.length = length || 0.01
    this.iters = iterations || 0
  }

  set iterations (i) { this.iters = i; this.draw() }
  get iterations () { return this.iters }

  drawHelper (string, iteration) {
    if (iteration === this.iters) {
      return string
    }

    let acc = ''
    for (let i = 0; i < string.length; i++) {
      const c = string.charAt(i)
      if (this.constant.has(c)) {
        acc += c
      } else if (this.variable.has(c)) {
        const prod = this.productions[c]
        if (typeof prod === 'string' || prod instanceof String) {
          // determinant
          acc += prod
        } else if (prod instanceof Array) {
          // stochastic
          const prob = Math.random()
          let pAcc = 0
          for (const stoch of prod) {
            if (prob < (stoch.prob + pAcc)) {
              acc += stoch.str
              break
            }
            pAcc += stoch.prob
          }
        }
      }
    }
    return this.drawHelper(acc, iteration + 1)
  }

  /**
     * create the LSystem string and store value in this.string
     */
  draw () {
    this.string = this.drawHelper(this.axiom, 0)
  }
}

export default LSystem
