<template>
  <div class="scroll-animations-view">
    <!-- Scroll Parallax Animation Component -->
    <ScrollParallaxAnimation :auto-start="true" />
    
    <!-- Hero Section with Parallax -->
    <section class="flex overflow-hidden relative justify-center items-center h-screen parallax-hero">
      <!-- Background Layers -->
      <div ref="bgLayer1" class="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900"></div>
      <div ref="bgLayer2" class="absolute inset-0 opacity-50">
        <div 
          v-for="i in 50" 
          :key="i"
          :ref="el => setBgStarRef(el, i)"
          class="absolute w-1 h-1 bg-white rounded-full"
          :style="getRandomStarPosition(i)"
        ></div>
      </div>
      
      <!-- Content -->
      <div class="z-10 px-4 text-center text-white">
        <h1 ref="heroTitle" class="mb-6 text-6xl font-bold opacity-0 md:text-8xl">
          滚动动画
        </h1>
        <p ref="heroSubtitle" class="mb-8 text-xl opacity-0 md:text-2xl">
          体验视差滚动和滚动触发的魔力
        </p>
        <div ref="scrollHint" class="opacity-0 animate-bounce">
          <svg class="mx-auto w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Scroll Progress Bar -->
    <div ref="progressBar" class="fixed top-0 left-0 z-50 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

    <!-- Pin Animation Section -->
    <section class="relative min-h-screen bg-gray-50 pin-section">
      <div class="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 ref="pinTitle" class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            固定动画效果
          </h2>
          <p ref="pinSubtitle" class="mx-auto max-w-3xl text-xl text-gray-600">
            在滚动过程中固定元素，创造引人注目的视觉效果
          </p>
        </div>

        <div ref="pinContainer" class="pin-animation-container grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[60vh]">
          <div 
            v-for="(item, index) in pinItems"
            :key="index"
            :ref="el => setPinItemRef(el, index)"
            class="p-8 bg-white rounded-2xl shadow-lg opacity-0 transform translate-y-12 pin-item"
          >
            <div class="mb-4 text-4xl">{{ item.icon }}</div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Reveal Animation Section -->
    <section class="py-20 min-h-screen bg-white reveal-section">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 ref="revealTitle" class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            元素揭示动画
          </h2>
          <p ref="revealSubtitle" class="mx-auto max-w-3xl text-xl text-gray-600">
            元素逐渐进入视野时的精美动画效果
          </p>
        </div>

        <div class="space-y-32">
          <!-- Image Reveal -->
          <div class="flex flex-col gap-12 items-center reveal-item md:flex-row">
            <div class="flex-1">
              <div ref="imageReveal" class="overflow-hidden relative rounded-2xl shadow-2xl">
                <div class="absolute inset-0 z-10 bg-gradient-to-r from-blue-500 to-purple-500 image-overlay"></div>
                <div class="flex justify-center items-center w-full h-80 bg-gradient-to-br from-blue-100 to-purple-100">
                  <span class="text-4xl">🖼️</span>
                </div>
              </div>
            </div>
            <div class="flex-1">
              <h3 ref="imageTitle" class="mb-4 text-3xl font-bold text-gray-900 opacity-0 transform translate-x-8">
                图片揭示效果
              </h3>
              <p ref="imageDesc" class="text-lg text-gray-600 opacity-0 transform translate-x-8">
                图片从左侧滑入，配合覆盖层的擦除动画，创造出戏剧性的揭示效果。
              </p>
            </div>
          </div>

          <!-- Counter Animation -->
          <div class="text-center reveal-item">
            <h3 ref="counterTitle" class="mb-12 text-3xl font-bold text-gray-900 opacity-0">
              数字滚动动画
            </h3>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div 
                v-for="(counter, index) in counters"
                :key="index"
                :ref="el => setCounterRef(el, index)"
                class="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 transform translate-y-8 counter-item"
              >
                <div class="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:text-5xl">
                  <span :ref="el => setCounterNumberRef(el, index)">0</span>{{ counter.suffix }}
                </div>
                <p class="text-lg text-gray-600">{{ counter.label }}</p>
              </div>
            </div>
          </div>

          <!-- Text Reveal -->
          <div class="mx-auto max-w-4xl reveal-item">
            <h3 ref="textRevealTitle" class="mb-8 text-3xl font-bold text-center text-gray-900 opacity-0">
              文字逐行揭示
            </h3>
            <div class="space-y-4">
              <p 
                v-for="(line, index) in textLines"
                :key="index"
                :ref="el => setTextLineRef(el, index)"
                class="text-lg leading-relaxed text-gray-600 opacity-0 transform translate-y-4"
              >
                {{ line }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Horizontal Scroll Section -->
    <section ref="horizontalSection" class="text-white bg-gray-900 horizontal-scroll-section">
      <div class="flex horizontal-container">
        <div 
          v-for="(panel, index) in horizontalPanels"
          :key="index"
          :ref="el => setHorizontalPanelRef(el, index)"
          class="flex relative flex-none justify-center items-center w-screen h-screen horizontal-panel"
          :style="{ backgroundColor: panel.bg }"
        >
          <div class="px-8 text-center">
            <div class="mb-6 text-6xl">{{ panel.icon }}</div>
            <h3 class="mb-6 text-4xl font-bold md:text-5xl">{{ panel.title }}</h3>
            <p class="mx-auto max-w-lg text-xl">{{ panel.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Morphing Section -->
    <section class="flex items-center py-20 min-h-screen text-white bg-black morphing-section">
      <div class="px-4 mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 ref="morphTitle" class="mb-12 text-4xl font-bold opacity-0 md:text-5xl">
            形态变换动画
          </h2>
          <div ref="morphContainer" class="flex justify-center items-center h-80 morph-container">
            <svg width="300" height="300" viewBox="0 0 300 300">
              <path 
                ref="morphPath"
                d="M150,50 L250,150 L150,250 L50,150 Z"
                fill="url(#morphGradient)"
                stroke="#ffffff"
                stroke-width="2"
                opacity="0"
              />
              <defs>
                <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax Aurora Section -->
    <section ref="auroraSection" class="relative py-20 min-h-screen text-white bg-black aurora-section overflow-hidden">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 ref="auroraTitle" class="mb-6 text-4xl font-bold opacity-0 md:text-5xl">
            视差极光效果
          </h2>
          <p ref="auroraSubtitle" class="mx-auto max-w-3xl text-xl opacity-0">
            模拟北极光的绚丽色彩，随滚动产生深度视差效果
          </p>
        </div>
      </div>
      
      <!-- Aurora Layers -->
      <div class="absolute inset-0 aurora-container">
        <canvas 
          ref="auroraCanvas" 
          class="absolute inset-0 w-full h-full"
          style="mix-blend-mode: screen"
        ></canvas>
        <div 
          v-for="i in 5" 
          :key="i"
          :ref="el => setAuroraLayerRef(el, i)"
          class="absolute inset-0 aurora-layer"
          :style="`background: linear-gradient(${45 + i * 30}deg, 
            rgba(0, 255, 150, ${0.1 + i * 0.02}), 
            rgba(0, 150, 255, ${0.1 + i * 0.02}), 
            rgba(150, 0, 255, ${0.1 + i * 0.02}), 
            transparent 70%); 
            filter: blur(${i * 2}px);`"
        ></div>
      </div>
      
      <!-- Foreground Content -->
      <div class="relative z-10 flex items-center justify-center min-h-screen">
        <div class="text-center">
          <h3 ref="auroraContent" class="mb-4 text-2xl font-bold opacity-0">体验极光之美</h3>
          <p ref="auroraDesc" class="text-lg opacity-0">滚动时观察多层极光的视差移动效果</p>
        </div>
      </div>
    </section>

    <!-- Scroll Triggered Particles Section -->
    <section ref="particleSection" class="relative py-20 min-h-screen text-white bg-gradient-to-br from-gray-900 to-black particle-section">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 ref="particleTitle" class="mb-6 text-4xl font-bold opacity-0 md:text-5xl">
            滚动触发粒子系统
          </h2>
          <p ref="particleSubtitle" class="mx-auto max-w-3xl text-xl opacity-0">
            基于滚动进度动态生成和控制粒子动画
          </p>
        </div>
      </div>
      
      <!-- Particle Canvas -->
      <canvas 
        ref="particleCanvas" 
        class="absolute inset-0 w-full h-full pointer-events-none"
      ></canvas>
      
      <!-- Trigger Zones -->
      <div class="relative z-10 space-y-40">
        <div 
          v-for="(zone, index) in particleZones"
          :key="index"
          :ref="el => setParticleZoneRef(el, index)"
          class="flex items-center justify-center h-60 particle-zone"
        >
          <div class="p-8 text-center bg-black bg-opacity-50 rounded-2xl backdrop-blur-sm">
            <div class="mb-4 text-4xl">{{ zone.icon }}</div>
            <h3 class="mb-2 text-xl font-bold">{{ zone.title }}</h3>
            <p class="text-sm text-gray-300">{{ zone.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Progressive Loading Effects Section -->
    <section ref="loadingSection" class="py-20 min-h-screen bg-gray-50 loading-section">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 ref="loadingTitle" class="mb-6 text-4xl font-bold text-gray-900 opacity-0 md:text-5xl">
            渐进式加载效果
          </h2>
          <p ref="loadingSubtitle" class="mx-auto max-w-3xl text-xl text-gray-600 opacity-0">
            模拟真实的加载过程，创造优雅的等待体验
          </p>
        </div>

        <div class="space-y-20">
          <!-- Skeleton Loading -->
          <div class="text-center loading-item">
            <h3 ref="skeletonTitle" class="mb-8 text-2xl font-bold text-gray-900 opacity-0">
              骨架屏加载
            </h3>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div 
                v-for="i in 3"
                :key="i"
                :ref="el => setSkeletonRef(el, i)"
                class="skeleton-card p-6 bg-white rounded-2xl shadow-lg"
              >
                <div class="skeleton-avatar w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                <div class="skeleton-line h-4 bg-gray-200 rounded mb-2"></div>
                <div class="skeleton-line h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div class="skeleton-line h-3 bg-gray-200 rounded w-1/2"></div>
                
                <!-- Real Content (Hidden Initially) -->
                <div class="real-content opacity-0 absolute inset-0 p-6 bg-white rounded-2xl">
                  <div class="w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {{ i }}
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">内容项目 {{ i }}</h4>
                  <p class="text-gray-600 text-sm mb-2">这是加载完成后显示的真实内容</p>
                  <span class="text-xs text-green-600 font-medium">✓ 加载完成</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Bar Loading -->
          <div class="text-center loading-item">
            <h3 ref="progressTitle" class="mb-8 text-2xl font-bold text-gray-900 opacity-0">
              进度条加载
            </h3>
            <div class="mx-auto max-w-md">
              <div 
                ref="progressContainer"
                class="relative p-8 bg-white rounded-2xl shadow-lg opacity-0"
              >
                <div class="mb-4 text-center">
                  <div class="mb-2 text-lg font-semibold text-gray-900">加载进度</div>
                  <div ref="progressPercent" class="text-3xl font-bold text-blue-600">0%</div>
                </div>
                <div class="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    ref="progressFill"
                    class="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                    style="width: 0%"
                  ></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                </div>
                <div ref="progressText" class="mt-3 text-sm text-gray-600 text-center">
                  准备开始...
                </div>
              </div>
            </div>
          </div>

          <!-- Staggered Content Loading -->
          <div class="loading-item">
            <h3 ref="staggerTitle" class="mb-8 text-2xl font-bold text-gray-900 text-center opacity-0">
              交错内容加载
            </h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div 
                v-for="(item, index) in staggerItems"
                :key="index"
                :ref="el => setStaggerItemRef(el, index)"
                class="stagger-item opacity-0 transform translate-y-8 p-6 bg-white rounded-xl shadow-md"
              >
                <div class="mb-3 text-3xl">{{ item.icon }}</div>
                <h4 class="mb-2 text-lg font-bold text-gray-900">{{ item.title }}</h4>
                <p class="text-sm text-gray-600">{{ item.description }}</p>
                <div class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    :ref="el => setStaggerProgressRef(el, index)"
                    class="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                    style="width: 0%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final Section -->
    <section class="flex items-center py-20 min-h-screen text-white bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 final-section">
      <div class="px-4 mx-auto w-full max-w-7xl text-center sm:px-6 lg:px-8">
        <h2 ref="finalTitle" class="mb-8 text-5xl font-bold opacity-0 md:text-6xl">
          滚动动画的魅力
        </h2>
        <p ref="finalText" class="mx-auto max-w-4xl text-xl leading-relaxed opacity-0 md:text-2xl">
          通过精心设计的滚动动画，我们可以创造出引人入胜的用户体验，
          让每一个滚动动作都充满惊喜与发现。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollParallaxAnimation from '@/components/animations/ScrollParallaxAnimation.vue'

gsap.registerPlugin(ScrollTrigger)

// Refs
const bgLayer1 = ref<HTMLElement>()
const bgLayer2 = ref<HTMLElement>()
const heroTitle = ref<HTMLElement>()
const heroSubtitle = ref<HTMLElement>()
const scrollHint = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()
const pinTitle = ref<HTMLElement>()
const pinSubtitle = ref<HTMLElement>()
const pinContainer = ref<HTMLElement>()
const revealTitle = ref<HTMLElement>()
const revealSubtitle = ref<HTMLElement>()
const imageReveal = ref<HTMLElement>()
const imageTitle = ref<HTMLElement>()
const imageDesc = ref<HTMLElement>()
const counterTitle = ref<HTMLElement>()
const textRevealTitle = ref<HTMLElement>()
const horizontalSection = ref<HTMLElement>()
const morphTitle = ref<HTMLElement>()
const morphContainer = ref<HTMLElement>()
const morphPath = ref<SVGPathElement>()
const finalTitle = ref<HTMLElement>()
const finalText = ref<HTMLElement>()

// New Aurora refs
const auroraSection = ref<HTMLElement>()
const auroraTitle = ref<HTMLElement>()
const auroraSubtitle = ref<HTMLElement>()
const auroraContent = ref<HTMLElement>()
const auroraDesc = ref<HTMLElement>()
const auroraCanvas = ref<HTMLCanvasElement>()

// Particle refs
const particleSection = ref<HTMLElement>()
const particleTitle = ref<HTMLElement>()
const particleSubtitle = ref<HTMLElement>()
const particleCanvas = ref<HTMLCanvasElement>()

// Loading refs
const loadingSection = ref<HTMLElement>()
const loadingTitle = ref<HTMLElement>()
const loadingSubtitle = ref<HTMLElement>()
const skeletonTitle = ref<HTMLElement>()
const progressTitle = ref<HTMLElement>()
const progressContainer = ref<HTMLElement>()
const progressPercent = ref<HTMLElement>()
const progressFill = ref<HTMLElement>()
const progressText = ref<HTMLElement>()
const staggerTitle = ref<HTMLElement>()

const bgStarRefs = ref<HTMLElement[]>([])
const pinItemRefs = ref<HTMLElement[]>([])
const counterRefs = ref<HTMLElement[]>([])
const counterNumberRefs = ref<HTMLElement[]>([])
const textLineRefs = ref<HTMLElement[]>([])
const horizontalPanelRefs = ref<HTMLElement[]>([])
const auroraLayerRefs = ref<HTMLElement[]>([])
const particleZoneRefs = ref<HTMLElement[]>([])
const skeletonRefs = ref<HTMLElement[]>([])
const staggerItemRefs = ref<HTMLElement[]>([])
const staggerProgressRefs = ref<HTMLElement[]>([])

// Data
const pinItems = [
  {
    icon: '🎨',
    title: '创意设计',
    description: '运用创意思维，设计独特的视觉效果和交互体验。'
  },
  {
    icon: '⚡',
    title: '高性能',
    description: '优化动画性能，确保在各种设备上都能流畅运行。'
  },
  {
    icon: '🎯',
    title: '用户体验',
    description: '以用户为中心，创造直观且令人愉悦的交互体验。'
  }
]

const counters = [
  { target: 1000, suffix: '+', label: '动画效果' },
  { target: 50, suffix: 'fps', label: '流畅帧率' },
  { target: 99, suffix: '%', label: '用户满意度' }
]

const textLines = [
  '滚动动画是现代网页设计中不可或缺的元素。',
  '它们能够引导用户的注意力，创造流畅的浏览体验。',
  '通过精心设计的动画时序，我们可以讲述引人入胜的故事。',
  '每一个动画都应该有其存在的意义和目的。',
  '最终的目标是创造出令人难忘的用户体验。'
]

const horizontalPanels = [
  {
    title: '开始探索',
    description: '滚动动画的奇妙世界等待着你的发现',
    icon: '🚀',
    bg: '#1f2937'
  },
  {
    title: '视差效果',
    description: '通过不同层次的移动速度创造深度感',
    icon: '🌌',
    bg: '#374151'
  },
  {
    title: '交互体验',
    description: '让用户成为故事的参与者，而不仅仅是观看者',
    icon: '✨',
    bg: '#4b5563'
  },
  {
    title: '完美结合',
    description: '技术与艺术的完美融合，创造无限可能',
    icon: '🎭',
    bg: '#6b7280'
  }
]

// New data for new sections
const particleZones = [
  {
    title: '螺旋粒子',
    description: '粒子以螺旋轨迹运动',
    icon: '🌀'
  },
  {
    title: '爆炸效果',
    description: '从中心向外扩散的粒子',
    icon: '💥'
  },
  {
    title: '磁场效应',
    description: '粒子受磁场影响的运动',
    icon: '🧲'
  },
  {
    title: '波浪涟漪',
    description: '如水波般扩散的粒子',
    icon: '🌊'
  }
]

const staggerItems = [
  {
    title: '用户界面',
    description: '现代化的界面设计',
    icon: '🎨'
  },
  {
    title: '性能优化',
    description: '极致的性能体验',
    icon: '⚡'
  },
  {
    title: '响应式设计',
    description: '适配所有设备',
    icon: '📱'
  },
  {
    title: '用户体验',
    description: '流畅的交互感受',
    icon: '🎯'
  }
]

// Animation state
let auroraAnimationId: number = 0
let particleAnimationId: number = 0
let particles: Array<{
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}> = []

// Helper functions
function setBgStarRef(el: HTMLElement | null, index: number) {
  if (el) bgStarRefs.value[index] = el
}

function setPinItemRef(el: HTMLElement | null, index: number) {
  if (el) pinItemRefs.value[index] = el
}

function setCounterRef(el: HTMLElement | null, index: number) {
  if (el) counterRefs.value[index] = el
}

function setCounterNumberRef(el: HTMLElement | null, index: number) {
  if (el) counterNumberRefs.value[index] = el
}

function setTextLineRef(el: HTMLElement | null, index: number) {
  if (el) textLineRefs.value[index] = el
}

function setHorizontalPanelRef(el: HTMLElement | null, index: number) {
  if (el) horizontalPanelRefs.value[index] = el
}

function setAuroraLayerRef(el: HTMLElement | null, index: number) {
  if (el) auroraLayerRefs.value[index] = el
}

function setParticleZoneRef(el: HTMLElement | null, index: number) {
  if (el) particleZoneRefs.value[index] = el
}

function setSkeletonRef(el: HTMLElement | null, index: number) {
  if (el) skeletonRefs.value[index] = el
}

function setStaggerItemRef(el: HTMLElement | null, index: number) {
  if (el) staggerItemRefs.value[index] = el
}

function setStaggerProgressRef(el: HTMLElement | null, index: number) {
  if (el) staggerProgressRefs.value[index] = el
}

function getRandomStarPosition(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`
  }
}

