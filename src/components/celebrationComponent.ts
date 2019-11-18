import {atlasesRes, loadedFiles} from "../config/resources";
import {BasicEmitter} from "./particles/particleEmitter";
import {App} from "../app";

export class CelebrationComponent extends PIXI.Container{
    private _particlesContainer: PIXI.Container;
    private _emitter: BasicEmitter;

    constructor(){
        super();
        this.create();
    }

    private create(): void{
        this._particlesContainer = new PIXI.Container();
        this.addChild(this._particlesContainer);

        let texture = loadedFiles[atlasesRes.assets].textures['particle.png'];
        this._emitter = new BasicEmitter(this._particlesContainer, texture, 100);
    }

    public burst():void{
        this._emitter.burst(120);
    }

    public update(delta: number): void{
        this._emitter.update(delta);
    }

    public resize(){
        this.position.set(App.application.screen.width * 0.5, App.application.screen.height * 0.5);
    }
}