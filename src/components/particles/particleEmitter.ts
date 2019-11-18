import {Particle} from "./particle";
import Texture = PIXI.Texture;
import * as math from '@pixi/math';

export class BasicEmitter {
    private _pool: Array<Particle>;
    private _spawnDelay: number;
    private _timeFromLastSpawnPassed: number;
    private _particlesContainer: PIXI.Container;
    private _texture: Texture;
    private _velocity: number;

    constructor(container: PIXI.Container, texture, velocity){
        this._pool = [];
        this._texture = texture;
        this._velocity = velocity;
        this._particlesContainer = container;
    }

    public burst(amount): void{
        for (let i = 0; i < amount; i++) {
            let particle = this.spawnParticle();
            particle.position.set(0, 0);

            let angle = Math.random() * Math.PI * 2;
            let dx = Math.cos(angle);
            let dy = Math.sin(angle);
            particle.direction = new math.Point(dx, dy);
            particle.init();
        }
    }

    private spawnParticle(): Particle{
        for (let i = 0; i < this._pool.length; i++) {
            let poolParticle = this._pool[i];
            if (!poolParticle.isActive)
                return poolParticle;
        }

        let particle = new Particle(this._texture, this._velocity);
        this._pool.push(particle);
        this._particlesContainer.addChild(particle);

        return particle;
    }

    public update(delta): void{
        for (let i = 0; i < this._pool.length; i++) {
            let particle = this._pool[i];
            particle.update(delta);
        }
    }
}