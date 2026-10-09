<template>
  <nav ref="navRef" class="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md bg-white/80 border-gray-200/50">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="flex justify-center items-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <span class="text-sm font-bold text-white">G</span>
          </div>
          <span class="text-xl font-bold text-gray-900">动画展示厅</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden items-center space-x-1 md:flex">
          <!-- 首页单独显示 -->
          <router-link
            to="/"
            class="relative px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out nav-link group"
            :class="getNavItemClass('/')"
          >
            <div class="flex items-center space-x-2">
              <span class="text-lg">🏠</span>
              <span>首页</span>
            </div>
            <span 
              v-if="$route.path === '/'"
              class="absolute bottom-0 left-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2"
            ></span>
          </router-link>

          <!-- 基础动画下拉菜单 -->
          <div class="relative dropdown-container" @mouseenter="showDropdown('basic')" @mouseleave="hideDropdown('basic')">
            <button class="flex relative items-center px-4 py-2 space-x-2 font-medium rounded-lg transition-all duration-300 ease-in-out nav-link group"
                    :class="getDropdownButtonClass('basic')">
              <span class="text-lg">🎨</span>
              <span>基础动画</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': dropdownStates.basic }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- 基础动画下拉内容 -->
            <Transition name="dropdown">
              <div v-if="dropdownStates.basic" class="absolute left-0 top-full z-50 py-2 mt-1 w-56 bg-white rounded-xl border border-gray-100 shadow-xl">
                <router-link
                  v-for="item in basicAnimations"
                  :key="item.path"
                  :to="item.path"
                  class="flex items-center px-4 py-3 text-gray-700 transition-colors duration-200 dropdown-item hover:bg-blue-50 hover:text-blue-600"
                  :class="{ 'bg-blue-50 text-blue-600 font-medium': $route.path === item.path }"
                  @click="hideAllDropdowns"
                >
                  <span class="mr-3 text-lg">{{ item.icon }}</span>
                  <div>
                    <div class="font-medium">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">{{ item.shortDesc }}</div>
                  </div>
                </router-link>
              </div>
            </Transition>
          </div>

          <!-- 高级动画下拉菜单 -->
          <div class="relative dropdown-container" @mouseenter="showDropdown('advanced')" @mouseleave="hideDropdown('advanced')">
            <button class="flex relative items-center px-4 py-2 space-x-2 font-medium rounded-lg transition-all duration-300 ease-in-out nav-link group"
                    :class="getDropdownButtonClass('advanced')">
              <span class="text-lg">✨</span>
              <span>高级动画</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': dropdownStates.advanced }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- 高级动画下拉内容 -->
            <Transition name="dropdown">
              <div v-if="dropdownStates.advanced" class="absolute left-0 top-full z-50 py-2 mt-1 w-56 bg-white rounded-xl border border-gray-100 shadow-xl">
                <router-link
                  v-for="item in advancedAnimations"
                  :key="item.path"
                  :to="item.path"
                  class="flex items-center px-4 py-3 text-gray-700 transition-colors duration-200 dropdown-item hover:bg-purple-50 hover:text-purple-600"
                  :class="{ 'bg-purple-50 text-purple-600 font-medium': $route.path === item.path }"
                  @click="hideAllDropdowns"
                >
                  <span class="mr-3 text-lg">{{ item.icon }}</span>
                  <div>
                    <div class="font-medium">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">{{ item.shortDesc }}</div>
                  </div>
                </router-link>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="p-2 text-gray-600 rounded-md transition-colors md:hidden hover:text-blue-600 hover:bg-gray-100"
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
        <div v-if="isMobileMenuOpen" class="py-4 border-t border-gray-200 md:hidden">
          <div class="flex flex-col space-y-4">
            <!-- 首页 -->
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="relative px-4 py-3 font-medium rounded-lg transition-all duration-300 mobile-nav-link"
              :class="getMobileNavItemClass('/')"
            >
              <div class="flex relative z-10 items-center space-x-3">
                <span class="text-lg">🏠</span>
                <div class="flex flex-col">
                  <span>首页</span>
                  <span class="text-xs text-gray-500">动画展示厅首页</span>
                </div>
              </div>
              <div 
                v-if="$route.path === '/'"
                class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500"
              ></div>
            </router-link>

            <!-- 基础动画分类 -->
            <div class="px-4">
              <div class="flex items-center mb-3 space-x-2">
                <span class="text-lg">🎨</span>
                <h3 class="font-bold text-gray-800">基础动画</h3>
              </div>
              <div class="pl-4 space-y-1">
                <router-link
                  v-for="item in basicAnimations"
                  :key="item.path"
                  :to="item.path"
                  @click="closeMobileMenu"
                  class="block relative px-3 py-2 font-medium rounded-lg transition-all duration-300 mobile-nav-link"
                  :class="getMobileNavItemClass(item.path)"
                >
                  <div class="flex relative z-10 items-center space-x-3">
                    <span class="text-base">{{ item.icon }}</span>
                    <div class="flex flex-col">
                      <span class="text-sm">{{ item.name }}</span>
                      <span class="text-xs text-gray-500">{{ item.shortDesc }}</span>
                    </div>
                  </div>
                  <div 
                    v-if="$route.path === item.path"
                    class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500"
                  ></div>
                </router-link>
              </div>
            </div>

            <!-- 高级动画分类 -->
            <div class="px-4">
              <div class="flex items-center mb-3 space-x-2">
                <span class="text-lg">✨</span>
                <h3 class="font-bold text-gray-800">高级动画</h3>
              </div>
              <div class="pl-4 space-y-1">
                <router-link
                  v-for="item in advancedAnimations"
                  :key="item.path"
                  :to="item.path"
                  @click="closeMobileMenu"
                  class="block relative px-3 py-2 font-medium rounded-lg transition-all duration-300 mobile-nav-link"
                  :class="getMobileNavItemClass(item.path)"
                >
                  <div class="flex relative z-10 items-center space-x-3">
                    <span class="text-base">{{ item.icon }}</span>
                    <div class="flex flex-col">
                      <span class="text-sm">{{ item.name }}</span>
                      <span class="text-xs text-gray-500">{{ item.shortDesc }}</span>
                    </div>
                  </div>
                  <div 
                    v-if="$route.path === item.path"
                    class="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500"
                  ></div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'

