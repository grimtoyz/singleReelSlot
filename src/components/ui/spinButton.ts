import {SceneLayer} from "../../controllers/SceneController";
import {atlasesRes, imagesRes, loadedFiles} from "../../config/resources";
import {ScreenSize} from "../../config/settings";

export class SpinButton extends PIXI.Container{
    private button: PIXI.Sprite;

    constructor() {
        super();
        this.create();
    }

    protected create(): void {
        this.createButton();

        // this.title.anchor.set(0.5);
        // this.title.x = ScreenSize.width / 2;
        // this.title.y = ScreenSize.height / 2;
        //
        // this.sceneContainer.addChild(this.title);
    }

    createButton(){
        // let texture = PIXI.loader.resources["atlas"].textures["spinButton.png"];
        this.button = new PIXI.Sprite(loadedFiles[atlasesRes.assets].textures['spinButton.png']);
        this.addChild(this.button);
    }
}