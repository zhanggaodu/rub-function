import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // 报错 src下shimi.d.ts  或者 f1 volar version 选择workspace
    component: () => import(`@/Main.vue`)
  }, 
  {
    path: '/responsibility',
    component: () => import(`@/Responsibility.vue`)
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router