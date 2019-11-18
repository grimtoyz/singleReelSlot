
import { SceneLayer } from "../controllers/SceneController";
import { Settings, ScreenSize } from "../config/settings";
import { Resources } from "../config/resources";
import { App } from "../app";
import { Scene } from "../scene";



export class LoadScene extends Scene {

    private loadingText : PIXI.Text;

    constructor(layer : SceneLayer) {
        super(layer);
        this.create();
        this.resize();
    }

    protected create(): void {

        const loadingStyle = new PIXI.TextStyle({
            fill: "#24f818",
            fontSize: 50
        });

        this.loadingText = new PIXI.Text('Please Wait.', loadingStyle);
        this.loadingText.anchor.set(0.5);
        this.sceneContainer.addChild(this.loadingText);

        Resources.loadResources(this.onLoadProgressChange.bind(this), this.onLoadComplete.bind(this));
    }

    private onLoadProgressChange(progress : number) : void {
        this.loadingText.text = 'loading ' + progress.toFixed(0) + '%';
    }
    
    private onLoadComplete() : void {
        setTimeout(()=>{
            App.sceneController.loadScene(Settings.Scenes.SlotMachineScene, SceneLayer.GAME);
            // App.sceneController.loadScene(Settings.Scenes.SlotHUD, SceneLayer.UI, true);
        }, 500);
    }

    public update(delta: number): void {
    }
}