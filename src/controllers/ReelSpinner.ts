import {ReelComponent} from "../components/slot/reelComponent";

export class ReelSpinner {
    readonly _reel: ReelComponent;

    constructor(reel: ReelComponent){
        this._reel = reel;
    }
}