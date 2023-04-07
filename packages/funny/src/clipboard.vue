<script setup lang="ts">
const copyText = ref<HTMLElement>()
/**
 * 思路 
 * 接受两个参数 text 和 container
 * 判断是否支持command  navigate.clipboard(https)
 * 为什么创建textarea
 * 有点简单 可以写个库放在npm上惹
*/
const copyUseCommand = (text: string) => {

}
const copyUseNavigate = (text: string) => {

}

const copy = (text: any, container: HTMLElement) => {
  // text接受的类型 string htmlElement

}
onMounted(() => {
  let node = copyText.value
  if (node) {
    node.addEventListener('copy', (e) => {
      console.log(e)
      // e.clipboardData.setData('text/plain', 'Hello, world!')
      // e.clipboardData.setData('text/html', '<b>Hello, world!</b>')
      // e.preventDefault()
      /**
       * 在HTTP环境下，浏览器将禁止使用Clipboard API。这是因为使用Clipboard API需要访问和操作用户的剪贴板数据，这是一种敏感的操作，需要更高的安全保障。因此，建议将您的Web应用程序升级到HTTPS协议，以启用Clipboard API。
  如果您无法升级到HTTPS协议，也可以使用其他方法来实现复制和粘贴功能，如使用Flash、Java Applet或ActiveX控件等。但是，这些方法都存在安全隐患，并且已经被现代浏览器禁用或受到限制。因此，这些方法不建议使用。
  
  如果您的Web应用程序只是在本地环境下运行，并且您希望使用Clipboard API来访问剪贴板数据，可以考虑使用Electron、NW.js等基于Chromium内核的桌面应用程序框架。这些框架提供了更高的安全性和更广泛的API支持，可以访问和操作用户的剪贴板数据。但是，使用这些框架需要更多的学习和开发成本。
       * 
       */
    })
  }
})
</script>

<template>
  <div ref="copyText">复制文本吧</div>
</template>

<style lang="scss" scoped ></style>