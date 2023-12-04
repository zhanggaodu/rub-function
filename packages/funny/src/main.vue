<script setup lang="ts">

const duration = ref()
const currentTime = ref()
const current = ref()
const time = ref()
const percent = ref()
const player = ref<HTMLVideoElement>(null)
const play_text = ref('播放')
const bind_play = () => {
  player.value.paused ? player.value.play() : player.value.pause()
  play_text.value = player.value.paused ? '播放' : '暂停'
}
const bind_before = () => {
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