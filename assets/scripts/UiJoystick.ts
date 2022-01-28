
import { _decorator, Component, Node, instantiate, resources, Prefab, EventTouch, v2, v3, Vec2, Vec3, UITransformComponent } from 'cc';
const { ccclass, property } = _decorator;

const HORIZONTAL = v2(1, 0);
 
@ccclass('UIJoystick')
export class UIJoystick extends Component {

	static init(root: Node) {
		resources.load("prefabs/ui/joystick/joystick", Prefab, (err, prefab) => {
			if (err) {
				console.log('= = => UIJoystick.init Error:', err);
				return;
			}
			root.addChild(instantiate(prefab));
		});
	}

	private stick: Node;
	private player: Node;
	private camera: Node;
	private tempV2 = v2(0, 0);
	private tempV3 = v3(0, 0);

	onLoad() {
		this.stick = this.node.getChildByName("stick");
		this.player = this.node.parent.parent.getChildByName("haigui");
		this.camera = this.node.parent.parent.getChildByName("Main Camera");

		this.node.on(Node.EventType.TOUCH_START,(evTouch: EventTouch) => {
			
		});

		this.node.on(Node.EventType.TOUCH_MOVE, (evTouch) => {
			evTouch.getUILocation(this.tempV2);
			this.tempV3.set(this.tempV2.x, this.tempV2.y, 0);

			this.tempV3 = this.node.getComponent(UITransformComponent).convertToNodeSpaceAR(this.tempV3);
			this.tempV3 = this.tempV3.length() > 80 ? this.tempV3.normalize().multiplyScalar(80): this.tempV3;

			this.tempV2.set(this.tempV3.x, this.tempV3.y);
			const angle = this.tempV2.angle(HORIZONTAL) * Math.sign(this.tempV2.y);

			this.stick.setPosition(this.tempV3);
			this.player.setRotationFromEuler(0,180*angle/Math.PI,0);
			
			this.player.getWorldPosition(this.tempV3);
			this.tempV3.x += (Math.cos(angle)*0.1);
			this.tempV3.z -= (Math.sin(angle)*0.1);
			this.player.setWorldPosition(this.tempV3);

			this.camera.getWorldPosition(this.tempV3);
			this.tempV3.x += (Math.cos(angle)*0.1);
			this.tempV3.z -= (Math.sin(angle)*0.1);
			this.camera.setWorldPosition(this.tempV3);
		})

		this.node.on(Node.EventType.TOUCH_CANCEL, () => {
			this.stick.setPosition(v3(0, 0, 0));
		});

		this.node.on(Node.EventType.TOUCH_END, () => {
			this.stick.setPosition(v3(0, 0, 0));
		})
	}

	
}
