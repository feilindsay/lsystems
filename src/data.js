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

export { Determinant1, Determinant2, Determinant3 }
