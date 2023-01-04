<template>
  <header class="flex justify-center my-16 h-24 leading-24">
    <div class="text-left flex-20">&lt;</div>
    <div class="text-center flex-60">{{props.title}}</div>
    <div class="text-right flex-20 text-12">活动规则</div>
  </header>
</template>
<script setup>
const props = defineProps({
  title:String
})
</script>