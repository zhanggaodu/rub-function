<script setup>
function animate({timing, draw, duration}) {
  let start = performance.now()
  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    // 计算当前动画状态
    let progress = timing(timeFraction);
    draw(progress); // 绘制
    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}
</script>

<template>

  <div class="animation">
    <div ref="animationBox" class="animation-box" :class="'animation-'+animationCate">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </div>
  <div @click="toq()">起速</div>
  <div @click="tol()">匀速</div>
  <div @click="tos()">慢速</div>
</template>

<style lang="scss" scoped>
.animation {
  width: 300px;
  overflow: hidden;
  border: 1px solid #000;
  padding: 10px 0;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    background-color: blueviolet;
  }
}
.animation-box {
  width: 600px;
  height: 20px;
  display: flex;
  div {
    flex: 0 0 90px;
    margin: 0 5px;
    height: 20px;
    background-color: indianred;
  }

}
@keyframes steps {
  100% {
    transform: translateX(-300px);
  }
} 
.animation-0 {
  animation: steps .5s steps(10) infinite;
  // name duration animation--timing-function delay animation-iteration-count(n/infinite) animation-direction fill-mode play-state
}
.animation-1 {
  animation: steps 1s steps(10) infinite;
}
.animation-2 {
  animation: steps 3s steps(10) infinite;
}
</style>