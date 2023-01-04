<script setup>
/**
 * todo: css实现主题颜色面板 hsl
 */
//更改主题
function changeTheme() {
  let isLight = document.documentElement.getAttribute('theme')
 
  if (!isLight) {
    document.documentElement.setAttribute('theme', 'light')
  } else {
    document.documentElement.removeAttribute('theme')
  }
}
</script>

<template>
  <div class="contain">
    主题文字
     <button @click="changeTheme"> 切换主题 </button>
  </div>
 
</template>

<style>
:root {
  --bg-color: #0d1117;
  --text-color: #f0f6fc;
}
/* light主题 */
:root[theme='light'] {
  --bg-color: #fff;
  --text-color: #2c3e50;
}

:root {
  --background-primary: hsl(34, 78%, 91%);
  --text-primary: hsl(25, 76%, 10%);
  --button-primary-bg: hsl(214, 77%, 10%);
  --button-primary-fg: hsl(214, 77%, 98%);
}
@media screen and ( prefers-color-scheme: dark ) {
  :root {
  --background-primary: hsl(25, 76%, 10%);
  --text-primary: hsl(34, 78%, 91%);
  --button-primary-bg: hsl(214, 77%, 98%);
  --button-primary-fg: hsl(214, 77%, 10%);
  }
}
</style>

<style lang="scss" scoped>
.contain {
  color: var(--text-color);
  background-color: var(--bg-color);
}


</style>