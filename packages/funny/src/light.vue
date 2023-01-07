<script setup>
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
  {color: 'purple'},
  {color: 'yellow'},
  {color: 'purple'},
  {color: 'yellow'},
  {color: 'purple'}
]
</script>

<template>
    <!-- 上 -->
    <div class="light-top flex justify-between items-center">
      <template v-for="(light, index) in row_list">
        <div class="light" :class="[light.color]"></div>
      </template>
    </div>
    <!-- 左 -->
    <div class="light-left flex flex-col justify-between items-center">
      <template v-for="(light, index) in col_list">
        <div class="light" :class="[light.color]"></div>
      </template>
    </div>
    <!-- 右 -->
    <div class="light-right flex flex-col justify-between items-center">
      <template v-for="(light, index) in col_list">
        <div class="light" :class="[light.color]"></div>
      </template>
    </div>
    <!-- 下 -->
    <div class="light-bottom flex justify-between items-center">
      <template v-for="(light, index) in col_list">
        <div class="light" :class="[light.color]"></div>
      </template>
    </div>
</template>

<style lang="scss" scoped>
@keyframes toYellow {
  from {background-color: purple;}
  to {background-color: yellow;}
}
@keyframes toPurple {
  from {background-color: yellow;}
  to {background-color: purple;}
}
.light-top {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 0;
  div {
    // background: url(./light.png) no-repeat 50% 0/100%;
    // &:nth-child(even) {
    //   animation: toYellow 1s  infinite;
    // }
    // &:nth-child(odd) {
    //   animation: toPurple 1s  infinite;
    // }
  }
}
.light-bottom {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 0;
}
.light-top, .light-bottom {
  div {
    &:nth-child(even) {
      animation: toYellow 1s cubic-bezier(.78,-0.75,.43,1.74) infinite;
    }
    &:nth-child(odd) {
      animation: toPurple 1s cubic-bezier(.78,-0.75,.43,1.74) infinite;
    }
  }
}
.light-left {
  position: absolute;
  top: 20px;
  left: 0px;
  bottom: 20px;
}
.light-right {
  position: absolute;
  top: 20px;
  right: 0px;
  bottom: 20px;
}
.light-left,.light-right {
  div {
    &:nth-child(even) {
      animation: toPurple 1s cubic-bezier(.78,-0.75,.43,1.74)  infinite;
    }
    &:nth-child(odd) {
      animation: toYellow 1s cubic-bezier(.78,-0.75,.43,1.74) infinite;
    }
  }
}
.light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.yellow {
  // background-color: yellow;
}
.purple {
  // background-color: purple;
}
</style>