<template>
  <div class="pt-16 interactive-animations-view">
    <!-- Page Header -->
    <section class="py-20 text-white bg-gradient-to-r from-pink-600 to-red-600">
      <div class="px-4 mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
        <h1 ref="pageTitle" class="mb-6 text-5xl font-bold md:text-6xl">交互动画效果</h1>
        <p ref="pageSubtitle" class="mx-auto max-w-3xl text-xl opacity-90 md:text-2xl">
          探索鼠标交互和用户响应的动画
        </p>
      </div>
    </section>

    <!-- Mouse Follower -->
    <div 
      ref="mouseFollower"
      class="fixed z-50 w-4 h-4 bg-pink-500 rounded-full opacity-80 mix-blend-difference pointer-events-none mouse-follower"
      style="transform: translate(-50%, -50%)"
    ></div>

    <!-- Hover Effects -->
    <section class="py-20 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">悬浮效果动画</h2>
          <p class="mb-8 text-gray-600">鼠标悬浮时的各种精美动画效果</p>
          
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <!-- Card Hover 1 -->
            <div 
              ref="hoverCard1"
              class="p-8 bg-white rounded-2xl shadow-lg transition-transform transform cursor-pointer hover-card hover:scale-105"
              @mouseenter="onCardHover1Enter"
              @mouseleave="onCardHover1Leave"
            >
              <div class="mb-4 text-4xl card-icon">🎨</div>
              <h3 class="mb-3 text-xl font-bold text-gray-900">创意设计</h3>
              <p class="text-gray-600">悬浮时图标会旋转，卡片会轻微倾斜</p>
            </div>

            <!-- Card Hover 2 -->
            <div 
              ref="hoverCard2"
              class="overflow-hidden relative p-8 bg-white rounded-2xl shadow-lg cursor-pointer hover-card"
              @mouseenter="onCardHover2Enter"
              @mouseleave="onCardHover2Leave"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity card-background"></div>
              <div class="relative z-10">
                <div class="mb-4 text-4xl card-icon">⚡</div>
                <h3 class="mb-3 text-xl font-bold text-gray-900">高性能</h3>
                <p class="text-gray-600">悬浮时背景渐变显现，文字颜色改变</p>
              </div>
            </div>

            <!-- Card Hover 3 -->
            <div 
              ref="hoverCard3"
              class="p-8 bg-white rounded-2xl shadow-lg cursor-pointer hover-card"
              @mouseenter="onCardHover3Enter"
              @mouseleave="onCardHover3Leave"
            >
              <div class="mb-4 text-4xl card-icon">🎯</div>
              <h3 class="mb-3 text-xl font-bold text-gray-900">用户体验</h3>
              <p class="text-gray-600">悬浮时产生波纹效果</p>
              <div class="overflow-hidden absolute inset-0 rounded-2xl pointer-events-none ripple-container"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Magnetic Effects -->
    <section class="py-20 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">磁性吸引动画</h2>
          <p class="mb-8 text-gray-600">元素跟随鼠标移动的磁性效果</p>
          
          <div class="flex flex-wrap gap-8 justify-center mb-12">
            <button 
              v-for="(button, index) in magneticButtons"
              :key="index"
              :ref="el => setMagneticButtonRef(el, index)"
              class="relative px-8 py-4 font-bold text-white rounded-full transition-all duration-300 magnetic-button"
              :style="{ background: button.gradient }"
              @mouseenter="onMagneticEnter"
              @mouseleave="onOriginalMagneticLeave"
              @mousemove="onOriginalMagneticMove"
            >
              <span class="relative z-10">{{ button.text }}</span>
            </button>
          </div>

          <!-- Magnetic Cards -->
          <div class="grid grid-cols-1 gap-12 mx-auto max-w-4xl md:grid-cols-2">
            <div 
              v-for="(item, index) in magneticCards"
              :key="index"
              :ref="el => setMagneticCardRef(el, index)"
              class="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg cursor-pointer magnetic-card"
              @mouseenter="onMagneticCardEnter"
              @mouseleave="onMagneticCardLeave"
              @mousemove="onMagneticCardMove"
            >
              <div class="mb-4 text-5xl">{{ item.icon }}</div>
              <h3 class="mb-3 text-2xl font-bold text-gray-900">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rainbow Trail -->
    <section class="py-20 bg-black">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">彩虹鼠标轨迹</h2>
          <p class="mb-8 text-gray-300">鼠标移动时留下绚丽的彩虹轨迹</p>
          
          <div 
            ref="rainbowContainer"
            class="overflow-hidden relative h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl rainbow-trail-container cursor-none"
            @mousemove="onRainbowMouseMove"
            @mouseenter="enableRainbowTrail"
            @mouseleave="disableRainbowTrail"
          >
            <div class="flex absolute inset-0 justify-center items-center">
              <div class="text-center">
                <h3 class="mb-4 text-2xl font-bold text-white">在这里移动鼠标</h3>
                <p class="text-gray-400">感受绚烂的彩虹轨迹效果</p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center mt-6">
            <button 
              @click="changeRainbowMode('normal')"
              class="px-4 py-2 text-white bg-purple-600 rounded-lg transition-colors hover:bg-purple-700"
            >
              普通模式
            </button>
            <button 
              @click="changeRainbowMode('spiral')"
              class="px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
            >
              螺旋模式
            </button>
            <button 
              @click="changeRainbowMode('fireworks')"
              class="px-4 py-2 text-white bg-pink-600 rounded-lg transition-colors hover:bg-pink-700"
            >
              烟花模式
            </button>
            <button 
              @click="clearRainbowTrail"
              class="px-4 py-2 text-white bg-gray-600 rounded-lg transition-colors hover:bg-gray-700"
            >
              清除轨迹
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gravity Simulation -->
    <section class="py-20 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">重力模拟动画</h2>
          <p class="mb-8 text-gray-300">物理引擎驱动的重力和碰撞效果</p>
          
                      <div 
              ref="gravityContainer"
              class="overflow-hidden relative h-96 bg-black bg-opacity-50 rounded-2xl gravity-container"
              @click="addGravityBall"
              style="cursor: crosshair"
            >
            <div class="absolute top-4 left-4 text-sm text-white">
              <p>点击添加小球 | 重力: <span ref="gravityValue">9.8</span></p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center mt-6">
            <button 
              @click="setGravity(5)"
              class="px-4 py-2 text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
            >
              低重力
            </button>
            <button 
              @click="setGravity(9.8)"
              class="px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
            >
              地球重力
            </button>
            <button 
              @click="setGravity(15)"
              class="px-4 py-2 text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700"
            >
              高重力
            </button>
            <button 
              @click="clearGravityBalls"
              class="px-4 py-2 text-white bg-gray-600 rounded-lg transition-colors hover:bg-gray-700"
            >
              清空小球
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Magnetic Buttons -->
    <section class="py-20 bg-gray-100">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">增强磁性按钮</h2>
          <p class="mb-8 text-gray-600">更强大的磁性吸引和动态效果</p>
          
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <!-- Magnetic Button 1 -->
            <div class="flex justify-center">
              <div 
                ref="magneticButton1"
                class="overflow-hidden relative w-48 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full cursor-pointer magnetic-btn"
                @mousemove="onEnhancedMagneticMove"
                @mouseleave="onEnhancedMagneticLeave"
                data-magnetic="1"
              >
                <div class="flex absolute inset-0 justify-center items-center text-lg font-bold text-white">
                  磁性按钮 1
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 transition-opacity magnetic-bg"></div>
              </div>
            </div>

            <!-- Magnetic Button 2 -->
            <div class="flex justify-center">
              <div 
                ref="magneticButton2"
                class="overflow-hidden relative w-48 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full cursor-pointer magnetic-btn"
                @mousemove="onEnhancedMagneticMove"
                @mouseleave="onEnhancedMagneticLeave"
                data-magnetic="2"
              >
                <div class="flex absolute inset-0 justify-center items-center text-lg font-bold text-white">
                  磁性按钮 2
                </div>
                <div class="absolute inset-0 magnetic-particles"></div>
              </div>
            </div>

            <!-- Magnetic Button 3 -->
            <div class="flex justify-center">
              <div 
                ref="magneticButton3"
                class="overflow-hidden relative w-48 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full cursor-pointer magnetic-btn"
                @mousemove="onEnhancedMagneticMove"
                @mouseleave="onEnhancedMagneticLeave"
                data-magnetic="3"
              >
                <div class="flex absolute inset-0 justify-center items-center text-lg font-bold text-white">
                  磁性按钮 3
                </div>
                <div class="absolute inset-0 magnetic-ripple"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Floating Cards -->
    <section class="py-20 bg-gray-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">悬浮卡片效果</h2>
          <p class="mb-8 text-gray-300">3D悬浮和光影跟随的卡片动画</p>
          
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div 
              v-for="i in 6"
              :key="i"
              :ref="el => setFloatingCardRef(el, i)"
              class="overflow-hidden relative h-64 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl cursor-pointer floating-card"
              style="transform-style: preserve-3d; perspective: 1000px;"
              @mousemove="onFloatingCardMove"
              @mouseleave="onFloatingCardLeave"
              :data-card="i"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 floating-card-shine"></div>
              
              <div class="absolute inset-4 rounded-xl border-2 border-white border-opacity-20">
                <div class="flex flex-col justify-center items-center h-full text-white">
                  <div class="mb-4 text-4xl">{{ ['💎', '⚡', '🌟', '🔥', '💫', '✨'][i-1] }}</div>
                  <h3 class="mb-2 text-xl font-bold">悬浮卡片 {{ i }}</h3>
                  <p class="text-sm text-center opacity-80">感受3D悬浮的魅力</p>
                </div>
              </div>
              
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 floating-card-reflection"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Drag and Drop -->
    <section class="py-20 text-white bg-gray-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">拖拽动画</h2>
          <p class="mb-8 text-gray-300">可拖拽的元素和流体动画</p>
          
          <div class="overflow-hidden relative h-96 bg-gray-800 rounded-2xl drag-container">
            <div 
              v-for="(ball, index) in draggableBalls"
              :key="index"
              :ref="el => setDraggableBallRef(el, index)"
              class="absolute w-16 h-16 rounded-full draggable-ball cursor-grab active:cursor-grabbing"
              :style="{
                background: ball.gradient,
                left: ball.x + 'px',
                top: ball.y + 'px'
              }"
              @mousedown="startDrag($event, index)"
            >
              <div class="w-full h-full bg-white bg-opacity-20 rounded-full"></div>
            </div>
            
            <div class="flex absolute inset-0 justify-center items-center pointer-events-none">
              <p class="text-lg text-gray-400">拖动彩色球球试试看！</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Click Animations -->
    <section class="py-20 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">点击动画效果</h2>
          <p class="mb-8 text-gray-600">各种点击反馈和按钮动画</p>
          
          <div class="grid grid-cols-2 gap-6 mx-auto max-w-4xl md:grid-cols-4">
            <!-- Pulse Button -->
            <button 
              ref="pulseButton"
              @click="onPulseClick"
              class="overflow-hidden relative px-6 py-4 font-bold text-white bg-blue-500 rounded-lg transition-colors pulse-button hover:bg-blue-600"
            >
              脉冲效果
            </button>

            <!-- Shake Button -->
            <button 
              ref="shakeButton"
              @click="onShakeClick"
              class="px-6 py-4 font-bold text-white bg-green-500 rounded-lg transition-colors shake-button hover:bg-green-600"
            >
              震动效果
            </button>

            <!-- Bounce Button -->
            <button 
              ref="bounceButton"
              @click="onBounceClick"
              class="px-6 py-4 font-bold text-white bg-purple-500 rounded-lg transition-colors bounce-button hover:bg-purple-600"
            >
              弹跳效果
            </button>

            <!-- Rotate Button -->
            <button 
              ref="rotateButton"
              @click="onRotateClick"
              class="px-6 py-4 font-bold text-white bg-orange-500 rounded-lg transition-colors rotate-button hover:bg-orange-600"
            >
              旋转效果
            </button>
          </div>

          <!-- Like Button -->
          <div class="mt-12">
            <button 
              ref="likeButton"
              @click="onLikeClick"
              class="overflow-hidden relative px-8 py-4 font-bold text-white bg-red-500 rounded-full transition-colors like-button hover:bg-red-600"
            >
              <span class="heart-icon">❤️</span>
              <span class="ml-2 like-text">点赞</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Particle Effect Animation Section -->
    <ParticleEffectAnimation 
      :initial-particle-count="300"
      :auto-start="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import ParticleEffectAnimation from '@/components/animations/ParticleEffectAnimation.vue'

