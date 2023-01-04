const postcss = require('postcss')
postcss().process(`
.demo {
  font-size: 14px; /*this is a comment*/
}
`).then(result => {
  console.log(result)
  // Result {
  //   processor: Processor { version: '8.4.20', plugins: [] },
  //   messages: [],
  //   root: [Getter],
  //   opts: {},
  //   css: '\n.demo {\n  font-size: 14px; /*this is a comment*/\n}\n',
  //   map: undefined
  // }
})