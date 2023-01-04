<script setup> 
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"

const dateList = ref([])
const dataMap = ref()
const month = ref(0)

// 1. 先展示当前时间  2.左右滑减少月份 月份少于0 年份减一 月份大于12 年份加一
//[{day:1,count:10}]

function getNewDate () {
  return new Date()
}
function getNowDays (month,total) { 
  let nowList = []
  for (let i = 1; i <= total; i++) {
    nowList.push({day:i, count:1})
  }
  return { month: month+1,data: nowList }
}

function getOtherDays () {
  let date = getNewDate()
  let month = dataMap.value.currentMonth
  date.setFullYear(dataMap.value.currentYear)
  while(month) {
    date.setMonth(month)
    date.setDate(0)
    let allDays = date.getDate()
    dateList.value.unshift(getNowDays(month,allDays))
    month--
  }
}


function formatDay () {
  let date = getNewDate()
  let currentYear = date.getFullYear()
  let currentDay = date.getDate()
  let currentMonth = date.getMonth()
  month.value = currentMonth + 1
  let preMonth = currentMonth-1
  let firstDay = date.getDay()
  date.setMonth( currentMonth == 12 ? 0 : currentMonth+1 )
  date.setDate(0)
  let allDays = date.getDate()
  dataMap.value = {currentYear, currentMonth, currentDay, allDays, firstDay, preMonth}
}

function getDayList () {
  dateList.value.push(getNowDays(dataMap.value.currentMonth,dataMap.value.allDays))
}

//初始化
onMounted(() => {
  formatDay()
  getDayList()
  getOtherDays(dataMap.value.currentYear,dataMap.value.preMonth)
  // console.log(dateList.value)
})
const weekList = ['日','一','二','三','四','五','六']

const onSlideChange = () => {
  // if (month.value <=1 ) {
  //   month.value = 12
  // } else {
  //   month.value--
  // }
}

</script>

<template>
  <div class="text-center calender">
    <div>2022年{{month}}月</div>
    <div class="grid grid-cols-7">
      <template v-for="day in weekList">
        <div>{{ day }}</div>
      </template>
    </div>
    <swiper :space-between="10" @slideChange="onSlideChange">
      <swiper-slide v-for="(item,index) in dateList" :key="index">
        <div class="box-image grid grid-cols-7">
          <template v-for="day in item.data">
            <div :class="{'active':day.day === dataMap.currentDay}">
              {{day.day}}
            </div>
          </template>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
  .calender {
    width: calc(100vw - 40px);
    height: 200px;
    background-color: #ddd;
  }
  .calender-box {
    min-width: 100%;
    height: 100%;
  }
  .active {
    background-color: orange;
  }

</style>


