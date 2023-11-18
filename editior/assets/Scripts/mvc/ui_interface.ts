import * as fgui from "fairygui-cc";

export enum UIViewStaus{
	Close = 0,
	Caching = 1,
	Loading = 2,
	Open = 3,
}

export class UIInterface{
    status:number;
    fairy_root:fgui.GComponent;
    fairt_objs:Map<string, fgui.GObject>;
    visible:boolean = false;

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

    GetGButton(name:string):fgui.GButton{
        return this.GetObj(name) as fgui.GButton;
    }

    SetSelectedIndex(cname:string, index:number){
        let c:fgui.Controller = this.fairy_root.getController(cname);
        if(c != null){
            c.setSelectedIndex(index);
        }
    }

    SetPosition(x:number, y:number){
        this.fairy_root.x = x;
        this.fairy_root.y = y;
    }

    //-----
    OpenViewCallback(...args: any[]){
        
    }

    IsOpen():boolean{
        return this.status == UIViewStaus.Open;
    }

    SetVisible(is_visible:boolean){
        if(this.visible == is_visible){
            return;
        }
        this.visible = is_visible;
        if(this.fairy_root){
            this.fairy_root.visible = is_visible;
        }
    }
}