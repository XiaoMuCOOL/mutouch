# mutouch

MuTouch,简化触摸和鼠标事件,基于JQuery,实现手势操作。

**作者** ： 小牧COOL

**QQ号** ： 895355044

**QQ群** ： [215259343][1]

**感谢** ： 如果您觉得此插件好用,请点击右上角 `star` 支持我,谢谢~

## Getting Started

### 下载
- [JQuery](http://jquery.com/download/)
- [mutouch](https://github.com/XiaoMuCOOL/mutouch)

### 支持浏览器：
1. 所有现代浏览器(如chrome,firefox等)
2. Android 2.3 +
3. IOS 7.0 +
4. IE9 + 

## Usage

### How to Use?

**mutouch.js**基于JQuery,所以在其之前引用JQuery,HTML代码如下:

```html
<script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
<!-- 开发版本 -->
<script src="js/jquery.mutouch.js" type="text/javascript"></script>
<!-- 线上版本 -->
<script src="dist/jquery.mutouch.min.js" type="text/javascript"></script>
```

你必须为你的HTML标签元素设置一个`id`或`class`,如:

```html
<div id="box"></div>
```

最后,调用js代码如下:

```js
$("#box").mutouch({
  offsetY : 50, //上下滑动超过50px才触发事件
  onSwipeTop : function(){
    //上滑事件
    //do something ...
  }
});
```

**That's it！就是如此简单O(∩_∩)O~**

## Options

### Arguments

**mutouch.js** 只有三个参数:

key | default | description
----|---------|------------
`banRight` | false | 是否禁用右键,手机端是否禁用长按选中 
`offsetX` | 0 | 左右滑动偏移量,超过这个数字才会触发事件
`offsetY` | 0 | 上下滑动偏移量

### Events

**mutouch.js** 有九个事件:

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

### Tips

#### 1.如何判断往右下滑动？

`onSwipeRight` 方法提供了一个参数 `typeTD` ,可以判断往右滑动时是往上还是往下,代码如下: 

```js
$("#box").mutouch({
  onSwipeRight : function(typeTD){
    //右滑事件
    //do something ...

    if(typeTD == "top"){
      //右上滑动
      //do something ...
    }

    if(typeTD == "down"){
      //右下滑动
      //do something ...
    }
  }
});
```

**注意:** 左上左下等其他同理,`typeLR`只可能为`"left"`,`"right"`,`"none"`.

#### 2.如何判断 双击及更多轻触事件？

`onTap` 方法提供了一个参数 `tapNum` ,可以获取到轻触次数,代码如下: 

```js
$("#box").mutouch({
  onTap : function(tapNum){
    if(tapNum == 1){
      //单次轻触事件
      //do something ...
    }
    if(tapNum == 2){
      //双击事件
      //do something ...
    }
    if(tapNum == 50){
      //50次轻触事件
      //do something ...
    }
  }
});
```

#### 3.如何设置 长按事件触发时间？

`onLongTap` 方法默认是750毫秒触发,但该方法提供了一个参数 `longTapTime` ,长按50毫秒为1 `longTapTime`,so,可以如此设置: 

```js
$("#box").mutouch({
  onLongTap : function(longTapTime){
    if((longTapTime*50) > 3000){
      //长按3秒以上事件
      //do something ...
    }
  }
});
```

#### 4.`onStart`如何判断是触摸还是鼠标事件？

`onStart` 方法提供了一个原生参数 `event` ,可以如此判断: 

```js
$("#box").mutouch({
  onStart : function(event){
    var touchEvent = "ontouchend" in document?event.originalEvent.touches[0]: event;
    //使用 touchEvent.pageX 获取x坐标
  }
});
```

## 版本日志

- [X] v0.1 增加触屏手势(上下左右滑动,单次触摸,连续两次触摸,N次触摸,长按,禁止右键菜单)
- [X] v0.2 增加鼠标支持
- [X] v0.3 性能优化
- [X] v0.4 封装原始方法提供接口
- [ ] v0.5 ~~增加上拉加载,下拉刷新(逻辑有问题,此插件不适合此功能,暂时放弃)~~
- [X] v0.6 增加文档说明
- [X] v1.0 正式版(单点触摸版)
- [ ] v1.1 ~~增加触摸手势(字母C,J,L,M,N,O,S,U,V,W,Z和√,X)~~
- [ ] v2.0 ~~分支版(增加多点操作手势)~~

## License

**mutouch.js** is licensed under the GNU GENERAL PUBLIC LICENSE, Version 3. 

[View the license file](https://github.com/XiaoMuCOOL/mutouch/blob/master/LICENSE)

Copyright © 2018 · 滨清科技 , Inc. 

All Rights Reserved · Powered by : **小牧COOL**

[1]:https://jq.qq.com/?_wv=1027&k=5tyQDAd
