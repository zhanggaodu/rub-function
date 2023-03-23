<script setup>
import clipboard from './clipboard.vue'
import countdown from './countdown.vue'
import bg from './bg.vue'
// import reward from './reward.vue'
// import { ref, computed, nextTick, onMounted } from 'vue'
const roll = ref(null)
const prize_list = ref([
  {'name':'海鲜套餐'},
  {'name':'谢谢参与'},
  {'name':'小米手机'},
  {'name':'蓝牙耳机'},
  {'name':'apple watch'},
  {'name':'迪士尼苹果'}
])

/**
 * 先升速 300
 * 匀速   2000
 * promiseAll 有结果之后降速 1000
 */

 // 缓入函数
// function easeIn(t, b, c, d) {
//   // currentTime, timeStartPoint, maxSpeed, holdTime
//   if (t >= d) t = d;
//   return c * (t /= d) * t + b;
// }

// // 缓出函数
// function easeOut (t, b, c, d) {
//   // fps, stopDeg, endDeg, endHoldTime
//   if (t >= d) t = d;
//   return -c * (t /= d) * (t - 2) + b;
// }

// // 开始时间
// const startTime = Date.now();

// // 最大速度
// const maxSpeed = 20;

// // 加速持续时间
// const startHoldTime = 2000;

// // 时间段的起点
// const timeStartPoint = 0;

// // 减速持续时间
// const endHoldTime = 3000;

// // 旋转角度
// this.deg = 0;

// // 停止区域索引
// this.stopIndex = 0;

// // 动画循环总次数，用来计算fps
// this.progress = 0;

// // 减速开始时间
// this.endTime = 0;

// // 每个奖品所占的角度
// this.prizeDeg = 45;

// function animation() {
//   // 当前使用的时间段
//   const currentTime = Date.now() - startTime;

//   // 获取当前帧的速度
//   const curSpeed = easeIn(currentTime, timeStartPoint, maxSpeed, holdTime);

//   // 旋转角度
//   this.deg += curSpeed;

//   // 优化结果值，取360度的余数结果即为当前位置
//   this.deg = this.deg % 360;

//   // 检测到stopIndex有值，此时知道抽到的奖品区间范围，开始实行减速，计算减速总路程
//   if (this.stopIndex > 0) {

//     // 计算屏幕刷新帧率
//     const fps = currentTime / this.progress;
//     this.endTime = Date.now();

//     // 开始减速时所处的位置
//     this.stopDeg = this.deg;
//     let i = 0;
//     while(++i) {
//       // 结合开始减速时所处的位置和结束时所处的位置计算旋转总路程
//       const endDeg = 360 * i - this.stopIndex * this.prizeDeg - this.stopDeg;

//       // 计算刚开始第一帧旋转的角度，也就是初始速度
//       const curSpeed = easeOut(fps, stopDeg, endDeg, endHoldTime) - this.stopDeg;

//       // 当初始速度与当前旋转最大速度相等，即可获取总共需要旋转的角度
//       if (curSpeed >= maxSpeed) {
//         this.endDeg = endDeg;
//         break;
//       }
//     }

//     // 开始减速
//     return slowDown();
//   }

//   window.requestAnimationFrame(animation)
// }

// function slowDown() {
//   window.requestAnimationFrame(function() {
//     const currentTime = Date.now() - this.endTime;

//     // 减速完成
//     if (currentTime >= endHoldTime) {
//       return;
//     }

//     // 缓出减速
//     this.deg = easeOut(currentTime, this.stopDeg, this.endDeg, endHoldTime) % 360;
//     this.slowDown();
//   })
// }

// window.requestAnimationFrame(animation);
// --------------------------------------------------------------
 const delay = n => {
  return new Promise(resolve => {
    setTimeout(resolve, n * 1000)
  })
}
const bindRotate = () => {
  // let prev = performance.now() // 从页面加载开始经过的毫秒数
  animate({timing: timing,draw: draw,duration: 1280})
  // repeat()
}

const repeat = () => {
  delay(1.28).then(() => {
    // animate({ timing: timing, draw: draw, duration: 2000 })
  })
}

const timing = (timeFraction) => {
  return timeFraction
}

const draw = (progress,rotate) => {
  roll.value.style.transform = `rotate(${progress * rotate}deg)`
}

const animate = ({timing, draw, duration}) => {
  let start = performance.now()
  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    console.log(timeFraction)
    // 计算当前动画状态
    let progress = timing(timeFraction)
    draw(progress,360) // 绘制
    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}

window.addEventListener('keyup',(event) =>{
console.log(event.code === 'KeyS')  
})

