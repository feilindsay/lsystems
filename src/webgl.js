import { 
	OrthographicCamera,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	Vector3
} from '../js/three.module.js';
import LSystem from './lsystem.js'
import {LineTurtle} from './turtle.js'

var camera, scene, renderer;
init();

var FractalPlant = new LSystem('X',
							 {'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF'}, 
							 new Set(['X', 'F']), 
							 new Set(['+', '-', '[', ']']),
							 .4,
							 .01,
							 6)
var KochCurve = new LSystem('F',
							{'F': 'F+F-F-F+F'}, 
							new Set(['F']), 
							new Set(['+', '-']),
							Math.PI/2,
							.2,
							2)
renderTree(FractalPlant)

function init() {
	camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.set(0, 0, 2)
	camera.lookAt(new Vector3(0,0,0))

	scene = new Scene();

	renderer = new WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.render( scene, camera );
	document.body.appendChild( renderer.domElement );
}

function renderTree(tree) {
	LineTurtle.renderLines(tree, scene, renderer, camera)
	renderer.render( scene, camera );
}