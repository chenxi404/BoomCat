import { assetManager, JsonAsset } from 'cc';
import * as fgui from "fairygui-cc";
import { GameController } from '../game/game_controller';
import { GameLoopBase } from '../mvc/gameloop_base';
import { GameLoop, GameLoopState } from './gameloop';
/**
 * 1.显示初始化界面
 * 2.登录用户信息
 * 3.加载配置文件，通用ui资源等
 */
export class GameLoopPreload implements GameLoopBase {
    state:number;
    load_asset_num:number;
    total_asset_num:number;
    preload_ui_list:string[] = ["ui/common"];

    StateEnter(...args: any[]):void {
        console.log("[GameLoopPreload StateEnter]");
        this.state = 0;
        this.load_asset_num = 0;
        this.total_asset_num = 1 + this.preload_ui_list.length;
        GameController.getInstance().OpenInitialView();
    }

    StateUpdate(elapse_time:number):void {
        if(this.state == 0){
            window.game = {};
            game.UIPackageCache = {};

            if(GameController.getInstance().IsInitialViewOpen()){
                // 加载配置文件
                assetManager.loadAny({dir:'config', bundle:'resources'},(err, data) =>{
                    if(err){
                        return;
                    }
                    window.config = {};
                    for (var i = 0; i < data.length; i++) {
                        // 对数据进行操作
                        let jsonAsset = data[i] as JsonAsset;
                        config[jsonAsset.name.substring(7)] = jsonAsset.json;
                    }
                    this.load_asset_num = this.load_asset_num + 1;
                });

                //加载UI文件
                for(var i = 0; i < this.preload_ui_list.length; i++){
                    fgui.UIPackage.loadPackage(this.preload_ui_list[i], (error, pkg) => {     
                        if(error == null){
                            this.load_asset_num = this.load_asset_num + 1;
                        }
                    });
                }
               
                this.state = 1;
            }
        }
        else if(this.state == 1){
            let percent = this.load_asset_num / this.total_asset_num;  
            GameController.getInstance().SetInitialViewLoadPercent(percent);
            if(percent >= 1){
                this.state = 2;
            }
        }else if(this.state == 2){
            GameLoop.getInstance().ChangeState(GameLoopState.Start);
        }
        
    }

    StateExit(...args: any[]):void {
        console.log("[GameLoopPreload StateExit]");
    }
}