onMounted(async () => {
  await nextTick()
  initScrollAnimations()
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  
  // Clean up animations
  if (auroraAnimationId) {
    cancelAnimationFrame(auroraAnimationId)
  }
  if (particleAnimationId) {
    cancelAnimationFrame(particleAnimationId)
  }
})

function initScrollAnimations() {
  // Hero section animations
  gsap.timeline()
    .to(heroTitle.value, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
    .to(heroSubtitle.value, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
    .to(scrollHint.value, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")

  // Parallax stars
  bgStarRefs.value.forEach((star, index) => {
    if (star) {
      gsap.to(star, {
        y: -Math.random() * 500 - 200,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      })

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: self => {
          gsap.set(star, { y: -self.progress * Math.random() * 200 })
        }
      })
    }
  })

  // Scroll progress bar
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: self => {
      gsap.set(progressBar.value, { width: `${self.progress * 100}%` })
    }
  })

  // Pin section animations
  ScrollTrigger.create({
    trigger: pinTitle.value,
    start: "top 80%",
    animation: gsap.fromTo([pinTitle.value, pinSubtitle.value],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    )
  })

  // Pin items
  pinItemRefs.value.forEach((item, index) => {
    if (item) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        animation: gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.7)"
        })
      })
    }
  })

  // Image reveal animation
  ScrollTrigger.create({
    trigger: imageReveal.value,
    start: "top 80%",
    animation: gsap.timeline()
      .to(imageReveal.value?.querySelector('.image-overlay'), {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut"
      })
      .fromTo([imageTitle.value, imageDesc.value],
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      )
  })

  // Counter animations
  ScrollTrigger.create({
    trigger: counterTitle.value,
    start: "top 80%",
    animation: gsap.fromTo(counterTitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
  })

  counterRefs.value.forEach((counter, index) => {
    if (counter && counterNumberRefs.value[index]) {
      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        animation: gsap.timeline()
          .to(counter, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
          })
          .to({ value: 0 }, {
            value: counters[index].target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
              if (counterNumberRefs.value[index]) {
                counterNumberRefs.value[index].textContent = Math.round(this.targets()[0].value).toString()
              }
            }
          }, "-=0.3")
      })
    }
  })

  // Text reveal
  ScrollTrigger.create({
    trigger: textRevealTitle.value,
    start: "top 80%",
    animation: gsap.fromTo(textRevealTitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
  })

  textLineRefs.value.forEach((line, index) => {
    if (line) {
      ScrollTrigger.create({
        trigger: line,
        start: "top 90%",
        animation: gsap.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        })
      })
    }
  })

  // Horizontal scroll
  if (horizontalSection.value) {
    const horizontalContainer = horizontalSection.value.querySelector('.horizontal-container') as HTMLElement
    
    ScrollTrigger.create({
      trigger: horizontalSection.value,
      start: "top top",
      end: () => `+=${horizontalContainer.offsetWidth - window.innerWidth}`,
      pin: true,
      scrub: 1,
      animation: gsap.to(horizontalContainer, {
        x: () => -(horizontalContainer.offsetWidth - window.innerWidth),
        ease: "none"
      })
    })
  }

  // Morph animation
  ScrollTrigger.create({
    trigger: morphTitle.value,
    start: "top 80%",
    animation: gsap.timeline()
      .fromTo(morphTitle.value,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .to(morphPath.value, {
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 2,
        ease: "power2.inOut"
      })
  })

  // Aurora Section Animations
  initAuroraAnimations()
  
  // Particle Section Animations
  initParticleAnimations()
  
  // Loading Section Animations
  initLoadingAnimations()

  // Final section
  ScrollTrigger.create({
    trigger: finalTitle.value,
    start: "top 80%",
    animation: gsap.fromTo([finalTitle.value, finalText.value],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power2.out" }
    )
  })
}

