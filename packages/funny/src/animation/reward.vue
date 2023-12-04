<script setup>
import { nextTick,ref } from 'vue';

const props = defineProps({
  rewardList:{
    type:Array,
    default:[]
  }
})
function toReward(){
 content.value.style.cssText = `animation: slidein 3s ease-in 1s infinite reverse both running;`
}

const content = ref(null)
const list = ref([...props.rewardList,...props.rewardList,...props.rewardList])
const length = list.value.length
nextTick(()=>{
  content.value.style.cssText = `width: ${length * 80}px;`
})
</script>

<template>
  <div class="box">
    <div ref="content" class="content flex flex-nowrap">
      <template v-for="item in list">
        <div class="item">{{item.value}}</div>
      </template>
    </div>
  </div>
  <div @click="toReward">点击</div>
</template>

<style lang="scss" scoped>
.content{
  position: relative;
  left: 0px;
  // animation: move 1s linear 1s infinite both running;
}
@keyframes move {
  0% {
    left: 0;
  }
  100%  {
    left: calc(280px - v-bind(length)*80px);
  }
}
.box{
  width: 80%;
  margin: 0 auto;
  border: 1px solid #000;
  height: 100px;
  position: relative;
  overflow: hidden;

  &::before,&::after{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    display: block;
    content: '';
    border: 20px solid #fff;
    border-left-color: transparent ;
    border-right-color: transparent ;
  }
  &::before{
    border-top-color:#A51DF9 ;
    border-bottom-color: transparent ;
    border-top-width: 40px;
  }
  &::after{
    bottom: 0;
    border-bottom-color:#A51DF9 ;
    border-top-color: transparent ;
    border-bottom-width: 40px;
  }
}
.item{
  flex:0 0 80px;
  height: 100px;
  border: 1px solid burlywood;
}
</style>
