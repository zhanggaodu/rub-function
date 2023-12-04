<script setup lang="ts">
const box = ref(null)
const blur = ref(null)
const flag = ref(null)
onMounted(() => {
  // 方法一
  let node = box.value
  // if (node) {
  //   blur.value = node.scrollHeight > node.clientHeight ? 'visible' : 'hidden'
  //   box.value.addEventListener('scroll', (e) => {
  //     bindScrollFn(e)
  //   }, false)
  // }
  if (document.querySelector('#flag')) {
    // 开始监听
    intersectionObserver.observe(document.querySelector('#flag'))
  }
})
const scrollFn = (e) => {
  // if (!doSomething.lastArgs) {
  //   doSomething.lastArgs = [arg1, arg2];
  // }
  // doSomething.lastArgs[0] = arg1;
  // doSomething.lastArgs[1] = arg2;
  let element = e.target
  if (Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 20) {
    blur.value = 'hidden'
  } else {
    blur.value = 'visible'
  }
}

const throttle = (fn, delay) => {
  let timer = null
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      clearTimeout(timer)
      fn.apply(this, args)
      lastTime = now
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        lastTime = Date.now()
      }, delay - (now - lastTime))
    }
  }
}

function debounce(func, delay, immediate) {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    if (immediate && !timer) {
      func.apply(context, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args)
      }
      timer = null
    }, delay)
  }
}

const bindScrollFn = throttle(scrollFn, 200)
// 节流 throttle 每隔 n 秒执行一次函数
// 防抖 debounce 在事件触发 n 秒后再执行函数
// 在5min内 每6s执行一次 间隔是0.2毫秒 节流和防抖函数各能执行多少次
// 获取焦点  ctrl + alt + 向下的箭头 切换位置
// 浏览器和node的事件循环 Ctrl/Cmd + 2 
// 箭头函数于普通函数的区别 箭头函数不能在定义之前使用
// const createArrowFunction = fn => {
//   return (...args) => {
//     return fn.apply(this, args)
//   }
// }
function debounceOrThrottle(func, wait, immediate, isDebounce) {
  let timer = null
  let last = 0
  return function() {
    const context = this
    const args = arguments
    const now = +new Date()
    if (isDebounce) {
      if (immediate && !timer) {
        func.apply(context, args)
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (!immediate) {
          func.apply(context, args)
        }
        timer = null
      }, wait)
    } else {
      if (now - last >= wait) {
        func.apply(context, args)
        last = now
      }
    }
  }
}

// 方法二
const intersectionObserver = new IntersectionObserver((entries) => {
  // 目标在视野外
  if (entries[0].intersectionRatio <= 0) {
    blur.value = 'visible'
  } else {
    blur.value = 'hidden'
  }
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