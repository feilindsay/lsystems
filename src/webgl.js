import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from '../js/three.module.js';
import LSystem from './lsystem.js'
import { LineTurtle } from './turtle.js'
import * as Data from './data.js'

class WebGL {
	/**
	 * 
	 * @param {string} divId - id of the parent div for the WebGL context
	 */
	constructor(divId) {
		this.lsystem = new LSystem();
		this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10 );
		this.camera.position.set(0, 0, 2);
	
		this.scene = new Scene();
	
		this.renderer = new WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth * .9, window.innerHeight * .9);
		this.renderer.render(this.scene, this.camera);
		
		document.getElementById(divId).appendChild(this.renderer.domElement);
	}

	set angle(a) { this.lsystem.angle = a }

	set iterations(i) { this.lsystem.iterations = i; this.lsystem.draw() }

	/**
	 * renders lsystem, using user input
	 * @param {LSystem} lsystem 
	 */
	renderTree = (lsystem) => {
		this.lsystem = lsystem;
		this.angle = parseFloat(document.getElementById('d_angle').value);
		this.iterations = parseFloat(document.getElementById('d_iterations').value);
		
		this.scene.remove.apply(this.scene, this.scene.children);
		LineTurtle.renderLines(this.lsystem, this.scene);
		this.renderer.render( this.scene, this.camera );
	}
}

function determinantWebGL() {
	var determinant = new WebGL("determinant");
	document.getElementById('d_1').onclick = () => determinant.renderTree(Data.Determinant1);
	document.getElementById('d_2').onclick = () => determinant.renderTree(Data.Determinant2);
	document.getElementById('d_3').onclick = () => determinant.renderTree(Data.Determinant3);
}

determinantWebGL()