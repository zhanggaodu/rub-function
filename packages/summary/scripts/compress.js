// 打包之前自动执行这个脚本进行图片压缩
// 压缩之后生成一个 imagemin.map.json 文件，是记录哪些图片已经压缩过了，不需要二次压缩
// 压缩之前检查当前图片的 修改时间 值是否在 imagemin.map.json 文件内，在的话则过滤走，不在才需要压缩
// 压缩之后的图片，覆盖原本路径的处理
// 有些图片在压缩之后反而比原图更大了，对这些图片不做覆盖原图处理，直接保留原图，但是需要在 imagemin.map.json记录该文件以及源文件的 修改时间
const input = ['../src/images/**/*.{jpg,png,svg,gif}']
console.log(input)