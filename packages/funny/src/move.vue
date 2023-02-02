<script setup>
const box = ref(null)
const text = ref(null)
var factor = 0.4 //当鼠标移动至显示区域边界时，阴影距离占hero元素宽和高的比例
const shadowMove = (e) => {
  var range = {
    x:box.value.offsetWidth,
    y:box.value.offsetHeight
  }
  var pos = {
    x:e.target.offsetLeft+e.offsetX,
    y:e.target.offsetTop+e.offsetY
  }
  //计算阴影移动距离
  var disX = parseInt((pos.x-range.x/2)*factor);
  var disY = parseInt((pos.y-range.y/2)*factor);
  //修改阴影样式
  text.value.style.textShadow = disX+'px '+disY+'px 0 #3498db,'+(-disX)+'px '+disY+'px 0 #1abc9c,'+disY+'px '+(-disX)+'px 0 #9b59b6,'+(-disY)+'px '+(-disX)+'px 0 #e74c3c';
}
onMounted(() => {
  box.value.addEventListener('mousemove',shadowMove)
})
</script>

<template>
  鼠标跟随
  <div ref="box" class="move flex justify-center items-center">
    <h1 ref="text">WOW!</h1>
  </div>
</template>

<style lang="scss" scoped>
.move {
  height: 200px;
  h1 {
    font-weight: 700;
    font-size: 40px;
    text-shadow: 10px 10px 0 rgba(0,0,0,1);
  }
}
</style>