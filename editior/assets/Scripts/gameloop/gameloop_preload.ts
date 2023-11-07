import { GameController } from '../game/game_controller';
import { GameLoopBase } from '../mvc/gameloop_base';

export class GameLoopPreload implements GameLoopBase {
    state:number;
    load_asset_num:number;
    total_asset_num:number;
    StateEnter(...args: any[]):void {
        console.log("[GameLoopPreload StateEnter]");
        this.state = 0;
        this.load_asset_num = 0;
        this.total_asset_num = 10;
        GameController.getInstance().OpenInitialView();
    }

    StateUpdate(elapse_time:number):void {
        console.log("[GameLoopPreload StateUpdate]");
        if(this.state == 0){
            if(GameController.getInstance().IsInitialViewOpen() == true){
                this.state = 1;
            }
        }
        else if(this.state == 1){
            this.load_asset_num = this.load_asset_num + 1;
            let percent = this.load_asset_num / this.total_asset_num;
            GameController.getInstance().SetInitialViewLoadPercent(percent);
            if(percent >= 1){
                this.state = 2;
            }
        }else if(this.state == 2){

        }
        
    }

    StateExit(...args: any[]):void {
        console.log("[GameLoopPreload StateExit]");
    }
}


