import {
  _decorator,
  Component,
  Node,
  MeshRenderer,
  Mesh,
  renderer,
  Material,
  Vec4,
  v4,
  math,
  Vec3,
  v3,
  director,
} from "cc";
import { Planet } from "./Planet";
import { getVectorOnDirection } from "./utils";
import { Viewer } from "./Viewer";
const { ccclass, property } = _decorator;

/**
 * F = G * M * m / (r*r)
 */
@ccclass("Space")
export class Space extends Component {
  @property(Viewer) viewer: Viewer = null;
  @property(Mesh) planetMesh: Mesh = null;
  @property(Material) defaultMaterial: Material = null;
  planets: Planet[] = [];
  editPlanet: Planet = null;
  G: number = 6.67408e-11;
  onLoad() {
    director.on("EDIT_POS_X", this.setPlanetPosX, this);
  }
  createPlanet() {
    let node = new Node("Planet_" + this.planets.length);
    node.setParent(this.node);
    let meshRenderer = node.addComponent(MeshRenderer);
    meshRenderer.mesh = this.planetMesh;
    meshRenderer.material = this.defaultMaterial;
    meshRenderer.material.setProperty(
      "albedo",
      v4(math.random(), math.random(), math.random(), 1)
    );
    let planet = node.addComponent(Planet);
    this.planets.push(planet);
    planet.init(
      this.viewer.node.forward
        .multiplyScalar(10)
        .add(this.viewer.node.position),
      2e10,
      20
    );
    this.focusPlanet(planet);
    // planet.active
    // let a = v3(1, 1, 1);
    // let b = v3(1, 0, 0);
    // let c = getVectorOnDirection(a, b);
    // console.log(c, a.clone().subtract(c));
  }
  update(dt: number) {
    for (let i = 0; i < this.planets.length; i++) {
      let planet = this.planets[i];
      let force = new Vec3();
      for (let j = 0; j < this.planets.length; j++) {
        if (i != j) {
          let otherPlanet = this.planets[j];
          let direction = otherPlanet.position
            .clone()
            .subtract(planet.position);

          let F =
            (this.G * planet.mess * otherPlanet.mess) / direction.length() ** 2;
          direction.normalize();
          force.add(direction.multiplyScalar(F));
        }
      }
      //   console.log(force);
      planet.setForce(force);
    }
  }
  focusPlanet(planet: Planet) {
    this.editPlanet = planet;
  }
  setPlanetPosX(x: number) {
    this.editPlanet?.setPos(
      v3(x, this.editPlanet.position.y, this.editPlanet.position.z)
    );
  }
}
