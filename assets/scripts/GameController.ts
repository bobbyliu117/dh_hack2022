
import { _decorator, Component, Node } from 'cc';
import { UIJoystick } from './UiJoystick';
const { ccclass, property } = _decorator;
 
@ccclass('GameController')
export class GameController extends Component {
  onLoad() {
		UIJoystick.init(this.node.parent.getChildByName("Canvas"));
	}
}