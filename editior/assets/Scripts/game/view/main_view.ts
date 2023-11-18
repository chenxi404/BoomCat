import { math, Vec2, Vec4 } from 'cc';
import { BaseView, UIOrder } from '../../mvc/base_view';
import { CollectPool } from '../../shared/collect_pool';
import { UtilsInstance } from '../../shared/utils';
import { Player } from '../data/player';
import { HandCard } from './hand_card';

/**
 * 游戏桌面
 */

enum GameState{
    Waiting = 0,
    Begining = 1,
    Playing = 2,
    End = 3,
}

export class MainView extends BaseView {
    total_card_num:number;
    player_list:Array<Player>;
    MePlayer:Player;
    hand_card_pool:CollectPool;
    hand_card_list:Array<HandCard>;
    hand_card_rect:Vec4;
    card_heap_rect:Vec2;
    game_state:number;
    game_sub_state:number;
    game_state_time:number;
    constructor(){
        super();
        this.ui_package = "main";
        this.layout_name = "ui_main_view";
        this.order = UIOrder.Main;
        this.game_state_time = 0;
    }

    OpenViewCallback(...args: any[]){
        this.game_state = GameState.Waiting;
        
        this.SetSelectedIndex("game_state", 0);
        this.GetGButton("start_btn").onClick(()=>{
            this.player_list = new Array<Player>();
            let my_player:Player = new Player(1, true, true);
            this.MePlayer = my_player;
            this.player_list.push(my_player);
            let enemy_player:Player = new Player(2, false, false);
            this.player_list.push(enemy_player);
            this.StartGame();
        });

        this.hand_card_pool = new CollectPool(() =>{
            return new HandCard(this.fairy_root);
        }, (item)=>{
            item.Close();
        }, (item)=>{
            item.Reset();
        });

        this.hand_card_list = new Array<HandCard>();

        let card_heap = this.GetGGraph("card_heap");
        this.card_heap_rect = new Vec2(card_heap.x, card_heap.y);

        let handcard_rect = this.GetGGraph("handcard_rect");
        console.log(handcard_rect.x, handcard_rect.y);
        this.hand_card_rect = new Vec4(handcard_rect.x, handcard_rect.y, handcard_rect.width, handcard_rect.height);
    }

    StartGame(){
        this.game_state = GameState.Begining;

        this.SetSelectedIndex("game_state", 1);
        this.total_card_num = 100;

        // 开局发牌
        let one_player_card_num = 5;
        
        this.player_list.forEach(player => {
            for (let index = 0; index < one_player_card_num; index++) {
                this.total_card_num = this.total_card_num - 1;
                let card_type = this.PickCardType();
                player.PushCardType(card_type);
            }
        });
        this.GetGText("total_card_num").text = UtilsInstance.formatString(config.words["100"], this.total_card_num);

        this.game_sub_state = 1;
    }

    Update(elapse_time:number){
        this.game_state_time = this.game_state_time + elapse_time;

        if(this.game_state == GameState.Begining){
            if(this.game_sub_state == 1){
                // 初始化自己的手牌
                this.MePlayer.card_type_list.forEach(card_type => {
                    let card = this.hand_card_pool.Create();
                    if(card.IsOpen()){
                        card.SetInfo(card_type, this.hand_card_rect);
                    }else{
                        card.Open(card_type, this.hand_card_rect);
                    }
                    this.hand_card_list.push(card);
                });
                this.game_sub_state = 2;
            }else if(this.game_sub_state == 2){
                let is_all_open = true;
                this.hand_card_list.forEach(card => {
                    if(!card.IsOpen()){
                        is_all_open = false;
                    }
                });
                if(is_all_open){
                    this.game_sub_state = 3;
                }
            }else if(this.game_sub_state == 3){
                this.UpdateHandCardArea();
                this.game_sub_state = 4;
                this.game_state_time = 0;
            }else if(this.game_sub_state == 4){
                if(this.game_state_time >= 1){
                    this.hand_card_list.forEach(card => {
                        card.TurnCard();
                    });
                    this.game_sub_state = 5;
                }
            }else if(this.game_sub_state == 5){
                this.player_list.forEach(player => {
                    if(!player.is_me){

                    }
                });
                this.game_state = GameState.Playing;
                this.game_sub_state = 1;
            }
        }
    }

    PickCardType():number{
        let type = math.randomRangeInt(1, 8);
        return type;
    }

    PickCard():HandCard{
        let type = math.randomRangeInt(1, 8);
        let card = this.hand_card_pool.Create();
        if(card.IsOpen()){
            card.SetInfo(type, this.card_heap_rect);
        }else{
            card.Open(type, this.card_heap_rect);
        }
        return card;
    }

    UpdateHandCardArea(){
        let index:number = 0;
        let offset = this.hand_card_rect.z / this.hand_card_list.length;
        this.hand_card_list.forEach(card => {
            card.SetPosition(this.hand_card_rect.x + card.width / 2  + index * offset, this.hand_card_rect.y);
            index = index + 1;
        });
    }
}