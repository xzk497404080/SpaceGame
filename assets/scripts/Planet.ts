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
  position: Vec3; //位置
  mess: number; //质量
  radius: number; //半径

  /**
   *
   */
  //   constructor(position: Vec3, mess: number, radius: number) {
  //     super();
  //     this.position = position;
  //     this.mess = mess;
  //     this.radius = radius;
  //   }

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

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
