import { App } from "../app";
import {Settings} from "../config/settings";
import {ReelSpinner} from "./ReelSpinner";
import {ReelComponent} from "../components/slot/reelComponent";
import {GameView} from "../views/gameView";
import {HUD} from "../views/hudView";
import {LoadingView} from "../views/loadingView";

export class GameController {
    private _reelSpinner: ReelSpinner;

    private _loadingView: LoadingView;
    private _gameView: GameView;
    private _hudView: HUD;

    constructor (){
        this.create();
    }

    create(){
        App.application.ticker.add(this.mainUpdate.bind(this));
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

    mainUpdate(delta: number): void{
        if (this._gameView)
            this._gameView.update(delta);

        if (this._hudView)
            this._hudView.update(delta);
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