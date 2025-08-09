<template>
  <nav ref="navRef" class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">G</span>
          </div>
          <span class="font-bold text-xl text-gray-900">动画展示厅</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link text-gray-600 hover:text-blue-600 font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="slide">
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <div class="flex flex-col space-y-2">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 font-medium transition-colors"
              :class="{ 'text-blue-600 bg-blue-50': $route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const navRef = ref<HTMLElement>()
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { name: '首页', path: '/' },
  { name: '文字动画', path: '/text-animations' },
  { name: '几何动画', path: '/geometry-animations' },
  { name: '滚动动画', path: '/scroll-animations' },
  { name: '交互动画', path: '/interactive-animations' },
  { name: '时间轴动画', path: '/timeline-animations' },
  { name: '组件展示', path: '/animation-components' }
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  // 导航栏入场动画
  gsap.fromTo(navRef.value, 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  )
  
  // 导航链接交错动画
  gsap.fromTo('.nav-link',
    { y: -20, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.3
    }
  )
})
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
