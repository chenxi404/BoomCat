import { BaseView } from '../../mvc/base_view';
import { UtilsInstance } from '../../shared/utils';

export class InitialView extends BaseView {
    constructor(){
        super();
        this.ui_package = "initial";
        this.layout_name = "ui_initial_view";
    }

    SetInitialViewLoadPercent(percent:number){
        this.GetGImage("loading_bar/n0").fillAmount = percent;
        this.GetGText("loading_value").text = UtilsInstance.formatString(config.words["2"], Math.floor(percent * 100));
    }
}


