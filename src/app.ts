import { Settings, ScreenSize } from "./config/settings";
import * as PIXI from 'pixi.js';
import { SceneController, SceneLayer } from "./controllers/SceneController";
import {GameController} from "./controllers/GameController";

export class App extends PIXI.Application {

    private static instance: App;
    private static _sceneController: SceneController;

    constructor(width: number, height: number, resolution: number) {
        let canvas = <HTMLCanvasElement> document.getElementById('canvas');
        super( {
            view : canvas,
            autoResize: true,
            antialias: false,
            backgroundColor: Settings.BgColor,
            roundPixels: Settings.RoundPixels,
            width: ScreenSize.width,
            height: ScreenSize.height
        });

        document.body.appendChild(this.view);
    }

    //Create singlenton instance
    public static get application(): App {
        if (!this.instance) {
            this.instance = new App(window.innerWidth, window.innerHeight, window.devicePixelRatio);
            this.startControllers();
            this.instance.addListeners();
        }
        return this.instance;
    }

    private static startControllers(): void {
        const gameController:GameController = new GameController();
    }

    static get sceneController(): SceneController {
        return this._sceneController;
    }

    private addListeners(): void {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }
   
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);

        if (App._sceneController)
            App._sceneController.resize();
    }
}