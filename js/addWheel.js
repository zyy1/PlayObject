/**
 * Created by lenovo on 2016/9/1.
 */

define(function(require,exports,module){
    var addE=require('addEvent');
    exports.addWheel=function(obj,fn) {
        function wheel(ev){
            var oEvent = ev || event;
            var bDown = true; // 默认向下滚
            bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;
            // 根据鼠标滚动的方向做事情
            fn && fn(bDown);
            // 阻止默认
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        }

        // 判断浏览器的类型
        if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            obj.addEventListener('DOMMouseScroll',wheel,false);
        } else {
            //obj.onmousewheel = wheel;
            addE.addEvent(obj,'mousewheel',wheel);
        }
    }


});
