import * as math from '@pixi/math';
import {atlasesRes, loadedFiles} from "../../config/resources";
import {Settings} from "../../config/settings";

export class ReelComponent extends PIXI.Container{
    private _symbolSize: math.Point;
    private _maskedWrapper: PIXI.Container;
    private _windowSizeV: number;
    private _symbols: Array<PIXI.Sprite>;

    constructor(){
        super();
        this.create();
    }

    protected create(): void{
        let symbolTexture = loadedFiles[atlasesRes.assets].textures['sym0.png'];

        let textureSizeX = symbolTexture.width;
        let textureSizeY = symbolTexture.height;

        this._symbolSize = new math.Point(textureSizeX, textureSizeY);

        // How many symbols are visible in one reel window, by default, when aligned;
        this._windowSizeV = Settings.ReelWindowSizeV;

        this.createBackground();
        this.createMaskedWrapper();
        this.createSymbols();
    }

    private createBackground(): void{
        let background = new PIXI.Graphics();
        let bgWidth = this.symbolSize.x + Settings.ReelBgMargin * 2;
        let bgHeight = this.symbolSize.y * this._windowSizeV + Settings.ReelBgMargin * 2;
        background.beginFill(Settings.ReelBgColor);
        background.drawRect(-bgWidth * 0.5, -bgHeight * 0.5, bgWidth, bgHeight);
        background.endFill();

        this.addChild(background);
    }

    private createMaskedWrapper(): void{
        this._maskedWrapper = new PIXI.Container();
        this.addChild(this._maskedWrapper);

        this._maskedWrapper.mask = this.createMask();
    }

    private createMask(): PIXI.Graphics{
        let mask = new PIXI.Graphics();
        let maskWidth = this.symbolSize.x;
        let maskHeight = this.symbolSize.y * this._windowSizeV;
        mask.beginFill(0xff0000);
        mask.drawRect(-maskWidth * 0.5, -maskHeight * 0.5, maskWidth, maskHeight);
        mask.endFill();
        this.addChild(mask);

        return mask;
    }

    createSymbols(){
        this._symbols = [];

        for (let i = 0; i < this._windowSizeV + 1; i++) {
            let symbol = new PIXI.Sprite(loadedFiles[atlasesRes.assets].textures['sym0.png']);
            symbol.anchor.set(0.5);
            symbol.position.y = -this.symbolSize.y * Math.floor(this._windowSizeV * 0.5) + this.symbolSize.y * i;
            this._maskedWrapper.addChild(symbol);
        }
    }

    public updateSymbols(indexes: Array<number>, offsetY: number): void{
        if (indexes.length !== this._symbols.length)
            return;

        for (let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            let symbol: PIXI.Sprite = this._symbols[i];
            symbol.texture = loadedFiles[atlasesRes.assets].textures[`sym${index}.png`];
        }
    }

    public playStartSpinAnimation(){

    }

    public playLoopSpinAnimation(){

    }

    public playStopSpinAnimation(){

    }

    get symbolSize():math.Point{
        return this._symbolSize;
    }
}