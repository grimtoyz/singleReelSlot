import Texture = PIXI.Texture;
import * as math from '@pixi/math';
import {App} from "../../app";

export class Particle extends PIXI.Sprite{
    private _direction: math.Point;
    private _defaultVelocity: number;
    private _velocity: number;
    private _targetAlpha: number;
    private _isActive: boolean;
    private _distanceThreshold: number;

    private _velocityX: number;
    private _velocityY: number;

    constructor(texture: Texture, velocity){
        super(texture);
        this._defaultVelocity = velocity;
        this._velocity;
        this._distanceThreshold = 10;
        this.anchor.set(0.5);
        this.visible = false;
    }

    init(){
        this.scale.set(1);
        this.alpha = 1;
        this.visible = true;
        this._isActive = true;
        this._velocity = -this._defaultVelocity * 0.5 + Math.random() * this._defaultVelocity;

        let angle = Math.atan2(this._direction.y, this._direction.x);
        this._velocityX = this._velocity * Math.cos(angle);
        this._velocityY = this._velocity * Math.sin(angle);
    }

    update(delta){
        if (!this._isActive)
            return;

        this.position.x += this._velocityX * delta;
        this.position.y += this._velocityY * delta;

        this.scale.x -= 0.002 * delta;
        this.scale.y -= 0.002 * delta;
        this.alpha -= 0.002 * delta;

        if (this.position.x > App.application.screen.width * 0.5 || this.position.x < -App.application.screen.width * 0.5){
            this.visible = false;
            this._isActive = false;
        }

        if (this.position.y > App.application.screen.height * 0.5 || this.position.y < -App.application.screen.height * 0.5){
            this.visible = false;
            this._isActive = false;
        }
    }

    getDistance(point1: math.Point, point2: math.Point){
        let dx = point1.x - point2.x;
        let dy = point1.y - point2.y;

        let distance = Math.sqrt( dx*dx + dy*dy );

        return distance;
    }

    get isActive(): boolean{
        return this._isActive;
    }

    set direction(direction: math.Point){
        this._direction = direction;
    }
}