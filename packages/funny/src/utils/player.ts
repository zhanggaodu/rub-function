
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
