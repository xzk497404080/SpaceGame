import {
  _decorator,
  Component,
  Node,
  tween,
  v3,
  Vec3,
  EditBox,
  EventHandler,
  director,
} from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIInfo
 * DateTime = Sun Feb 27 2022 00:57:49 GMT+0800 (中国标准时间)
 * Author = zikun
 * FileBasename = UIInfo.ts
 * FileBasenameNoExtension = UIInfo
 * URL = db://assets/scripts/UIInfo.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass("UIInfo")
export class UIInfo extends Component {
  @property(Node) panel: Node = null;
  @property(Node) posInput: Node[] = [];
  show: boolean = true;
  canSetShow: boolean = true;
  onLoad() {
    // this.posInput[0].getComponent(EditBox).editingDidEnded
  }

  setShow(show: boolean = null) {
    if (this.canSetShow) {
      if (typeof show != "boolean") {
        this.show = !this.show;
      }
      if (this.show) this.panel.active = true;
      this.canSetShow = false;
      tween(this.node)
        .by(0.2, { position: v3(this.show ? -200 : 200, 0, 0) })
        .call(() => {
          this.canSetShow = true;
          if (!this.show) this.panel.active = false;
        })
        .start();
    }
  }
  setPosUI(pos: Vec3) {
    this.posInput[0].getComponent(EditBox).string = pos.x + "";
    this.posInput[1].getComponent(EditBox).string = pos.y + "";
    this.posInput[2].getComponent(EditBox).string = pos.z + "";
  }
  editPosX(string) {
    this.posInput[0].getComponent(EditBox).string = Number(string) + "";
    // console.log(string, this.posInput[0].getComponent(EditBox).string);
    director.emit("EDIT_POS_X", Number(string));
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
