(function($){
  // window.Mutouch = {
  //   vision : "0.2",
  //   _setInit : function(touchEvent){
  //     init.sx = touchEvent.pageX;
  //     init.sy = touchEvent.pageY;
  //     init.ex = init.sx;
  //     init.ey = init.sy;
  //     init.typeLR = "none";
  //     init.typeTD = "none";
  //     init.longTag = 0;
  //   },
  //   _start : function(touchEvent){
  //     this._setInit(touchEvent);
  //     longTagTime = setInterval(function(){
  //       console.log(init.longTag);
  //       ++init.longTag;
  //     },50);
  //   },
  //   _move : function(touchEvent){
  //     init.ex = touchEvent.pageX;
  //     init.ey = touchEvent.pageY;
  //     var changeX = (init.ex-init.sx);
  //     var changeY = (init.sy-init.ey);
  //     console.log(changeX)
  //     if(changeX < (opts.offsetX*-1)){
  //       init.typeLR = "left";
  //     }
  //     if (changeX > opts.offsetX){
  //       init.typeLR = "right";
  //     };
  //     if (changeY < (opts.offsetY*-1)){
  //       init.typeTD = "down";
  //     };
  //     if (changeY > opts.offsetY){
  //       init.typeTD = "top";
  //     };
  //     init.tagNum = -1;
  //     init.longTag = 0;
  //   },
  //   _end : function(touchEvent){
  //     if(init.typeLR == "left"){
  //       opts.toLeft(init);
  //     }
  //     if(init.typeLR == "right"){
  //       opts.toRight(init);
  //     }
  //     if(init.typeTD == "top"){
  //       opts.toTop(init);
  //     }
  //     if(init.typeTD == "down"){
  //       opts.toDown(init);
  //     }
  //     clearInterval(longTagTime);
  //     if(init.longTag > (750/50)){
  //       opts.onLongTag(init);
  //     }else{
  //       if(init.tagNum != -1){
  //         clearTimeout(tagTime);
  //         init.tagNum++;
  //         tagTime = setTimeout(function(){
  //           opts.onTag(init);
  //           init.tagNum = 0;
  //         },750);
  //       }else{
  //         init.tagNum = 0;
  //       }
  //     }
  //   }
  // }
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
    function _init (Event) {
      event.stopPropagation();
      event.preventDefault();
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
      init.longTag = 0;
    }
    function _start (touchEvent) {
      _setInit(touchEvent);
      longTagTime = setInterval(function(){
        ++init.longTag;
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
      init.tagNum = -1;
      init.longTag = 0;
    }
    function _end (touchEvent){
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
      if(init.longTag > (750/50)){
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
    }
    $this.on("touchstart mousedown",function(event){
      _start(_init(event));

      $this.on("touchmove mousemove",function(event){
        _move(_init(event));
      });
    });
    $this.on("touchend mouseup",function(event){
      $this.off("touchmove mousemove");
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