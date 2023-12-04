<script setup >

</script>
<template>
  <div class="basic bottom top filter">
    box-shadow
  </div>
</template>
<style scoped lang="scss">

/***
** 单侧投影 ==》 扩张半径 等于 负的模糊半径 + 单个偏移量
** 相邻两边的阴影 ==》 扩张半径大于或等于模糊半径的一半 + 两个偏移量
** 对边的阴影 ==》 两个单侧投影
** 不规则阴影 ==》 
filter 里的drop-shadow也可以实现阴影效果  没有扩张半径和inset 浏览器不支持可以优雅的回退 更高的兼容性可以使用svg
filter: url(drop-shadow.svg#drop-shadow);
filter: drop-shadow(2px 2px 10px rgba(0,0,0,.5)); 缺点：任何非透明的元素都会加上阴影 比如 text-shadow
*/

/** 扩展filter 染色效果
**  filter: sepia(1) saturate(4) hue-rotate(295deg); 滤镜可以混合使用
**  brightness(2) 偏白
**  contrast(200%) 颜色加深
** 
*/
.basic {
  width: 200px;
  height: 50px;
  margin-left: 20px;
  /* offset-x | offset-y | blur-radius | spread-radius扩张半径 | color */
  box-shadow: 6px 6px 4px -4px rgba(0, 0, 0, 0.2);
  // box-shadow: 0 0 0 2em #f4aab9, 0 0 0 4em #66ccff; 纯色效果 配合padding margin
  border: 1px solid #ddd;
}
.bottom {
  // 如果扩张半径是blur的负数 只会有单侧投影
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.2);
}
.top {
  box-shadow: 0 -6px 4px -4px rgba(0, 0, 0, 0.2);
}
.filter {
  filter: drop-shadow(.05em .05em .1em gray);
}

</style>
