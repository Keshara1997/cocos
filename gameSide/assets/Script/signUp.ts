import { _decorator, Component, director, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;
import { WebSocketManager } from './webSocket/WebSocketManager';


@ccclass('signUp')
export class signUp extends Component {



    @property(Node)
    public signUp_UserName_EditBox: Node;
    @property(Node)
    public signUp_Password_EditBox: Node;
    @property(Node)
    public signUp_Name_EditBox: Node;


    private _webSocketManager: WebSocketManager = null;

    start() {

        console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");


        this._webSocketManager = WebSocketManager.getInstance();
        this._webSocketManager.connectToServer();

        this._webSocketManager.eventTarget.on("signUpResponse", this.onSignUpSuccess, this);
        console.log(`signUp start`);
    }

    update(deltaTime: number) {

    }


    public onClickBackToLogin() {
        console.log("onClickBackToLogin");

        director.loadScene("LoginScene");
    }


    public onClickSignUp() {
        console.log("onClickSignUp");

        let userName = this.signUp_UserName_EditBox.getComponent(EditBox).string;
        let password = this.signUp_Password_EditBox.getComponent(EditBox).string;
        let name = this.signUp_Name_EditBox.getComponent(EditBox).string;
        console.log("onClickSignUp", userName, password, name);

        if (this._webSocketManager && this._webSocketManager.isConnected()) {
            this._webSocketManager.sendMessage("signUp", { userName: userName, password: password, name: name });
        } else {
            console.error("WebSocket is not connected. Cannot send signUp message.");
            // Try to reconnect
            this._webSocketManager.connectToServer();
        }

    }


    public onSignUpSuccess(data: any) {
        console.log("onSignUpSuccess+++++++++++++++++++", data);

        console.log('************signUp success************');

        if (data.success) {
            director.loadScene("Level1");

        }



        else {
            console.error("SignUp failed:", data.message || "Unknown error");
        }
    }







}


