"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MATH = require("@pixi/math");
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.BgColor = 0x232323;
    Settings.RoundPixels = false;
    // Reels
    Settings.ReelMap = [7, 6, 5, 4, 3, 2, 1, 0];
    Settings.ReelWindowSizeV = 3;
    Settings.ReelBgColor = 0x3e3e3e;
    Settings.ReelBgMargin = 10;
    // HUD
    Settings.SpinButtonPosition = new MATH.Point(250, 300);
    return Settings;
}());
exports.Settings = Settings;
exports.ScreenSize = { width: 1280, height: 720 };
//# sourceMappingURL=settings.js.map