const gap = 5
const currentTime = ref(0)
const duration = ref(0)
const pad  = (val) => {
  return val.toString().padStart(2, '0')
}
const percent = computed(() => {
  if (!duration.value) return 0
  if (!currentTime.value) return 0
  return ((currentTime.value / duration.value) * 100).toFixed(0)
})
const format = val => {
  let s = Number(Math.floor(val))
  let second = 0
  let min = 0
  let hour = 0
  hour = s >(60*60) ?  Math.floor(s / (60*60)) : 0
  min = hour > 0 ? (s - (hour*60*60)) / 60 : s > 60 ? Math.floor(s / 60) : 0
  second = s > 60 ? (s - (hour*60*60) - (min * 60)): s
  return `${pad(hour)}:${pad(min)}:${pad(second)}`
}
const time = computed (() => {
  if(!duration.value) return '00:00:00'
  return format(duration.value)
  // let s = Number(Math.floor(900))
  // let second = 0
  // let min = 0
  // let hour = 0
  // hour = s >(60*60) ?  Math.floor(s / (60*60)) : 0
  // min = hour > 0 ? (s - (hour*60*60)) / 60 : s > 60 ? Math.floor(s / 60) : 0
  // second = s > 60 ? (s - (hour*60*60) - (min * 60)): s
  // return `${pad(hour)}:${pad(min)}:${pad(second)}`
})
const current = computed(() => {
  if(!currentTime.value) return '00:00:00'
  return format(currentTime.value)
})
const player = ref(null)
const play_text = ref('播放')
const bind_play = () => {
  player.value.paused ? player.value.play() : player.value.pause()
  play_text.value = player.value.paused ? '播放' : '暂停'
}
const bind_before = () => {
  console.log(player.value.duration)
  player.value.currentTime -= gap
  player.value.paused ? player.value.pause() : player.value.play()
}
const bind_after = () => {
  player.value.currentTime += gap
  player.value.paused ? player.value.pause() : player.value.play()
}
const bind_control = () => {
  return
}

// 主题颜色切换
const body = document.querySelector('body')
body.setAttribute('data-theme','default')

const bind_theme = () => {
  if(body.getAttribute('data-theme') === 'default') {
    body.setAttribute('data-theme','dark')
  } else {
    body.setAttribute('data-theme','default')
  }
}

onMounted(() => {
  player.value.addEventListener('play', e => {
    console.log('play', e)
  })
  player.value.addEventListener('paused', e => {
    console.log('paused', e)
  })
  // 第一帧加载完毕
  player.value.addEventListener('loadeddata', e => {
    // console.log('加载完成 可以给duration赋值')
    duration.value = player.value.duration
    currentTime.value = player.value.currentTime
  })
  player.value.addEventListener('timeupdate', e => {
    currentTime.value = player.value.currentTime
  })
  player.value.addEventListener('error', e => {
    console.log('error', e)
  })
})

</script>

<template>
  <bg />
  <countdown />
  <clipboard />
  <reward />
  <div class="btn" @click="bind_theme">切换主题</div>
  <div class="video-box relative">
    <video @click="bind_play" controls ref="player" src="./1.mp4" type="video/mp4">
      <track default
        kind="captions"
        srclang="en">
        <!-- src="/media/examples/friday.vtt" 字幕文件 cue可以设置字幕的样式 -->
      Download the
      <a href="./1.mp4">MP4</a>
      video, and
      <!-- <a href="/media/examples/friday.vtt">111</a>. -->
    </video>
    <div @click="bind_control" class="control flex justify-start items-center">
      <span @click="bind_play">{{ play_text }}</span>
      <span @click="bind_before">快退</span>
      <span @click="bind_after">快进</span>
      <div class="progress flex items-center">
        <span>{{ current }}</span>
        <div class="progress-bg"><div :style="`width:${percent}%;`" class="progress-fixed"></div></div>
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
  <div>转盘</div>
  <div ref="roll" class="roll relative">
    <div class="prize absolute">
      <template v-for="(item,index) in prize_list" :key="index">
        <div class="item" :style="` transform: rotate(${30 + (index * 60)}deg);`">{{item.name}}</div>
      </template>
    </div>
  </div>
  <div class="btn" @click="bindRotate">点击</div>
</template>

<style lang="scss" scoped>
.btn {
  background-color: var(--bg);
  color: var(--fg);
}
.video-box {
  width: 100vw;
  aspect-ratio: 5/3;
  // height: 200px;
  border: 1px solid #000;
  video {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    // position: absolute; 
    // background-color: black; 
    // top: 0%; 
    // left: 0%; 
    // transform: rotate(0deg) scale(1.005);
  }
}
.control {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.2);
  color: white;
  height: 30px;
  font-size: 10px;
}
.progress {
  width: 50%;
  height: 6px;
}
.progress-bg {
  flex: 0 0 80%;
  height: 100%;
  border-radius: 3px;
  background-color: rgba(255,255,255,.7);
}
.progress-fixed {
  height: 6px;
  background-color: #fff;
  border-radius: 3px;
}
.roll {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid #000;
}
.btn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rebeccapurple;
}
.prize {
  left: 25%;
  top: 20%;
  width: 50%;
  height: 50%;
}
.item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>