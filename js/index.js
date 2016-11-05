/**
 * Created by lenovo on 2016/8/30.
 */



function getId(id){
    return document.getElementById(id);
}
function getByClass(obj,sClass){
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(sClass);
    } else{
        var arr=[];
        var aEle=obj.getElementsByTagName('*');
        for(var i=0;i<aEle.length;i++){
            var aClass=aEle[i].className.split(' ');
            if(findInArr(aClass,sClass)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
function getStyle(obj,name) {
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function findInArr(arr,item){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==item){
            return true;
        }
    }
    return false;
}
function move(obj, json, options) {
    options = options || {};
    options.duration = options.duration || 500;
    options.easing = options.easing || 'ease-out';

    clearInterval(obj.timer);
    var count = Math.floor(options.duration/30);
    var start = {};
    var dis = {};
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj,name));
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

//滚轮事件
function addEvent(obj,sEv,fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sEv,fn,false);
    } else {
        obj.attachEvent('on'+sEv,fn);
    }
}

function addWheel(obj,fn) {
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
        addEvent(obj,'mousewheel',wheel);
    }
}






window.onload=function(){

    var aUl=getId('playerIndexFocus').getElementsByTagName('ul');
    var aLi=aUl[0].children;
    var aBtn=aUl[1].children;
    var oPointer=getByClass(getId('scroll_content'),'fi_pointer')[0];

    play();
    function play(){
        var aPlayer=getByClass(getId('scroll_content'),'playerMaskVideo_js');
        //播放视频的图标
        for(var i=0;i<aPlayer.length;i++){
            movePlay(getPlaySpan(i),getPlayLi(i));
        }
        function getPlayLi(i){
            return aPlayer[i].getElementsByTagName('li');
        }
        function getPlaySpan(i){
            return getByClass(aPlayer[i],'maskVideo');
        }
    }



    if(getId('videoGallery')){
        video();
    }

    function video(){
            var aVideo=getByClass(getId('videoGallery'),'movie_moreMsgCon');
            //划过选项卡
            for(var i=0;i<aVideo.length;i++){

                moveTab(getMoRank(i),getMoRankAc(i));
            }
            function getMoRank(i){
                return getByClass(aVideo[i],'movie_rankone');
            }
            function getMoRankAc(i){
                return getByClass(aVideo[i],'movie_rankActive');
            }


    }


    movie();
    function movie(){
        var aMoive=getByClass(getId('side'),'movie_moreMsg');
        //点击选项卡
        for(var i=0;i<aMoive.length;i++){
            tab(getMovieLi(i),getMovieUl(i));
        }
        function getMovieLi(i){
            return aMoive[i].getElementsByTagName('ul')[0].getElementsByTagName('li');
        }
        function getMovieUl(i){
            return getByClass(aMoive[i].getElementsByTagName('div')[1],'movie_moreMsgCon');
        }

    }

    scoll();
    function scoll(){
        var oRollBar=getId('rollBox').getElementsByTagName('div')[0];
        //alert(oRollBar.className);
        var oSideConent=getId('rollBox').parentNode.children[1];

        var oConent=getByClass(getId('side'),'movieBox')[0];

        var oRollBar1=getId('rollBox2').getElementsByTagName('div')[0];

        var oConent1=getId('playerBox').children[1].children[1];
        //
        var oMaincontent=getId('scroll_content');

        oRollBar1.onmousedown=function(ev){
            var oEvent=ev||event;
            var disY=oEvent.clientY-oRollBar1.offsetTop;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                var t=oEvent.clientY-disY;
                setTop1(t);

            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                oRollBar1.releaseCapture&&oRollBar1.releaseCapture();
            };
            oRollBar1.setCapture&&oRollBar1.setCapture();
            return false;
        };

        function setTop1(t){
            if(t<0){
                t=0;
            }
            if(t>getId('rollBox2').offsetHeight-oRollBar1.offsetHeight){
                t=getId('rollBox2').offsetHeight-oRollBar1.offsetHeight;
            }
            oRollBar1.style.top=t+'px';
            var scale=t/(getId('rollBox2').offsetHeight-oRollBar1.offsetHeight);

            oMaincontent.style.top = -scale*(oMaincontent.scrollHeight-oConent1.offsetHeight) + 'px';

            console.log(oMaincontent.scrollHeight-oConent1.offsetHeight);
        }
        addWheel(oConent1,function(bDown){
            var top = oRollBar1.offsetTop;
            if (bDown) {
                top += 10;
            } else {
                top -= 10;
            }
            setTop1(top);
        });


        oRollBar.onmousedown=function(ev){
            var oEvent=ev||event;
            var disY=oEvent.clientY-oRollBar.offsetTop;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                var t=oEvent.clientY-disY;
                setTop(t);

            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                oRollBar.releaseCapture&&oRollBar.releaseCapture();
            };
            oRollBar.setCapture&&oRollBar.setCapture();
            return false;
        };

        function setTop(t){
            if(t<0){
                t=0;
            }
            if(t>getId('rollBox').offsetHeight-oRollBar.offsetHeight){
                t=getId('rollBox').offsetHeight-oRollBar.offsetHeight;
            }
            oRollBar.style.top=t+'px';
            var scale=t/(getId('rollBox').offsetHeight-oRollBar.offsetHeight);
            oSideConent.style.top = -scale*(oSideConent.scrollHeight-oConent.offsetHeight) + 'px';

        }
        addWheel(oConent,function(bDown){
            var top = oRollBar.offsetTop;
            if (bDown) {
                top += 10;
            } else {
                top -= 10;
            }
            setTop(top);
        });
    }

    //焦点图
    for(var i=0;i<aBtn.length;i++){
        (function(index){
            aBtn[i].onmouseover=function(){
                for(var i=0;i<aBtn.length;i++){
                    move(aLi[i],{opacity:0});
                    aLi[i].style.display='block';
                    oPointer.style.left=0;
                }
                move(aLi[index],{opacity:1});
                oPointer.style.left=76*(index)+'px';
            }
        })(i);
    }


    function movePlay(obj,obj1){
        for(var i=0;i<obj.length;i++){
            (function(index){
                obj1[i].onmouseover=function(){
                    for(var i=0;i<obj.length;i++) {
                        obj[i].style.display = 'none';
                    }
                    obj[index].style.display = 'block';
                }
                obj1[i].onmouseout=function(){
                    for(var i=0;i<obj.length;i++) {
                        obj[i].style.display = 'none';
                    }
                }
            })(i);
        }
    }
    function moveTab(obj,obj1){
          for(var i=0;i<obj.length;i++){
              (function(index){
                  obj[i].onmouseover=function(){
                      for(var i=0;i<obj.length;i++){
                          obj[i].style.display='block';
                          obj1[i].style.display='none';
                      }
                      this.style.display='none';
                      obj1[index].style.display='block';
                  }
              })(i);
          }
      }
    function tab(obj,obj1){
        for(var i=0;i<obj.length;i++){
            (function(index){
                obj[i].onclick=function(){
                    for(var i=0;i<obj.length;i++){
                        obj[i].className='';
                        obj1[i].style.display='none';
                    }
                    this.className='active';
                    obj1[index].style.display='block';
                };
            })(i);
        }
    }


};





















