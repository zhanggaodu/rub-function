<script setup lang="ts">
import { debounceFn } from "@/utils/debounce"
import { useEventBus, EventBusKey } from '@/utils/eventBus'
import Progressive from "@/progress.vue"
import t0p from "@/assets/images/bg.png"
import t0 from "@/assets/images/img.png"
import t1 from "@/assets/images/bg.png"

const handlerClick = debounceFn(() => {
  console.log('fangdou')
}, 2000)
const title = ref<string>('title')

const key:EventBusKey<any> = Symbol('fkey')
const event = useEventBus(key)
event.on( e => {
  title.value = e.text
})
const toEmit = () => {
  event.emit({
    text: 'emit title'
  })
}

</script>

<template>
  <div @click="handlerClick">防抖</div>
  <div>on - {{ title }}</div>
  <div @click="toEmit">emit</div>
  <div>
    渐进式图片
    <Progressive :placeholder="t0p" :src="t0" />
    <Progressive  :src="t1" />

  </div>
</template>

<style lang="scss" scoped>

</style>