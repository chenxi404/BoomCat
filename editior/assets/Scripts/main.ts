import { _decorator, Component, Node, game, assetManager, JsonAsset } from 'cc';
import * as fgui from "fairygui-cc";
import { GameLoop } from './gameloop/gameloop';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    start() {
        fgui.GRoot.create();
        GameLoop.getInstance().Start();
    }

    update(deltaTime: number) {
        GameLoop.getInstance().Update(deltaTime);
    }
}


