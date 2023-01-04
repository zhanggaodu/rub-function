<script setup>
if (window.Worker) {
    const worker = new Worker('/src/worker.js')
    worker.onmessage = function(e) {
      console.log('接受main发送的消息',e)
    }
    // var myWorker = new SharedWorker("/src/worker.js");
    // myWorker.port.start();
    // myWorker.port.onmessage = function(e) {
    // console.log('Message received from worker detail2222222');
    // }
  }else{
    console.log('gggg')
  }
</script>
<template>
    <div>wwwww</div>
</template>
<style lang="scss" scoped>

</style>
