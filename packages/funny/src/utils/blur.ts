const intersectionObserver = new IntersectionObserver((entries) => {
  // 目标在视野外
  if (entries[0].intersectionRatio <= 0) {
    // blur.value = 'visible'
  } else {
    // blur.value = 'hidden'
  }
})
let node:HTMLElement | null = document.querySelector('#flag')
intersectionObserver.observe(node)