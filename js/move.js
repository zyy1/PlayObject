/**
 * Created by lenovo on 2016/9/1.
 */

define(function(require,exports,module){
    var getS=require('getStyle');
    exports.move=function(obj, json, options) {
        options = options || {};
        options.duration = options.duration || 500;
        options.easing = options.easing || 'ease-out';

        clearInterval(obj.timer);
        var count = Math.floor(options.duration/30);
        var start = {};
        var dis = {};
        for (var name in json) {
            start[name] = parseFloat(getS.getStyle(obj,name));
            dis[name] = json[name] - start[name];
        }
        var n = 0;
        obj.timer = setInterval(function(){
            n++;
            for (var name in json) {
                switch(options.easing) {
                    case 'linear':
                        var a = n/count;
                        var cur = start[name] + dis[name] * a;
                        break;
                    case 'ease-in':
                        var a = n/count;
                        var cur = start[name] + dis[name] *a*a*a;
                        break;
                    case 'ease-out':
                        var a = 1 - n/count;
                        var cur = start[name] + dis[name] * (1-a*a*a);
                        break;
                }
                if (name == 'opacity') {
                    obj.style.opacity = cur;
                    obj.style.filter = 'alpha(opacity:'+cur*100+')';
                } else {
                    obj.style[name] = cur + 'px';
                }
            }
            if (n == count) {
                clearInterval(obj.timer);
                options.complete && options.complete();
            }
        },30);
    }

});

