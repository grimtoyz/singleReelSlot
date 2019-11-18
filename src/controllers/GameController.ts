import { App } from "../app";
import {Settings} from "../config/settings";
import {SceneController, SceneLayer} from "./SceneController";
import {ReelSpinner} from "./ReelSpinner";
import {ReelComponent} from "../components/slot/reelComponent";
import {Scene} from "../scene";
import {GameView} from "../views/gameView";
import {HUD} from "../views/hudView";
import {LoadingView} from "../views/loadingView";

export class GameController {
    private _reelSpinner: ReelSpinner;
    private _gameplayScene: Scene;

    private _loadingView: LoadingView;
    private _gameView: GameView;
    private _hudView: HUD;

    constructor (){
        this.create();
    }

    create(){
        this.createLoadingView();
    }

    createLoadingView(){
        this._loadingView = new LoadingView(()=>{
            this.onResourcesLoaded();
        });
        App.application.stage.addChild(this._loadingView);
    }

    onResourcesLoaded(){
        this._loadingView.destroy();
        App.application.stage.removeChild(this._loadingView);

        this.createGameView();
        this.createHUD();
    }

    createGameView(){
        this._gameView = new GameView();
        App.application.stage.addChild(this._gameView);
    }

    createHUD(){
        this._hudView = new HUD();
        App.application.stage.addChild(this._hudView);
    }

    update(delta: number): void{

    }

    resize(): void{
        if (this._gameView){
            this._gameView.resize();
        }

        if (this._hudView){
            this._hudView.resize();
        }
    }
}