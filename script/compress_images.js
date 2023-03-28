// import { readFile } from 'node:fs/promises'
// import * as path from 'path'
// import { fileURLToPath } from 'url'
// const filePath = new URL('./compress.json', import.meta.url)
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const fs = require('fs')
const path = require('node:path')
const tinify = require("tinify")
tinify.key = "pn6dXsSpSSD4tZ3hN7CNVBXWMdhD8zNs"

const root = path.resolve(__dirname, '../src')
const filePath = path.resolve(__dirname, './compress.json')
//__dirname and __filename global variables are defined in CommonJS modules, but not in ES modules
try {
  const contents = fs.readFileSync(filePath, { encoding: 'utf8' })
  const compressList = JSON.parse(contents)
  compressList.map(item => {
    const position = path.resolve(root, `./${ item.position }`)
    const file_list = item.images_list
    file_list.map(image => {
      const position_image = path.resolve(position, `./${ image }`)
      fs.readFile(`${position_image}`, function(err, sourceData) {
       tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
          if (err) throw err
          else {
            fs.writeFile(`${position_image}`,resultData, 'binary', function(error) {
              if (error) throw error
              else console.log('succeed',`${position_image}`)
            })
          }
        })
      })
    })
  })
} catch (err) {
  console.error(err.message);
}