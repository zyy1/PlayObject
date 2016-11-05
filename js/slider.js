/**
 * Created by lenovo on 2016/8/30.
 */
define(function(require,exports,module){
    var M=require('move');
    var getC=require('getByClass');
    var W=require('addWheel');

   exports.slider=function(){

       var aUl=getId('playerIndexFocus').getElementsByTagName('ul');
       var aLi=aUl[0].children;
       var aBtn=aUl[1].children;

       var oPointer=getC.getByClass(getId('scroll_content'),'fi_pointer')[0];

       play();
       function play(){
           var aPlayer=getC.getByClass(getId('scroll_content'),'playerMaskVideo_js');
           //播放视频的图标
           for(var i=0;i<aPlayer.length;i++){
               movePlay(getPlaySpan(i),getPlayLi(i));
           }
           function getPlayLi(i){
               return aPlayer[i].getElementsByTagName('li');
           }
           function getPlaySpan(i){
               return getC.getByClass(aPlayer[i],'maskVideo');
           }
       }



       if(getId('videoGallery')){
           video();
       }

       function video(){
           var aVideo=getC.getByClass(getId('videoGallery'),'movie_moreMsgCon');
           //划过选项卡
           for(var i=0;i<aVideo.length;i++){

               moveTab(getMoRank(i),getMoRankAc(i));
           }
           function getMoRank(i){
               return getC.getByClass(aVideo[i],'movie_rankone');
           }
           function getMoRankAc(i){
               return getC.getByClass(aVideo[i],'movie_rankActive');
           }


       }


       movie();
       function movie(){
           var aMoive=getC.getByClass(getId('side'),'movie_moreMsg');
           //点击选项卡
           for(var i=0;i<aMoive.length;i++){
               tab(getMovieLi(i),getMovieUl(i));
           }
           function getMovieLi(i){
               return aMoive[i].getElementsByTagName('ul')[0].getElementsByTagName('li');
           }
           function getMovieUl(i){
               return getC.getByClass(aMoive[i].getElementsByTagName('div')[1],'movie_moreMsgCon');
           }

       }

       scoll();
       function scoll(){
           var oRollBar=getId('rollBox').getElementsByTagName('div')[0];
           //alert(oRollBar.className);
           var oSideConent=getId('rollBox').parentNode.children[1];

           var oConent=getC.getByClass(getId('side'),'movieBox')[0];

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
           W.addWheel(oConent1,function(bDown){
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
           W.addWheel(oConent,function(bDown){
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
                       M.move(aLi[i],{opacity:0});
                       aLi[i].style.display='block';
                       oPointer.style.left=0;
                   }
                   M.move(aLi[index],{opacity:1});
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

       function getId(id){
           return document.getElementById(id);
       }

   }

});