const route = useRoute()
const navRef = ref<HTMLElement>()
const isMobileMenuOpen = ref(false)

// 下拉菜单状态
const dropdownStates = ref({
  basic: false,
  advanced: false
})

// 下拉菜单延迟隐藏定时器
const hideTimers = ref<Record<string, number>>({
  basic: 0,
  advanced: 0
})

// 基础动画分类
const basicAnimations = [
  { 
    name: '文字动画', 
    path: '/text-animations', 
    icon: '📝',
    shortDesc: '数字雨、霓虹字体'
  },
  { 
    name: '几何动画', 
    path: '/geometry-animations', 
    icon: '🔷',
    shortDesc: '液体变形、万花筒'
  },
  { 
    name: '滚动动画', 
    path: '/scroll-animations', 
    icon: '📜',
    shortDesc: '视差效果、元素揭示'
  },
  { 
    name: '交互动画', 
    path: '/interactive-animations', 
    icon: '🎮',
    shortDesc: '鼠标轨迹、重力模拟'
  },
  { 
    name: '时间轴动画', 
    path: '/timeline-animations', 
    icon: '⏰',
    shortDesc: '骨架屏、进度指示'
  }
]

// 高级动画分类
const advancedAnimations = [
  {
    name: 'AI 实验室',
    path: '/ai-animations',
    icon: '🧠',
    shortDesc: '思考能量球、神经网络'
  },
  { 
    name: '3D效果', 
    path: '/3d-effects', 
    icon: '🎯',
    shortDesc: '立体相册、全景展示'
  },
  { 
    name: '视觉特效', 
    path: '/visual-effects', 
    icon: '✨',
    shortDesc: '爆炸效果、水波纹'
  },
  { 
    name: '游戏动画', 
    path: '/game-effects', 
    icon: '🎮',
    shortDesc: '天气模拟、物理引擎'
  }
]

// 保留这个备注，未来可能需要扩展功能

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// 下拉菜单控制
function showDropdown(type: 'basic' | 'advanced') {
  // 清除之前的隐藏定时器
  if (hideTimers.value[type]) {
    clearTimeout(hideTimers.value[type])
    hideTimers.value[type] = 0
  }
  
  // 立即显示菜单
  dropdownStates.value[type] = true
}

function hideDropdown(type: 'basic' | 'advanced') {
  // 清除之前的定时器
  if (hideTimers.value[type]) {
    clearTimeout(hideTimers.value[type])
  }
  
  // 设置延迟隐藏
  hideTimers.value[type] = window.setTimeout(() => {
    dropdownStates.value[type] = false
    hideTimers.value[type] = 0
  }, 300) // 增加延迟时间到 300ms
}

function hideAllDropdowns() {
  // 清除所有定时器
  Object.keys(hideTimers.value).forEach(key => {
    if (hideTimers.value[key]) {
      clearTimeout(hideTimers.value[key])
      hideTimers.value[key] = 0
    }
  })
  
  // 立即隐藏所有下拉菜单
  dropdownStates.value.basic = false
  dropdownStates.value.advanced = false
}

// 计算下拉按钮样式
function getDropdownButtonClass(type: 'basic' | 'advanced') {
  const isActive = isDropdownActive(type)
  const isOpen = dropdownStates.value[type]
  
  return {
    'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform scale-105': isActive,
    'text-gray-600 hover:text-blue-600 hover:bg-gray-50': !isActive && !isOpen,
    'text-blue-600 bg-blue-50': !isActive && isOpen
  }
}

// 检查下拉菜单中是否有活动路由
function isDropdownActive(type: 'basic' | 'advanced') {
  const currentPath = route.path
  if (type === 'basic') {
    return basicAnimations.some(item => item.path === currentPath)
  } else {
    return advancedAnimations.some(item => item.path === currentPath)
  }
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

// 组件卸载时清理定时器
onUnmounted(() => {
  Object.keys(hideTimers.value).forEach(key => {
    if (hideTimers.value[key]) {
      clearTimeout(hideTimers.value[key])
    }
  })
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

/* 下拉菜单动画 */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.dropdown-leave-active {
  transition: all 0.15s ease-in;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}

/* 下拉菜单容器悬浮效果 */
.dropdown-container:hover .nav-link {
  background-color: rgb(249 250 251);
}

/* 添加下拉菜单的安全区域 */
.dropdown-container {
  position: relative;
}

.dropdown-container::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 8px; /* 8px 的安全缓冲区 */
  background: transparent;
  z-index: 49;
}

/* 下拉菜单项悬浮效果 */
.dropdown-item {
  position: relative;
  transition: all 0.2s ease;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: width 0.3s ease;
}

.dropdown-item:hover::before {
  width: 100%;
}

/* 分类标题样式 */
.mobile-nav-link h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}
</style>
