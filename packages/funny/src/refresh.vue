<script setup>
const bg = ref(null)
const inProgress = ref(false)
const start = ref(0)
const maxDistance = 100
const translateY = ref(0)
const observerOptions = {
  childList: false,
  attributes: true,
  subtree: false
}
const callback = (mutationList) => {
  mutationList.forEach((mutation) => {
   const target = mutation.target
   console.log(target)
  })
}
const touchStart = (e) => {
  start.value = e.touches[0].clientY
}

const touchMove = (e) => {
  if (start.value > 0) {
    let dis = e.touches[0].clientY - start.value
    translateY.value = dis > maxDistance ? maxDistance : dis
  } 
  console.log(e.touches[0])
}
const touchEnd = (e) => {
  console.log('取消')
  setTimeout(() => {
    translateY.value = 0
  },2000)
}
onMounted(() => {
  // var observer = new MutationObserver(callback)
  // observer.observe(bg.value, observerOptions)
  bg.value.addEventListener('touchstart',touchStart)
  bg.value.addEventListener('touchmove',touchMove)
  bg.value.addEventListener('touchend',touchEnd)
})
</script>

<template>
  下拉刷新
  <div class="box relative">
    <div class="loading">...</div>
    <div ref="bg" class="bg" :style="`transform: translateY(${translateY}px);`"></div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: #ededed;
  height: 400px;
  scroll-behavior: smooth;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(maxDistance)px;
  text-align: center;
}
</style>