<script setup lang="ts">
const scale = window.innerWidth / 375
const row_list = [
  {color: 'yellow'},
  {color: 'purple'},
  {color: 'yellow'},
  {color: 'purple'},
  {color: 'yellow'},
  {color: 'purple'},
  {color: 'yellow'}
]
const col_list = [
  {color: 'hollow'},
  {color: 'solid'},
  {color: 'hollow'},
  {color: 'solid'},
  {color: 'hollow'},
  {color: 'solid'},
  {color: 'hollow'},
  {color: 'solid'}
]
</script>

<template>
    <div class="light flex justify-between items-center">
      <template v-for="(light, index) in col_list">
        <div class="light-item" :class="[light.color]"></div>
      </template>
    </div>
</template>

<style lang="scss" scoped>
.light {
  position: absolute;
  left: 20px;
  right: 20px;
  top: calc((6px + 128px) * v-bind(scale) / 2);
}
@keyframes steps {
  100% {
    background-position: -80px 0;
  }
}
@keyframes steps2 {
  100% {
    background-position: 0 -80px;
  }
}
.light-item {
  width: 40px;
  height: 40px;
}
.hollow {
  background: url(./light.png) no-repeat 100% 0;
  animation: steps2 1s steps2(2, end) infinite;
}
.solid {
  background: url(./light.png) no-repeat  0 0;
  animation: steps 1s steps(2, end) infinite; 

}
</style>