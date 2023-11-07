import { _decorator, Component, Node } from 'cc';
import { state_machine } from '../shared/state_machine';
import { GameLoopPreload } from './gameloop_preload';
import { GameLoopStart } from './gameloop_start';
const { ccclass, property } = _decorator;

enum GameLoopState 
{
    Preload = 1, 
    Start = 2,
};
@ccclass('GameLoop')
export class GameLoop {
    static instance:GameLoop;

    static getInstance():GameLoop
    {
        if(GameLoop.instance == null){
            GameLoop.instance = new GameLoop();
        }
        return GameLoop.instance;
    }

    state_machine:state_machine;
    // 构造函数
    constructor() {
        this.state_machine = new state_machine();

        let preload_state = new GameLoopPreload();
        this.state_machine.AddState(GameLoopState.Preload, preload_state);

        let start_state = new GameLoopStart();
        this.state_machine.AddState(GameLoopState.Start, start_state);
    }

    DeleteMe(){
        this.state_machine.DeleteMe();
        this.state_machine = null;
    }

    Start(){
        this.state_machine.ChangeState(GameLoopState.Preload);
    }

    Update(elapse_time:number){
        this.state_machine.Update(elapse_time);
    }
}


