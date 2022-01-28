System.register("chunks:///_virtual/UiJoystick.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./Box.ts"],(function(t){"use strict";var e,o,n,i,r,a,s,c,h,p,l,d,u,m,f,g;return{setters:[function(t){e=t.inheritsLoose,o=t.defineProperty,n=t.assertThisInitialized},function(t){i=t.cclegacy,r=t._decorator,a=t.v2,s=t.v3,c=t.resources,h=t.Prefab,p=t.instantiate,l=t.Label,d=t.Node,u=t.BoxCollider,m=t.Component,f=t.UITransformComponent},function(t){g=t.Box}],execute:function(){var y;i._RF.push({},"46abfoYqBNMSqMz67HNJWrY","UiJoystick",void 0);var v=r.ccclass,T=(r.property,a(1,0)),V=.2;t("UIJoystick",v("UIJoystick")(y=function(t){function i(){for(var e,i=arguments.length,r=new Array(i),c=0;c<i;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r))||this,o(n(e),"stick",void 0),o(n(e),"player",void 0),o(n(e),"camera",void 0),o(n(e),"tempV2",a()),o(n(e),"tempV3",s()),o(n(e),"updateV3",s()),o(n(e),"isMoving",!1),o(n(e),"angle",0),o(n(e),"collider",void 0),o(n(e),"infoLabel",void 0),o(n(e),"boxPrefab",void 0),o(n(e),"currentTint",[]),o(n(e),"onTouchStart",(function(){return e.isMoving=!0})),o(n(e),"onTouchMove",(function(t){t.getUILocation(e.tempV2),e.tempV3.set(e.tempV2.x,e.tempV2.y,0),e.tempV3=e.node.getComponent(f).convertToNodeSpaceAR(e.tempV3),e.tempV3=e.tempV3.length()>80?e.tempV3.normalize().multiplyScalar(80):e.tempV3,e.tempV2.set(e.tempV3.x,e.tempV3.y),e.angle=e.tempV2.angle(T)*Math.sign(e.tempV2.y),e.stick.setPosition(e.tempV3),e.player.setRotationFromEuler(0,180*e.angle/Math.PI,0)})),o(n(e),"onTouchEnd",(function(){e.stick.setPosition(s(0,0,0)),e.isMoving=!1})),o(n(e),"randomX",(function(){return Math.floor(100*Math.random())-50})),e}e(i,t),i.init=function(t){c.load("prefabs/ui/joystick/joystick",h,(function(e,o){e?console.log("= = => UIJoystick.init Error:",e):t.addChild(p(o))}))};var r=i.prototype;return r.onLoad=function(){var t=this;c.load("prefabs/box",h,(function(e,o){e?console.log("= = => UIJoystick.onLoad Error:",e):t.boxPrefab=o})),this.stick=this.node.getChildByName("stick"),this.player=this.node.parent.parent.getChildByName("haigui"),this.camera=this.node.parent.parent.getChildByName("Main Camera"),this.infoLabel=this.node.parent.getChildByName("info").getComponent(l),this.node.on(d.EventType.TOUCH_START,this.onTouchStart),this.node.on(d.EventType.TOUCH_MOVE,this.onTouchMove),this.node.on(d.EventType.TOUCH_CANCEL,this.onTouchEnd),this.node.on(d.EventType.TOUCH_END,this.onTouchEnd),this.collider=this.player.getComponent(u),this.collider.on("onTriggerEnter",(function(e){var o,n=e.otherCollider,i=n.getComponent(g).tint;t.checkTint(i)&&alert("You found two opposite colors! 🎉"),t.currentTint=i,t.infoLabel.string=""+i,(o=t.infoLabel.color).set.apply(o,i),n.node.destroy();var r=p(t.boxPrefab);r.setPosition(t.randomX(),2,t.randomX()),t.node.parent.parent.addChild(r)}))},r.checkTint=function(t){if(0!==this.currentTint.length){var e=Math.abs(t[0]-this.currentTint[0]),o=Math.abs(t[1]-this.currentTint[1]),n=Math.abs(t[2]-this.currentTint[2]);if(e<40&&o<40&&n<40)return!0}},r.update=function(t){this.isMoving&&(this.player.getWorldPosition(this.updateV3),this.updateV3.x+=Math.cos(this.angle)*V,this.updateV3.z-=Math.sin(this.angle)*V,this.player.setWorldPosition(this.updateV3),this.camera.getWorldPosition(this.updateV3),this.updateV3.x+=Math.cos(this.angle)*V,this.updateV3.z-=Math.sin(this.angle)*V,this.camera.setWorldPosition(this.updateV3))},i}(m))||y);i._RF.pop()}}}));

System.register("chunks:///_virtual/GameController.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./UiJoystick.ts"],(function(t){"use strict";var e,o,n,r,i;return{setters:[function(t){e=t.inheritsLoose},function(t){o=t.cclegacy,n=t._decorator,r=t.Component},function(t){i=t.UIJoystick}],execute:function(){var c;o._RF.push({},"d1d00CdDHBHj5f55RnJelii","GameController",void 0);var s=n.ccclass;n.property,t("GameController",s("GameController")(c=function(t){function o(){return t.apply(this,arguments)||this}return e(o,t),o.prototype.onLoad=function(){i.init(this.node.parent.getChildByName("Canvas"))},o}(r))||c);o._RF.pop()}}}));

System.register("chunks:///_virtual/Box.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var o,r,n,e,i,a,c;return{setters:[function(t){o=t.inheritsLoose,r=t.defineProperty,n=t.assertThisInitialized},function(t){e=t.cclegacy,i=t._decorator,a=t.ParticleSystem,c=t.Component}],execute:function(){var s;e._RF.push({},"f3288ncoRhGoLkTDyRxgcvM","Box",void 0);var l=i.ccclass;t("Box",l("Box")(s=function(t){function e(){for(var o,e=arguments.length,i=new Array(e),a=0;a<e;a++)i[a]=arguments[a];return o=t.call.apply(t,[this].concat(i))||this,r(n(o),"tint",void 0),r(n(o),"particle",void 0),r(n(o),"random0To255",(function(){return Math.floor(255*Math.random())})),o}return o(e,t),e.prototype.onLoad=function(){var t;this.particle=this.node.getChildByName("particle").getComponent(a),this.tint=[this.random0To255(),this.random0To255(),this.random0To255(),255],(t=this.particle.startColor.color).set.apply(t,this.tint)},e}(c))||s);e._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./Box.ts","./UiJoystick.ts","./GameController.ts"],(function(){"use strict";return{setters:[null,null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});