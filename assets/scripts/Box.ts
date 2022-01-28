
import { _decorator, Component, ParticleSystem } from 'cc';
const { ccclass } = _decorator;

@ccclass('Box')
export class Box extends Component {
	public tint: number[];

	private particle: ParticleSystem;

	onLoad() {
		this.particle = this.node.getChildByName("particle").getComponent(ParticleSystem);
		this.tint = [this.random0To255(),this.random0To255(),this.random0To255(),255];
		this.particle.startColor.color.set(...this.tint);
	}

	private random0To255 = () => Math.floor(Math.random()*255)
}
