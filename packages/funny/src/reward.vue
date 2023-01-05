<script setup>
// import Lottery from './animation'
// https://cloud.tencent.com/developer/article/1653522
const scale = window.innerWidth / 375
const playing = ref(false)
const reward_list = [
  {name: '23132', key: 1},
  {name: '23132', key: 2},
  {name: '23132', key: 3},
  {name: '23132', key: 4},
  {name: '23132', key: 5},
  {name: '23132', key: 6},
  {name: '23132', key: 7}
]
const bind_lottrty = () => {
  if(playing.value) return
  playing.value = true

  console.log('抽奖')
}
</script>

<template>
  <div class="box flex flex-wrap justify-center">
    <template v-for="item in reward_list">
      <div class="box-item" :class="{'box-active':item.key === 1}">
        <img src="./img.png" alt="">
      </div>
    </template>
  </div>
  <div @click="bind_lottrty" class="btn">抽奖</div>
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