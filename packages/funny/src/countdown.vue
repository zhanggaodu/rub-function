<script setup>

</script>
<template>
  <div class="center"></div>

</template>
<style lang="scss" scoped >
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  z-index: 99;
  &::after {
    width: 40px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    font-size: 30px;
    animation-name: count;
    animation-duration: 3s;
    transform: scale(1);
  }
}
@keyframes count {
  30% { content: '3'}
  32% {transform: scale(.8);}
  60% {transform: scale(1);content: '2'}
  62% {transform: scale(.8);}
  90% {transform: scale(1);content: '1'}
  92% {transform: scale(.8);}
  100% {transform: scale(1); content: 'GO!'}
}
@keyframes size {
}
</style>