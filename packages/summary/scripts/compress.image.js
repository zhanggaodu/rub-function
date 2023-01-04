// 建立imagemin.map.json         ，如果已经处理过，则不再处理，处理过就更新到imagemin.map.json 遍历json文件获取已压缩的图片
// 将已压缩的图片从src文件中去掉 
// 压缩剩余图片 并将图片信息写入到json文件里
// {
//   "name": "", 文件名
//   "path": "", 路径
//   "hash": "", 最后压缩时间  不为空说明已经被压缩过了
//   "size": ""  文件的大小
// }
// import { access, constants } from 'node:fs'
// const { access, constants } = require('node:fs') 
// const hasFile = () => {
//   const jsonFile = 'compress.image.json'
//   access(jsonFile, constants.F_OK, (err) => {
//     if (!err) {
//       console.error('myfile already exists')
//     } else {
//       console.log('myfile not exists', err)
//     }
//   })
// }
// hasFile() // 没有该文件程序会退出

// 访问json文件 如果没有内容就是第一次压缩

const { open, close, createReadStream  } = require('node:fs')
const jsonFile = './compress.image.json'
open(jsonFile, 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      // 文件存在
      console.log('文件存在')
      const stream = createReadStream(jsonFile)
      console.log(stream)
      return
    }
    throw err;
  }

  try {
  } finally {
    close(fd, (err) => {
      if (err) throw err
    })
  }
})
