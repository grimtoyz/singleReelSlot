import {ReelComponent} from "../components/slot/reelComponent";
import {App} from "../app";

export class GameView extends PIXI.Container{
    private _reel: ReelComponent;

    constructor(){
        super();
        this.create();
    }

    protected create(): void {
        this.createBackground();
        this.createReel();
        this.resize();
    }

    createBackground(): void{
        let background = new PIXI.Graphics();
        background.beginFill(0x3e403d);
        background.drawRect(-480, -480, 960, 960);
        background.endFill();
        this.addChild(background);
    }

    private createReel(): void{
        this._reel = new ReelComponent();
        this.addChild(this._reel);
    }

    public update(delta: number): void {
    }

    public resize(): void{
        this.position.set(App.application.screen.width * 0.5, App.application.screen.height * 0.5);
    };

    public get reel(): ReelComponent{
        return this._reel;
    }
}