import * as MATH from '@pixi/math';

export class Settings
{
    static BgColor : number = 0x232323;
    static RoundPixels : boolean = false;

    // Reels
    static ReelMap : Array<number> = [7, 6, 5, 4, 3, 2, 1, 0];
    static ReelWindowSizeV : number = 3;
    static ReelBgColor : number = 0x3e3e3e;
    static ReelBgMargin: number = 10;

    // HUD
    static SpinButtonPosition: MATH.Point = new MATH.Point(250, 300);
}

export const ScreenSize =  { width: 960, height: 960 };