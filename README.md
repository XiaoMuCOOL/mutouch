# mutouch

MuTouch,简化触摸和鼠标事件,基于JQuery,实现手势操作。

**作者** ： 小牧COOL

**QQ号** ： 895355044

**QQ群** ： 206683621

##Getting Started
###下载
- [JQuery](http://jquery.com/download/)
- [mutouch](https://github.com/XiaoMuCOOL/mutouch)

###支持浏览器：
1. 所以现代浏览器(如chrome,firefox)
2. Android 2.3 +
3. IOS 7.0 +
4. IE9 +

##Usage
###How to Use?
mutouch.js基于JQuery,在其之前引用JQuery,HTML代码如:
``html
<script src="js/jquery.js" type="text/javascript"></script>
<!-- 开发版本 -->
<script src="js/jquery.mutouch.js" type="text/javascript"></script>
<!-- 线上版本 -->
<script src="js/jquery.mutouch.min.js" type="text/javascript"></script>
``

你必须为你的HTML标签元素设置一个`id`或`class`,如:
``html
<div id="box"></div>
``
然后js代码如下:
``js
$("#box").mutouch({
  offsetY : 50, //上下滑动超过50px才触发事件
  toTop : function(){
    //上滑事件
    //do something ...
  }
});
``
That's it!就是如此简单O(∩_∩)O~

##Options
###Arguments
mutouch只有三个参数:
key | default | description
----|---------|------------
`banRight` | false | 是否禁用右键,手机端禁用长按选中 
`offsetX` | 0 | 左右滑动偏移量,超过这个数字才会触发事件
`offsetY` | 0 | 上下滑动偏移量

###Events
mutouch有九个事件:
event | arguments | notes
------|-----------|------------
`onSwipeTop` | `"typeLR"` | 上滑事件(从下往上滑动)
`onSwipeDown` | `"typeLR"` | 下滑事件(从上往下滑动)
`onSwipeLeft` | `"typeTD"` | 左滑事件(从右往左滑动)
`onSwipeRight` | `"typeTD"` | 右滑事件(从左往右滑动)
`onTap` | `tapNum` | 轻触事件(能获取到轻触次数)
`onLongTap` | `longTapTime` | 长按事件
`onStart` | `event` | 滑动开始事件
`onMove` | `event` | 滑动事件
`onEnd` | `event` | 滑动结束事件

##版本功能
- [X] v0.1 增加触屏手势(上下左右滑动,单次触摸,连续两次触摸,N次触摸,长按,禁止右键菜单)
- [X] v0.2 增加鼠标支持
- [X] v0.3 性能优化
- [X] v0.4 封装原始方法提供接口
- [N] v0.5 增加上拉加载,下拉刷新(逻辑有问题,此插件不适合此功能,暂时放弃)
- [ ] v0.6 增加文档说明
- [ ] v1.0 正式版(单点触摸版)
- [ ] v1.1 增加触摸手势(字母C,J,L,M,N,O,S,U,V,W,Z和√,X)
- [ ] v2.0 分支版(增加多点操作手势)