// Aurora Animation Functions
function initAuroraAnimations() {
  // Aurora title animations
  ScrollTrigger.create({
    trigger: auroraTitle.value,
    start: "top 80%",
    animation: gsap.fromTo([auroraTitle.value, auroraSubtitle.value],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    )
  })

  ScrollTrigger.create({
    trigger: auroraContent.value,
    start: "top 80%",
    animation: gsap.fromTo([auroraContent.value, auroraDesc.value],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    )
  })

  // Aurora parallax layers
  auroraLayerRefs.value.forEach((layer, index) => {
    if (layer) {
      ScrollTrigger.create({
        trigger: auroraSection.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: self => {
          const progress = self.progress
          const speed = (index + 1) * 0.5
          gsap.set(layer, {
            y: progress * 100 * speed,
            rotation: progress * 20 * (index % 2 === 0 ? 1 : -1)
          })
        }
      })
    }
  })

  // Aurora canvas animation
  if (auroraCanvas.value) {
    startAuroraCanvas()
  }
}

function startAuroraCanvas() {
  if (!auroraCanvas.value) return
  
  const canvas = auroraCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const auroraWaves = Array.from({ length: 3 }, (_, i) => ({
    amplitude: 50 + i * 20,
    frequency: 0.02 + i * 0.01,
    phase: 0,
    speed: 0.02 + i * 0.01,
    color: [`rgba(0, 255, 150, ${0.3 + i * 0.1})`, `rgba(0, 150, 255, ${0.3 + i * 0.1})`, `rgba(150, 0, 255, ${0.3 + i * 0.1})`][i]
  }))

  function animateAurora() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    auroraWaves.forEach(wave => {
      ctx.beginPath()
      ctx.strokeStyle = wave.color
      ctx.lineWidth = 3
      
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      
      wave.phase += wave.speed
    })
    
    auroraAnimationId = requestAnimationFrame(animateAurora)
  }
  
  animateAurora()
}

