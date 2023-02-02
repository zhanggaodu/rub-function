<script setup >
const scroll_list = ref(null)
onMounted(() => {
  console.log(scroll_list.value.children)
  const list = Array.from(scroll_list.value.children)
  // const boxElList = [...document.querySelectorAll('.scroll_box')]
  list.forEach((el) => {
    io.observe(el)
  })
})

const option = {
  // roll:,
}
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // 元素可见为true
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
    }
    else {
      entry.target.classList.remove('active')
      // io.unobserve(entry.target)
    }
  })
})
// 图片懒加载 埋点曝光 滚动动画

var targetNode = document.querySelector("#someElement");
var observerOptions = {
  childList: true,  // 观察目标子节点的变化，是否有添加或者删除
  attributes: true, // 观察属性变动
  subtree: true     // 观察后代节点，默认为 false
}
const callback = (mutationList, observer) => {
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      case 'childList':
        /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
           mutation.removedNodes */
        break;
      case 'attributes':
        /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
           该属性之前的值为 mutation.oldValue */
        break;
    }
  });
}
var observer = new MutationObserver(callback)
observer.observe(targetNode, observerOptions)
// disconnect() 无参数
/**
 * ResizeObserver 监视element和svgElement的边界尺寸
 * performanceObserver
 */

</script>
<template>
滚动监听
<div class="content" ref="scroll_list">
  <template v-for="item in [1,2,3,4]">
    <div class="scroll_box"></div>
  </template>
  </div>
</template>
<style lang="scss" scoped>
.content {
  margin-top: 640px;
  border: 1px solid #000;
}
.scroll_box {
  width: 40%;
  height: 400px;
  margin-bottom: 30px;
  background-color: pink;
}
.active {
  background-color: red;
}
</style>