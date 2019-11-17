import { Container } from "pixi.js";
import { App } from "../app";
import { Scene } from "../scene";


export enum SceneLayer { UI, GAME };

export class SceneController {

    private lastLoadedScene: Scene;
    private loadedScenes: Scene[] = [];

    readonly uiLayer: PIXI.Container;
    readonly gameLayer: PIXI.Container;

    constructor() {
        this.gameLayer = new Container();
        this.uiLayer = new Container();

        App.application.stage.addChild(this.gameLayer);
        App.application.stage.addChild(this.uiLayer);
        App.application.ticker.add(this.mainUpdate.bind(this))
    }

    public loadScene(scene: Scene, additive: boolean = false): void {

        if (!additive && this.lastLoadedScene) {

            for (let i = this.loadedScenes.length - 1; i >= 0; i--) {
                if (this.loadedScenes[i] === this.lastLoadedScene) {
                    this.loadedScenes.splice(i, 1);
                    break;
                }
            }
            this.removeSceneContainer();
            this.lastLoadedScene.destroy();
            this.lastLoadedScene = undefined;
        }
        this.lastLoadedScene = scene;
        this.loadedScenes.push(this.lastLoadedScene);
        this.addSceneContainer();
    }

    public destroyCurrentScene() : void
    {
        for (let i = this.loadedScenes.length - 1; i >= 0; i--) {
            if (this.loadedScenes[i] === this.lastLoadedScene) {
                this.loadedScenes.splice(i, 1);
                break;
            }
        }
        this.removeSceneContainer();
        this.lastLoadedScene.destroy();
        this.lastLoadedScene = undefined;

        if(this.loadedScenes.length < 1)  
            throw new Error("No scenes availables!.");
        else
        {
            this.lastLoadedScene = this.loadedScenes[this.loadedScenes.length - 1];
        }
    }

    private removeSceneContainer(): void {
        if (this.lastLoadedScene.layer == SceneLayer.UI)
            this.uiLayer.removeChild(this.lastLoadedScene.sceneContainer);
        else
            this.gameLayer.removeChild(this.lastLoadedScene.sceneContainer);
    }

    private addSceneContainer(): void {
        if (this.lastLoadedScene.layer == SceneLayer.UI)
            this.uiLayer.addChild(this.lastLoadedScene.sceneContainer);
        else
            this.gameLayer.addChild(this.lastLoadedScene.sceneContainer);
    }

    private mainUpdate(delta): void {
        this.loadedScenes.forEach(scene => {
            scene.update(delta);
        });
    }
}