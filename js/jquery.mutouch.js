(function($){
  $.fn.mutouch = function(options){
    var defaults = {    
      offsetX : 0,
      offsetY : 0,
      banRight : false,
      toTop : function(init){
        console.log("top");
      },
      toDown : function(init){
        console.log("down");
      },
      toLeft : function(init){
        console.log("left");
      },
      toRight : function(init){
        console.log("right");
      },
      onTag : function(init){
        console.log(init.longTag + "tag"+init.tagNum);
      },
      onLongTag : function(init){
        console.log("longTag" + init.longTag);
      }
    };
    var $this = $(this);
    var opts = $.extend(defaults, options);
    var init = {sx:0,sy:0,ex:0,ey:0,cx:0,cy:0,typeLR:"none",typeTD:"none",tagNum:0,longTag:1};
    var tagTime = null;
    var longTagTime = null;
    var obj = $this[0];
    obj.addEventListener("touchstart",function(e){
      init.sx = event.targetTouches[0].pageX;
      init.sy = event.targetTouches[0].pageY;
      init.ex = init.sx;
      init.ey = init.sy;
      init.typeLR = "none";
      init.typeTD = "none";
      init.longTag = 0;
      longTagTime = setInterval(function(){
        ++init.longTag;
      },1);
      e.stopPropagation();
      e.preventDefault();
    }, false);
    obj.addEventListener("touchmove",function(e) {
      event.preventDefault();
      init.ex = event.targetTouches[0].pageX;
      init.ey = event.targetTouches[0].pageY;
      var changeX = (init.ex-init.sx);
      var changeY = (init.sy-init.ey);
      if(changeX < (opts.offsetX*-1)){
        init.typeLR = "left";
      }
      if (changeX > opts.offsetX){
        init.typeLR = "right";
      };
      if (changeY < (opts.offsetY*-1)){
        init.typeTD = "down";
      };
      if (changeY > opts.offsetY){
        init.typeTD = "top";
      };
      init.tagNum = -1;
      init.longTag = 0;
      e.stopPropagation();
      e.preventDefault();
    }, false);
    obj.addEventListener("touchend",function(e) {
      if(init.typeLR == "left"){
        opts.toLeft(init);
      }
      if(init.typeLR == "right"){
        opts.toRight(init);
      }
      if(init.typeTD == "top"){
        opts.toTop(init);
      }
      if(init.typeTD == "down"){
        opts.toDown(init);
      }
      clearInterval(longTagTime);
      if(init.longTag > 200){
        opts.onLongTag(init);
      }else{
        if(init.tagNum != -1){
          clearTimeout(tagTime);
          init.tagNum++;
          tagTime = setTimeout(function(){
            opts.onTag(init);
            init.tagNum = 0;
          },750);
        }else{
          init.tagNum = 0;
        }
      }
      e.stopPropagation();
      e.preventDefault();
    }, false);
    // document.body.addEventListener('touchmove', function(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // });
    if(opts.banRight){
      function Click(){ 
        window.event.returnValue=false; 
      } 
      document.oncontextmenu=Click;
    }
  }
})(jQuery);