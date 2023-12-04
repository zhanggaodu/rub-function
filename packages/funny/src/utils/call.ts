import CallApp from 'callapp-lib'
// TODO 唤起微信
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