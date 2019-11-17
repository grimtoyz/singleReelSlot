import { LoadScene } from "../scenes/loader.scene";
import {GameplayScene} from "../scenes/game/gameplayScene";

export class Settings
{
    static BgColor : number = 0x232323;
    static RoundPixels : boolean = false;
    static Scenes = {"LoadScene" : LoadScene, "GameplayScene" : GameplayScene};

    static ReelMap = [7, 6, 5, 4, 3, 2, 1, 0];
}

export const ScreenSize =  { width: 1280, height: 720 };