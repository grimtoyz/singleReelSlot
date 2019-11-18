import { App } from "../app";
import {Settings} from "../config/settings";
import {ReelSpinner} from "./ReelSpinner";
import {ReelComponent} from "../components/slot/reelComponent";
import {GameView} from "../views/gameView";
import {HUD} from "../views/hudView";
import {LoadingView} from "../views/loadingView";
import * as TWEEN from 'tween.js/src/Tween.js';


export class SlotController {
    private _reelSpinner: ReelSpinner;

    private _loadingView: LoadingView;
    private _gameView: GameView;
    private _hudView: HUD;
    private _isSpinningInProcess: boolean;

    constructor (){
        this.create();
    }

    private create(): void{
        this._isSpinningInProcess = false;

        App.application.ticker.add(this.mainUpdate.bind(this));
        this.createLoadingView();
    }

    private createLoadingView(): void{
        this._loadingView = new LoadingView(()=>{
            this.onResourcesLoaded();
        });
        App.application.stage.addChild(this._loadingView);
    }

    private onResourcesLoaded(): void{
        this._loadingView.destroy();
        App.application.stage.removeChild(this._loadingView);

        this.createGameView();
        this.createHUD();
    }

    private createGameView(): void{
        this._gameView = new GameView();
        App.application.stage.addChild(this._gameView);
    }

    private createHUD(): void{
        this._hudView = new HUD();
        this._hudView.addOnSpinTouchedCallback(()=>{
            this.onSpinAttempt();
        });
        App.application.stage.addChild(this._hudView);
    }

    private onSpinAttempt(): void{
        if (this.isSpinPossible()){
            this._isSpinningInProcess = true;
            this.spinOneRound();
            this.makeSpinRequest();
        }
    }

    private makeSpinRequest(): void{
        // actual spin data should be requested from server
        // imitating the delay
        setTimeout(()=>{
            this.onSuccessfulResponse();
        }, 1600);
    }

    private onSuccessfulResponse(): void{
        let reelMap = Settings.ReelMap;
        let responseSymbolIndex = reelMap[Math.floor(Math.random() * reelMap.length)];

        this._gameView.setSymbolToStopAt(responseSymbolIndex);
    }

    onRoundOver(){
        this._isSpinningInProcess = false;
    }

    spinOneRound(){
        this._gameView.spin();
    }

    isSpinPossible(): boolean{
        // check if player has enough money, etc.
        return true;
    }

    mainUpdate(delta: number): void{
        TWEEN.update();

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