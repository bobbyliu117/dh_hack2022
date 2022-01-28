
import { _decorator, Component, Node, instantiate, resources, Prefab, EventTouch, v2, v3, Vec2, Vec3, UITransformComponent, BoxCollider, Collider, ICollisionEvent, ParticleSystem, Label } from 'cc';
import { Box } from './Box';
const { ccclass, property } = _decorator;

const HORIZONTAL = v2(1, 0);
const SPEED = 0.8;
const RING_R = 80;
const THRESHOLD = 40;
 
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
	private tempV2 = v2();
	private tempV3 = v3();
	private updateV3 = v3();
	private isMoving = false;
	private angle = 0;
	private collider: BoxCollider;
	private infoLabel: Label;
	private boxPrefab: Prefab;
	private currentTint: number[] = [];

	onLoad() {
		resources.load("prefabs/box", Prefab, (err, prefab) => {
			if (err) {
				console.log('= = => UIJoystick.onLoad Error:', err);
			} else {
				this.boxPrefab = prefab;
			}
		});
		this.stick = this.node.getChildByName("stick");
		this.player = this.node.parent.parent.getChildByName("haigui");
		this.camera = this.node.parent.parent.getChildByName("Main Camera");
		this.infoLabel = this.node.parent.getChildByName("info").getComponent(Label);

		this.node.on(Node.EventType.TOUCH_START, this.onTouchStart);
		this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove);
		this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd);
		this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd);

		this.collider = this.player.getComponent(BoxCollider);
		this.collider.on('onTriggerEnter', ({otherCollider}: ICollisionEvent) => {
			const tint = otherCollider.getComponent(Box).tint;
			if (this.checkTint(tint)) {
				alert("You found two opposite colors! 🎉");
			}
			this.currentTint = tint;
			this.infoLabel.string = `${tint}`;
			this.infoLabel.color.set(...tint);
			otherCollider.node.destroy();

			const newBox = instantiate(this.boxPrefab);
			newBox.setPosition(this.randomX(),2,this.randomX());
			this.node.parent.parent.addChild(newBox);
		});
	}

	private checkTint(tint: number[]) {
		if (this.currentTint.length !== 0) {
			const a = Math.abs(tint[0] - this.currentTint[0]);
			const b = Math.abs(tint[1] - this.currentTint[1]);
			const c = Math.abs(tint[2] - this.currentTint[2]);

			// console.log(a,b,c,THRESHOLD);

			if (a<THRESHOLD && b<THRESHOLD && c<THRESHOLD) {
				return true;
			}
		}
	}

	private onTouchStart = () => this.isMoving = true

	private onTouchMove = (evTouch: EventTouch) => {
		evTouch.getUILocation(this.tempV2);
		this.tempV3.set(this.tempV2.x, this.tempV2.y, 0);

		this.tempV3 = this.node.getComponent(UITransformComponent).convertToNodeSpaceAR(this.tempV3);
		this.tempV3 = this.tempV3.length() > RING_R ? this.tempV3.normalize().multiplyScalar(RING_R): this.tempV3;

		this.tempV2.set(this.tempV3.x, this.tempV3.y);
		this.angle = this.tempV2.angle(HORIZONTAL) * Math.sign(this.tempV2.y);

		this.stick.setPosition(this.tempV3);
		this.player.setRotationFromEuler(0,180*this.angle/Math.PI,0);
	}

	private onTouchEnd = () => {
		this.stick.setPosition(v3(0, 0, 0));
			this.isMoving = false;
	}

	private randomX = () => Math.floor(Math.random()*100) - 50

	update(dt: number) {
		if (this.isMoving) {
			this.player.getWorldPosition(this.updateV3);
			this.updateV3.x += (Math.cos(this.angle)*SPEED);
			this.updateV3.z -= (Math.sin(this.angle)*SPEED);
			this.player.setWorldPosition(this.updateV3);

			this.camera.getWorldPosition(this.updateV3);
			this.updateV3.x += (Math.cos(this.angle)*SPEED);
			this.updateV3.z -= (Math.sin(this.angle)*SPEED);
			this.camera.setWorldPosition(this.updateV3);
		}
	}
	
}
