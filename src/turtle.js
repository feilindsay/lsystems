import { 
    Geometry,
    Line,
    LineBasicMaterial,
    Vector3
} from '../js/three.module.js';

class LineTurtle {
    /**
     * returns a Three.js Line representation of the LSystem
     * @param {LSystem} lsystem
     */
    static renderLines = (lsystem, scene, renderer, camera) => {
        var state = [{x: -.5, y: -.5, z: .2, angle: Math.PI/3}]

        for (let i = 0; i < lsystem.string.length; i ++) {
            var c = lsystem.string.charAt(i);
            var cur = state[state.length - 1];
            switch (c) {
                case 'F':
                    var geometry = new Geometry();
                    var newx = cur.x + (lsystem.length*Math.cos(cur.angle));
                    var newy = cur.y + (lsystem.length*Math.sin(cur.angle));
                    geometry.vertices.push(
                        new Vector3(cur.x, cur.y, cur.z),
                        new Vector3(newx, newy, cur.z),
                    );
                    var line = new Line(geometry, new LineBasicMaterial({
                        color: 0xC8D6AF
                    }));
                    scene.add(line);
	                renderer.render( scene, camera );

                    state[state.length - 1] = {...state[state.length - 1], ...{x: newx, y: newy}};
                    break;
                case '+':
                    state[state.length - 1].angle += lsystem.angle
                    break;
                case '-':
                    state[state.length - 1].angle -= lsystem.angle
                    break;
                case '[':
                    state.push(state[state.length - 1]);
                    break;
                case ']':
                    state.pop();
                    break;
                default:
                    break;

            }
        }
    }
}

export {LineTurtle}