/**
 * Created by lenovo on 2016/9/1.
 */

define(function(require,exports,module){
    exports.findInArr=function (arr,item){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==item){
                return true;
            }
        }
        return false;
    }
});