gsap.registerPlugin(Draggable)

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const mouseFollower = ref<HTMLElement>()
const hoverCard1 = ref<HTMLElement>()
const hoverCard2 = ref<HTMLElement>()
const hoverCard3 = ref<HTMLElement>()
const pulseButton = ref<HTMLElement>()
const shakeButton = ref<HTMLElement>()
const bounceButton = ref<HTMLElement>()
const rotateButton = ref<HTMLElement>()
const likeButton = ref<HTMLElement>()

const magneticButtonRefs = ref<HTMLElement[]>([])
const magneticCardRefs = ref<HTMLElement[]>([])
const draggableBallRefs = ref<HTMLElement[]>([])

// New animation refs
const rainbowContainer = ref<HTMLElement>()
const gravityContainer = ref<HTMLElement>()
const gravityValue = ref<HTMLElement>()
const magneticButton1 = ref<HTMLElement>()
const magneticButton2 = ref<HTMLElement>()
const magneticButton3 = ref<HTMLElement>()
const floatingCardRefs = ref<HTMLElement[]>([])

// Data
const magneticButtons = [
  { text: '立即体验', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { text: '了解更多', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { text: '开始使用', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
]

const magneticCards = [
  {
    icon: '🎪',
    title: '互动体验',
    description: '鼠标靠近时，卡片会被"吸引"向鼠标方向移动'
  },
  {
    icon: '🌈',
    title: '视觉反馈',
    description: '丰富的视觉反馈让用户清楚地感受到交互效果'
  }
]

const draggableBalls = [
  { x: 100, y: 100, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { x: 200, y: 150, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { x: 300, y: 100, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { x: 150, y: 200, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
]

let currentDragIndex = -1

// New animation data
let rainbowTrails: HTMLElement[] = []
let rainbowMode = 'normal'
let rainbowEnabled = false

let gravityBalls: Array<{
  element: HTMLElement
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}> = []
let gravityValue_num = 9.8
let gravityAnimationId: number = 0

// Helper functions
function setMagneticButtonRef(el: HTMLElement | null, index: number) {
  if (el) magneticButtonRefs.value[index] = el
}

function setMagneticCardRef(el: HTMLElement | null, index: number) {
  if (el) magneticCardRefs.value[index] = el
}

function setDraggableBallRef(el: HTMLElement | null, index: number) {
  if (el) draggableBallRefs.value[index] = el
}

function setFloatingCardRef(el: HTMLElement | null, index: number) {
  if (el) floatingCardRefs.value[index] = el
}

onMounted(async () => {
  await nextTick()
  initInteractiveAnimations()
  initMouseFollower()
  initDraggable()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateMouseFollower)
})

function initInteractiveAnimations() {
  // 页面标题动画
  gsap.fromTo(pageTitle.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  )
  
  gsap.fromTo(pageSubtitle.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
  )
}

function initMouseFollower() {
  document.addEventListener('mousemove', updateMouseFollower)
}

function updateMouseFollower(e: MouseEvent) {
  if (mouseFollower.value) {
    gsap.to(mouseFollower.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

// Hover Effects
function onCardHover1Enter(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const icon = card.querySelector('.card-icon') as HTMLElement
  
  gsap.to(card, {
    rotationY: 5,
    rotationX: 5,
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out"
  })
  
  gsap.to(icon, {
    rotation: 360,
    scale: 1.2,
    duration: 0.6,
    ease: "back.out(1.7)"
  })
}

function onCardHover1Leave(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const icon = card.querySelector('.card-icon') as HTMLElement
  
  gsap.to(card, {
    rotationY: 0,
    rotationX: 0,
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  })
  
  gsap.to(icon, {
    rotation: 0,
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  })
}

function onCardHover2Enter(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const background = card.querySelector('.card-background') as HTMLElement
  const content = card.querySelector('.relative') as HTMLElement
  
  gsap.to(background, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  })
  
  gsap.to(content, {
    color: "white",
    duration: 0.3,
    ease: "power2.out"
  })
}

function onCardHover2Leave(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const background = card.querySelector('.card-background') as HTMLElement
  const content = card.querySelector('.relative') as HTMLElement
  
  gsap.to(background, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out"
  })
  
  gsap.to(content, {
    color: "",
    duration: 0.3,
    ease: "power2.out"
  })
}

function onCardHover3Enter(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rippleContainer = card.querySelector('.ripple-container') as HTMLElement
  
  // 创建波纹效果
  const ripple = document.createElement('div')
  ripple.className = 'absolute bg-blue-500 rounded-full opacity-30'
  ripple.style.width = '0px'
  ripple.style.height = '0px'
  ripple.style.left = '50%'
  ripple.style.top = '50%'
  ripple.style.transform = 'translate(-50%, -50%)'
  
  rippleContainer.appendChild(ripple)
  
  gsap.to(ripple, {
    width: '200px',
    height: '200px',
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      ripple.remove()
    }
  })
}

function onCardHover3Leave(e: MouseEvent) {
  // 波纹效果在动画完成后自动移除
}

// Magnetic Effects
function onMagneticEnter(e: MouseEvent) {
  const button = e.currentTarget as HTMLElement
  gsap.to(button, {
    scale: 1.1,
    duration: 0.3,
    ease: "power2.out"
  })
}

function onOriginalMagneticLeave(e: MouseEvent) {
  const button = e.currentTarget as HTMLElement
  gsap.to(button, {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)"
  })
}

function onOriginalMagneticMove(e: MouseEvent) {
  const button = e.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out"
  })
}

function onMagneticCardEnter(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  gsap.to(card, {
    scale: 1.02,
    duration: 0.3,
    ease: "power2.out"
  })
}

function onMagneticCardLeave(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  gsap.to(card, {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)"
  })
}

function onMagneticCardMove(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(card, {
    x: x * 0.1,
    y: y * 0.1,
    duration: 0.3,
    ease: "power2.out"
  })
}

// Drag and Drop
function initDraggable() {
  draggableBallRefs.value.forEach((ball, index) => {
    if (ball) {
      Draggable.create(ball, {
        type: "x,y",
        bounds: ".drag-container",
        inertia: true,
        onDragStart: () => {
          gsap.to(ball, {
            scale: 1.2,
            duration: 0.2,
            ease: "power2.out"
          })
        },
        onDragEnd: () => {
          gsap.to(ball, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)"
          })
        }
      })
    }
  })
}

