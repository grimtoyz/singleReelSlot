import {SceneLayer} from "../controllers/SceneController";
import {SpinButton} from "../components/ui/spinButton";
import {ReelComponent} from "../components/slot/reelComponent";
import {App} from "../app";
import {ReelSpinner} from "../controllers/ReelSpinner";

export class GameView extends PIXI.Container{
    private _reel: ReelComponent;

    constructor(){
        super();
        this.create();
    }

    protected create(): void {
        this.createReel();
        this.resize();
    }

    private createReel(): void{

        this._reel = new ReelComponent();
        let _reelSpinner = new ReelSpinner(this._reel);

        this.addChild(this._reel);
    }

    public update(delta: number): void {
        if (this._reel)
            this._reel.update(delta)
    }

    public resize(): void{
        this.position.set(App.application.view.width * 0.5, App.application.view.height * 0.5);
    };

    public get reel(): ReelComponent{
        return this._reel;
    }
}