<script setup lang="ts">
/**
 * 思路 
 * 接受两个参数 text 和 container
 * 判断是否支持command  navigate.clipboard(https)
 * 为什么创建textarea
 * 有点简单 可以写个库放在npm上惹
*/
const container = ref<HTMLElement>()
const copyUseCommand = (text: string) => {
  try {
    document.execCommand(text)
    return true
  } catch(e) {
    return false
  }
}
const copyUseNavigate = (text: string) => {
  if (navigator.clipboard) {
    let data = new DataTransfer()
    data.items.add("text/plain", text)
    navigator.clipboard.write(data).then(() => {
      return true
    }, () => {
      return false
    })
  }
}

const copy = (text: any, container: HTMLElement) => {
  // text接受的类型 string htmlElement

}
</script>

<template>
  <h2 ref="container">container</h2>
  <div>复制文本</div>
</template>

<style lang="scss" scoped >

</style>