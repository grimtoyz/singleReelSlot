import { LoadScene } from "../scenes/loader.scene";
import {SlotMachineScene} from "../scenes/game/slotMachineScene";
import {SlotHUD} from "../scenes/ui/slotHUD";

export class Settings
{
    static BgColor : number = 0x232323;
    static RoundPixels : boolean = false;
    static Scenes = {"LoadScene" : LoadScene, "SlotMachineScene" : SlotMachineScene, "SlotHUD" : SlotHUD};

    // Reels
    static ReelMap : Array<number> = [7, 6, 5, 4, 3, 2, 1, 0];
    static ReelWindowSizeV : number = 3;
    static ReelBgColor : number = 0x3e3e3e;
    static ReelBgMargin: number = 10;
}

export const ScreenSize =  { width: 1280, height: 720 };