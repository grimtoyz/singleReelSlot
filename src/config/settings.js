"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_scene_1 = require("../scenes/loader.scene");
var slotMachineScene_1 = require("../scenes/game/slotMachineScene");
var slotHUD_1 = require("../scenes/ui/slotHUD");
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.BgColor = 0x232323;
    Settings.RoundPixels = false;
    Settings.Scenes = { "LoadScene": loader_scene_1.LoadScene, "SlotMachineScene": slotMachineScene_1.SlotMachineScene, "SlotHUD": slotHUD_1.SlotHUD };
    // Reels
    Settings.ReelMap = [7, 6, 5, 4, 3, 2, 1, 0];
    Settings.ReelWindowSizeV = 3;
    Settings.ReelBgColor = 0x3e3e3e;
    Settings.ReelBgMargin = 10;
    return Settings;
}());
exports.Settings = Settings;
exports.ScreenSize = { width: 1280, height: 720 };
//# sourceMappingURL=settings.js.map