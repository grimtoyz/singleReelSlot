import {SpinButton} from "../components/ui/spinButton";
import {ReelComponent} from "../components/slot/reelComponent";
import {App} from "../app";
import {ReelSpinner} from "../controllers/ReelSpinner";

export class GameView extends PIXI.Container{
    private _reel: ReelComponent;
    private _reelController: ReelSpinner;

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
        this._reelController = new ReelSpinner(this._reel);

        this.addChild(this._reel);
    }

    public spin(): void{
        this._reelController.startSpin();
    }

    public setSymbolToStopAt(symbolToStopAtIndex): void{
        this._reelController.setSymbolToStop(symbolToStopAtIndex);
    }

    public update(delta: number): void {
        if (this._reelController)
            this._reelController.update(delta)
    }

    public resize(): void{
        this.position.set(App.application.view.width * 0.5, App.application.view.height * 0.5);
    };

    public get reel(): ReelComponent{
        return this._reel;
    }
}