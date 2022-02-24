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
@ccclass("Viewer")
export class Viewer extends Component {
  moveDirection: Vec2 = new Vec2(0, 0);
  speed: number = 0.1;
  leftTouched: boolean = false;
  rightTouched: boolean = false;
  touchStartPos: Vec2 = new Vec2();
  deltaTouchPos: Vec2 = new Vec2();
  touchStartPosition: Vec3 = new Vec3();
  moveTargetPosition: Vec3 = new Vec3();
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
    mouseEvent.getLocation(this.touchStartPos);
    if (!this.leftTouched && !this.rightTouched) {
      switch (mouseEvent.getButton()) {
        case 0: //mouseLeft
          this.leftTouched = true;
          this.node.getPosition(this.touchStartPosition);
          break;
        case 2: //mouseRight
          this.rightTouched = true;
          this.node.getRotation(this.touchStartRotation);
          this.touchStartRotation.getEulerAngles(this.touchStartAngle);
          break;
        default:
          break;
      }
    }
  }
  mouseMove(mouseEvent: EventMouse) {
    if (this.leftTouched) {
      mouseEvent.getLocation(this.deltaTouchPos);
      this.deltaTouchPos.subtract(this.touchStartPos);
      this.moveTargetPosition.set(
        this.node.up.multiplyScalar(this.deltaTouchPos.y * -0.01)
      );
      this.moveTargetPosition
        .add(this.node.right.multiplyScalar(this.deltaTouchPos.x * -0.01))
        .add(this.touchStartPosition);
      this.node.setPosition(this.moveTargetPosition);
    } else if (this.rightTouched) {
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
    switch (mouseEvent.getButton()) {
      case 0: //mouseLeft
        this.leftTouched = false;
        break;
      case 2: //mouseRight
        this.rightTouched = false;
        break;
      default:
        break;
    }
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
