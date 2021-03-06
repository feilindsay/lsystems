import {
  Geometry,
  Line,
  LineBasicMaterial,
  Vector3
} from '../js/three.module.js'

class LineTurtle {
  /**
     * adds a Three.js Line representation of lsystem to the scene
     * @param {LSystem} lsystem
     * @param {THREE.Scene} scene
     */
  static renderLines (lsystem, scene) {
    const state = [{ x: -0.6, y: -0.6, z: 0.2, angle: lsystem.angle }]
    const material = new LineBasicMaterial({ color: 0xC8D6AF })

    let geometry = new Geometry()
    geometry.vertices.push(new Vector3(state[0].x, state[0].y, state[0].z))

    for (const c of lsystem.string) {
      switch (c) {
        case 'F': {
          const cur = state[state.length - 1]
          const newx = cur.x + (lsystem.length * Math.cos(cur.angle))
          const newy = cur.y + (lsystem.length * Math.sin(cur.angle))

          geometry.vertices.push(new Vector3(newx, newy, cur.z))

          state[state.length - 1] = { ...state[state.length - 1], ...{ x: newx, y: newy } }
          break
        }
        case '+':
          state[state.length - 1].angle += lsystem.angle
          break
        case '-':
          state[state.length - 1].angle -= lsystem.angle
          break
        case '[':
          state.push({ ...state[state.length - 1] })
          break
        case ']': {
          const line = new Line(geometry, material)
          scene.add(line)

          state.pop()
          const cur = state[state.length - 1]

          geometry = new Geometry()
          geometry.vertices.push(new Vector3(cur.x, cur.y, cur.z))
          break
        }
        default:
          break
      }
    }
  }
}

export { LineTurtle }
