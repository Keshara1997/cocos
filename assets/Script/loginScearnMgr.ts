import { _decorator, Component, director, EditBox, Node } from 'cc';
import { WebSocketManager } from './webSocket/WebSocketManager';
import { userInfo } from './userInfo';
const { ccclass, property } = _decorator;

@ccclass('loginScearnMgr')
export class loginScearnMgr extends Component {

    @property(Node)
    public my_EditBox: Node

    @property(Node)
    public my_EditBox2: Node

    private _webSocketManager: WebSocketManager = null;

    start() {

        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

        // Initialize WebSocketManager and connect to server
        this._webSocketManager = WebSocketManager.getInstance();
        this._webSocketManager.connectToServer();

        // Listen for login response events
        this._webSocketManager.eventTarget.on("loginResponse", this.onLoginSuccess, this);

    }

    update(deltaTime: number) {

    }



    public onClickSignUp() {
        console.log("onClickSignUp55")
        director.loadScene("SignUp");
    }

    public onClickLogin() {
        let userName = this.my_EditBox.getComponent(EditBox).string
        let password = this.my_EditBox2.getComponent(EditBox).string
        console.log("onClickLogin", userName);

        // Use WebSocketManager directly instead of going through loginClient
        if (this._webSocketManager && this._webSocketManager.isConnected()) { 
            this._webSocketManager.sendMessage("login", { userName: userName, password: password });
        } else {
            console.error("WebSocket is not connected. Cannot send login message.");
            // Try to reconnect
            this._webSocketManager.connectToServer();
        }
    }

    public onLoginSuccess(data: any) {
        console.log("onLoginSuccess", data);

        if (data.success && data.user) {
            if (globalThis._userInfo) {
                globalThis._userInfo.userId = data.user.userId;
                globalThis._userInfo.userName = data.user.userName;
                globalThis._userInfo.userHeadUrl = data.user.userHeadUrl;
                globalThis._userInfo.userRoomCards = data.user.userRoomCards;
            }

            director.loadScene("Level1");
        } else {
            console.error("Login999 failed:", data.message || "Unknown error");
            // You might want to show an error message to the user here
        }
    }

    // Cleanup when component is destroyed
    onDestroy() {
        if (this._webSocketManager) {
            this._webSocketManager.eventTarget.off("loginResponse", this.onLoginSuccess, this);
        }
        if (globalThis.eventTarget) {
            globalThis.eventTarget.off("login_success", this.onLoginSuccess, this);
        }
    }
}


