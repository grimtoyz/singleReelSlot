import { SceneLayer } from "../../controllers/SceneController";
import { loadedFiles, imagesRes } from "../../config/resources";
import { Scene } from "../../scene";
import { ScreenSize } from "../../config/settings";
import {SpinButton} from "../../components/ui/spinButton";
import {App} from "../../app";

export class SlotHUD extends Scene {

    private _spinButton: SpinButton;

    constructor(layer: SceneLayer) {
        super(layer);
        this.create();
    }

    protected create(): void {
        this._spinButton = new SpinButton();
        this.sceneContainer.addChild(this.spinButton);
        this.resize();
    }

    public update(delta: number): void {
    }

    public resize(): void{
        this.spinButton.position.set(App.application.view.width - 100, App.application.view.height - 100);
    }

    public destroy(){
        super.destroy();

        // TODO: remove button listeners
    }

    public get spinButton(): SpinButton{
        return this._spinButton;
    }
}