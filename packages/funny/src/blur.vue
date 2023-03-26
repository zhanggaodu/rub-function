<script setup>
const box = ref(null)
const blur = ref(false)
onMounted(() => {
  // 初始化判断显不显示
  // 要不要加节流
  
  let node = box.value
  if (node) {
    box.value.addEventListener('scroll', (e) => {
      let element = e.target
      if (Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 5) {
        blur.value = false
      } else {
        blur.value = true
      }
     
    }, false)
  }
  
})
</script>

<template>
  <div ref="box" class="box relative">
    <div class="content"></div>
    <div v-if="blur" class="blur"></div>
  </div>

</template>

<style lang="scss" scoped>
.box {
  height: 150px;
  overflow-y: auto;
}
.content {
  height: 200px;
}
.blur {
  height: 20px;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
}
</style>