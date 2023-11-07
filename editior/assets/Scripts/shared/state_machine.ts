import { GameLoopBase } from '../mvc/gameloop_base';

export class state_machine {
    private state_map;
    private cur_state : GameLoopBase;
    private cur_state_id : number;
    constructor(){
        this.state_map = new Map<number, GameLoopBase>();
        this.cur_state = null;
        this.cur_state_id = null;
    }

    DeleteMe(){
        this.state_map = null;
    }

    AddState(state_id:number, state:GameLoopBase){
        this.state_map.set(state_id, state);
    }

    ChangeState(state_id:number,...args:any[]){
        let new_state = this.state_map.get(state_id);
        if(new_state != null){
            if(this.cur_state != null){
                this.cur_state.StateExit(state_id, args);
            }
            this.cur_state_id = state_id;
            this.cur_state = new_state;
            this.cur_state.StateEnter(args);
        }else{
            console.error("[StateMachine:ChangeState] Invalid State :" + state_id);
        }
    }

    Update(elapse_time:number){
        if(this.cur_state != null){
            this.cur_state.StateUpdate(elapse_time);
        }
    }
}


