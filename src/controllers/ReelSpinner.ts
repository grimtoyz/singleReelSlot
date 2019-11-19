import {ReelComponent} from "../components/slot/reelComponent";
import {Settings} from "../config/settings";
import * as math from '@pixi/math';
import * as TWEEN from 'tween.js/src/Tween.js';
import {App} from "../app";


export class ReelSpinner {
    readonly _reel: ReelComponent;
    readonly _reelMap: Array<number>;
    readonly _symbolsAmount: number;

    private _currentTopSymbolIndex: number;
    private _isLoopSpinning: boolean;
    private _loopSpinDuration: number;
    private _spinLoopTimeLeft: number;
    private _symbolToStopAtIndex: number;
    private _spinLoopSpeed: number;

    private _hasSymbolToStopAt: boolean;

    readonly cbOnSpinComplete: Function;

    constructor(reel: ReelComponent, cbOnSpinComplete: Function){
        this._reel = reel;
        this._symbolsAmount = reel.symbolsAmount;
        this._reelMap = Settings.ReelMap.concat();
        this.cbOnSpinComplete = cbOnSpinComplete;

        this.init();
    }

    private init(): void{
        this._currentTopSymbolIndex = 0;

        this._loopSpinDuration = 1000;
        this._spinLoopSpeed = 0.2;

        this.updateReel();
    }

    public startSpin(): void{
        this._hasSymbolToStopAt = false;

        let tween = new TWEEN.Tween(this)
            .to({ _currentTopSymbolIndex: "-16" }, 1000)
            .easing(TWEEN.Easing.Exponential.In)
            .onUpdate(() => {
                this._currentTopSymbolIndex = this.calculateNormalizedIndex(this._currentTopSymbolIndex);
                this.updateReel();
            })
            .onComplete(()=>{
                this.animateLoopSpin();
            })
            .start()
    }

    public stopSpin(): void{
        let targetSymbolIndex = this._symbolToStopAtIndex;

        let rollbackSymbolIndex = this.calculateNormalizedIndex(this._symbolToStopAtIndex + 6);
        this._currentTopSymbolIndex = rollbackSymbolIndex;
        this.updateReel();

        let tween = new TWEEN.Tween(this)
            .to({ _currentTopSymbolIndex: "-6" }, 1000)
            .easing(TWEEN.Easing.Back.Out)
            .onUpdate(() => {
                this._currentTopSymbolIndex = this.calculateNormalizedIndex(this._currentTopSymbolIndex);
                this.updateReel();
            })
            .onComplete(()=>{
                this.onSpinComplete();
            })
            .start()
    }

    private calculateNormalizedIndex(index): number{
        let normalizedIndex: number = index;

        if (Math.abs(normalizedIndex) >= this._reelMap.length )
            normalizedIndex = normalizedIndex % this._reelMap.length;

        if (normalizedIndex < 0)
            normalizedIndex = this._reelMap.length + normalizedIndex;

        // DEBUG
        // console.log(`normalized ${index} to ${normalizedIndex}`);

        return normalizedIndex;
    }

    private animateLoopSpin(): void{
        this._spinLoopTimeLeft = this._loopSpinDuration;
        this._isLoopSpinning = true;
    }

    private updateReel(): void{
        let symbolIDs: Array<number> = [];
        for (let i = 0; i < this._symbolsAmount; i++) {
            let symIndex: number = Math.floor(this._currentTopSymbolIndex) + i;
            let normalizedSymIndex: number = this.calculateNormalizedIndex(symIndex);
            let symbolId = this._reelMap[normalizedSymIndex];
            symbolIDs.push(symbolId);
        }

        let offset: number = this._currentTopSymbolIndex - Math.floor(this._currentTopSymbolIndex);
        this._reel.updateSymbols(symbolIDs, -offset);
    }

    private onSpinComplete(){
        this.cbOnSpinComplete();
    }

    public setSymbolToStop(symbolIndex){
        this._symbolToStopAtIndex = symbolIndex;
        this._hasSymbolToStopAt = true;
    }

    public update(delta): void{
        if (!this._isLoopSpinning)
            return;

        let currentIndex = this._currentTopSymbolIndex - this._spinLoopSpeed;
        this._currentTopSymbolIndex = this.calculateNormalizedIndex(currentIndex);
        this.updateReel();

        if (this._spinLoopTimeLeft > 0)
            this._spinLoopTimeLeft -= App.application.ticker.elapsedMS;
        else{
            this._spinLoopTimeLeft = 0;

            // there was response from server with the symbol needed
            // or else keep spinning infinitely or till certain idle timeout passed
            if (this._hasSymbolToStopAt){
                this._isLoopSpinning = false;
                this.stopSpin();
            }
        }
    }
}