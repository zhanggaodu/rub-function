<script>

</script>

<template>
  <h5>不使用js也能做到的事情</h5>
  <div class="cut-conner">
    切角
  </div>
  <div class="cut-conner-inset">
    内切角
  </div>
  <div class="t">
    梯形
  </div>
  <!-- TODO  -->
  <div class="contain">
    语言框---两种状态
    <div class="toast">
        宽度要随文字的宽度而变化
    </div>
  </div>
  打字效果
  <div class="typing">
    CSS is awesome!
  </div>
  恢复状态的动画
  <div class="paused">
  </div>
  沿环形路径平移的动画----


</template>

<style lang="scss" scoped>
// css揭秘
// 折角
// text-shadow 实现文字凸版 空心字 文字发光 缺点 不能平稳退化，如果不支持该属性，文字就会不显示 filter blur（会把文字糊掉）
// svg诞生之初开发小组认为不会有人手动编写svg文件 ? 在哪里生成svg文件？
// cursor css3添加了新的鼠标光标
// 通过border扩大可点击的区域 border: 10px solid transparent;
// box-shadow: 0 0 0 1px rgba(0,0,0,.3) inset;
// 把背景限制在padding background-clip: padding-box;
// 表单样式 
// ：backdrop
// 遮罩层后的背景虚化 filter blur 同时缩小背景 扩大弹窗 这样的效果不太实用
// 滚动效果 如果还有元素底部会有阴影
//p195
// 未来仅需一行代码就可以实现垂直居中 align-self: center; ？父元素是flex或grid？
// 如果有需要固定的页脚
footer {
  body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  }
  main { flex: 1; }
}
// 动画 缓动 闪烁  逐帧动画 
a {
  cursor: url(transparent.gif);
}
a {
  background: #58a;
  color: white;
  text-shadow: 0 1px hsl(0,0%,85%),
    0 2px hsl(0,0%,80%),
    0 3px hsl(0,0%,75%),
    0 4px hsl(0,0%,70%),
    0 5px hsl(0,0%,65%);
}
@mixin text-3d($color: white, $depth: 5) {
  $shadows: ();
  $shadow-color: $color;
 @for $i from 1 through $depth {
  $shadow-color: darken($shadow-color, 10%);
  $shadows: append($shadows,
  0 ($i * 1px) $shadow-color, comma);
 }
 color: $color;
 text-shadow: append($shadows,
 0 ($depth * 1px) 10px black, comma);
}
h1 { @include text-3d(#eee, 4); }
a {
  background: deeppink;
  color: white;
  text-shadow: 1px 1px black, -1px -1px black,
 1px -1px black, -1px 1px black;
}
a {
 background: #203;
 color: white;
 transition: 1s;
}
a:hover {
 text-shadow: 0 0 .1em, 0 0 .3em; 
}
  .t {
    margin: 0 30px;
    padding: .5em 1em .35em;
    background-color: #58a;
    transform: scaleY(1.3) perspective(.5em) rotateX(5deg);
    transform-origin: bottom;
  }

// DRY DON'T REPEAT YOUR CSS
// background-clip: padding-box; 避免背景蔓延到padding
// 可以实现传参  mixin include
.cut-conner {
  background: #58a;
  background:
  linear-gradient(135deg, transparent 15px, #58a 0)
  top left,
  linear-gradient(-135deg, transparent 15px, #58a 0)
  top right,
  linear-gradient(-45deg, transparent 15px, #58a 0)
  bottom right,
  linear-gradient(45deg, transparent 15px, #58a 0)
  bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;

  // border-image 也可以做到切角  设置border的颜色是避免浏览器不支持border-image
  // border: 20px solid #58a;
  // border-image: 1 url('data:image/svg+xml,\
  // <svg xmlns="http://www.w3.org/2000/svg"\
  // width="3" height="3" fill="%2358a">\
  // <polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/>\
  // </svg>');
  // background: #58a;
  // background-clip: padding-box;

  // width: 200px;
  // height: 100px;
  // background: #58a;
  // clip-path: polygon(
  // 20px 0, calc(100% - 20px) 0, 100% 20px,
  // 100% calc(100% - 20px), calc(100% - 20px) 100%,
  // 20px 100%, 0 calc(100% - 20px), 0 20px
  // );
}

.cut-conner-inset {
  height: 20px;
  background: #58a;
  background:
  radial-gradient(circle at top left,
  transparent 15px, #58a 0) top left,
  radial-gradient(circle at top right,
  transparent 15px, #58a 0) top right,
  radial-gradient(circle at bottom right,
  transparent 15px, #58a 0) bottom right,
  radial-gradient(circle at bottom left,
  transparent 15px, #58a 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
}
.contain {
  background-color: #EC984B;
  padding: 20px;
}
.toast::before { 
  content: '';
  position: absolute;
  left: calc(100% / 4.5);
  bottom: -24px;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  border-top: 12px solid rgba(241, 228, 207, 0.7);
  // background-clip: padding-box, border-box;
  // background-origin: padding-box, border-box;
  background-image: linear-gradient(to right,rgba(241, 228, 207, 0.7), rgba(235, 224, 198, 0.7)),
    linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
}
.toast {
  position: relative;
  width: fit-content;
  max-width: 100%;
  padding: 0 10px;
  color: #F54A00;
  border-radius: 8px;
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right,rgba(241, 228, 207, 0.7), rgba(235, 224, 198, 0.7)),
    linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
  // filter: drop-shadow(0px 2px 1px rgba(255, 255, 255, 0.25)
  box-shadow: 4px 4px 12px -2px rgba(255, 255, 255, 0.25), -4px -4px 12px -2px rgba(255, 255, 255, 0.25);
}
@keyframes typing {
 from { width: 0 }
}
@keyframes caret {
 50% { border-color: transparent; }
}
.typing {
  width: 15ch; // “0”字形的宽度
  animation: typing 6s steps(15),
 caret 1s steps(1) infinite;
 border-right: .05em solid transparent; // 浏览器回退
  overflow: hidden;
  white-space: nowrap;
  // animation-play-state: paused; 保存动画暂停的位置 并在focus hover时running
}
@keyframes panoramic {
 to { background-position: 100% 0; }
}
.paused {
  width: 50px;
  height: 80px;
  background-image: url(./images/banner.png);
  background-size: auto 100%;
  animation: panoramic 10s linear infinite alternate;
  animation-play-state: paused;
}
.paused:hover, .paused:focus {
 animation-play-state: running;
}
</style>