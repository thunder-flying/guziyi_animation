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
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out"
            :class="getNavItemClass(item.path)"
          >
            {{ item.name }}
            <!-- Active indicator -->
            <span 
              v-if="$route.path === item.path"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            ></span>
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
          <div class="flex flex-col space-y-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="mobile-nav-link relative px-4 py-3 rounded-lg font-medium transition-all duration-300"
              :class="getMobileNavItemClass(item.path)"
            >
              <span class="relative z-10">{{ item.name }}</span>
              <!-- Mobile active indicator -->
              <div 
                v-if="$route.path === item.path"
                class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500"
              ></div>
            </router-link>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'

const route = useRoute()
const navRef = ref<HTMLElement>()
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { name: '首页', path: '/' },
  { name: '文字动画', path: '/text-animations' },
  { name: '几何动画', path: '/geometry-animations' },
  { name: '滚动动画', path: '/scroll-animations' },
  { name: '交互动画', path: '/interactive-animations' },
  { name: '时间轴动画', path: '/timeline-animations' }
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// 计算桌面端导航项样式
function getNavItemClass(path: string) {
  const isActive = route.path === path
  return {
    'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform scale-105': isActive,
    'text-gray-600 hover:text-blue-600 hover:bg-gray-50': !isActive
  }
}

// 计算移动端导航项样式
function getMobileNavItemClass(path: string) {
  const isActive = route.path === path
  return {
    'text-blue-600 font-bold': isActive,
    'text-gray-600 hover:text-blue-600 hover:bg-gray-50': !isActive
  }
}

onMounted(() => {
  // 导航栏入场动画
  if (navRef.value) {
    gsap.fromTo(navRef.value, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
  }
  
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
  
  // 移动端导航链接动画
  gsap.fromTo('.mobile-nav-link',
    { x: -30, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration: 0.4, 
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.1
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

/* 导航链接悬浮效果 */
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

/* 移动端导航样式增强 */
.mobile-nav-link {
  position: relative;
  overflow: hidden;
}

/* 激活状态的脉冲动画 */
@keyframes pulse-active {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.nav-link.text-white {
  animation: pulse-active 2s infinite;
}

/* 活动指示器动画 */
@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 1.5rem;
    opacity: 1;
  }
}

.nav-link span {
  animation: slideIn 0.3s ease-out;
}
</style>
