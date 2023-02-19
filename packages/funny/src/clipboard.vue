<script setup lang="ts">
// tsingnore
import select from 'select'
/**
 * 思路 
 * 接受两个参数 text 和 container
 * 判断是否支持command(将选中的文字复制到粘贴板)  navigate.clipboard(https)
 * 为什么创建textarea
 * 有点简单 可以写个库放在npm上惹
*/
// let container:HTMLElement 
const container = ref<HTMLElement>()
  onMounted(() => {
    const selectedText = select(container)
    console.log(selectedText)
})

const copyUseCommand = () => {
  try {
   return document.execCommand('copy')
  } catch(e) {
    return false
  }
}
const copyUseNavigate = (text: string):boolean => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      return true
    }, () => {
      return false
    })
  }
  return false
}

const copy = (text: any, container?: HTMLElement) => {
  // text接受的类型 string htmlElement
  if (copyUseNavigate(text)) alert('success1')
  if (copyUseCommand()) alert('success2')
  //create textarea
}
const bindCopy = (text: string) => {
  copy(text)
}
// 创建document 不可见的textarea 或者select元素
const createCopyElement = () => {

}
</script>

<template>
  <textarea readonly ref="container">textarea</textarea>
  <div @click="bindCopy('复制')">复制文本</div>
</template>

<style lang="scss" scoped >

</style>