function startDrag(e: MouseEvent, index: number) {
  currentDragIndex = index
}

// Click Animations
function onPulseClick() {
  if (!pulseButton.value) return
  
  // 创建脉冲效果
  const pulse = document.createElement('div')
  pulse.className = 'absolute inset-0 bg-white rounded-lg opacity-30'
  pulseButton.value.appendChild(pulse)
  
  gsap.fromTo(pulse, 
    { scale: 0, opacity: 0.6 },
    { 
      scale: 2, 
      opacity: 0, 
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => pulse.remove()
    }
  )
}

function onShakeClick() {
  if (!shakeButton.value) return
  
  gsap.to(shakeButton.value, {
    x: -10,
    duration: 0.1,
    yoyo: true,
    repeat: 5,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.set(shakeButton.value, { x: 0 })
    }
  })
}

function onBounceClick() {
  if (!bounceButton.value) return
  
  gsap.to(bounceButton.value, {
    y: -20,
    duration: 0.3,
    ease: "power2.out",
    yoyo: true,
    repeat: 1
  })
}

function onRotateClick() {
  if (!rotateButton.value) return
  
  gsap.to(rotateButton.value, {
    rotation: "+=360",
    duration: 0.6,
    ease: "back.out(1.7)"
  })
}

function onLikeClick() {
  if (!likeButton.value) return
  
  const heartIcon = likeButton.value.querySelector('.heart-icon') as HTMLElement
  
  // 创建飞出的心形
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('div')
    heart.innerHTML = '❤️'
    heart.className = 'absolute text-xl pointer-events-none'
    heart.style.left = '50%'
    heart.style.top = '50%'
    heart.style.transform = 'translate(-50%, -50%)'
    
    likeButton.value.appendChild(heart)
    
    const angle = (i / 6) * Math.PI * 2
    const distance = 100 + Math.random() * 50
    
    gsap.to(heart, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => heart.remove()
    })
  }
  
  // 主按钮动画
  gsap.to(heartIcon, {
    scale: 1.5,
    duration: 0.2,
    ease: "power2.out",
    yoyo: true,
    repeat: 1
  })
}

