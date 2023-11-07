import { InitialView } from './view/initial_view';

export class GameController {
    static instance:GameController;

    static getInstance():GameController
    {
        if(GameController.instance == null){
            GameController.instance = new GameController();
        }
        return GameController.instance;
    }

    private initial_view:InitialView;
    constructor(){
        this.initial_view = new InitialView();
    }

    //初始化界面
    OpenInitialView(){
        this.initial_view.Open();
    }

    IsInitialViewOpen():boolean{
        return this.initial_view.IsOpen();
    }

    SetInitialViewLoadPercent(percent:number){
        this.initial_view.SetInitialViewLoadPercent(percent);
    }
}


