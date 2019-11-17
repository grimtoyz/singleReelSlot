"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.loadResources = function (cbProgress, cbComplete) {
        Object.keys(Resources.imageFilesPath).forEach(function (key) {
            var path = Resources.imageFilesPath[key];
            PIXI.loader.add(key, path);
        });
        Object.keys(Resources.atlasFilesPath).forEach(function (key) {
            var path = Resources.atlasFilesPath[key];
            PIXI.loader.add(key, path);
        });
        PIXI.loader.on('progress', function () {
            cbProgress(PIXI.loader.progress);
        });
        PIXI.loader.load(function () {
            exports.loadedFiles = PIXI.loader.resources;
            cbComplete();
        });
    };
    Resources.imageFilesPath = {
        title: './src/assets/image/title.png',
    };
    Resources.atlasFilesPath = {
        assets: './src/assets/atlas/assets.json',
    };
    Resources.audioFilesPath = {};
    return Resources;
}());
exports.Resources = Resources;
exports.imagesRes = { title: 'title' };
exports.atlasesRes = { assets: 'assets' };
exports.audiosRes = {};
exports.spriteSheetRes = {};
//# sourceMappingURL=resources.js.map