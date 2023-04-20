<script setup>

const isShow = ref(false)
const changeStatus = () => {
  isShow.value = !isShow.value
}
const dropList = ['drop1', 'drop2', 'drop3']

const content = ref()
const drop = ref()
const bindClick = (e) => {
  // if (e.target.contains(drop.value) || !(content.value.contains(e.target))) {
  //   isShow.value = false
  // }
  if (e.target.id !== 'select1') isShow.value = false
  console.log(e.target.id)
}
onMounted(() => {
  window.addEventListener('click', bindClick)
})
onUnmounted(() => {
  window.removeEventListener('click', bindClick)
})
</script>

<template>
  <div class="box" ref="content">
    <div class="select relative">
      <div id="select1" @click="changeStatus">点击打开select</div>
      <div ref="drop"
        v-show="isShow"
        class="drop absolute">
        <template v-for="item in dropList">
          <div @click="changeStatus">
            {{ item }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: 200px;
  border: 1px solid #000;
}

.select {
  height: 40px;
}

.drop {
  bottom: -50px;
  left: 0;
  right: 0;
  background: goldenrod;
  color: white;
}</style>