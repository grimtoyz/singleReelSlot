import {Scene} from "../../scene";
import {SceneLayer} from "../../controllers/SceneController";
import {SpinButton} from "../../components/ui/spinButton";
import {ReelComponent} from "../../components/slot/reelComponent";
import {App} from "../../app";

export class SlotMachineScene extends Scene{
    private _reel: ReelComponent;

    constructor(layer: SceneLayer){
        super(layer);
        this.create();
    }

    protected create(): void {
        this.createReel();
        // this.createSpinButton();
        this.resize();
    }

    private createReel(): void{
        this._reel = new ReelComponent();
        this.sceneContainer.addChild(this._reel);
    }

    // private createSpinButton(): void{
    //     this.spinButton = new SpinButton();
    //     this.sceneContainer.addChild(this.spinButton);
    // }

    public update(delta: number): void {
    }

    public get reel(): ReelComponent{
        return this._reel;
    }
}