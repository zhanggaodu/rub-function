<template>
  <div class="mx-20 content">
    <Deep/>
    <div class="test">
      vw vh
      <p class="rem">宽200px 高150px</p>
    </div>
    <Water />
    <Header title="夏季徽章" />
    <BoxShadow />
    <Xstate />
    <Raf />
    <Calender />
    <Tabs/>
    <PictureList :artList="artList" />
    <Swiper :swiperList="swiperList" />
    <div style="height:300px;"></div>
    <Star />
    <Reward :rewardList="rewardList"/>
    <Css />
    与js通信
    <ChangeTheme />

    多页面通信
    <video src="./images/1.mp4"></video>
    <div @click="sendMessage">点击给detail发送数据</div>
    <div class="mt-10">去detail页</div>

    web-worker通信事件
    <div @click="workerSendMessage">web-worker</div>

    <div>
      <img class="thumb" src="./images/banner.png" alt="">
    </div>
    <div>
      上传excel-------
       <input
        type="file"
        accept=".xls,.xlsx"
        class="upload_file"
        @change="readExcel($event)"
      />
    </div>

    <div style="height: 300px;"></div>
  </div>
</template>

<style scoped lang="scss">
@import "./app.scss";
.test {
  color: green;
}
::v-deep .md {
  color: red;
}
.rem {
  // 1vw 375 / 100  1vh = 667 / 100
  font-size: getVw(16);
  width: 53vw;
  height: 40vw;
}
.content {
  // width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  // padding-right: -30px;
  // height: 100vh;
  scrollbar-width: 0px !important;
}
.content ::-webkit-scrollbar {
  display: none !important;
}

</style>

<script setup>
import { nextTick, ref } from 'vue';
import Header from './Header.vue'
import Tabs from './Tabs.vue'
import PictureList from './PictureList.vue';
import Star from './Star.vue'
import Swiper from './Swiper.vue';
import Reward from './Reward.vue';
import Css from './Css.vue';
import ChangeTheme from './ChangeTheme.vue';
import Calender from './Calender.vue';
import Raf from './Raf.vue';
import Xstate from './Xstate.vue';
import Water from './Water.vue';
import BoxShadow from './BoxShadow.vue';
import Deep from './components/deep.vue';

window.addEventListener('resize', (event) => {
  console.log(font_size)
})
function readExcel (e){
  // 读取表格文件
  let that = this;
  const files = e.target.files;
  if (files.length <= 0) {
    return false;
  } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    this.$message({
      message: "上传格式不正确，请上传xls或者xlsx格式",
      type: "warning"
    });
    return false;
  } else {
    // 更新获取文件名
    that.upload_file = files[0].name;
  }

  const fileReader = new FileReader();
  fileReader.onload = ev => {
    try {
      const data = ev.target.result;
      const workbook = XLSX.read(data, {
        type: "binary"
      });
      const wsname = workbook.SheetNames[0]; //取第一张表
      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
      console.log(ws);
    } catch (e) {
      return false;
    }
  };
  fileReader.readAsBinaryString(files[0]);
}

const scale = window.innerWidth/375
const artList = ref([{
    title:'一月作品',
    list:[{ url:'./images/wait.png',name:'封城记事之三',status:1},
    { url:'./images/wait.png',name:'封城记事之三',status:1},
    { url:'./images/wait.png',name:'封城记事之三',status:1},
    { url:'./images/wait.png',name:'封城记事之三',status:1}]
  },
  {
    title:'二月作品',
    list:[{ url:'./images/wait.png',name:'封城记事之三',status:1},
    { url:'./images/wait.png',name:'封城记事之三',status:1},
    { url:'./images/wait.png',name:'封城记事之三',status:1},
    { url:'./images/wait.png',name:'封城记事之三',status:1}]
  }]) 

const swiperList = ref([
  {url:''}, {url:''}, {url:''}
])

const rewardList = ref([{value:100},{value:10},{value:200},{value:600},{value:0},{value:50},])

// 监听video首次播放
const sendMessage = () =>{
  console.log('发送数据')
}
nextTick(()=>{
  const video = document.querySelector('video');
  // TODO 事件报错
  // video.addEventListener('timeupdate', (event) => {
  //   console.log('The currentTime attribute has been updated. Again.');
  // });
})

//web-worker发送消息
const workerSendMessage = () =>{
  if (window.Worker) {
    const worker = new Worker('/src/worker.js')
    const goodsDetail = {id:12}
    worker.postMessage(goodsDetail)
    // var myWorker = new SharedWorker("/src/worker.js");
    //   myWorker.port.start();
    //   myWorker.port.postMessage("hello, I'm main");
    //   myWorker.port.onmessage = function(e) {
    //     console.log('Message received from worker main111111');
    //   }
  }else{
    console.log('gggg')
  }
}

</script>
