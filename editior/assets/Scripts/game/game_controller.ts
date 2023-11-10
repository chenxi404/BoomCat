import { InitialView } from './view/initial_view';
import { MainView } from './view/main_view';

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
    private main_view:MainView;
    constructor(){
        this.initial_view = new InitialView();
        this.main_view = new MainView();
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

    CloseInitialView(){
        this.initial_view.Close();
    }

    //-----------------------------------------------------------
    //主界面
    OpenMianView(){
        this.main_view.Open();
    }

    IsMainViewOpen():boolean{
        return this.main_view.IsOpen();
    }
}


