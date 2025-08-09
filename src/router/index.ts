import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/text-animations',
    name: 'TextAnimations',
    component: () => import('@/views/TextAnimationsView.vue'),
    meta: { title: '文字动画' }
  },
  {
    path: '/geometry-animations',
    name: 'GeometryAnimations',
    component: () => import('@/views/GeometryAnimationsView.vue'),
    meta: { title: '几何动画' }
  },
  {
    path: '/scroll-animations',
    name: 'ScrollAnimations',
    component: () => import('@/views/ScrollAnimationsView.vue'),
    meta: { title: '滚动动画' }
  },
  {
    path: '/interactive-animations',
    name: 'InteractiveAnimations',
    component: () => import('@/views/InteractiveAnimationsView.vue'),
    meta: { title: '交互动画' }
  },
  {
    path: '/timeline-animations',
    name: 'TimelineAnimations',
    component: () => import('@/views/TimelineAnimationsView.vue'),
    meta: { title: '时间轴动画' }
  },
  {
    path: '/animation-components',
    name: 'AnimationComponents',
    component: () => import('@/views/AnimationComponentsView.vue'),
    meta: { title: '动画组件展示' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - GSAP 动画展示`
  next()
})

export default router