// Particle Animation Functions
function initParticleAnimations() {
  ScrollTrigger.create({
    trigger: particleTitle.value,
    start: "top 80%",
    animation: gsap.fromTo([particleTitle.value, particleSubtitle.value],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    )
  })

  // Particle canvas setup
  if (particleCanvas.value) {
    setupParticleCanvas()
  }

  // Particle zones
  particleZoneRefs.value.forEach((zone, index) => {
    if (zone) {
      ScrollTrigger.create({
        trigger: zone,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => createParticleEffect(index),
        onUpdate: self => {
          const progress = self.progress
          updateParticles(progress, index)
        }
      })
    }
  })
}

function setupParticleCanvas() {
  if (!particleCanvas.value) return
  
  const canvas = particleCanvas.value
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  startParticleAnimation()
}

function createParticleEffect(zoneIndex: number) {
  if (!particleCanvas.value) return
  
  const canvas = particleCanvas.value
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2 + zoneIndex * 300
  
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1,
      maxLife: 60 + Math.random() * 60,
      size: Math.random() * 4 + 2,
      color: `hsl(${zoneIndex * 90 + Math.random() * 60}, 70%, 60%)`
    })
  }
}

function updateParticles(progress: number, zoneIndex: number) {
  // Update particle behavior based on scroll progress and zone type
}

