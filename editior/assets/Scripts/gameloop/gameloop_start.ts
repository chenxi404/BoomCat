import { GameController } from '../game/game_controller';
import { GameLoopBase } from '../mvc/gameloop_base';

export class GameLoopStart implements GameLoopBase {
   StateEnter(...args: any[]): void {
      GameController.getInstance().OpenMianView();
   }

   StateUpdate(elapse_time: number): void {
      if(GameController.getInstance().IsMainViewOpen()){
         if(GameController.getInstance().IsInitialViewOpen()){
            GameController.getInstance().CloseInitialView();
         }
         GameController.getInstance().UpdateMainView(elapse_time);  
      }
   }

   StateExit(...args: any[]): void {
       
   }
}


