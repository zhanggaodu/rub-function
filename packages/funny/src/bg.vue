<template>
  <div class="content">
    <img class="bg" src="./bg.png" srcset="medium.jpg 500w, large.jpg 800w" alt="">
    <!-- <ol>
      <li>333</li>
      <li>333</li>
      <li>333</li>
      <li>333</li>
      <li>333</li>
      <li>333</li>
      <li>333</li>
    </ol> -->
  </div>
</template>

<style lang="scss" scoped>
// 背景图
.content {
  height: 350px;
  // background-image: url(./bg.png);
  // background-repeat: no-repeat;
  // background-position: center center;
  // background-attachment: fixed;
  // background-size: cover;
  // 这种带边框的 估计只能把宽高写死了
}
.bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>