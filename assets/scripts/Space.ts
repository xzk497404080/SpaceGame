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
} from "cc";
import { Planet } from "./Planet";
import { Viewer } from "./Viewer";
const { ccclass, property } = _decorator;

@ccclass("Space")
export class Space extends Component {
  @property(Viewer) viewer: Viewer = null;
  @property(Mesh) planetMesh: Mesh = null;
  @property(Material) defaultMaterial: Material = null;
  onLoad() {
    // console.log(
    //   this.node.children[0].getComponent(MeshRenderer).mesh,
    //   Primitive.PrimitiveType.SPHERE,
    //   PrimitiveType.BOX
    // );
  }
  createPlanet() {
    let node = new Node("Planet_" + this.node.children.length);
    node.setParent(this.node);
    let meshRenderer = node.addComponent(MeshRenderer);
    meshRenderer.mesh = this.planetMesh;
    meshRenderer.material = this.defaultMaterial;
    console.log(meshRenderer.material.passes[0]);
    meshRenderer.material.passes[0].properties["albedo"]["value"] = [
      0.5, 0.5, 0.5, 0.5,
    ];
    // meshRenderer.material.setProperty("albedo", v4(0.5, 0.5, 0.5, 0.5));
    // meshRenderer.materials.push(new renderer.MaterialInstance(renderer.));
    let planet = node.addComponent(Planet);
    planet.init(
      this.viewer.node.forward
        .multiplyScalar(10)
        .add(this.viewer.node.position),
      200,
      20
    );
    // console.log(
    //   this.viewer.node.forward
    //     .multiplyScalar(10)
    //     .add(this.viewer.node.position),
    //   this.node.children
    // );
  }
}
