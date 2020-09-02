import LSystem from './lsystem.js'

var Determinant1 = new LSystem('X',
    {'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF'}, 
    new Set(['X', 'F']), 
    new Set(['+', '-', '[', ']']));

var Determinant2 = new LSystem('X',
    {'X': 'F[+X]F[-X]+X', 'F': 'FF'}, 
    new Set(['X', 'F']), 
    new Set(['+', '-', '[', ']']));

var Determinant3 = new LSystem('X',
    {'X': 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]', 'F': 'FF'}, 
    new Set(['X', 'F']), 
    new Set(['+', '-', '[', ']']));

var Stochastic1 = new LSystem('F',
    {'F': [{prob: .33, str: 'F[+F]F[-F]F'}, {prob: .33, str: 'F[+F]F'}, {prob: .34, str: 'F[−F]F'}]},
    new Set(['F']),
    new Set(['+', '-', '[', ']']));

var Stochastic2 = new LSystem('F',
    {'F': [{prob: .2, str: 'F[+F]F[-F]F'}, {prob: .2, str: 'FF-[-F+F+O]+[+F-F-F]'}, {prob: .4, str: 'FF+[+F-F-F]-[-F+F+O]'}]},
    new Set(['F']),
    new Set(['+', '-', '[', ']']));

export { Determinant1, Determinant2, Determinant3, Stochastic1, Stochastic2 }
