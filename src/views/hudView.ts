import {App} from "../app";
import {SpinButton} from "../components/ui/spinButton";
import {Settings} from "../config/settings";

export class HUD extends PIXI.Container{
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

    public enableSpinButton(): void{
        this._spinButton.interactive = true;
        this._spinButton.alpha = 1;
    }

    public disableSpinButton(): void{
        this._spinButton.interactive = false;
        this._spinButton.alpha = 0.4;
    }

    addOnSpinTouchedCallback(cb: Function){
        this._spinButton.addOnTouchCallback(cb);
    }

    public update(delta: number): void {
    }

    public resize(): void{
        this.position.set(App.application.screen.width * 0.5, App.application.screen.height * 0.5);
    };
}