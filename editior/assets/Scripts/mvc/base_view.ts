import * as fgui from "fairygui-cc";
import { UtilsInstance } from "../shared/utils";
import { UIInterface, UIViewStaus } from "./ui_interface";

export enum UIOrder{
    Common = 0,
    Main = 100,
    MainUp = 200,
    PopUp = 400,
    Top = 600,
}
export class BaseView extends UIInterface{
    order:number;
    open_params:any[];
    ui_package:string;
    layout_name:string;
    pkg:fgui.UIPackage;
    constructor(){
        super();
        this.status = UIViewStaus.Close;
        this.order = UIOrder.Common;
    }

    Open(...args: any[]){
        if(this.IsOpen()){
            this.SetVisible(true);
            return;
        }
        this.open_params = args;
        if(this.status == UIViewStaus.Close){
            this.StartLoadRes();
        }
    }

    StartLoadRes(){
        if(this.ui_package == null || this.layout_name == null){
            return;
        }
        fgui.UIPackage.loadPackage("ui/" + this.ui_package, (error, pkg) => {     
            if(error == null){
                UtilsInstance.cacheUIPackage(pkg);
                this.pkg = pkg;
                this.LoadResFinish();
            }
        });
    }

    LoadResFinish(){
        if(this.fairy_root != null){
            this.status = UIViewStaus.Open;
            this.SetVisible(true);
        }else{
            this.fairy_root = fgui.UIPackage.createObject(this.pkg.name, this.layout_name).asCom;
            this.fairy_root.makeFullScreen();
            this.fairy_root.sortingOrder = this.order;
            fgui.GRoot.inst.addChild(this.fairy_root);

            this.status = UIViewStaus.Open;
            this.SetVisible(true);

            this.fairt_objs = new Map<string, fgui.GObject>();
        }

        this.OpenViewCallback(...this.open_params);
    }

    Close(){
        this.status = UIViewStaus.Close
        if(this.fairy_root != null){
            fgui.GRoot.inst.removeChild(this.fairy_root);
            this.fairy_root = null;
        }

        if(this.pkg != null){
            UtilsInstance.freeUIPackage(this.pkg);
            this.pkg = null;
        }

        this.fairt_objs = null;
    }
}


