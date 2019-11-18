import { Settings, ScreenSize } from "./config/settings";
import * as PIXI from 'pixi.js';
import {SlotController} from "./controllers/SlotController";
import * as math from '@pixi/math';

export class App extends PIXI.Application {

    private static instance: App;
    private static gameController: SlotController;

    constructor(width: number, height: number, resolution: number) {
        let canvas = <HTMLCanvasElement> document.getElementById('canvas');
        super( {
            view : canvas,
            autoResize: true,
            resolution: devicePixelRatio,
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
            let width = window.innerWidth;
            let height = window.innerHeight;

            if (!width || !height) {
                width = document.documentElement.clientWidth;
                height = document.documentElement.clientHeight
            }

            this.instance = new App(width, height, window.devicePixelRatio);
            this.startControllers();
            this.instance.addListeners();
        }
        return this.instance;
    }

    private static startControllers(): void {
        this.gameController = new SlotController();
    }

    private addListeners(): void {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);

        if (App.gameController)
            App.gameController.resize();
    }
}