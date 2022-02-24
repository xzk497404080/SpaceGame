import { _decorator, Component, Node, Vec3, EventTouch } from "cc";
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

/**
 * F = G * M * m / (r*r)
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

  init(position: Vec3, mess: number, radius: number) {
    this.position = position;
    this.mess = mess;
    this.radius = radius;
    this.speed = new Vec3();
    this.force = new Vec3();
    this.active = false;

    this.node.setPosition(position);
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
    // [4]
  }
}
