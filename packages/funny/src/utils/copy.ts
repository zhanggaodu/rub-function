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
    let type = 'text/plain'
    let blob = new Blob({ type }, data.value_blob)
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
  //   navigator.permissions.query({name:'clipboard-wirte'}) chrome的clipboard-read write不需要Permission
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


function handlerPaste(e: any) {
  e.preventDefault()
  if (copyData.value.type === 'image') {
    let img = document.createElement('img')
    img.src = window.URL.createObjectURL(copyData.value.value_blob)
    // pasteBox.value?.appendChild(img)
  }
}
