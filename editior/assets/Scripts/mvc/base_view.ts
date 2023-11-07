import * as fgui from "fairygui-cc";

enum UIViewStaus{
	Close = 0,
	Caching = 1,
	Loading = 2,
	Open = 3,
}

export class BaseView {
    status:number;
    ui_package:string;
    layout_name:string;
    pkg:fgui.UIPackage;
    fairy_root:fgui.GComponent;
    fairt_objs:Map<string, fgui.GObject>;
    constructor(){
        this.status = UIViewStaus.Close;
    }

    Open(){
        if(this.IsOpen()){
            this.SetVisible(true);
            return;
        }
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
                console.log(pkg);
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
            fgui.GRoot.inst.addChild(this.fairy_root);

            this.status = UIViewStaus.Open;
            this.SetVisible(true);

            this.fairt_objs = new Map<string, fgui.GObject>();
        }
    }

    GetObj(name:string){
        let obj = this.fairt_objs.get(name);
        if(obj == null){
            let find_str:Array<string> = name.split("/");
            let length = find_str.length;
            let com = this.fairy_root;
            for (let i = 0; i < length; i++) {
                if(i < length - 1){
                    com = com.getChild(find_str[i]).asCom;
                }else{
                    obj = com.getChild(find_str[i]);
                }
            }
            this.fairt_objs.set(name, obj);
        }
        return obj;
    }

    GetCom(name:string):fgui.GComponent{
        return this.GetObj(name).asCom;
    }

    GetGProgressBar(name:string):fgui.GProgressBar{
        return this.GetObj(name) as fgui.GProgressBar;        
    }

    GetGGraph(name:string):fgui.GGraph{
        return this.GetObj(name) as fgui.GGraph;
    }
    
    GetGImage(name:string):fgui.GImage{
        return this.GetObj(name) as fgui.GImage;
    }

    GetGText(name:string):fgui.GTextField{
        return this.GetObj(name) as fgui.GTextField;
    }

    IsOpen():boolean{
        return this.status == UIViewStaus.Open;
    }

    SetVisible(is_visible:boolean){

    }
}


