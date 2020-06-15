/*! mutouch 2015-08-23 17:10:37 
 * 作者：小牧COOL 
 * 版本：1.0.2 
 * QQ群：206683621 
 * 官网：https://github.com/XiaoMuCOOL/mutouch 
 */
(function($){
  $.fn.mutouch = function(options){
    var defaults = {
      $this: null,
      offsetX : 0,
      offsetY : 0,
      banRight : false,
      onSwipeTop : function(typeLR){
        //console.log("top");
      },
      onSwipeDown : function(typeLR){
        //console.log("down");
      },
      onSwipeLeft : function(typeTD){
        //console.log("left");
      },
      onSwipeRight : function(typeTD){
        //console.log("right");
      },
      onTap : function(tapNum){
        //console.log(init.longTap + "tap"+init.tapNum);
      },
      onLongTap : function(longTap){
        //console.log("longTap" + init.longTap);
      },
      onStart : function(event){
        //console.log("onStart");
        //console.log(event);
      },
      onMove : function(event){
        //console.log("onMove" + event);
      },
      onEnd : function(event){
        //console.log("onEnd");
        //console.log(event);
      }
    };
    var $this = $(this);
    var opts = $.extend(defaults, options);
    var init = {sx:0,sy:0,ex:0,ey:0,cx:0,cy:0,typeLR:"none",typeTD:"none",tapNum:0,longTap:1};
    var tapTime = null;
    var longTapTime = null;
    function _init (Event) {
      Event.stopPropagation();
      Event.preventDefault();
      var touchEvent = "ontouchend" in document?Event.originalEvent.touches[0]: Event;
      return touchEvent;
    }
    function _setInit (touchEvent) {
      init.sx = touchEvent.pageX;
      init.sy = touchEvent.pageY;
      init.ex = init.sx;
      init.ey = init.sy;
      init.typeLR = "none";
      init.typeTD = "none";
      init.longTap = 0;
    }
    function _start (touchEvent) {
      _setInit(touchEvent);
      longTapTime = setInterval(function(){
        ++init.longTap;
      },50);
    }
    function _move (touchEvent){
      init.ex = touchEvent.pageX;
      init.ey = touchEvent.pageY;
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
      init.tapNum = -1;
      init.longTap = 0;
    }
    function _end (touchEvent){
      if(init.typeLR == "left"){
        opts.onSwipeLeft(init.typeTD);
      }
      if(init.typeLR == "right"){
        opts.onSwipeRight(init.typeTD);
      }
      if(init.typeTD == "top"){
        opts.onSwipeTop(init.typeLR);
      }
      if(init.typeTD == "down"){
        opts.onSwipeDown(init.typeLR);
      }
      clearInterval(longTapTime);
      if(init.longTap > (750/50)){
        opts.onLongTap(init.longTap);
      }else{
        if(init.tapNum != -1){
          clearTimeout(tapTime);
          init.tapNum++;
          tapTime = setTimeout(function(){
            opts.onTap(init.tapNum);
            init.tapNum = 0;
          },750);
        }else{
          init.tapNum = 0;
        }
      }
    }
    $this.on("touchstart mousedown",function(event){
      _start(_init(event));
      opts.onStart(event);

      $this.on("touchmove mousemove",function(event){
        _move(_init(event));
        opts.onMove(event);
      });
    });
    $this.on("touchend mouseup",function(event){
      $this.off("touchmove mousemove");
      opts.$this = $(this);
      opts.onEnd(event);
      _end(_init(event));
    });
    
    if(opts.banRight){
      function Click(){ 
        window.event.returnValue=false; 
      } 
      document.oncontextmenu=Click;
    }
  }
  
})(jQuery);