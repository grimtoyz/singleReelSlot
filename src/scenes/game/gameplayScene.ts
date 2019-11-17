import {Scene} from "../../scene";
import {SceneLayer} from "../../controllers/SceneController";
import {SpinButton} from "../../components/ui/spinButton";

export class GameplayScene extends Scene{
    private spinButton: SpinButton;

    constructor(layer: SceneLayer){
        super(layer);
        this.create();
    }

    protected create(): void {
        this.createSpinButton();
    }

    private createSpinButton(): void{
        this.spinButton = new SpinButton();
        this.sceneContainer.addChild(this.spinButton);
    }

    public update(delta: number): void {
    }
}