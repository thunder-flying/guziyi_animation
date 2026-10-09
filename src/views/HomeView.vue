<template>
  <div class="home-view">

    <!-- Hero Section -->
    <section class="overflow-hidden relative min-h-screen hero-section" style="padding-top: 80px;">
      <!-- 多层背景系统 -->
      <div class="absolute inset-0">
        <!-- 深空星系背景 -->
        <div class="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900"></div>
        
        <!-- 数字矩阵雨 -->
        <canvas 
          ref="matrixCanvas" 
          class="absolute inset-0 w-full h-full opacity-20"
        ></canvas>
        
        <!-- DNA螺旋画布 -->
        <canvas 
          ref="dnaCanvas" 
          class="absolute inset-0 w-full h-full opacity-80"
        ></canvas>
        
        <!-- 主要粒子系统 -->
        <!-- <canvas 
          ref="heroCanvas" 
          class="absolute inset-0 w-full h-full"
          @mousemove="onMouseMove"
          @click="onCanvasClick"
        ></canvas> -->
        
        
        
        
        
        <!-- 神经网络节点 -->
        <!-- <svg ref="neuralNetwork" class="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#0080ff;stop-opacity:0" />
            </radialGradient>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.6" />
              <stop offset="50%" style="stop-color:#0080ff;stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:#8000ff;stop-opacity:0.6" />
            </linearGradient>
          </defs>
        </svg> -->
      </div>

      

      <!-- 主要内容 -->
      <div class="flex relative z-20 flex-col justify-center items-center px-4 text-center text-white" style="min-height: calc(100vh - 80px); padding-top: 40px;">
        <!-- 全息投影主标题 -->
        <div class="relative mb-12">
          <!-- 标题背景全息效果 -->
          <div ref="titleHologram" class="absolute inset-0 opacity-30">
            <div class="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur-xl"></div>
          </div>
          
          <!-- 扫描线效果 -->
          <div ref="scanLines" class="absolute inset-0 pointer-events-none">
            <div 
              v-for="i in 10" 
              :key="`scan-${i}`"
              :ref="el => setScanLineRef(el, i)"
              class="absolute w-full h-0.5 bg-cyan-400 opacity-50 scan-line"
              :style="{ top: `${i * 10}%` }"
            ></div>
          </div>
          
          <h1 ref="heroTitle" class="relative mb-4 text-6xl font-bold md:text-8xl lg:text-9xl holographic-text">
            <span v-for="(char, index) in '动画展示厅'" :key="index" :ref="el => setTitleCharRef(el, index)" class="inline-block glitch-text">
              {{ char }}
            </span>
          </h1>
          
          <!-- 量子装饰粒子 -->
          <div ref="quantumParticles" class="absolute inset-0 pointer-events-none">
            <div 
              v-for="i in 20" 
              :key="`quantum-${i}`"
              :ref="el => setQuantumRef(el, i)"
              class="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              :style="getQuantumStyle(i)"
            ></div>
          </div>
          
          <!-- 全息边框 -->
          <div ref="holoBorder" class="absolute inset-0 rounded-lg border-2 border-cyan-400 opacity-30">
            <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
            <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
            <div class="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
          </div>
        </div>

        <!-- 数据流式副标题 -->
        <div class="relative mb-12">
          <!-- 终端窗口风格 -->
          <div ref="terminalWindow" class="relative p-6 rounded-lg border backdrop-blur-sm bg-black/50 border-cyan-400/50">
            <!-- 终端标题栏 -->
            <div class="flex items-center mb-4 space-x-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="ml-4 font-mono text-sm text-cyan-400">future_animation_lab@matrix:~$</span>
            </div>
            
            <!-- 打字机效果文字 -->
            <div ref="typewriter" class="font-mono text-left">
              <div ref="typeLine1" class="mb-2 text-cyan-400">
                <span class="text-green-400">></span> 
                <span ref="typeText1" class="typewriter-cursor"></span>
              </div>
              <div ref="typeLine2" class="mb-2 text-blue-400 opacity-0">
                <span class="text-green-400">></span> 
                <span ref="typeText2" class="typewriter-cursor"></span>
              </div>
              <div ref="typeLine3" class="text-purple-400 opacity-0">
                <span class="text-green-400">></span> 
                <span ref="typeText3" class="typewriter-cursor"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 统计数据 -->
        <div ref="statsContainer" class="flex justify-center mb-12 space-x-8 opacity-0">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div ref="statNumber" class="text-2xl font-bold text-gradient" :data-target="stat.value">{{ stat.value }}</div>
            <div class="text-sm text-gray-300">{{ stat.label }}</div>
          </div>
        </div>

        <!-- 全息操作台 -->
        <div class="relative mb-12">
          <!-- 控制面板背景 -->
          <div ref="controlPanel" class="relative p-8 rounded-2xl border backdrop-blur-md bg-black/30 border-cyan-400/50">
            <!-- 面板装饰线 -->
            <div class="overflow-hidden absolute inset-0 rounded-2xl">
              <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
              <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
            </div>
            
            <div class="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8">
              <!-- 主要操作按钮 -->
              <button 
                ref="heroButton"
                @click="scrollToShowcase"
                @mouseenter="onButtonHover"
                @mouseleave="onButtonLeave"
                class="relative opacity-0 cyber-button cyber-button-primary"
              >
                <!-- 按钮内部结构 -->
                <div class="flex relative z-10 items-center px-8 py-4 space-x-3">
                  <!-- 状态指示器 -->
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="font-mono text-lg font-bold">INITIATE_EXPLORATION</span>
                  <div class="flex justify-center items-center w-6 h-6 rounded border border-cyan-400">
                    <svg class="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </div>
                </div>
                
                <!-- 按钮特效层 -->
                <div class="absolute inset-0 bg-gradient-to-r rounded-lg opacity-0 transition-opacity duration-300 from-cyan-500/20 to-blue-500/20 hover-gradient"></div>
                <div ref="buttonScanLine" class="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 opacity-0 transform -translate-x-full"></div>
              </button>
              
              <!-- 演示按钮 -->
              <button 
                ref="demoButton"
                @click="triggerDemo"
                class="relative opacity-0 cyber-button cyber-button-secondary"
              >
                <div class="flex relative z-10 items-center px-6 py-3 space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span class="font-mono text-lg font-medium">RUN_DEMO</span>
                  <div class="flex justify-center items-center w-6 h-6 rounded border border-orange-400">
                    <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            
            <!-- 系统状态显示 -->
            <div ref="systemStatus" class="flex justify-center mt-6 space-x-6 font-mono text-sm opacity-0">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-green-400">SYSTEM_ONLINE</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span class="text-blue-400">NEURAL_NET_ACTIVE</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span class="text-purple-400">QUANTUM_READY</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 技术标签 -->
        <div ref="techTags" class="flex flex-wrap gap-3 justify-center mt-12 opacity-0">
          <span v-for="tech in technologies" :key="tech" class="px-4 py-2 text-sm font-medium rounded-full border backdrop-blur-sm text-white/80 bg-white/10 border-white/20">
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- 浮动元素 -->
      <div class="absolute inset-0 pointer-events-none">
        <div 
          v-for="i in 12" 
          :key="`float-${i}`"
          :ref="el => setFloatingRef(el, i)"
          class="absolute w-2 h-2 rounded-full bg-white/30 quantum-particle"
          :style="getQuantumStyle(i)"
        ></div>
      </div>

      <!-- 滚动指示器 -->
      <div ref="scrollIndicator" class="absolute bottom-12 left-1/2 text-white opacity-0 animate-pulse transform -translate-x-1/2">
        <div class="flex flex-col items-center space-y-2">
          <span class="text-sm font-medium">向下探索</span>
          <div class="flex justify-center w-6 h-10 rounded-full border-2 border-white/50">
            <div class="mt-2 w-1 h-3 rounded-full animate-bounce bg-white/70"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section ref="showcaseSection" class="py-20 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-16 text-center">
          <h2 ref="showcaseTitle" class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            动画展示
          </h2>
          <p ref="showcaseSubtitle" class="mx-auto max-w-3xl text-xl text-gray-600">
            体验各种酷炫的动画效果，从文字动画到几何变换，从滚动触发到交互响应
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimationCard
            v-for="(card, index) in animationCards"
            :key="card.title"
            :ref="el => setCardRef(el, index)"
            :title="card.title"
            :description="card.description"
            :route="card.route"
            :icon="card.icon"
            :gradient="card.gradient"
            :features="card.features"
            :coming-soon="card.comingSoon"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-16 text-center">
          <h2 ref="featuresTitle" class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            我的动画创作理念
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div 
            v-for="(feature, index) in features"
            :key="feature.title"
            :ref="el => setFeatureRef(el, index)"
            class="p-6 text-center rounded-lg transition-shadow hover:shadow-lg"
          >
            <div class="flex justify-center items-center mx-auto mb-4 w-16 h-16 text-2xl text-white bg-gradient-to-r rounded-full"
                 :style="{ background: feature.gradient }">
              {{ feature.icon }}
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import AnimationCard from '@/components/ui/AnimationCard.vue'

