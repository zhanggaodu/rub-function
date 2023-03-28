<script setup>
const box = ref(null)
const blur = ref(null)
const flag = ref(null)
onMounted(() => {
  // 方法一
  let node = box.value
  // if (node) {
  //   blur.value = node.scrollHeight > node.clientHeight ? 'visible' : 'hidden'
  //   box.value.addEventListener('scroll', throttle(scrollFn, 100),
  //     false)
  // }
  if (document.querySelector('#flag')) {
    // 开始监听
    intersectionObserver.observe(document.querySelector('#flag'))
  }
})
const scrollFn = (e) => {
  let element = e.target
  if (Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 20) {
    blur.value = 'hidden'
  } else {
    blur.value = 'visible'
  }
}

function throttle(func, delay) {
  var lastTime = 0;
  return function () {
    var context = this;
    var args = arguments;
    var nowTime = new Date().getTime();
    if (nowTime > lastTime + delay) {
      func.apply(context, args)
      lastTime = nowTime;
    }
  }
}

// 方法二
const intersectionObserver = new IntersectionObserver((entries) => {
  // 目标在视野外
  if (entries[0].intersectionRatio <= 0) return
  blur.value = 'hidden'
})

// 方法三
// 加一个元素在最底部 然后判断元素是否在视口里出现

</script>

<template>
  <div ref="box"
    class="box relative">
    <div class="content"></div>
    <div id="flag"></div>
    <div :style="`visibility: ${blur};`"
      class="blur"></div>
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
  transition-property: visibility;
  transition-duration: 0.1s;
}</style>