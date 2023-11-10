import { BaseView, UIOrder } from '../../mvc/base_view';
import { UtilsInstance } from '../../shared/utils';

export class InitialView extends BaseView {
    constructor(){
        super();
        this.ui_package = "initial";
        this.layout_name = "ui_initial_view";
        this.order = UIOrder.Top;
    }

    OpenViewCallback(...args: any[]){
        this.GetGText("loading_value").text = "0%";
    }

    SetInitialViewLoadPercent(percent:number){
        this.GetGImage("loading_bar/n0").fillAmount = percent;
        this.GetGText("loading_value").text = UtilsInstance.formatString("{0}%", Math.floor(percent * 100));
    }
}