import { useRouter } from 'vue-router'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const router = useRouter()

// 基础性能优化开关：遵循系统“减少动态效果”设置，或在中低性能设备上启用
const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false
const isPerformanceMode = ref<boolean>(
  prefersReducedMotion || (typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 8) <= 4) || window.innerWidth < 768
)
// Refs - 基础元素
const heroCanvas = ref<HTMLCanvasElement>()
const matrixCanvas = ref<HTMLCanvasElement>()
const dnaCanvas = ref<HTMLCanvasElement>()
const neuralNetwork = ref<SVGElement>()
const heroTitle = ref<HTMLElement>()
const heroButton = ref<HTMLElement>()
const demoButton = ref<HTMLElement>()
const scrollIndicator = ref<HTMLElement>()
const showcaseSection = ref<HTMLElement>()
const showcaseTitle = ref<HTMLElement>()
const showcaseSubtitle = ref<HTMLElement>()
const featuresTitle = ref<HTMLElement>()
const statsContainer = ref<HTMLElement>()
const techTags = ref<HTMLElement>()

// 新的科幻效果 refs
const titleHologram = ref<HTMLElement>()
const scanLines = ref<HTMLElement>()
const quantumParticles = ref<HTMLElement>()
const holoBorder = ref<HTMLElement>()
const terminalWindow = ref<HTMLElement>()
const typewriter = ref<HTMLElement>()
const typeLine1 = ref<HTMLElement>()
const typeLine2 = ref<HTMLElement>()
const typeLine3 = ref<HTMLElement>()
const typeText1 = ref<HTMLElement>()
const typeText2 = ref<HTMLElement>()
const typeText3 = ref<HTMLElement>()
const controlPanel = ref<HTMLElement>()
const buttonScanLine = ref<HTMLElement>()
const systemStatus = ref<HTMLElement>()
// 已移除全息投影环与能量脉冲

