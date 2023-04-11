<script setup lang="ts">
/**
 * https://cloudinary.com/blog/image_loading_reloaded
 * 1. 直接 <img src="http://domain.tld/path/images/01.png" width="1" height="1" />  display none  5ms
 * 2. const img = new Image();  img.onload = function() {}  img.src = "../path/to/image-01.gif";  5ms
 * 3. <link rel="preload" as="image" href="wolf.jpg" fetchpriority="high">                       10ms
 * 每次都是发送新的请求  能不能缓存
 */

 const preloadImage = (url: string) => {
  const img = new Image()
  img.onload = function () {}
  img.src = url
 }

 onMounted(() => {
  // preloadImage('src/media/huge.png')
 })

</script>

<template>
  <!-- <img src="./media/huge.png" alt=""> -->
</template>

<style lang="scss" scoped>

</style>