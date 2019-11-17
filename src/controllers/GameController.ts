import { App } from "../app";
import {Settings} from "../config/settings";
import {SceneLayer} from "./SceneController";
import {ReelSpinner} from "./ReelSpinner";
import {ReelComponent} from "../components/slot/reelComponent";
import {Scene} from "../scene";

export class GameController {
    private _reelSpinner: ReelSpinner;
    private _gameplayScene: Scene;

    constructor (){
        // this.create();
    }

    create(){

    }

    // init(){
    //     let loadingScene = new Settings.Scenes.LoadScene(SceneLayer.UI, ()=>{
    //         this.onLoaded();
    //     });
    //     App.sceneController.loadScene(loadingScene);
    // }

    // onLoaded(){
    //
    //
    //     this._gameplayScene = new Settings.Scenes.SlotScene(SceneLayer.GAME);
    //     this._reelSpinner = new ReelSpinner(this._gameplayScene.reel);
    //     App.sceneController.loadScene(this.gameplayScene);
    // }

    createReel(){

    }

    resize(){
        // if (this.gameplayScene){
        //     this.gameplayScene.resize();
        // }
    }

    // public get gameplayScene(): Scene{
    //     return this._gameplayScene;
    // }
}