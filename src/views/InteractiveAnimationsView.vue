<template>
  <div class="interactive-animations-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-pink-600 to-red-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6">交互动画效果</h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          探索鼠标交互和用户响应的动画
        </p>
      </div>
    </section>

    <!-- Mouse Follower -->
    <div 
      ref="mouseFollower"
      class="mouse-follower fixed w-4 h-4 bg-pink-500 rounded-full pointer-events-none z-50 opacity-80 mix-blend-difference"
      style="transform: translate(-50%, -50%)"
    ></div>

    <!-- Hover Effects -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">悬浮效果动画</h2>
          <p class="text-gray-600 mb-8">鼠标悬浮时的各种精美动画效果</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Card Hover 1 -->
            <div 
              ref="hoverCard1"
              class="hover-card bg-white rounded-2xl p-8 shadow-lg cursor-pointer transform transition-transform hover:scale-105"
              @mouseenter="onCardHover1Enter"
              @mouseleave="onCardHover1Leave"
            >
              <div class="card-icon text-4xl mb-4">🎨</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">创意设计</h3>
              <p class="text-gray-600">悬浮时图标会旋转，卡片会轻微倾斜</p>
            </div>

            <!-- Card Hover 2 -->
            <div 
              ref="hoverCard2"
              class="hover-card bg-white rounded-2xl p-8 shadow-lg cursor-pointer relative overflow-hidden"
              @mouseenter="onCardHover2Enter"
              @mouseleave="onCardHover2Leave"
            >
              <div class="card-background absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity"></div>
              <div class="relative z-10">
                <div class="card-icon text-4xl mb-4">⚡</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">高性能</h3>
                <p class="text-gray-600">悬浮时背景渐变显现，文字颜色改变</p>
              </div>
            </div>

            <!-- Card Hover 3 -->
            <div 
              ref="hoverCard3"
              class="hover-card bg-white rounded-2xl p-8 shadow-lg cursor-pointer"
              @mouseenter="onCardHover3Enter"
              @mouseleave="onCardHover3Leave"
            >
              <div class="card-icon text-4xl mb-4">🎯</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">用户体验</h3>
              <p class="text-gray-600">悬浮时产生波纹效果</p>
              <div class="ripple-container absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Magnetic Effects -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">磁性吸引动画</h2>
          <p class="text-gray-600 mb-8">元素跟随鼠标移动的磁性效果</p>
          
          <div class="flex flex-wrap justify-center gap-8 mb-12">
            <button 
              v-for="(button, index) in magneticButtons"
              :key="index"
              :ref="el => setMagneticButtonRef(el, index)"
              class="magnetic-button relative px-8 py-4 rounded-full font-bold text-white transition-all duration-300"
              :style="{ background: button.gradient }"
              @mouseenter="onMagneticEnter"
              @mouseleave="onMagneticLeave"
              @mousemove="onMagneticMove"
            >
              <span class="relative z-10">{{ button.text }}</span>
            </button>
          </div>

          <!-- Magnetic Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div 
              v-for="(item, index) in magneticCards"
              :key="index"
              :ref="el => setMagneticCardRef(el, index)"
              class="magnetic-card bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg cursor-pointer"
              @mouseenter="onMagneticCardEnter"
              @mouseleave="onMagneticCardLeave"
              @mousemove="onMagneticCardMove"
            >
              <div class="text-5xl mb-4">{{ item.icon }}</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Drag and Drop -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">拖拽动画</h2>
          <p class="text-gray-300 mb-8">可拖拽的元素和流体动画</p>
          
          <div class="drag-container relative h-96 bg-gray-800 rounded-2xl overflow-hidden">
            <div 
              v-for="(ball, index) in draggableBalls"
              :key="index"
              :ref="el => setDraggableBallRef(el, index)"
              class="draggable-ball absolute w-16 h-16 rounded-full cursor-grab active:cursor-grabbing"
              :style="{
                background: ball.gradient,
                left: ball.x + 'px',
                top: ball.y + 'px'
              }"
              @mousedown="startDrag($event, index)"
            >
              <div class="w-full h-full rounded-full bg-white bg-opacity-20"></div>
            </div>
            
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p class="text-gray-400 text-lg">拖动彩色球球试试看！</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Click Animations -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">点击动画效果</h2>
          <p class="text-gray-600 mb-8">各种点击反馈和按钮动画</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <!-- Pulse Button -->
            <button 
              ref="pulseButton"
              @click="onPulseClick"
              class="pulse-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors relative overflow-hidden"
            >
              脉冲效果
            </button>

            <!-- Shake Button -->
            <button 
              ref="shakeButton"
              @click="onShakeClick"
              class="shake-button bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              震动效果
            </button>

            <!-- Bounce Button -->
            <button 
              ref="bounceButton"
              @click="onBounceClick"
              class="bounce-button bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              弹跳效果
            </button>

            <!-- Rotate Button -->
            <button 
              ref="rotateButton"
              @click="onRotateClick"
              class="rotate-button bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              旋转效果
            </button>
          </div>

          <!-- Like Button -->
          <div class="mt-12">
            <button 
              ref="likeButton"
              @click="onLikeClick"
              class="like-button bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition-colors relative overflow-hidden"
            >
              <span class="heart-icon">❤️</span>
              <span class="like-text ml-2">点赞</span>
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

function onMagneticLeave(e: MouseEvent) {
  const button = e.currentTarget as HTMLElement
  gsap.to(button, {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)"
  })
}

function onMagneticMove(e: MouseEvent) {
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
</style>