function startParticleAnimation() {
  if (!particleCanvas.value) return
  
  const canvas = particleCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach((particle, index) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--
      
      if (particle.life <= 0) {
        particles.splice(index, 1)
        return
      }
      
      const alpha = particle.life / particle.maxLife
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
    
    particleAnimationId = requestAnimationFrame(animate)
  }
  
  animate()
}

// Loading Animation Functions
function initLoadingAnimations() {
  // Loading section title
  ScrollTrigger.create({
    trigger: loadingTitle.value,
    start: "top 80%",
    animation: gsap.fromTo([loadingTitle.value, loadingSubtitle.value],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    )
  })

  // Skeleton loading
  ScrollTrigger.create({
    trigger: skeletonTitle.value,
    start: "top 80%",
    animation: gsap.fromTo(skeletonTitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
  })

  skeletonRefs.value.forEach((skeleton, index) => {
    if (skeleton) {
      ScrollTrigger.create({
        trigger: skeleton,
        start: "top 85%",
        onEnter: () => animateSkeletonLoading(skeleton, index)
      })
    }
  })

  // Progress bar loading
  ScrollTrigger.create({
    trigger: progressContainer.value,
    start: "top 80%",
    onEnter: () => animateProgressLoading()
  })

  // Staggered loading
  ScrollTrigger.create({
    trigger: staggerTitle.value,
    start: "top 80%",
    animation: gsap.fromTo(staggerTitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
  })

  staggerItemRefs.value.forEach((item, index) => {
    if (item) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => animateStaggerItem(item, index)
      })
    }
  })
}

