<script setup>
import LuckDraw from './reward.js'
// https://cloud.tencent.com/developer/article/1653522
const scale = window.innerWidth / 375
// const playing = ref(false)
// const reward_list = [
//   {name: '23132', key: 1},
//   {name: '23132', key: 2},
//   {name: '23132', key: 3},
//   {name: '23132', key: 4},
//   {name: '23132', key: 5},
//   {name: '23132', key: 6},
//   {name: '23132', key: 7}
// ]

// 使用方式：服务端返回的奖品信息列表
const prizeList = [
{ id: 1 },
{ id: 2 },
{ id: 3 },
{ id: 4 },
{ id: 5 },
{ id: 6 },
{ id: 7 },
// { id: 8 }
]

// 旋转规则数组 
const rotateDir = [
{ index: 0, next: 1 },
{ index: 1, next: 2 },
{ index: 2, next: 3 },
{ index: 3, next: 4 },
{ index: 4, next: 5 },
{ index: 5, next: 6 },
{ index: 6, next: 0 },
// { index: 7, next: 0 }
]

const animation_index = ref(0)
const reward_id = ref(null)
// 初始化抽奖, 3代表圈数， 8代表速度，也代表时间片的个数
const luckDrawFn = new LuckDraw(prizeList, rotateDir, 4, 9)
// 中奖id，请求服务端接口拿到
const id = 3
const delay = n => {
  return new Promise(resolve => {
    setTimeout(resolve, n * 1000)
  })
}
const clickPlanButton = () => {
  return {id:2}
}
const bind_lottery = () => {
  // if(playing.value) return
  // playing.value = true
  luckDrawFn.run(
    id, //中奖id
    animation_index.value,
    params => { // 停留在当前格子的回调函数
      // 拿到当前 active 状态的 id
      animation_index.value = params.id
    },
    params => { // 最终停止的回调函数
      //最后转盘停止的地方，可以弹出奖励弹框或其他操作
      reward_id.value = params.id
      console.log('结束时的id',params.id)
  })
}
</script>

<template>
  <div class="box flex flex-wrap justify-center">
    <template v-for="item in prizeList">
      <div class="box-item" :class="{'box-active':animation_index === item.id}">
        <img src="./img.png" alt="">
      </div>
    </template>
  </div>
  <div @click="bind_lottery" class="btn">抽奖</div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  margin-top: -5px;
}
.box-item {
  margin-left: 10px;
  flex: 0 0 calc(v-bind(scale) * 84px);
  margin-top: 5px;

  &:first-child,&:nth-child(5) {
    margin-left: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-position: top;
    object-fit: cover;
    padding: 1px;
  }
}
.box-active {
  border: 2px solid transparent;
  border-radius: 6px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #fff, #fff),
    linear-gradient(180deg, #92BDFF 0%, #A090FF 100%);
}
.btn {
  margin: 0 auto 100px;
}
</style>