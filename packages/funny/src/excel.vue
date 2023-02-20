<script setup >
import * as XLSX from 'xlsx'
import * as fs from 'fs'
const url = 'https://art-cms.oss-cn-beijing.aliyuncs.com/cms/1b/1c/1b1c50664e2ab14aec798597830e5ee5.xlsx'
const options = { type:"binary" }
// const data = XLSX.read('./media/data.xlsx', options)
// console.log(data)
const bindUpload = (e) => {
  console.log(e.target.files[0])
  const file = e.target.files[0]
  // window.URL.createObjectURL(files[i])展示缩略图
  const reader = new FileReader()
  reader.onload = () => {
    console.log(reader.result)
    const data = XLSX.read(reader.result,options)
    console.log(data)
  }
  reader.readAsBinaryString(file)
}
// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//   const fileList = this.files; /* now you can work with the file list */
// }
</script>

<template>
  <input type="file" @change="bindUpload" >
  <!-- multiple accept -->


</template>

<style lang="scss" scoped>

</style>