
import { Settings, ScreenSize } from "../config/settings";
import { Resources } from "../config/resources";
import { App } from "../app";


export class LoadingView extends PIXI.Container {

    private loadingText : PIXI.Text;
    private _cbOnLoadComplete: Function;

    constructor(callbackOnLoadComplete: Function) {
        super();

        this._cbOnLoadComplete = callbackOnLoadComplete;

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
        this.addChild(this.loadingText);

        Resources.loadResources(this.onLoadProgressChange.bind(this), this.onLoadComplete.bind(this));
    }

    private onLoadProgressChange(progress : number) : void {
        this.loadingText.text = 'loading ' + progress.toFixed(0) + '%';
    }

    private onLoadComplete() : void {
        setTimeout(()=>{
            this._cbOnLoadComplete();
        }, 500);
    }

    public update(delta: number): void {
    }

    public resize(): void{
        this.position.set(App.application.view.width * 0.5, App.application.view.height * 0.5);
    };

    destroy(){
        this._cbOnLoadComplete = null;
        this.loadingText = null;
    }
}