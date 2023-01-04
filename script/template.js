const path = require('path')
const fse = require('fs-extra')
const root = path.resolve(__dirname, '../')
const template = path.resolve(root, './template')
const options = process.argv.slice(2)
const createProject = path.resolve(root, `./packages/${options}`)

fse.copy(template, createProject)
  .then(() => {
    const filePath = path.resolve(root, `./packages/${options}/vite.config.js`)
    fse.readFile(filePath, function (err, data) {
      if (err) {
        return err
      }
      let str = data.toString()
      str = str.replace(/projectName/gm, options)
      fse.writeFile(filePath, str, function (err) {
        return err
      })
    })
  })
  .catch(err => console.error(err))
