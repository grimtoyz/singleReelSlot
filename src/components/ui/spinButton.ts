import {atlasesRes, imagesRes, loadedFiles} from "../../config/resources";
import {ScreenSize} from "../../config/settings";

export class SpinButton extends PIXI.Container{
    private _button: PIXI.Sprite;
    private _buttonText: PIXI.Text;
    private _onTouch: Function;

    constructor() {
        super();
        this.create();
    }

    protected create(): void {
        this.createButton();
        this.createButtonText();
    }

    createButton(){
        this._button = new PIXI.Sprite(loadedFiles[atlasesRes.assets].textures['spinButton.png']);
        this._button.anchor.set(0.5);
        this._button.interactive = true;

        this.addChild(this._button);
    }

    createButtonText(){
        this._buttonText = new PIXI.Text('SPIN', {fontSize:40});
        this._buttonText.anchor.set(0.5);
        this.addChild(this._buttonText);
    }

    addOnTouchCallback(cbOnTouch: Function){
        this._button.on('pointertap', ()=>{
            cbOnTouch();
        });
    }
}