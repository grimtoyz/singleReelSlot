import {App} from "../app";

export class HUD extends PIXI.Container{
    private _cbOnSpinTouched: Function;

    constructor(){
        super();
        this.create();
    }

    create(): void{
        this.createSpinButton();
    }

    createSpinButton(){

    }

    addOnSpinTouchedCallback(cb: Function){
        this._cbOnSpinTouched = cb;
    }

    public resize(): void{
        this.position.set(App.application.view.width * 0.5, App.application.view.height * 0.5);
    };
}