function animateSkeletonLoading(skeleton: HTMLElement, index: number) {
  const realContent = skeleton.querySelector('.real-content') as HTMLElement
  const skeletonElements = skeleton.querySelectorAll('.skeleton-avatar, .skeleton-line')
  
  // Animate skeleton shimmer
  gsap.to(skeletonElements, {
    backgroundPosition: '200% 0',
    duration: 1.5,
    ease: "power2.inOut",
    repeat: 2,
    delay: index * 0.3
  })
  
  // Replace with real content
  gsap.delayedCall(2 + index * 0.3, () => {
    gsap.to(skeletonElements, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo(realContent, 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        )
      }
    })
  })
}

function animateProgressLoading() {
  if (!progressContainer.value || !progressFill.value || !progressPercent.value || !progressText.value) return
  
  // Show container
  gsap.fromTo(progressContainer.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  )
  
  // Progress animation
  const progressSteps = [
    { progress: 15, text: "初始化组件..." },
    { progress: 35, text: "加载资源文件..." },
    { progress: 60, text: "渲染界面元素..." },
    { progress: 85, text: "优化性能..." },
    { progress: 100, text: "加载完成！" }
  ]
  
  let currentStep = 0
  
  function animateStep() {
    if (currentStep >= progressSteps.length) return
    
    const step = progressSteps[currentStep]
    
    gsap.to(progressFill.value, {
      width: `${step.progress}%`,
      duration: 0.8,
      ease: "power2.out"
    })
    
    gsap.to({ value: currentStep === 0 ? 0 : progressSteps[currentStep - 1].progress }, {
      value: step.progress,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: function() {
        if (progressPercent.value) {
          progressPercent.value.textContent = `${Math.round(this.targets()[0].value)}%`
        }
      }
    })
    
    if (progressText.value) {
      gsap.to(progressText.value, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          if (progressText.value) {
            progressText.value.textContent = step.text
            gsap.to(progressText.value, { opacity: 1, duration: 0.2 })
          }
        }
      })
    }
    
    currentStep++
    
    if (currentStep < progressSteps.length) {
      gsap.delayedCall(1.2, animateStep)
    }
  }
  
  gsap.delayedCall(0.5, animateStep)
}

