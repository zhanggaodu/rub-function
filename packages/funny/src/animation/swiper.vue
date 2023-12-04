<script setup>
import { nextTick, ref, onMounted } from 'vue';
  const props = defineProps({
    swiperList:{
      type:Array,
      default:[]
    }
  })
  const tabIndex = ref(0)
  const location = ref(false)
  const content = ref(null)
 
/**
 * let flag = true
 * 执行中 flag = false 执行时 判断flag为true就执行 为false就toast
 */
  nextTick(() => {
    swiperListener()
  })
  const swiperListener = ()=>{
    let startX
    document.querySelector('#swiper')?.addEventListener('touchstart', e => {   
      startX = e.touches[0].pageX
    })
    document.querySelector('#swiper')?.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX
      let remain = x-startX 
      remain < 0 ? location.value = true : location.value = false
    })
    document.querySelector('#swiper')?.addEventListener('touchend', e => {
      if(tabIndex.value === 0 && !location.value < 0 ) return
      if(tabIndex.value > props.swiperList.length) return
      if(location.value){
        tabIndex.value += 1
      }else{
        tabIndex.value -= 1
      }
      e.preventDefault()
  
    })
  }
  setInterval(()=>{
  },1000)


</script>

<template>  
  <section class="relative show">
    <div class="content" ref="content" :style="`left:${tabIndex * -350}px;`">
      <template v-for="(item,index) in props.swiperList">
        <div id="swiper" class="box">
          <!-- <img src="./images/banner.png" alt=""> -->
          {{index}}
        </div>
      </template>
    </div>
    <div class="flex justify-center absolute btn">
      <template v-for="(item,index) in props.swiperList">
        <span :class="[index == tabIndex ? 'active':'','btn-item',  ,'ml-4']"></span>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.show{
  overflow: hidden;
}
.content{
  width: 1050px;
  overflow: hidden;
  position: relative;
  .move{
    left:calc(v-bind(tabIndex) * 350px) ;
  }
  // animation: spin 6s infinite;

  // @keyframes spin {
  //   33% {
  //     margin-left: -350px;
  //   }
  //   66% {
  //     margin-left: -700px;
  //   }
  //   99% {
  //     margin-left:0 ;
  //   }
  // }
  
}
.box{
  float: left;
  width: 350px;
  height: 200px;
  border: 1px solid #78311C;

}
.btn{
    bottom: 0;
    width: 100%;

  &-item{
    width: 8px;
    height: 4px;
    border-radius: 8px;
    background-color: rgba(120, 49, 28, .5);
  }
}
.active{
  width: 16px;
  background-color: #78311C;
}

</style>