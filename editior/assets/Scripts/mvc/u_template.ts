import * as fgui from "fairygui-cc";
import { UtilsInstance } from "../shared/utils";
import { UIInterface, UIViewStaus } from "./ui_interface";


export class UITemplate extends UIInterface{
    status:number;
    open_params:any[];
    ui_package:string;
    layout_name:string;
    pkg:fgui.UIPackage;
    parent:fgui.GComponent;
    constructor(){
        super();
        this.status = UIViewStaus.Close;
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
            if (this.parent != null){
                this.parent.addChild(this.fairy_root);
                this.status = UIViewStaus.Open;
                this.SetVisible(true);
                this.fairt_objs = new Map<string, fgui.GObject>();
                this.OpenViewCallback(...this.open_params);
            }else{
                this.Close();
                return;
            }
        }
    }

    Close(){
        this.status = UIViewStaus.Close
        if(this.fairy_root != null){
            if (this.parent != null){
                this.parent.removeChild(this.fairy_root);
            }
            this.fairy_root = null;
        }

        if(this.pkg != null){
            UtilsInstance.freeUIPackage(this.pkg);
            this.pkg = null;
        }

        this.fairt_objs = null;
    }
}


