System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _class2, _crd, ccclass, property, userInfo;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4525eXuCyVEeZWo6Ysaw5Co", "userInfo", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("userInfo", userInfo = (_dec = ccclass('userInfo'), _dec(_class = (_class2 = class userInfo extends Component {
        constructor() {
          super(...arguments);
          this.userId = void 0;
          this.userName = void 0;
          this.userHeadUrl = void 0;
          this.userRoomCards = void 0;
          this.roomId = void 0;
        }

        static getInstance() {
          if (userInfo.instance == null) {
            userInfo.instance = new userInfo();
            return userInfo.instance;
          } else {
            return userInfo.instance;
          }
        }

        start() {
          globalThis._userInfo = userInfo.getInstance();
        }

        update(deltaTime) {}

      }, _class2.instance = void 0, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6c85f36f6c3e215b919473c5dca05f1fc320a5b7.js.map