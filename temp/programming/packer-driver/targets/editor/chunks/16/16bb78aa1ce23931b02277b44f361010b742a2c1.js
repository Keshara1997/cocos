System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Collider2D, Contact2DType, GameManager, _dec, _class, _crd, ccclass, property, HazardController;

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../managers/GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "68d12qKdQ1DdIShmHV4gCpR", "HazardController", undefined); // File: assets/scripts/controllers/HazardController.ts


      __checkObsolete__(['_decorator', 'Component', 'Collider2D', 'Contact2DType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HazardController", HazardController = (_dec = ccclass('HazardController'), _dec(_class = class HazardController extends Component {
        start() {
          const collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          } else {
            console.warn("HazardController: no Collider2D found on hazard node");
          }
        }

        onBeginContact(selfCollider, otherCollider) {
          // Check if player touched the hazard
          if (otherCollider.node.name === "Player") {
            var _instance;

            console.log("Player touched hazard - Game Over!"); // Trigger game over through GameManager

            (_instance = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).instance) == null || _instance.gameOver();
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=16bb78aa1ce23931b02277b44f361010b742a2c1.js.map