<script setup>
import { formatDate } from './utils/date'

const time = {
  start_ts: 1658983034,
  end_ts:1659993034
}


function addweek(timestamp) {
  formatDate(time.value?.start_ts * 1000,'MM月DD日 HH:mm:ss')
  console.log(new Date(1658818103).getDay())

}

</script>

<template>
<div>不带星期{{formatDate(time.value.start_ts,'MM月DD日 HH:mm:ss')}}</div>
<div>带星期{{}}</div>
</template>

<style lang="scss" scoped>
</style>