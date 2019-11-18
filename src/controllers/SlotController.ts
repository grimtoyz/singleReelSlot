import { App } from "../app";
import {Settings} from "../config/settings";
import {ReelSpinner} from "./ReelSpinner";
import {ReelComponent} from "../components/slot/reelComponent";
import {GameView} from "../views/gameView";
import {HUD} from "../views/hudView";
import {LoadingView} from "../views/loadingView";
import * as TWEEN from 'tween.js/src/Tween.js';
import {CelebrationComponent} from "../components/celebrationComponent";


export class SlotController {
    private _loadingView: LoadingView;
    private _gameView: GameView;
    private _hudView: HUD;
    private _celebrationComponent: CelebrationComponent;
    private _isSpinningInProcess: boolean;
    private _reelController: ReelSpinner;

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
        this.resize();
    }

    private onResourcesLoaded(): void{
        this._loadingView.destroy();
        App.application.stage.removeChild(this._loadingView);

        this.createGameView();
        let reel = this._gameView.reel;
        this._reelController = new ReelSpinner(reel, ()=>{
            this.onSpinComplete();
        });

        this.createHUD();
        this.createCelebrationLayer();
        this.resize();
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

    private createCelebrationLayer(): void{
        this._celebrationComponent = new CelebrationComponent();
        App.application.stage.addChild(this._celebrationComponent);
    }

    private onSpinAttempt(): void{
        if (this.isSpinPossible() && !this._isSpinningInProcess){
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

        this._reelController.setSymbolToStop(responseSymbolIndex);
    }

    private onSpinComplete(): void{
        this._hudView.enableSpinButton();
        this._celebrationComponent.burst();
        this._isSpinningInProcess = false;
    }

    spinOneRound(){
        this._reelController.startSpin();
        this._hudView.disableSpinButton();
    }

    isSpinPossible(): boolean{
        // check if player has enough money, etc.
        return true;
    }

    mainUpdate(delta: number): void{
        TWEEN.update();

        if (this._reelController)
            this._reelController.update(delta);

        if (this._gameView)
            this._gameView.update(delta);

        if (this._hudView)
            this._hudView.update(delta);

        if (this._celebrationComponent)
            this._celebrationComponent.update(delta);
    }

    public resize(): void{
        let ratio = App.application.screen.width < App.application.screen.height ? App.application.screen.width / 960 : App.application.screen.height / 960;
        // TODO: to avoid separate scaling all views should be added to a single scalable and resizable wrapper

        if (App.application.screen.width < App.application.screen.height)
            this.applyLayoutPortrait();
        else
            this.applyLayoutLandscape();

        if (this._loadingView)
            this._loadingView.resize();

        if (this._gameView){
            this._gameView.scale.x = this._gameView.scale.y = ratio;
            this._gameView.resize();
        }

        if (this._hudView){
            this._hudView.scale.x = this._hudView.scale.y = ratio;
            this._hudView.resize();
        }

        if (this._celebrationComponent){
            this._celebrationComponent.resize();
            this._celebrationComponent.scale.x = this._celebrationComponent.scale.y = ratio;
        }
    }

    private applyLayoutPortrait(): void{
    }

    private applyLayoutLandscape(): void{
    }
}