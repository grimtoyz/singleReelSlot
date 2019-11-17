
import { SceneLayer } from "../controllers/SceneController";
import { Settings, ScreenSize } from "../config/settings";
import { Resources } from "../config/resources";
import { App } from "../app";
import { Scene } from "../scene";



export class LoadScene extends Scene {
    readonly cbOnLoaded: Function;

    private loadingText : PIXI.Text;
    constructor(layer : SceneLayer, callbackOnLoaded: Function) {
        super(layer);
        this.cbOnLoaded = callbackOnLoaded;
        this.create();
    }
    protected create(): void {

        const loadingStyle = new PIXI.TextStyle({
            fill: "#24f818",
            fontSize: 50
        });

        this.loadingText = new PIXI.Text('Please Wait.', loadingStyle);
        this.loadingText.anchor.set(0.5);
        this.sceneContainer.addChild(this.loadingText);
        this.loadingText.x = ScreenSize.width / 2;
        this.loadingText.y =  ScreenSize.height / 2;

        Resources.loadResources(this.onLoadProgressChange.bind(this), this.onLoadComplete.bind(this));
    }
    private onLoadProgressChange(progress : number) : void {
        this.loadingText.text = 'loading ' + progress.toFixed(0) + '%';
    }
    
    private onLoadComplete() : void {
         setTimeout(()=>
             this.cbOnLoaded(), 500);
    }

    public update(delta: number): void {
    }

}