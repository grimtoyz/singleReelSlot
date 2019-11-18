import {App} from "../app";
import {SpinButton} from "../components/ui/spinButton";
import {Settings} from "../config/settings";

export class HUD extends PIXI.Container{
    private _cbOnSpinTouched: Function;
    private _spinButton: SpinButton;

    constructor(){
        super();
        this.create();
        this.resize();
    }

    create(): void{
        this.createSpinButton();
    }

    private createSpinButton(): void{
        this._spinButton = new SpinButton();
        this._spinButton.position.set(Settings.SpinButtonPosition.x, Settings.SpinButtonPosition.y);
        this.addChild(this._spinButton);
    }

    addOnSpinTouchedCallback(cb: Function){
        this._cbOnSpinTouched = cb;
    }

    public update(delta: number): void {
    }

    public resize(): void{
        this.position.set(App.application.view.width * 0.5, App.application.view.height * 0.5);
    };
}