<script setup>
import { ref, onMounted, computed } from 'vue'
const column_1 = ref(null)
const column_2 = ref(null)

const list = ref([
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/cc902851e65180028d9967bae7ad5795?width=3039&height=2772'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/2944ed00750c7bd5014c3d9013110b59?width=1000&height=970&hTag=d7a495871ba01409369e6c2231ad49f0'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/b38348e4ff099a33e63eaf3ddad4c225?width=1080&height=799&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/a5898d3e7ae7c9155c2708289db41713?width=1604&height=1614&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/b38348e4ff099a33e63eaf3ddad4c225?width=1080&height=799&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/a5898d3e7ae7c9155c2708289db41713?width=1604&height=1614&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/a5898d3e7ae7c9155c2708289db41713?width=1604&height=1614&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/cc902851e65180028d9967bae7ad5795?width=3039&height=2772'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/2944ed00750c7bd5014c3d9013110b59?width=1000&height=970&hTag=d7a495871ba01409369e6c2231ad49f0'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/b38348e4ff099a33e63eaf3ddad4c225?width=1080&height=799&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'},
  {name: 'wewe', info: 'ewr',image_url: 'https://img.artproglobal.com/c/a5898d3e7ae7c9155c2708289db41713?width=1604&height=1614&hTag=d7a495871ba01409369e6c2231ad49f0&x-oss-process=image/resize,p_50'}
])
const getSize = (name, str) => {
  if (!str) str = location.href
  let reg = new RegExp("(^|&)" + name + "=([^#|&]*)(#|&|$)", "i")
  if (str.indexOf("?") > -1) {
    str = str.split("?")[1]
    let r = str.match(reg)
    if (r != null) return decodeURIComponent(r[2]);
  }
  return null
}

const getImageWH = (url) => {
  let w = getSize('width', url)
  let h = getSize('height', url)
  if (w == '' || h == '') return { width: 0, height: 0, scale: 1 }
  let width = +w
  let height = +h
  return { width, height, scale: Number(width/height).toFixed(2) }
}

const getHeight = (image_url) => {
  let css_Width = (window.innerWidth - 20) / 2
  let scale = Math.floor(  getImageWH(image_url).width / css_Width)
  let height = Math.floor(getImageWH(image_url).height / scale)
  return height
}

const height_1 = ref(0)
const height_2 = ref(0)
const getList = () => {
  list.value.map((item, index) => {
    let div_content = document.createElement('div')
    let image_content = document.createElement('img')
    image_content.setAttribute('src',item.image_url)
    div_content.appendChild(image_content)
    let image_height = getHeight(item.image_url)
    image_content.style.height = image_height + 'px'
    if (index == 0) {
      column_1.value.appendChild(div_content)
      height_1.value += image_height
    } else  if (index == 1){
      column_2.value.appendChild(div_content)
      height_2.value += image_height
    } else {
      if (height_1.value < height_2.value) {
        column_1.value.appendChild(div_content)
        height_1.value += image_height
      } else {
        column_2.value.appendChild(div_content)
        height_2.value += image_height
      }
    }
  })
}
const bottom = ref(null)
const content = ref(null)
const is_more = ref(true)

const addList = () => {
 list.value = [...list.value, ...list.value]
 getList()
}
onMounted(() => {
  // getList()
  // window.addEventListener('scroll', () => {
  //   let node = content.value
  //   if (!node) return
  //   let window_height = window.innerHeight
  //   let scroll_height = window.scrollY
  //   let compare_height = height_1.value > height_2.value ? height_1.value : height_2.value
  //   console.log(compare_height,window_height,scroll_height)
  //   if (compare_height <= window_height + scroll_height && is_more.value) {
  //     addList()
  //   }
  // })
})

const getRandomHeight = () => {
  let min = 100
  let max = 300
  return Math.floor(Math.random() * (max-min) + min)
}
// const prepareList = [
//   {type: 1},
//   {type: 0},
//   {type: 0},
//   {type: 1},
//   {type: 1},
//   {type: 1},
//   {type: 0},
//   {type: 0},
//   {type: 1}
// ]
let prepareList = []
for (let i = 0; i < 2000; ++i) {
  prepareList.push({
    index: i,
    width: 150,
    height: getRandomHeight(),
  })
}

// content 分几列  传参
const init = (box, cols = 3, list) => {
  const fragment = document.createDocumentFragment()
  for (let i = 0 ; i < cols; i++) {
    let div = document.createElement('div')
    div.setAttribute('class','column')
    let separateX = 8
    let width = window.innerWidth / cols - ((cols -1) * separateX)
    div.style.cssText += `width: ${width}px;height: 300px; overflow-y:hidden;`
    fragment.appendChild(div)
  }
  document.getElementById(box).appendChild(fragment)
}

const getLowerIndex = (grids) => {
  let index = 0
  for(let i = 1; i < grids.length; i++) {
    if(grids[i] < grids[index]) index = i
  }
  return index
}

const getPrepareList = (col, list) => {
  let girds = Array.from({length: col}, _ => 0) // [0, 0]
  let spaceX = 8
  let spaceY = 8
  let margin = 5
  let cols = Array.from({ length: col }, _ => []) // [] []
  list.forEach(item => {
    let index = getLowerIndex(girds) // 0
    let x = index * item.width + (index * spaceX + margin)
    let y = girds[index] // grids[0] = height
    girds[index] +=  (item.height + spaceY)
    cols[index].push({
      ...item,
      x,
      y
    })
  })
  return {
    height: Math.max(...girds), // 最大的height
    cols
  }
}

onMounted(() => {
  let cols = 2
  init('box', cols)
  let raw = getPrepareList(cols, prepareList)
  console.log(raw)
})

</script>
<template>
  <!-- TODO  -->
    <div class="content flex" ref="content" id="box">
      <!-- <div class="contain" ref="column_1"></div>
      <div class="contain" ref="column_2"></div>
      <div ref="bottom"></div>  -->
    </div>
</template>
<style lang="scss" scoped>
.contain {
  position: relative;
  flex: 0 0 50%;
  border: 1px solid #000;
  img {
    object-fit: contain;
    object-position: center;
  }
}
.content {
  border: 1px solid #000;
}

</style>