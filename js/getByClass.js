/**
 * Created by lenovo on 2016/9/1.
 */
define(function(require,exports,module){
     var Find=require('findInArr');
    exports.getByClass=function (obj,sClass){
        if(obj.getElementsByClassName){
            return obj.getElementsByClassName(sClass);
        } else{
            var arr=[];
            var aEle=obj.getElementsByTagName('*');
            for(var i=0;i<aEle.length;i++){
                var aClass=aEle[i].className.split(' ');
                if(Find.findInArr(aClass,sClass)){
                    arr.push(aEle[i]);
                }
            }
            return arr;
        }
    }

});

