import { _decorator, Component, Node, game, assetManager, JsonAsset } from 'cc';
import * as fgui from "fairygui-cc";
import { GameLoop } from './gameloop/gameloop';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    start() {
        fgui.GRoot.create();
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
            GameLoop.getInstance().Start();
        });
    }

    update(deltaTime: number) {
        GameLoop.getInstance().Update(deltaTime);
    }
}


