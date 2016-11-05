/**
 * Created by lenovo on 2016/9/1.
 */

define(function(require,exports,module){
    exports.getStyle=function(obj,name) {
        return (obj.currentStyle || getComputedStyle(obj,false))[name];
    }
});