// 数组 refs
const titleCharRefs = ref<HTMLElement[]>([])
const cardRefs = ref<HTMLElement[]>([])
const featureRefs = ref<HTMLElement[]>([])
const scanLineRefs = ref<HTMLElement[]>([])
const quantumRefs = ref<HTMLElement[]>([])
// 已移除全息投影环与能量脉冲的引用
const floatingRefs = ref<HTMLElement[]>([])

// 粒子系统变量
let animationId: number = 0
let particles: Particle[] = []
let mouse = { x: 0, y: 0 }

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

// 统计数据（动态计算）
const codeLinesCount = ref<number>(0)
const animationCount = computed(() => animationCards.length)
const creativeIdeasCount = computed(() => features.length)
const stats = computed(() => [
  { label: '动画效果', value: animationCount.value },
  { label: '代码行数', value: codeLinesCount.value },
  { label: '创意想法', value: creativeIdeasCount.value }
])

// 技术标签
const technologies = [
  'Vue 3', 'TypeScript', 'GSAP', 'Canvas', 'CSS3', 'WebGL', 'Three.js'
]

// Data
const animationCards = [
  {
    title: 'AI 动画实验室',
    description: '切换 AI 能量球的待机、聆听、思考和回答状态，探索神经网络信号逐层传播的交互动画',
    route: '/ai-animations',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #123341 0%, #287f78 100%)',
    features: ['AI 能量球', '状态切换', '神经网络', '信号传播', '播放控制', '速度调节']
  },
  {
    title: '文字动画',
    description: '数字雨效果、音波可视化文字、分形文字、打字机效果、毛笔字动画、霓虹字体等创意文字动画',
    route: '/text-animations',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['数字雨效果', '音波可视化', '分形文字', '毛笔字动画', '霓虹字体', '3D透视文字']
  },
  {
    title: '几何动画',
    description: '液体变形动画、万花筒效果、折纸动画、SVG路径动画、粒子系统等几何图形变换',
    route: '/geometry-animations',
    icon: '🔷',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    features: ['液体变形', '万花筒效果', '折纸动画', 'SVG路径', '粒子系统', '形状变换']
  },
  {
    title: '滚动动画',
    description: '视差极光效果、滚动触发粒子、渐进式加载、视差滚动、元素揭示等滚动驱动动画',
    route: '/scroll-animations',
    icon: '📜',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    features: ['视差极光', '滚动粒子', '渐进加载', '视差滚动', '元素揭示', '水平滚动']
  },
  {
    title: '交互动画',
    description: '彩虹鼠标轨迹、重力模拟、磁性按钮、悬浮卡片、拖拽弹性等用户交互驱动的动画效果',
    route: '/interactive-animations',
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    features: ['彩虹轨迹', '重力模拟', '磁性按钮', '悬浮卡片', '拖拽弹性', '碰撞检测']
  },
  {
    title: '时间轴动画',
    description: '加载骨架屏、进度指示器、通知系统、手风琴效果、复杂时序控制等精确动画编排',
    route: '/timeline-animations',
    icon: '⏰',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    features: ['骨架屏', '进度指示', '通知系统', '手风琴', '时序控制', '动画队列']
  },
  {
    title: '3D视觉效果',
    description: '立体相册、全景展示、真实3D文字、光线追踪等高级3D动画效果',
    route: '/3d-effects',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    features: ['立体相册', '全景展示', '3D文字', '光线追踪', '阴影效果', '材质贴图'],
    comingSoon: false
  },
  {
    title: '视觉特效',
    description: '爆炸效果、水波纹、粘性连接、光影效果等震撼的视觉特效',
    route: '/visual-effects',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['爆炸效果', '水波纹', '粘性连接', '光影效果', '综合演示', '实时渲染'],
    comingSoon: false
  },
  {
    title: '游戏化动画',
    description: '天气动画、时钟效果、物理引擎等互动游戏体验',
    route: '/game-effects',
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    features: ['天气模拟', '动画时钟', '物理引擎', '碰撞检测', '重力系统', '时间艺术'],
    comingSoon: false
  }
]

