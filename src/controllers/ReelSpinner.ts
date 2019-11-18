import {ReelComponent} from "../components/slot/reelComponent";
import {Settings} from "../config/settings";
import * as math from '@pixi/math';
import * as TWEEN from 'tween.js/src/Tween.js';


export class ReelSpinner {
    readonly _reel: ReelComponent;
    readonly _reelMap: Array<number>;
    readonly _symbolsAmount: number;

    private _currentPosition: Object;
    private _currentTopSymbolIndex: number;

    constructor(reel: ReelComponent){
        this._reel = reel;

        this._symbolsAmount = reel.symbolsAmount;

        this._reelMap = Settings.ReelMap.concat();
        this._currentPosition = { y: 0 };
        this._currentTopSymbolIndex = 0;
        this.create();
    }

    create(){
        this.spin();
    }

    spin(){
        let tween = new TWEEN.Tween(this)
            .to({ _currentTopSymbolIndex: "-16" }, 2000)
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

    private calculateNormalizedIndex(index): number{
        let normalizedIndex: number = index;

        if (Math.abs(normalizedIndex) >= this._reelMap.length )
            normalizedIndex = normalizedIndex % this._reelMap.length;

        if (normalizedIndex < 0)
            normalizedIndex = this._reelMap.length + normalizedIndex;

        // console.log(`normalized ${index} to ${normalizedIndex}`);

        return normalizedIndex;
    }

    animateLoopSpin(): void{
        let tween = new TWEEN.Tween(this)
            .to({ _currentTopSymbolIndex: "-10" }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this._currentTopSymbolIndex = this.calculateNormalizedIndex(this._currentTopSymbolIndex);
                this.updateReel();
            })
            .onComplete(()=>{
                // this.animateLoopSpin();
            })
            .start()
    }

    updateReel(): void{
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
}