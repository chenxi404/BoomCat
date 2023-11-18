import { HandCard } from "../view/hand_card";

export class Player{
    user_id:number;
    is_homeowner:boolean;
    is_me:boolean;
    card_type_list:Array<number>;
    constructor(user_id:number, is_homeowner:boolean, is_me:boolean){
        this.user_id = user_id;
        this.is_homeowner = is_homeowner;
        this.is_me = is_me;
        this.card_type_list = new Array<number>();
    }

    PushCardType(card_type:number){
        this.card_type_list.push(card_type);
    }
}