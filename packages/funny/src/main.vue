<script setup lang="ts">
import { debounceFn } from "@/utils/debounce"
import { useEventBus, EventBusKey } from '@/utils/eventBus'

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
</template>

<style lang="scss" scoped>

</style>