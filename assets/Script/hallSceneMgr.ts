import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hallSceneMgr')
export class hallSceneMgr extends Component {
    @property(Label)
    public userName: Label = null;

    @property(Label)
    public userID: Label = null;




    start() {
        this._init();

    }

    update(deltaTime: number) {
        
    }

    public _init() {
        this.userName.string = globalThis._userInfo.userName;
        this.userID.string = 'Id : ' + globalThis._userInfo.userId.toString();
    }
}


