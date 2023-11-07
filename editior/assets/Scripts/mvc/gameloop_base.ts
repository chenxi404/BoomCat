
export interface GameLoopBase  {
    StateEnter(...args: any[]):void;
    StateUpdate(elapse_time:number):void;
    StateExit(...args: any[]):void;
}


