<script setup >
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Add 'active' class if observation target is inside viewport
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('active');
    }
    // Remove 'active' class otherwise
    else {
      entry.target.classList.remove('active');
    }
  })
})

// Declares what to observe, and observes its properties.
const boxElList = document.querySelectorAll('.box');
boxElList.forEach((el) => {
  io.observe(el);
})
</script>
<template>
滚动监听

</template>
<style lang="scss" scoped>

</style>