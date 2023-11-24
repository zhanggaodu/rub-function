<script setup lang="ts">
const copyText = ref<HTMLElement>()
const copyImage = ref<HTMLImageElement>()
// navigator.permissions.query({name:'clipboard-read'}).then(res => {console.log(res)})
/**
 * 思路 
 * 接受两个参数 text 和 container
 * 判断是否支持command  navigate.clipboard(https)
 * 为什么创建textarea
 * 禁止write的原因是因为协议不是https还是Permission API
*/
const copyUseCommand = (text: string) => {

}
const copyUseClipboard = (text: string) => {

}

const isSupport = () => {
  return navigator && 'clipboard' in navigator
}
async function getBlob(src: string) {
  const responsePromise = fetch(src);
   return new Promise(async (resolve) => {
    const blob = await responsePromise.then(res => res.blob())
    resolve(blob)
  })
}
type CopyData = {
  type: string,
  text?: string,
  blob?: Blob
}
const copyData = ref<CopyData>({type: 'string'})
async function copy(type: string='text', container: HTMLElement | HTMLImageElement) {
  // text接受的类型 string htmlElement image(如果是用网址下载图片呢)
  // 处理数据
  let data = ''
  if (type === 'image') {
    copyData.value.type = 'image'
    copyData.value.blob = await getBlob(location.origin+container.attributes.src.value)
  }
  // data = container.value.nodeValue
  if (isSupport()) {
    copyUseClipboard(data)
  } else {
    copyUseCommand(data)
  }
}

const pasteBox = ref<HTMLDivElement>()
function handlerPaste(e: any) {
  e.preventDefault()
  if(copyData.value.type === 'image') {
    let img = document.createElement('img')
    img.src =  window.URL.createObjectURL(copyData.value.blob)
    pasteBox.value?.appendChild(img)
  }
}

onMounted(() => {
  let node = copyText.value
  if (node) {
    // 如果node是div需要设置contenteditable="true" 用户需要手动选中
    // node.addEventListener('copy', (e) => {
      // console.log(e)
      // e.clipboardData.setData('text/plain', 'Hello, world!')
      // e.clipboardData.setData('text/html', '<b>Hello, world!</b>')
      // e.preventDefault()
    // })
  }
  document.addEventListener('paste', (event) => handlerPaste(event))
})

onUnmounted(() => {
  // 这样还能remove嘛
  document.removeEventListener('paste', (event) => handlerPaste(event))
  // file blob -> src  = createObjectUrl() --> revoke
  // file -> src = fileReader.readAsDataUrl
})
</script>

<template>
  <img ref="copyImage" src="@/assets/images/copy.jpeg" alt="">
  <div ref="copyText" @click="copy('image', copyImage)">复制文本吧---</div>
  <div ref="pasteBox" contenteditable="true">粘贴图片</div>
</template>

<style lang="scss" scoped ></style>