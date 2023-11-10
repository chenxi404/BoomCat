import { BaseView, UIOrder } from '../../mvc/base_view';
import { UtilsInstance } from '../../shared/utils';

/**
 * 游戏桌面
 */
export class MainView extends BaseView {
    constructor(){
        super();
        this.ui_package = "main";
        this.layout_name = "ui_main_view";
        this.order = UIOrder.Main;
    }

    OpenViewCallback(...args: any[]){
    }
}