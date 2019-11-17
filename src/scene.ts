
import * as PIXI from 'pixi.js';
import { SceneLayer } from "./controllers/SceneController";
import {App} from "./app";

export abstract class Scene {

    public sceneContainer: PIXI.Container;
    public readonly layer : SceneLayer;

    protected constructor(layer : SceneLayer) {
        this.sceneContainer = new PIXI.Container();
        this.layer = layer;
    }

    public show() {
        this.sceneContainer.visible = true;
    }

    public hide() {
        this.sceneContainer.visible = false;
    }

    public destroy() {
        this.sceneContainer.removeAllListeners();
        this.sceneContainer.removeChildren();
    }

    protected abstract create(): void;
    public abstract update(delta: number): void;

    public resize(): void{
        this.sceneContainer.position.set(App.application.view.width * 0.5, App.application.view.height * 0.5);
    };
}