function animateStaggerItem(item: HTMLElement, index: number) {
  const progressBar = staggerProgressRefs.value[index]
  
  // Item entrance
  gsap.fromTo(item,
    { opacity: 0, y: 32 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      delay: index * 0.1,
      ease: "back.out(1.7)" 
    }
  )
  
  // Progress bar fill
  if (progressBar) {
    gsap.delayedCall(0.5 + index * 0.1, () => {
      gsap.fromTo(progressBar,
        { width: "0%" },
        { 
          width: "100%", 
          duration: 1.5,
          ease: "power2.out"
        }
      )
    })
  }
}
</script>

<style scoped>
.parallax-hero {
  background: linear-gradient(-45deg, #1e1b4b, #312e81, #1e40af, #1e3a8a);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.horizontal-scroll-section {
  overflow: hidden;
}

.horizontal-container {
  width: fit-content;
}

.horizontal-panel {
  min-height: 100vh;
}

.morph-container svg {
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
}

.image-overlay {
  transition: transform 0.3s ease;
}

/* Aurora Section Styles */
.aurora-section {
  position: relative;
  overflow: hidden;
}

.aurora-layer {
  mix-blend-mode: screen;
  opacity: 0.8;
}

/* Particle Section Styles */
.particle-zone {
  backdrop-filter: blur(10px);
}

/* Loading Section Styles */
.skeleton-card {
  position: relative;
}

.skeleton-avatar,
.skeleton-line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.real-content {
  backdrop-filter: blur(10px);
}

.stagger-item {
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
