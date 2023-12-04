<script setup lang="ts">
const copyText = ref<HTMLElement>()
const copyImage = ref<HTMLImageElement>()
// navigator.permissions.query({name:'clipboard-read'}).then(res => {console.log(res)})
/**
 * 思路 
 * 为什么创建textarea
 * 禁止write的原因是因为协议不是https还是Permission API
*/
const copyUseCommand = (data: CopyData) => {
  let textarea = document.createElement('textarea')
  textarea.value = data.value_text ?? ''
  textarea.style.position = 'absolute'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand(data.value_text)
  textarea.remove()
}

const copyUseClipboard = (data: CopyData) => {
  if (data.type === 'image') {
    let blob = new Blob({ type: 'text/plain' }, data.value_blob)
    const v = [new ClipboardItem({ 'Blob': blob })]
    return new Promise((resolve, reject) => {
      navigator.clipboard.write(v).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  } else {
    return new Promise<void>((resolve, reject) => {
      navigator.clipboard.writeText(data.value_text).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
}

const isPromise = () => { // geo natification 
  return true
  // new Promise<void>((resolve, reject) => {
  //   navigator.permissions.query({name:'clipboard-wirte'}) chrome的clipboard不需要Permission
  // })
}
const isSupport = () => {
  return navigator && 'clipboard' in navigator && isPromise()
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
  value_blob?: Blob,
  value_text?: string
}
const copyData = ref<CopyData>({ type: 'string' })
async function copy(container: string | Blob, type: string = 'text') {
  // text接受的类型 string htmlElement image(如果是用网址下载图片呢)
  if (type === 'image') {
    copyData.value.type = 'image'
    copyData.value.value_blob = await getBlob(location.origin + container.attributes.src.value)
  } else {
    copyData.value.value_text = container
  }
  if (isSupport()) {
    copyUseClipboard(copyData.value).then(res => {
      // 成功
    }).catch(err => {
      console.log('err', err)
    })
  } else {
    copyUseCommand(copyData.value)
  }
}

const pasteBox = ref<HTMLDivElement>()
function handlerPaste(e: any) {
  e.preventDefault()
  if (copyData.value.type === 'image') {
    let img = document.createElement('img')
    img.src = window.URL.createObjectURL(copyData.value.value_blob)
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
  // File、Blob、Base64
  // file blob -> src  = createObjectUrl() --> revoke
  // file -> src = fileReader.readAsDataUrl
})
</script>

<template>
  <img ref="copyImage" style="visibility: hidden;" src="@/assets/images/copy.jpeg" alt="">
  <div @click="copy(copyData.value_blob, 'image')">复制图片</div>
  <div ref="copyText">复制这里的文字</div>
  <div @click="copy('这是复制的文字')">复制文本</div>
  <div ref="pasteBox" contenteditable="true">可以在这里粘贴</div>
</template>

<style lang="scss" scoped ></style>