<script setup lang="ts">
import { debounceFn } from "@/utils/debounce"

const handlerClick = debounceFn(() => {
  console.log('fangdou')
}, 2000)
</script>

<template>
  <div @click="handlerClick">防抖</div>
</template>

<style lang="scss" scoped>

</style>