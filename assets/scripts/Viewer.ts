import {
  _decorator,
  Component,
  EventKeyboard,
  input,
  Input,
  KeyCode,
  Vec2,
  EventMouse,
  math,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Viewer
 * DateTime = Tue Feb 22 2022 22:47:44 GMT+0800 (中国标准时间)
 * Author = zikun
 * FileBasename = Viewer.ts
 * FileBasenameNoExtension = Viewer
 * URL = db://assets/Viewer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass("Viewer")
export class Viewer extends Component {
  moveDirection: Vec2 = new Vec2(0, 0);
  speed: number = 0.1;
  touched: boolean = false;
  touchStartPos: Vec2 = new Vec2();
  deltaTouchPos: Vec2 = new Vec2();
  touchStartRotation: math.Quat = new math.Quat();
  touchStartAngle: Vec3 = new Vec3();
  deltaAngle: Vec3 = new Vec3();
  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
    input.on(Input.EventType.KEY_UP, this.keyUp, this);
    input.on(Input.EventType.MOUSE_WHEEL, this.mouseWheel, this);
    input.on(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
    input.on(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
    input.on(Input.EventType.MOUSE_UP, this.mouseUp, this);
  }
  mouseWheel(mouseEvent: EventMouse) {
    if (mouseEvent.getScrollY() > 0) {
      this.node.setPosition(this.node.position.add(this.node.forward));
    } else {
      this.node.setPosition(this.node.position.subtract(this.node.forward));
    }
  }
  mouseDown(mouseEvent: EventMouse) {
    this.touched = true;
    mouseEvent.getLocation(this.touchStartPos);
    this.node.getRotation(this.touchStartRotation);
    this.touchStartRotation.getEulerAngles(this.touchStartAngle);
  }
  mouseMove(mouseEvent: EventMouse) {
    if (this.touched) {
      mouseEvent.getLocation(this.deltaTouchPos);
      this.deltaTouchPos.subtract(this.touchStartPos);
      this.deltaAngle.set(
        this.deltaTouchPos.y * 0.1,
        -this.deltaTouchPos.x * 0.1,
        0
      );
      this.node.setRotationFromEuler(this.deltaAngle.add(this.touchStartAngle));
    }
  }
  mouseUp(mouseEvent: EventMouse) {
    this.touched = false;
  }
  keyDown(keyEvent: EventKeyboard) {
    switch (keyEvent.keyCode) {
      case KeyCode.KEY_W:
        this.moveDirection.y += 1;
        break;
      case KeyCode.KEY_A:
        this.moveDirection.x -= 1;
        break;
      case KeyCode.KEY_S:
        this.moveDirection.y -= 1;
        break;
      case KeyCode.KEY_D:
        this.moveDirection.x += 1;
        break;
      case KeyCode.SHIFT_LEFT:
        this.speed *= 2;
        break;
      default:
        break;
    }
  }
  keyUp(keyEvent: EventKeyboard) {
    switch (keyEvent.keyCode) {
      case KeyCode.KEY_W:
        this.moveDirection.y -= 1;
        break;
      case KeyCode.KEY_A:
        this.moveDirection.x += 1;
        break;
      case KeyCode.KEY_S:
        this.moveDirection.y += 1;
        break;
      case KeyCode.KEY_D:
        this.moveDirection.x -= 1;
        break;
      case KeyCode.SHIFT_LEFT:
        this.speed /= 2;
      default:
        break;
    }
  }
  update(dt: number) {
    if (this.moveDirection.length() > 0) {
      this.node.setPosition(
        this.node.position.add(
          this.node.forward
            .multiplyScalar(this.moveDirection.y)
            .add(this.node.right.multiplyScalar(this.moveDirection.x))
            .multiplyScalar(this.speed)
        )
      );
    }
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
