<template>
  <section class="flex justify-center">
    <template v-for="(item,index) in props.itemArr"> 
      <div @click="tabindex = index" :class="[tabindex === index?'tab-light':'', 'tabs' ,'px-10']" >{{item.value}}</div>
    </template>
  </section>
  <section v-show="tabindex===0">
    0
  </section>
  <section v-show="tabindex===1">
    1
  </section>

</template>

<style scoped lang="scss">
  section{
    text-align: center;
  }
  .tab-light{
    &::after{
      display: block;
      width:50%;
      height: 3px;
      content: '';
      border-radius: 1.5px;
      background-color: black;
      margin: 2px auto 0;
    }
  }
  

</style>

<script setup>
  import { ref,computed } from 'vue';
  const props = defineProps({
    itemArr:{
      type:Array,
      default:[{value:'发售时间',show:true},{value:'发售版数',show:false}]
    }
  })
  let itemWidth = computed(()=>{
    return  Math.floor( 100 / props.itemArr.length)+'%'
  })
  let tabindex =ref(1) 

</script>