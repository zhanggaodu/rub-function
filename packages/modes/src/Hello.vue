<script lang="ts">
  export default {} as unknown as
  <T extends string | number>(props: {msg: T, foo: T}) => any
</script>

<script setup lang="ts">
const props = defineProps<{
  msg: string | number,
  foo: string | number
}>()
console.log(typeof props.foo,'------',typeof props.msg)
/**
 *  number ------ number
    Hello.vue:11 string ------ string x 3
    Hello.vue:11 string ------ number
    Hello.vue:11 number ------ string
 */
</script>

<template>
  hello
</template>