// Rainbow Trail Functions
function onRainbowMouseMove(event: MouseEvent) {
  if (!rainbowEnabled || !rainbowContainer.value) return
  
  const rect = rainbowContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  createRainbowTrail(x, y)
}

function enableRainbowTrail() {
  rainbowEnabled = true
}

function disableRainbowTrail() {
  rainbowEnabled = false
}

function createRainbowTrail(x: number, y: number) {
  if (!rainbowContainer.value) return
  
  const colors = ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff', '#ff0040']
  
  switch (rainbowMode) {
    case 'normal':
      for (let i = 0; i < 3; i++) {
        const trail = document.createElement('div')
        trail.className = 'absolute rounded-full pointer-events-none'
        trail.style.width = '12px'
        trail.style.height = '12px'
        trail.style.left = x + 'px'
        trail.style.top = y + 'px'
        trail.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`
        trail.style.transform = 'translate(-50%, -50%)'
        trail.style.filter = 'blur(1px)'
        
        rainbowContainer.value.appendChild(trail)
        rainbowTrails.push(trail)
        
        gsap.to(trail, {
          scale: 3,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            trail.remove()
            const index = rainbowTrails.indexOf(trail)
            if (index > -1) rainbowTrails.splice(index, 1)
          }
        })
      }
      break
      
    case 'spiral':
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const radius = 20
        const trailX = x + Math.cos(angle) * radius
        const trailY = y + Math.sin(angle) * radius
        
        const trail = document.createElement('div')
        trail.className = 'absolute rounded-full pointer-events-none'
        trail.style.width = '8px'
        trail.style.height = '8px'
        trail.style.left = trailX + 'px'
        trail.style.top = trailY + 'px'
        trail.style.background = colors[i % colors.length]
        trail.style.transform = 'translate(-50%, -50%)'
        trail.style.boxShadow = `0 0 20px ${colors[i % colors.length]}`
        
        rainbowContainer.value.appendChild(trail)
        rainbowTrails.push(trail)
        
        gsap.to(trail, {
          scale: 2,
          rotation: 360,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
          delay: i * 0.1,
          onComplete: () => {
            trail.remove()
            const index = rainbowTrails.indexOf(trail)
            if (index > -1) rainbowTrails.splice(index, 1)
          }
        })
      }
      break
      
    case 'fireworks':
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2
        const distance = Math.random() * 80 + 40
        
        const trail = document.createElement('div')
        trail.className = 'absolute rounded-full pointer-events-none'
        trail.style.width = '6px'
        trail.style.height = '6px'
        trail.style.left = x + 'px'
        trail.style.top = y + 'px'
        trail.style.background = colors[Math.floor(Math.random() * colors.length)]
        trail.style.transform = 'translate(-50%, -50%)'
        
        rainbowContainer.value.appendChild(trail)
        rainbowTrails.push(trail)
        
        gsap.to(trail, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 0,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: Math.random() * 0.3,
          onComplete: () => {
            trail.remove()
            const index = rainbowTrails.indexOf(trail)
            if (index > -1) rainbowTrails.splice(index, 1)
          }
        })
      }
      break
  }
  
  // 限制轨迹数量
  if (rainbowTrails.length > 50) {
    const oldTrails = rainbowTrails.splice(0, rainbowTrails.length - 50)
    oldTrails.forEach(trail => trail.remove())
  }
}

function changeRainbowMode(mode: string) {
  rainbowMode = mode
  clearRainbowTrail()
}

function clearRainbowTrail() {
  rainbowTrails.forEach(trail => trail.remove())
  rainbowTrails = []
}

// Gravity Simulation Functions
function addGravityBall(event: MouseEvent) {
  if (!gravityContainer.value) return
  
  const rect = gravityContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const ball = document.createElement('div')
  const radius = Math.random() * 15 + 10
  const hue = Math.random() * 360
  const color = `hsl(${hue}, 80%, 60%)`
  const lightColor = `hsl(${hue}, 90%, 80%)`
  
  ball.className = 'absolute rounded-full pointer-events-none'
  ball.style.width = radius * 2 + 'px'
  ball.style.height = radius * 2 + 'px'
  ball.style.left = (x - radius) + 'px'
  ball.style.top = (y - radius) + 'px'
  ball.style.background = `radial-gradient(circle at 30% 30%, ${lightColor}, ${color})`
  ball.style.boxShadow = `0 0 ${radius}px ${color}66, inset 0 2px 4px rgba(255,255,255,0.3)`
  ball.style.border = `1px solid ${color}`
  ball.style.zIndex = '10'
  
  gravityContainer.value.appendChild(ball)
  
  gravityBalls.push({
    element: ball,
    x: x, // 中心点x坐标
    y: y, // 中心点y坐标
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 5,
    radius: radius
  })
  
  if (!gravityAnimationId) {
    startGravityAnimation()
  }
}

function startGravityAnimation() {
  // 如果动画已经在运行，不要重新启动
  if (gravityAnimationId !== 0) {
    return
  }
  function animate() {
    if (!gravityContainer.value) {
      return
    }
    
    const containerRect = gravityContainer.value.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height
    
    // 限制调试信息输出
    
    gravityBalls.forEach((ball, index) => {
      // 应用重力
      ball.vy += gravityValue_num * 0.1
      
      // 更新位置
      ball.x += ball.vx * 0.5
      ball.y += ball.vy * 0.5
      
      // 碰撞检测和反弹
      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= width) {
        ball.vx *= -0.8
        ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x))
      }
      
      if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= height) {
        ball.vy *= -0.8
        ball.y = Math.max(ball.radius, Math.min(height - ball.radius, ball.y))
      }
      
      // 摩擦力
      ball.vx *= 0.999
      ball.vy *= 0.999
      
      // 更新DOM位置
      ball.element.style.left = (ball.x - ball.radius) + 'px'
      ball.element.style.top = (ball.y - ball.radius) + 'px'
      
      // 位置已更新
      
      // 移除速度很慢的球
      if (Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1 && ball.y > height - ball.radius - 5) {
        ball.element.remove()
        gravityBalls.splice(index, 1)
      }
    })
    
    if (gravityBalls.length > 0) {
      gravityAnimationId = requestAnimationFrame(animate)
    } else {
      // 如果没有小球了，停止动画
      gravityAnimationId = 0
    }
  }
  
  animate()
}

function setGravity(value: number) {
  gravityValue_num = value
  if (gravityValue.value) {
    gravityValue.value.textContent = value.toString()
  }
}

function clearGravityBalls() {
  gravityBalls.forEach(ball => ball.element.remove())
  gravityBalls = []
  if (gravityAnimationId) {
    cancelAnimationFrame(gravityAnimationId)
    gravityAnimationId = 0
  }
}

// Enhanced Magnetic Button Functions
function onEnhancedMagneticMove(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const x = event.clientX - rect.left - rect.width / 2
  const y = event.clientY - rect.top - rect.height / 2
  
  const distance = Math.sqrt(x * x + y * y)
  const maxDistance = 60
  
  if (distance < maxDistance) {
    const strength = (maxDistance - distance) / maxDistance
    const moveX = x * strength * 0.3
    const moveY = y * strength * 0.3
    
    gsap.to(button, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out"
    })
    
    // 特殊效果基于按钮类型
    const magneticType = button.getAttribute('data-magnetic')
    switch (magneticType) {
      case '1':
        const bg = button.querySelector('.magnetic-bg')
        if (bg) {
          gsap.to(bg, {
            opacity: strength * 0.5,
            duration: 0.3
          })
        }
        break
        
      case '2':
        // 粒子效果
        createMagneticParticles(button, x, y, strength)
        break
        
      case '3':
        // 波纹效果
        createMagneticRipple(button, x, y, strength)
        break
    }
  }
}

function onEnhancedMagneticLeave(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement
  
  gsap.to(button, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)"
  })
  
  // 清除特殊效果
  const bg = button.querySelector('.magnetic-bg')
  if (bg) {
    gsap.to(bg, {
      opacity: 0,
      duration: 0.3
    })
  }
}

function createMagneticParticles(button: HTMLElement, x: number, y: number, strength: number) {
  const particles = button.querySelector('.magnetic-particles')
  if (!particles) return
  
  for (let i = 0; i < 3; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-2 h-2 bg-white rounded-full opacity-80'
    particle.style.left = (button.offsetWidth / 2 + x) + 'px'
    particle.style.top = (button.offsetHeight / 2 + y) + 'px'
    particle.style.transform = 'translate(-50%, -50%)'
    
    particles.appendChild(particle)
    
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 50,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => particle.remove()
    })
  }
}

function createMagneticRipple(button: HTMLElement, x: number, y: number, strength: number) {
  const ripple = button.querySelector('.magnetic-ripple')
  if (!ripple) return
  
  const effect = document.createElement('div')
  effect.className = 'absolute rounded-full border-2 border-white opacity-60'
  effect.style.left = (button.offsetWidth / 2 + x) + 'px'
  effect.style.top = (button.offsetHeight / 2 + y) + 'px'
  effect.style.transform = 'translate(-50%, -50%)'
  effect.style.width = '0px'
  effect.style.height = '0px'
  
  ripple.appendChild(effect)
  
  gsap.to(effect, {
    width: '100px',
    height: '100px',
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => effect.remove()
  })
}

// Floating Card Functions
function onFloatingCardMove(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left - rect.width / 2
  const y = event.clientY - rect.top - rect.height / 2
  
  // 增加旋转角度使效果更明显
  const rotateX = (y / rect.height) * -30
  const rotateY = (x / rect.width) * 30
  
  gsap.to(card, {
    rotationX: rotateX,
    rotationY: rotateY,
    transformOrigin: "center center",
    transformPerspective: 1000,
    z: 50,
    boxShadow: `${rotateY * 0.5}px ${rotateX * 0.5}px 30px rgba(0,0,0,0.3)`,
    duration: 0.3,
    ease: "power2.out"
  })
  
  // 光影效果
  const shine = card.querySelector('.floating-card-shine')
  if (shine) {
    const intensity = Math.min(Math.sqrt(x * x + y * y) / 150, 1)
    gsap.to(shine, {
      opacity: intensity * 0.8,
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.2
    })
  }
  
  // 反射效果
  const reflection = card.querySelector('.floating-card-reflection')
  if (reflection) {
    gsap.to(reflection, {
      opacity: Math.abs(rotateX) / 30 * 0.5,
      duration: 0.2
    })
  }
}

function onFloatingCardLeave(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement
  
  gsap.to(card, {
    rotationX: 0,
    rotationY: 0,
    z: 0,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    duration: 0.6,
    ease: "elastic.out(1, 0.3)"
  })
  
  const shine = card.querySelector('.floating-card-shine')
  if (shine) {
    gsap.to(shine, {
      opacity: 0,
      x: 0,
      y: 0,
      duration: 0.3
    })
  }
  
  const reflection = card.querySelector('.floating-card-reflection')
  if (reflection) {
    gsap.to(reflection, {
      opacity: 0,
      duration: 0.3
    })
  }
}
</script>

<style scoped>
.hover-card {
  perspective: 1000px;
}

.magnetic-button:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.magnetic-card {
  perspective: 1000px;
}

.draggable-ball {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.draggable-ball:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.drag-container {
  background: radial-gradient(circle at center, #374151 0%, #1f2937 100%);
}

.mouse-follower {
  transition: width 0.3s ease, height 0.3s ease;
}

.mouse-follower:hover {
  width: 2rem;
  height: 2rem;
}

/* Rainbow Trail Styles */
.rainbow-trail-container {
  background: radial-gradient(circle at center, #1f2937 0%, #000000 100%);
}

/* Gravity Container Styles */
.gravity-container {
  background: radial-gradient(circle at center, #1e1b4b 0%, #000000 100%);
}

/* Magnetic Button Styles */
.magnetic-btn {
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.magnetic-btn:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

/* Floating Card Styles */
.floating-card {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.3s ease;
}

.floating-card:hover {
  z-index: 10;
}

.floating-card-shine {
  background: radial-gradient(circle at center, rgba(255,255,255,0.4), rgba(255,255,255,0.1), transparent);
  filter: blur(30px);
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.floating-card-reflection {
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
  transition: opacity 0.3s ease;
}

/* Enhanced Trail Effects */
@keyframes rainbow-trail {
  0% { 
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: scale(3) rotate(360deg);
    opacity: 0;
  }
}

/* Gravity Ball Effects */
@keyframes gravity-glow {
  0%, 100% { 
    box-shadow: 0 0 20px currentColor;
  }
  50% { 
    box-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
  }
}
</style>
