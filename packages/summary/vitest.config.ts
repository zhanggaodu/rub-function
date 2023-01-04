import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    // include: ['src/utils/*']
    include: ['test/*'],
    // coverage: { // 计算测试覆盖率
    //   provider: 'istanbul' // or 'c8'
    // },
  }
})