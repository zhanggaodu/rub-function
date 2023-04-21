<script setup>
// 换起app
import CallApp from 'callapp-lib'
const options = {
  scheme: {
    protocol: 'artpro',
  },
  intent: {
    package: 'com.zhihu.android',
    scheme: 'zhihu',
  },
  universal: {
    host: 'oia.zhihu.com',
    pathKey: '',
  },
  appstore: 'https://itunes.apple.com/cn/app/id432274380',
  yingyongbao: '//a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android',
  fallback: 'https://art-admin2022-test.windimg.com/#/login',
  timeout: 2000,
}
const callLib = new CallApp(options)

// callLib.open({ path: 'question/270839820/answer/477722658' })

</script>

<template>
  <div class="box" ref="content">
    
  </div>
</template>

<style lang="scss" scoped>
</style>