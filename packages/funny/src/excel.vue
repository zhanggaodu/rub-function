<script setup lang="ts" >
import XLSX from "xlsx-js-style" 

function exportJsonToExcelV2(data: [], col: [], title = 'download') {
  const worksheet = XLSX.utils.json_to_sheet(data)
  worksheet['!cols'] = col
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  Object.keys(worksheet).forEach((item, index) => {
    if (worksheet[item].t) {
      worksheet[item].s = {
        alignment: { horizontal: "center" },
      }
    }
  })
  XLSX.writeFile(workbook, title)
}
const fileStaffMap = (arr: [], head: object) => {
  const list = arr.map((item) => {
    const translatedItem = {}
    Object.keys(item).forEach(key => {
      if (head[key]) {
        translatedItem[head[key]] = item[key]
      }
    })
    return translatedItem
  })
  return list
}
const head = {
  status_text: '状态',
  deptname: '所属部门名称',
  number: '员工工号',
  name: '姓名',
  date: '日期',
  go_work: '上班打卡时间',
  off_work: '下班打卡时间',
  work_duration: '工作时长(小时)',
  apply_status: '申请状态',
}
let col = [
  { wpx: 100 },
  { wpx: 220 },
  { wpx: 60 },
  { wpx: 60 },
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 100 }
]
let data = fileStaffMap([], head)
exportJsonToExcelV2(data, col)
</script>

<template>
  <input type="file" @change="bindUpload">
  <!-- multiple accept -->
</template>

<style lang="scss" scoped></style>