import { _decorator, Component, Node, Vec3, EventTouch, v3 } from "cc";
import { getVectorOnDirection } from "./utils";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Planet
 * DateTime = Tue Feb 22 2022 22:49:35 GMT+0800 (中国标准时间)
 * Author = zikun
 * FileBasename = Planet.ts
 * FileBasenameNoExtension = Planet
 * URL = db://assets/scripts/Planet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass("Planet")
export class Planet extends Component {
  position: Vec3; //位置 m
  mess: number; //质量 kg
  radius: number; //半径 m
  cycle: number; // 自转周期s
  speed: Vec3; //瞬时速度 m/s
  force: Vec3; //瞬时受力 N

  active: boolean;
  editorPanel: Node = null;

  distanceScale: number = 0.01;
  timeScale: number = 0.01;

  init(position: Vec3, mess: number, radius: number) {
    this.position = position;
    this.mess = mess;
    this.radius = radius;
    this.speed = new Vec3();
    this.force = new Vec3();
    this.active = true;

    this.node.setPosition(position);
    this.node.setScale(
      v3(radius, radius, radius).multiplyScalar(this.distanceScale)
    );
  }
  setForce(force: Vec3) {
    // console.log(this.node.name, force);
    this.force.set(force);
  }
  setPos(pos: Vec3) {
    this.position.set(pos);
    this.node.setPosition(pos);
  }
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  onLoad() {
    //   this.node.scene.renderScene.
    // this.node.on(
    //   Node.EventType.TOUCH_START,
    //   () => {
    //     // console.log("touched", this.node.position);
    //   },
    //   this
    // );
  }
  start() {
    // [3]
  }

  update(deltaTime: number) {
    if (this.active) {
      // console.log(this.force, this.speed);
      let speedForce = getVectorOnDirection(this.force, this.speed);
      let otherForce = this.force.clone().subtract(speedForce);
      // console.log(speedForce, otherForce);
      let speedMove = this.speed
        .clone()
        .multiplyScalar(deltaTime)
        .add(
          speedForce
            .clone()
            .multiplyScalar(1 / this.mess)
            .multiplyScalar(deltaTime ** 2 / 2)
        );
      let otherMove = otherForce
        .clone()
        .multiplyScalar(1 / this.mess)
        .multiplyScalar(deltaTime ** 2 / 2);
      // console.log(speedMove.clone().add(otherMove));
      this.node.setPosition(
        this.position.clone().add(speedMove).add(otherMove)
      );
      this.position.set(this.node.position);
    }
  }
}