const features = [
  {
    title: '流畅体验',
    description: '每个动画都经过精心调优，追求丝滑的60fps体验，让视觉效果更加震撼',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: '创意表达',
    description: '通过代码艺术化地表达想法，将技术与美学完美融合，创造独特的视觉语言',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: '技术探索',
    description: '持续探索动画技术的边界，从基础补间到复杂交互，记录每一次技术突破',
    icon: '💪',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
]

// Methods
function setTitleCharRef(el: HTMLElement | null, index: number) {
  if (el) titleCharRefs.value[index] = el
}

function setCardRef(el: any, index: number) {
  if (el) cardRefs.value[index] = el
}

function setFeatureRef(el: HTMLElement | null, index: number) {
  if (el) featureRefs.value[index] = el
}

// Ref设置函数
function setScanLineRef(el: HTMLElement | null, index: number) {
  if (el) scanLineRefs.value[index] = el
}

function setQuantumRef(el: HTMLElement | null, index: number) {
  if (el) quantumRefs.value[index] = el
}

// 已移除 setStreamRef（数据流瀑布）

// 已移除 setRingRef / setPulseRef

function setFloatingRef(el: HTMLElement | null, index: number) {
  if (el) floatingRefs.value[index] = el
}

// 样式计算函数
function getQuantumStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.1}s`
  }
}

// 已移除 getStreamStyle（数据流瀑布）

// 已移除 getRingStyle / getPulseStyle

function scrollToShowcase() {
  if (!showcaseSection.value) return
  
  // 平滑滚动到展示区域
  gsap.to(window, {
    duration: 0.5,
    scrollTo: {
      y: showcaseSection.value,
      offsetY: 80 // 导航栏高度偏移
    },
    ease: "power2.inOut",
    onComplete: () => {
      // 滚动完成后触发展示区域的动画
      if (showcaseTitle.value) {
        gsap.fromTo(showcaseTitle.value, 
          { opacity: 0.5, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
      }
    }
  })
}

function onButtonHover() {
  if (!heroButton.value) return
  
  const hoverGradient = heroButton.value.querySelector('.hover-gradient')
  if (hoverGradient) {
    gsap.to(hoverGradient, {
      opacity: 0.1,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  gsap.to(heroButton.value, {
    y: -2,
    duration: 0.3,
    ease: "power2.out"
  })
}

function onButtonLeave() {
  if (!heroButton.value) return
  
  const hoverGradient = heroButton.value.querySelector('.hover-gradient')
  if (hoverGradient) {
    gsap.to(hoverGradient, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  gsap.to(heroButton.value, {
    y: 0,
    duration: 0.3,
    ease: "power2.out"
  })
}

// 数字矩阵雨系统
function initMatrixRain() {
  if (!matrixCanvas.value) return
  
  const canvas = matrixCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const characters = '010110010110100101101001011010010110100101101001アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  const fontSize = 14
  const columns = Math.floor(canvas.width / fontSize)
  const drops: number[] = Array(columns).fill(0)

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#00ff41'
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)]
      ctx.fillText(char, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }

    requestAnimationFrame(drawMatrix)
  }

  drawMatrix()
}

// DNA螺旋系统
function initDNAHelix() {
  if (!dnaCanvas.value) return
  
  const canvas = dnaCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let rotation = 0
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  function drawDNA() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 双螺旋结构
    for (let i = 0; i < 100; i++) {
      const y = (i / 100) * canvas.height
      const angle1 = (i * 0.2) + rotation
      const angle2 = angle1 + Math.PI
      
      const x1 = centerX + Math.cos(angle1) * 80
      const x2 = centerX + Math.cos(angle2) * 80
      
      // 螺旋链1
      ctx.fillStyle = `rgba(0, 255, 255, ${0.8 - (Math.abs(y - centerY) / centerY) * 0.5})`
      ctx.beginPath()
      ctx.arc(x1, y, 3, 0, Math.PI * 2)
      ctx.fill()
      
      // 螺旋链2
      ctx.fillStyle = `rgba(255, 0, 255, ${0.8 - (Math.abs(y - centerY) / centerY) * 0.5})`
      ctx.beginPath()
      ctx.arc(x2, y, 3, 0, Math.PI * 2)
      ctx.fill()
      
      // 连接线
      if (i % 8 === 0) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - (Math.abs(y - centerY) / centerY) * 0.2})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.stroke()
      }
    }
    
    rotation += 0.02
    requestAnimationFrame(drawDNA)
  }

  drawDNA()
}

// 神经网络可视化
function initNeuralNetwork() {
  if (!neuralNetwork.value) return
  
  const svg = neuralNetwork.value
  const rect = svg.getBoundingClientRect()
  
  // 清除现有内容
  while (svg.firstChild && svg.firstChild !== svg.querySelector('defs')) {
    svg.removeChild(svg.firstChild)
  }
  
  const nodes: { x: number, y: number, layer: number }[] = []
  const connections: { from: number, to: number }[] = []
  
  // 创建神经网络结构
  const layers = [8, 12, 16, 12, 6]
  let nodeIndex = 0
  
  layers.forEach((nodeCount, layerIndex) => {
    const layerX = (rect.width / (layers.length - 1)) * layerIndex
    
    for (let i = 0; i < nodeCount; i++) {
      const y = (rect.height / (nodeCount + 1)) * (i + 1)
      nodes.push({ x: layerX, y, layer: layerIndex })
      
      // 连接到下一层
      if (layerIndex < layers.length - 1) {
        const nextLayerStart = nodeIndex + nodeCount
        const nextLayerSize = layers[layerIndex + 1]
        
        for (let j = 0; j < nextLayerSize; j++) {
          if (Math.random() > 0.3) { // 70%的连接概率
            connections.push({
              from: nodeIndex + i,
              to: nextLayerStart + j
            })
          }
        }
      }
    }
    nodeIndex += nodeCount
  })
  
  // 绘制连接线
  connections.forEach(conn => {
    const fromNode = nodes[conn.from]
    const toNode = nodes[conn.to]
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', fromNode.x.toString())
    line.setAttribute('y1', fromNode.y.toString())
    line.setAttribute('x2', toNode.x.toString())
    line.setAttribute('y2', toNode.y.toString())
    line.setAttribute('stroke', 'url(#connectionGradient)')
    line.setAttribute('stroke-width', '0.5')
    line.setAttribute('opacity', '0.3')
    svg.appendChild(line)
  })
  
  // 绘制节点
  nodes.forEach((node, index) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', node.x.toString())
    circle.setAttribute('cy', node.y.toString())
    circle.setAttribute('r', '4')
    circle.setAttribute('fill', 'url(#nodeGradient)')
    svg.appendChild(circle)
    
    // 添加脉冲动画
    gsap.to(circle, {
      r: 6,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2
    })
  })
}

// 打字机效果
function initTypewriterEffect() {
  interface TypedLine { en: string; zh: string }

  function getTypedLines(): TypedLine[] {
    return [
      {
        en: 'Initializing animation engine... ✅',
        zh: '正在初始化动画引擎... ✅'
      },
      {
        en: `Loaded ${animationCards.length} categories · Code ${codeLinesCount.value} lines · Ideas ${features.length}`,
        zh: `已加载 ${animationCards.length} 个动画效果 · 代码行数 ${codeLinesCount.value} 行 · 创意想法 ${features.length} 条`
      },
      {
        en: 'All set, click the button below to explore →',
        zh: '万事俱备，点击下方按钮开始探索 →'
      }
    ]
  }

  let currentLine = 0

  function typeText(element: HTMLElement | null, text: string, callback?: () => void) {
    if (!element) return

    let charIndex = 0
    element.textContent = ''

    function addChar() {
      if (charIndex < text.length) {
        element.textContent += text[charIndex]
        charIndex++
        setTimeout(addChar, Math.random() * 100 + 50)
      } else if (callback) {
        setTimeout(callback, 1000)
      }
    }

    addChar()
  }

  function startTyping() {
    const lines = getTypedLines()
    if (currentLine < lines.length) {
      const lineElements = [typeText1.value, typeText2.value, typeText3.value]
      const lineContainers = [typeLine1.value, typeLine2.value, typeLine3.value]

      if (lineContainers[currentLine]) {
        gsap.to(lineContainers[currentLine], { opacity: 1, duration: 0.3 })
      }

      const lang: 'en' | 'zh' = 'en'
      typeText(lineElements[currentLine], lines[currentLine][lang], () => {
        currentLine++
        startTyping()
      })
    }
  }

  setTimeout(startTyping, 2000)
}

// 粒子系统（升级版）
function initParticleSystem() {
  if (!heroCanvas.value) return
  
  const canvas = heroCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布大小
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 创建粒子
  function createParticle(x?: number, y?: number): Particle {
    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.8 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 100
    }
  }

  // 初始化粒子
  const particleCount = isPerformanceMode.value ? 80 : 150
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle())
  }

  // 动画循环
  function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      // 更新粒子位置
      particle.x += particle.vx
      particle.y += particle.vy
      particle.z += particle.vz
      particle.life++

      // 鼠标交互
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.01
        particle.vy += (dy / distance) * force * 0.01
      }

      // 边界检测
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // 生命周期
      if (particle.life > particle.maxLife) {
        particles[index] = createParticle()
        return
      }

      // 绘制粒子
      const scale = 1 + particle.z / 100
      const alpha = particle.opacity * (1 - particle.life / particle.maxLife)
      
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      if (!isPerformanceMode.value) {
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 10
      } else {
        ctx.shadowBlur = 0
      }
      
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // 连接线（性能模式下禁用，避免 O(n^2) 运算）
      if (!isPerformanceMode.value) {
        particles.forEach((other, otherIndex) => {
          if (index < otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
            )
            
            if (distance < 80) {
              ctx.save()
              ctx.globalAlpha = (80 - distance) / 80 * 0.1
              ctx.strokeStyle = '#ffffff'
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.stroke()
              ctx.restore()
            }
          }
        })
      }
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()
}

// 鼠标移动事件
function onMouseMove(event: MouseEvent) {
  if (!heroCanvas.value) return
  
  const rect = heroCanvas.value.getBoundingClientRect()
  mouse.x = event.clientX - rect.left
  mouse.y = event.clientY - rect.top
}

// 画布点击事件
function onCanvasClick(event: MouseEvent) {
  if (!heroCanvas.value) return
  
  const rect = heroCanvas.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 在点击位置创建爆炸效果
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: x,
      y: y,
      z: Math.random() * 50,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      vz: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
      color: '#FFD700',
      opacity: 1,
      life: 0,
      maxLife: 60
    })
  }
}

// 演示触发
function triggerDemo() {
  // 创建炫酷的演示效果
  const tl = gsap.timeline({
    onComplete: () => {
      // 动画完成后跳转到文字动画页面
      router.push('/text-animations')
    }
  })
  
  // 按钮扫描线效果
  if (buttonScanLine.value) {
    tl.to(buttonScanLine.value, {
      x: "100%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
  }
  
  // 已移除能量脉冲增强
  
  // 粒子爆炸
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      onCanvasClick({ clientX: Math.random() * window.innerWidth, clientY: Math.random() * window.innerHeight } as MouseEvent)
    }, i * 50)
  }
  
  // 已移除全息环旋转加速
}

// 数字计数动画
function animateNumbers() {
  const statNumbers = document.querySelectorAll('[ref="statNumber"]')
  statNumbers.forEach((element) => {
    const target = parseInt(element.getAttribute('data-target') || '0')
    gsap.to({ value: 0 }, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        element.textContent = Math.round((this as any).targets()[0].value).toString()
      }
    })
  })
}

onMounted(async () => {
  await nextTick()
  
  // 初始化所有系统
  if (!isPerformanceMode.value) {
    initMatrixRain()
    initDNAHelix()
  }
  // initNeuralNetwork()
  initParticleSystem()
  initTypewriterEffect()
  loadCodeLines()
  
  // 开始动画序列
  initAnimations()
})

function initAnimations() {
  // Hero section animations
  const heroTl = gsap.timeline()
  
  // 标题字符动画 - 更震撼的效果
  heroTl.fromTo(titleCharRefs.value,
    { y: 150, opacity: 0, rotationX: -90, scale: 0.5 },
    { 
      y: 0, 
      opacity: 1, 
      rotationX: 0,
      scale: 1,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }
  )
  // 全息边框动画
  .fromTo(holoBorder.value,
    { opacity: 0, scale: 0.8 },
    { opacity: 0.3, scale: 1, duration: 0.8, ease: "power2.out" },
    "-=0.3"
  )
  // 终端窗口动画
  .fromTo(terminalWindow.value,
    { y: 50, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.2"
  )
  // 控制面板动画
  .fromTo(controlPanel.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    "-=0.4"
  )
  // 统计数据
  .fromTo(statsContainer.value,
    { y: 50, opacity: 0, scale: 0.8 },
    { 
      y: 0, 
      opacity: 1, 
      scale: 1, 
      duration: 0.8, 
      ease: "back.out(1.7)",
      onComplete: animateNumbers
    },
    "-=0.2"
  )
  // 按钮组
  .fromTo([heroButton.value, demoButton.value],
    { y: 80, opacity: 0, scale: 0.8 },
    { 
      y: 0, 
      opacity: 1, 
      scale: 1, 
      duration: 0.8, 
      stagger: 0.2,
      ease: "back.out(1.7)" 
    },
    "-=0.2"
  )
  // 技术标签
  .fromTo(techTags.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    "-=0.2"
  )
  // 滚动指示器
  .fromTo(scrollIndicator.value,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    "-=0.1"
  )

  // 量子粒子动画
  quantumRefs.value.forEach((particle, index) => {
    if (particle) {
      gsap.set(particle, { scale: 0, opacity: 0 })
      gsap.to(particle, {
        scale: 1,
        opacity: 0.6,
        duration: 1,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      })
    }
  })

  // 浮动元素动画
  floatingRefs.value.forEach((element, index) => {
    if (element) {
      gsap.set(element, { opacity: 0, scale: 0 })
      gsap.to(element, {
        opacity: 0.6,
        scale: 1,
        duration: 1,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      })
    }
  })

  // 已移除数据流动画

  // 已移除全息环与能量脉冲动画

  // Scroll-triggered animations
  ScrollTrigger.create({
    trigger: showcaseSection.value,
    start: "top 80%",
    animation: gsap.timeline()
      .fromTo(showcaseTitle.value,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(showcaseSubtitle.value,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
  })

  // Cards animation
  cardRefs.value.forEach((card, index) => {
    if (card && card.$el) {
      ScrollTrigger.create({
        trigger: card.$el,
        start: "top 85%",
        animation: gsap.fromTo(card.$el,
          { y: 60, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            ease: "power2.out",
            delay: index * 0.1
          }
        )
      })
    }
  })

  // Features animation
  ScrollTrigger.create({
    trigger: featuresTitle.value,
    start: "top 80%",
    animation: gsap.fromTo(featuresTitle.value,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
  })

  featureRefs.value.forEach((feature, index) => {
    if (feature) {
      ScrollTrigger.create({
        trigger: feature,
        start: "top 85%",
        animation: gsap.fromTo(feature,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            ease: "power2.out",
            delay: index * 0.2
          }
        )
      })
    }
  })
}

// 动态加载代码行数
async function loadCodeLines() {
  try {
    const res = await fetch('/stats.json', { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json()
    if (data && typeof data.codeLines === 'number') {
      codeLinesCount.value = data.codeLines
    }
  } catch {
    // ignore network errors; keep default 0
  }
}

// 清理函数
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.hero-section {
  perspective: 1000px;
  position: relative;
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
}

/* 全息投影文字效果 */
.holographic-text {
  color: #00ffff;
  text-shadow: 
    0 0 5px #00ffff,
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 40px #0080ff,
    0 1px 0 #003d82,
    0 2px 0 #003170,
    0 3px 0 #00245e,
    0 4px 0 #00184c,
    0 5px 10px rgba(0, 0, 0, 0.6);
  animation: holographic-flicker 3s linear infinite;
}

@keyframes holographic-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 
      0 0 5px #00ffff,
      0 0 10px #00ffff,
      0 0 20px #00ffff,
      0 0 40px #0080ff;
  }
  20%, 24%, 55% {
    text-shadow: 
      0 0 5px #00ffff,
      0 0 10px #00ffff,
      0 0 20px #00ffff,
      0 0 40px #0080ff,
      0 0 80px #0080ff;
  }
}

/* 故障文字效果 */
.glitch-text {
  position: relative;
  animation: glitch 2s linear infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-1 0.5s linear infinite reverse;
  color: #ff0040;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.5s linear infinite reverse;
  color: #00ff40;
  z-index: -2;
}

@keyframes glitch {
  0%, 74%, 100% {
    transform: translate(0);
  }
  75% {
    transform: translate(2px, -2px);
  }
  76% {
    transform: translate(-2px, 2px);
  }
}

@keyframes glitch-1 {
  0%, 74%, 100% {
    transform: translate(0);
  }
  75% {
    transform: translate(1px, -1px);
    opacity: 0.8;
  }
}

@keyframes glitch-2 {
  0%, 74%, 100% {
    transform: translate(0);
  }
  75% {
    transform: translate(-1px, 1px);
    opacity: 0.8;
  }
}

/* 网络朋克按钮 */
.cyber-button {
  background: linear-gradient(45deg, #1a1a2e, #16213e);
  border: 2px solid #00ffff;
  border-radius: 8px;
  color: #00ffff;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
}

.cyber-button:hover {
  background: linear-gradient(45deg, #16213e, #1a1a2e);
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.5),
    inset 0 0 30px rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
}

.cyber-button-primary {
  border-color: #00ffff;
  color: #00ffff;
}

.cyber-button-secondary {
  border-color: #ff8000;
  color: #ff8000;
  box-shadow: 
    0 0 20px rgba(255, 128, 0, 0.3),
    inset 0 0 20px rgba(255, 128, 0, 0.1);
}

.cyber-button-secondary:hover {
  box-shadow: 
    0 0 30px rgba(255, 128, 0, 0.5),
    inset 0 0 30px rgba(255, 128, 0, 0.2);
}

/* 打字机光标 */
.typewriter-cursor::after {
  content: '▋';
  color: #00ffff;
  animation: cursor-blink 1s infinite;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 扫描线效果 */
.scan-line {
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(1000%);
    opacity: 0;
  }
}

/* 已移除数据流动画样式 */

/* 全息投影环 */
.holo-ring {
  animation: ring-pulse 4s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.6;
  }
}

/* 能量脉冲 */
.energy-pulse {
  animation: pulse-energy 2s ease-in-out infinite;
}

@keyframes pulse-energy {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.8;
  }
}

/* 量子粒子 */
.quantum-particle {
  animation: quantum-float 4s ease-in-out infinite;
}

@keyframes quantum-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  25% {
    transform: translate(10px, -10px) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translate(-5px, -20px) scale(0.8);
    opacity: 0.8;
  }
  75% {
    transform: translate(-10px, -5px) scale(1.1);
    opacity: 0.9;
  }
}

/* 终端窗口样式 */
.terminal-window {
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #00ffff;
  border-radius: 8px;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
}

/* 渐变文字 */
.text-gradient {
  background: linear-gradient(135deg, #00ffff, #0080ff, #8000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite alternate;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* 径向渐变背景 */
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* 悬浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* 脉冲发光效果 */
.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite alternate;
}

@keyframes pulse-glow {
  from {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  }
  to {
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4);
  }
}

/* 按钮增强效果 */
.group:hover .group-hover\\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* 技术标签悬浮效果 */
.tech-tag {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-tag:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* 统计数字增强 */
.text-gradient {
  font-weight: 800;
  font-feature-settings: 'tnum';
  letter-spacing: -0.025em;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .text-glow {
    text-shadow: 
      0 0 5px rgba(139, 92, 246, 0.5),
      0 0 10px rgba(139, 92, 246, 0.3);
  }
}

/* 滚动指示器增强 */
.scroll-indicator {
  animation: bounce-enhanced 2s infinite;
}

@keyframes bounce-enhanced {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -8px, 0);
  }
  90% {
    transform: translate3d(0, -3px, 0);
  }
}

/* 光效层动画 */
.light-effect {
  animation: light-pulse 4s ease-in-out infinite;
}

@keyframes light-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
</style>
