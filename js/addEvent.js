/**
 * Created by lenovo on 2016/9/1.
 */
define(function(require,exports,module){
    exports.addEvent=function(obj,sEv,fn) {
        if (obj.addEventListener) {
            obj.addEventListener(sEv,fn,false);
        } else {
            obj.attachEvent('on'+sEv,fn);
        }
    }
});

