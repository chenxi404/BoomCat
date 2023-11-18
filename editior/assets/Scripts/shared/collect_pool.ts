export class CollectPool{
    create_func:AnyCallback;
    delete_func:AnyCallback;
    free_func:AnyCallback;

    free_list:Array<any>;
    item_list:Array<any>;
    constructor(create_func:AnyCallback, delete_func:AnyCallback, free_func:AnyCallback){
        this.create_func = create_func;
        this.delete_func = delete_func;
        this.free_func = free_func;

        this.free_list = new Array<any>();
        this.item_list = new Array<any>();
    }

    DeleteMe(){
        this.Clear();
        this.free_list = null;
        this.item_list = null;
    }

    Create(...args: any[]){
        if(this.free_list.length > 0){
            let item = this.free_list.pop();
            return item;
        }else{
            let item = this.create_func(args);
            this.item_list.push(item);
            return item;
        }
    }

    Free(item:any){
        this.free_func(item);
        this.free_list.push(item);
    }

    Clear(){
        if(this.delete_func != null){
            this.item_list.forEach(value => {
                this.delete_func(value);
            });
        }
        this.free_list.splice(0,  this.free_list.length);
        this.item_list.splice(0,  this.item_list.length);
    }
}