import { App } from "../app";
import {Settings} from "../config/settings";
import {SceneLayer} from "./SceneController";
import {LoadScene} from "../scenes/loader.scene";
import {ReelSpinner} from "./ReelSpinner";

export class GameController {
    private _reelSpinner: ReelSpinner;

    constructor (){
        this.create();
    }

    create(){

    }

    init(){
        let loadingScene = new Settings.Scenes.LoadScene(SceneLayer.UI, this.onLoaded);
        App.sceneController.loadScene(loadingScene);
    }

    onLoaded(){
        this._reelSpinner = new ReelSpinner();

        let gameplayScene = new Settings.Scenes.GameplayScene(SceneLayer.GAME);
        App.sceneController.loadScene(gameplayScene);
    }

    createReel(){

    }

    resize(width, height){
    }
}