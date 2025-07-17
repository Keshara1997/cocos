import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('userInfo')
export class userInfo extends Component {

    public userId
    public userName
    public userHeadUrl
    public userRoomCards
    public roomId
    static instance: any



    public static getInstance() {
        if (userInfo.instance == null) {
            userInfo.instance = new userInfo();
            return userInfo.instance;
        }
        else {
            return userInfo.instance;
        }


    }



    start() {
        globalThis._userInfo = userInfo.getInstance();
    }

    update(deltaTime: number) {

    }
}


