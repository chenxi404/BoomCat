import { UITemplate } from "../../mvc/u_template";

export class HandCard extends UITemplate{
    card_type:number;
    width:number;
    face:number;

    constructor(parent){
        super();
        this.ui_package = "main";
        this.layout_name = "hand_card";
        this.parent = parent;
    }

    OpenViewCallback(...args: any[]){
        this.width = this.fairy_root.width;
        this.SetInfo(...args);    
    }

    SetInfo(...args: any[]){
        this.card_type = args[0];
        let birth_rect = args[1];
        this.face = 0;
        this.SetSelectedIndex("card_face", this.face);
        this.SetPosition(birth_rect.x, birth_rect.y);
        this.GetGText("name").text = config.card[this.card_type.toString()].name;
    }

    TurnCard(){
        if(this.face == 0){
            this.face = 1;
        }else{
            this.face = 0;
        }
        this.SetSelectedIndex("card_face", this.face);
    }

    Reset(){

    }
}