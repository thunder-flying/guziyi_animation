<template>
  <div class="visual-effects-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
      <div class="absolute inset-0">
        <!-- 背景粒子效果 -->
        <div 
          v-for="i in 30" 
          :key="i"
          :ref="el => setBgParticleRef(el, i)"
          class="absolute w-2 h-2 bg-white rounded-full opacity-20"
          :style="getBgParticleStyle(i)"
        ></div>
        
        <!-- 背景光束 -->
        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-12 scale-150"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6">
          视觉特效
        </h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          探索令人震撼的视觉特效，体验前沿的动画技术
        </p>
      </div>
    </section>

    <!-- 爆炸效果 Section -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">爆炸效果</h2>
          <p class="text-gray-300 mb-8">逼真的爆炸特效，粒子四散的震撼效果</p>
          
          <div class="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="triggerExplosion('firework')"
                class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                烟花爆炸
              </button>
              <button 
                @click="triggerExplosion('shockwave')"
                class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                冲击波
              </button>
              <button 
                @click="triggerExplosion('particle')"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                粒子爆炸
              </button>
              <button 
                @click="triggerExplosion('nuclear')"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                核爆效果
              </button>
            </div>

            <!-- 爆炸效果容器 -->
            <div ref="explosionContainer" class="explosion-container relative h-80 bg-black rounded-xl overflow-hidden cursor-crosshair" @click="onExplosionClick">
              <canvas ref="explosionCanvas" class="absolute inset-0 w-full h-full"></canvas>
              
              <!-- 爆炸中心指示器 -->
              <div ref="explosionCenter" class="absolute w-4 h-4 bg-red-500 rounded-full pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2">
                <div class="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
              </div>
              
              <!-- 爆炸粒子容器 -->
              <div ref="particleContainer" class="absolute inset-0 pointer-events-none"></div>
              
              <div class="absolute bottom-4 left-4 text-sm text-gray-400">
                点击任意位置触发爆炸效果
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 水波纹效果 Section -->
    <section class="py-20 bg-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">水波纹效果</h2>
          <p class="text-gray-600 mb-8">真实的水波扩散，涟漪传播效果</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="waterEffect('ripple')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                水波涟漪
              </button>
              <button 
                @click="waterEffect('drop')"
                class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                水滴效果
              </button>
              <button 
                @click="waterEffect('wave')"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                波浪传播
              </button>
              <button 
                @click="waterEffect('tsunami')"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                海啸效果
              </button>
            </div>

            <!-- 水波纹容器 -->
            <div ref="waterContainer" class="water-container relative h-80 bg-gradient-to-b from-blue-200 to-blue-600 rounded-xl overflow-hidden cursor-pointer" @click="onWaterClick">
              <canvas ref="waterCanvas" class="absolute inset-0 w-full h-full"></canvas>
              
              <!-- SVG 波纹 -->
              <svg ref="waterSVG" class="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
                    <stop offset="50%" style="stop-color:#87ceeb;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#4682b4;stop-opacity:0" />
                  </radialGradient>
                  
                  <filter id="waterFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                    <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.8 0"/>
                  </filter>
                </defs>
              </svg>
              
              <!-- 水面反射 -->
              <div class="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 mix-blend-overlay"></div>
              
              <div class="absolute bottom-4 left-4 text-sm text-blue-800">
                点击水面创建波纹
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 粘性连接效果 Section -->
    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">粘性连接效果</h2>
          <p class="text-gray-600 mb-8">元素间的有机连接，流体粘性动画</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="stickyEffect('metaballs')"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                液体球体
              </button>
              <button 
                @click="stickyEffect('connections')"
                class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                粒子连接
              </button>
              <button 
                @click="stickyEffect('morphing')"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                形态变换
              </button>
              <button 
                @click="stickyEffect('network')"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                网络连接
              </button>
            </div>

            <!-- 粘性连接容器 -->
            <div ref="stickyContainer" class="sticky-container relative h-80 bg-gray-900 rounded-xl overflow-hidden">
              <canvas ref="stickyCanvas" class="absolute inset-0 w-full h-full"></canvas>
              
              <!-- 粘性球体 -->
              <div 
                v-for="i in 8"
                :key="i"
                :ref="el => setStickyBallRef(el, i)"
                class="sticky-ball absolute w-12 h-12 rounded-full"
                :style="getStickyBallStyle(i)"
              ></div>
              
              <!-- SVG 连接线 -->
              <svg ref="stickySVG" class="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                    <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"/>
                  </filter>
                </defs>
              </svg>
              
              <div class="absolute bottom-4 left-4 text-sm text-gray-400">
                观察球体间的粘性连接效果
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 光影效果 Section -->
    <section class="py-20 bg-black text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">光影效果</h2>
          <p class="text-gray-300 mb-8">动态光照，阴影变换，光束追踪</p>
          
          <div class="bg-gray-900 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="lightEffect('spotlight')"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                聚光灯
              </button>
              <button 
                @click="lightEffect('neon')"
                class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                霓虹灯
              </button>
              <button 
                @click="lightEffect('laser')"
                class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                激光束
              </button>
              <button 
                @click="lightEffect('aurora')"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                极光效果
              </button>
            </div>

            <!-- 光影效果容器 -->
            <div ref="lightContainer" class="light-container relative h-80 bg-black rounded-xl overflow-hidden" @mousemove="onLightMouseMove">
              <canvas ref="lightCanvas" class="absolute inset-0 w-full h-full"></canvas>
              
              <!-- 光源 -->
              <div 
                v-for="i in 3"
                :key="i"
                :ref="el => setLightSourceRef(el, i)"
                class="light-source absolute w-6 h-6 rounded-full"
                :style="getLightSourceStyle(i)"
              >
                <div class="absolute inset-0 rounded-full animate-pulse"></div>
              </div>
              
              <!-- 3D 对象 -->
              <div 
                v-for="(obj, index) in lightObjects"
                :key="index"
                :ref="el => setLightObjectRef(el, index)"
                class="light-object absolute rounded-lg"
                :style="`
                  width: ${obj.size}px;
                  height: ${obj.size}px;
                  left: ${obj.x}%;
                  top: ${obj.y}%;
                  background: ${obj.color};
                  transform: translateZ(${obj.z}px);
                `"
              ></div>
              
              <!-- 光束和阴影将通过 Canvas 渲染 -->
              
              <div class="absolute bottom-4 left-4 text-sm text-gray-400">
                移动鼠标改变光源位置
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 综合特效演示 Section -->
    <section class="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">综合特效演示</h2>
          <p class="text-gray-200 mb-8">多种特效的组合展示，视觉盛宴</p>
          
          <div class="bg-black/50 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto backdrop-blur-sm">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="comprehensiveDemo('fireworks')"
                class="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                烟花秀
              </button>
              <button 
                @click="comprehensiveDemo('storm')"
                class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                风暴特效
              </button>
              <button 
                @click="comprehensiveDemo('magic')"
                class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                魔法效果
              </button>
              <button 
                @click="stopComprehensive()"
                class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                停止演示
              </button>
            </div>

            <!-- 综合演示容器 -->
            <div ref="comprehensiveContainer" class="comprehensive-container relative h-96 bg-black rounded-xl overflow-hidden">
              <canvas ref="comprehensiveCanvas" class="absolute inset-0 w-full h-full"></canvas>
              
              <!-- 多层效果容器 -->
              <div ref="effectLayer1" class="absolute inset-0 pointer-events-none"></div>
              <div ref="effectLayer2" class="absolute inset-0 pointer-events-none"></div>
              <div ref="effectLayer3" class="absolute inset-0 pointer-events-none"></div>
              
              <div class="absolute inset-0 flex items-center justify-center text-gray-400" v-if="!isComprehensiveActive">
                选择特效类型开始演示
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const explosionContainer = ref<HTMLElement>()
const explosionCanvas = ref<HTMLCanvasElement>()
const explosionCenter = ref<HTMLElement>()
const particleContainer = ref<HTMLElement>()
const waterContainer = ref<HTMLElement>()
const waterCanvas = ref<HTMLCanvasElement>()
const waterSVG = ref<SVGElement>()
const stickyContainer = ref<HTMLElement>()
const stickyCanvas = ref<HTMLCanvasElement>()
const stickySVG = ref<SVGElement>()
const lightContainer = ref<HTMLElement>()
const lightCanvas = ref<HTMLCanvasElement>()
const comprehensiveContainer = ref<HTMLElement>()
const comprehensiveCanvas = ref<HTMLCanvasElement>()
const effectLayer1 = ref<HTMLElement>()
const effectLayer2 = ref<HTMLElement>()
const effectLayer3 = ref<HTMLElement>()

// Ref arrays
const bgParticleRefs = ref<HTMLElement[]>([])
const stickyBallRefs = ref<HTMLElement[]>([])
const lightSourceRefs = ref<HTMLElement[]>([])
const lightObjectRefs = ref<HTMLElement[]>([])

// Data
const lightObjects = [
  { size: 50, x: 20, y: 30, z: 0, color: 'linear-gradient(45deg, #ff6b6b, #ee5a24)' },
  { size: 40, x: 60, y: 50, z: 20, color: 'linear-gradient(45deg, #0be88e, #00d4aa)' },
  { size: 60, x: 80, y: 20, z: -10, color: 'linear-gradient(45deg, #667eea, #764ba2)' }
]

// Animation state
let explosionAnimationId: number = 0
let waterAnimationId: number = 0
let stickyAnimationId: number = 0
let lightAnimationId: number = 0
let comprehensiveAnimationId: number = 0
const isComprehensiveActive = ref(false)

// Explosion particles
let explosionParticles: Array<{
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  gravity: number
}> = []

// Water ripples
let waterRipples: Array<{
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}> = []

// Sticky balls data
let stickyBalls: Array<{
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}> = []

// Helper functions
function setBgParticleRef(el: HTMLElement | null, index: number) {
  if (el) bgParticleRefs.value[index] = el
}

function setStickyBallRef(el: HTMLElement | null, index: number) {
  if (el) stickyBallRefs.value[index] = el
}

function setLightSourceRef(el: HTMLElement | null, index: number) {
  if (el) lightSourceRefs.value[index] = el
}

function setLightObjectRef(el: HTMLElement | null, index: number) {
  if (el) lightObjectRefs.value[index] = el
}

function getBgParticleStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }
}

function getStickyBallStyle(index: number) {
  const colors = [
    'linear-gradient(45deg, #ff6b6b, #ee5a24)',
    'linear-gradient(45deg, #0be88e, #00d4aa)',
    'linear-gradient(45deg, #667eea, #764ba2)',
    'linear-gradient(45deg, #f093fb, #f5576c)',
    'linear-gradient(45deg, #4facfe, #00f2fe)',
    'linear-gradient(45deg, #43e97b, #38f9d7)',
    'linear-gradient(45deg, #fa709a, #fee140)',
    'linear-gradient(45deg, #a8edea, #fed6e3)'
  ]
  
  return {
    left: `${10 + (index * 10)}%`,
    top: `${30 + Math.sin(index) * 20}%`,
    background: colors[index % colors.length],
    transform: `translate(-50%, -50%)`
  }
}

function getLightSourceStyle(index: number) {
  const positions = [
    { left: '20%', top: '20%', background: 'radial-gradient(circle, #ffff00, #ff8c00)' },
    { right: '20%', top: '30%', background: 'radial-gradient(circle, #00ffff, #0080ff)' },
    { left: '50%', bottom: '20%', background: 'radial-gradient(circle, #ff00ff, #8000ff)' }
  ]
  return positions[index - 1]
}

// Explosion Effects
function triggerExplosion(type: 'firework' | 'shockwave' | 'particle' | 'nuclear') {
  if (!explosionCanvas.value || !explosionContainer.value) return
  
  const rect = explosionContainer.value.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  createExplosion(centerX, centerY, type)
}

function onExplosionClick(event: MouseEvent) {
  if (!explosionContainer.value) return
  
  const rect = explosionContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  createExplosion(x, y, 'firework')
}

function createExplosion(x: number, y: number, type: string) {
  if (!explosionCenter.value) return
  
  // 显示爆炸中心
  gsap.set(explosionCenter.value, { left: x, top: y, opacity: 1, scale: 1 })
  gsap.to(explosionCenter.value, { 
    opacity: 0, 
    scale: 3, 
    duration: 0.5, 
    ease: "power2.out" 
  })
  
  // 创建粒子
  const particleCount = type === 'nuclear' ? 200 : type === 'firework' ? 150 : 100
  const colors = getExplosionColors(type)
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 / particleCount) * i + Math.random() * 0.5
    const speed = type === 'nuclear' ? 15 + Math.random() * 10 : 8 + Math.random() * 6
    const life = type === 'nuclear' ? 120 : 60 + Math.random() * 40
    
    explosionParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: life,
      maxLife: life,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: type === 'firework' ? 0.3 : 0.1
    })
  }
  
  // 冲击波效果
  if (type === 'shockwave' || type === 'nuclear') {
    createShockwave(x, y, type === 'nuclear' ? 300 : 200)
  }
  
  startExplosionAnimation()
}

function getExplosionColors(type: string): string[] {
  switch (type) {
    case 'firework':
      return ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    case 'nuclear':
      return ['#ff9ff3', '#f368e0', '#ff3838', '#ff9f43', '#feca57', '#ff6348']
    case 'particle':
      return ['#3742fa', '#2f3542', '#ff3838', '#70a1ff', '#5352ed']
    default:
      return ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24']
  }
}

function createShockwave(x: number, y: number, maxRadius: number) {
  if (!explosionContainer.value) return
  
  const shockwave = document.createElement('div')
  shockwave.className = 'absolute rounded-full border-4 border-white pointer-events-none'
  shockwave.style.left = x + 'px'
  shockwave.style.top = y + 'px'
  shockwave.style.transform = 'translate(-50%, -50%)'
  shockwave.style.width = '0px'
  shockwave.style.height = '0px'
  
  explosionContainer.value.appendChild(shockwave)
  
  gsap.to(shockwave, {
    width: maxRadius * 2,
    height: maxRadius * 2,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    onComplete: () => shockwave.remove()
  })
}

function startExplosionAnimation() {
  if (!explosionCanvas.value || explosionAnimationId !== 0) return
  
  const canvas = explosionCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    explosionParticles.forEach((particle, index) => {
      // 更新粒子位置
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += particle.gravity
      particle.life--
      
      // 移除死亡粒子
      if (particle.life <= 0) {
        explosionParticles.splice(index, 1)
        return
      }
      
      // 绘制粒子
      const alpha = particle.life / particle.maxLife
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
      ctx.fill()
      
      // 添加光晕效果
      ctx.shadowBlur = 10
      ctx.shadowColor = particle.color
      ctx.fill()
      ctx.restore()
    })
    
    if (explosionParticles.length > 0) {
      explosionAnimationId = requestAnimationFrame(animate)
    } else {
      explosionAnimationId = 0
    }
  }
  
  explosionAnimationId = requestAnimationFrame(animate)
}

// Water Effects
function waterEffect(type: 'ripple' | 'drop' | 'wave' | 'tsunami') {
  if (!waterContainer.value) return
  
  switch (type) {
    case 'ripple':
      createMultipleRipples()
      break
    case 'drop':
      simulateWaterDrop()
      break
    case 'wave':
      createWavePattern()
      break
    case 'tsunami':
      createTsunamiEffect()
      break
  }
}

function onWaterClick(event: MouseEvent) {
  if (!waterContainer.value) return
  
  const rect = waterContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  createWaterRipple(x, y)
}

function createWaterRipple(x: number, y: number, maxRadius: number = 100) {
  waterRipples.push({
    x: x,
    y: y,
    radius: 0,
    maxRadius: maxRadius,
    opacity: 1,
    speed: 2
  })
  
  startWaterAnimation()
}

function createMultipleRipples() {
  if (!waterContainer.value) return
  
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x = Math.random() * waterContainer.value!.offsetWidth
      const y = Math.random() * waterContainer.value!.offsetHeight
      createWaterRipple(x, y, 80 + Math.random() * 40)
    }, i * 300)
  }
}

function simulateWaterDrop() {
  if (!waterContainer.value) return
  
  const centerX = waterContainer.value.offsetWidth / 2
  const centerY = waterContainer.value.offsetHeight / 2
  
  // 创建水滴下落动画
  const dropElement = document.createElement('div')
  dropElement.className = 'absolute w-3 h-3 bg-blue-400 rounded-full'
  dropElement.style.left = centerX + 'px'
  dropElement.style.top = '10px'
  dropElement.style.transform = 'translateX(-50%)'
  
  waterContainer.value.appendChild(dropElement)
  
  gsap.to(dropElement, {
    y: centerY - 10,
    duration: 0.8,
    ease: "power2.in",
    onComplete: () => {
      createWaterRipple(centerX, centerY, 120)
      dropElement.remove()
    }
  })
}

function createWavePattern() {
  if (!waterContainer.value) return
  
  const width = waterContainer.value.offsetWidth
  const height = waterContainer.value.offsetHeight
  
  // 创建波浪模式
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const x = (i / 9) * width
      const y = height / 2 + Math.sin(i * 0.5) * 50
      createWaterRipple(x, y, 60)
    }, i * 100)
  }
}

function createTsunamiEffect() {
  if (!waterContainer.value) return
  
  const width = waterContainer.value.offsetWidth
  const height = waterContainer.value.offsetHeight
  
  // 创建海啸效果
  const tsunamiElement = document.createElement('div')
  tsunamiElement.className = 'absolute w-full h-20 bg-gradient-to-t from-blue-600 to-transparent opacity-70'
  tsunamiElement.style.bottom = '0'
  tsunamiElement.style.left = '-100%'
  
  waterContainer.value.appendChild(tsunamiElement)
  
  gsap.to(tsunamiElement, {
    left: '0%',
    duration: 2,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(tsunamiElement, {
        left: '100%',
        duration: 1.5,
        ease: "power2.in",
        onComplete: () => tsunamiElement.remove()
      })
    }
  })
  
  // 创建多个冲击波
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const x = i * (width / 7)
      const y = height * 0.8
      createWaterRipple(x, y, 150)
    }, i * 200)
  }
}

function startWaterAnimation() {
  if (!waterCanvas.value || waterAnimationId !== 0) return
  
  const canvas = waterCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    waterRipples.forEach((ripple, index) => {
      ripple.radius += ripple.speed
      ripple.opacity = Math.max(0, 1 - (ripple.radius / ripple.maxRadius))
      
      if (ripple.radius >= ripple.maxRadius) {
        waterRipples.splice(index, 1)
        return
      }
      
      // 绘制波纹
      ctx.save()
      ctx.globalAlpha = ripple.opacity
      ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
      ctx.stroke()
      
      // 内圈
      if (ripple.radius > 10) {
        ctx.globalAlpha = ripple.opacity * 0.5
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius - 10, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      ctx.restore()
    })
    
    if (waterRipples.length > 0) {
      waterAnimationId = requestAnimationFrame(animate)
    } else {
      waterAnimationId = 0
    }
  }
  
  waterAnimationId = requestAnimationFrame(animate)
}

// Sticky Effects
function stickyEffect(type: 'metaballs' | 'connections' | 'morphing' | 'network') {
  initStickyBalls()
  
  switch (type) {
    case 'metaballs':
      startMetaballsEffect()
      break
    case 'connections':
      startConnectionsEffect()
      break
    case 'morphing':
      startMorphingEffect()
      break
    case 'network':
      startNetworkEffect()
      break
  }
}

function initStickyBalls() {
  stickyBalls = []
  
  for (let i = 0; i < 8; i++) {
    stickyBalls.push({
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 20 + Math.random() * 15,
      color: `hsl(${i * 45}, 70%, 60%)`
    })
  }
}

function startMetaballsEffect() {
  startStickyAnimation()
  
  // 使用 CSS filter 创建液体效果
  if (stickyContainer.value) {
    stickyContainer.value.style.filter = 'url(#gooey)'
  }
  
  stickyBallRefs.value.forEach((ball, index) => {
    if (ball && stickyBalls[index]) {
      gsap.to(ball, {
        x: stickyBalls[index].x,
        y: stickyBalls[index].y,
        duration: 0.1,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          // 更新球的位置
          const ballData = stickyBalls[index]
          ballData.x += ballData.vx
          ballData.y += ballData.vy
          
          // 边界检测
          if (ballData.x <= ballData.radius || ballData.x >= 300 - ballData.radius) {
            ballData.vx *= -1
          }
          if (ballData.y <= ballData.radius || ballData.y >= 300 - ballData.radius) {
            ballData.vy *= -1
          }
        }
      })
    }
  })
}

function startConnectionsEffect() {
  startStickyAnimation()
  drawConnections()
}

function startMorphingEffect() {
  stickyBallRefs.value.forEach((ball, index) => {
    if (ball) {
      gsap.to(ball, {
        morphSVG: "circle",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }
  })
}

function startNetworkEffect() {
  // 创建网络连接效果
  drawNetworkConnections()
}

function startStickyAnimation() {
  if (!stickyCanvas.value || stickyAnimationId !== 0) return
  
  const canvas = stickyCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 更新和绘制粘性球
    stickyBalls.forEach((ball, index) => {
      ball.x += ball.vx
      ball.y += ball.vy
      
      // 边界检测
      if (ball.x <= ball.radius || ball.x >= canvas.width - ball.radius) {
        ball.vx *= -1
      }
      if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.vy *= -1
      }
      
      // 绘制球
      ctx.save()
      ctx.fillStyle = ball.color
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      // 同步DOM元素位置
      const ballElement = stickyBallRefs.value[index]
      if (ballElement) {
        gsap.set(ballElement, {
          left: ball.x,
          top: ball.y
        })
      }
    })
    
    stickyAnimationId = requestAnimationFrame(animate)
  }
  
  stickyAnimationId = requestAnimationFrame(animate)
}

function drawConnections() {
  if (!stickySVG.value) return
  
  // 清除现有连接
  stickySVG.value.innerHTML = '<defs><filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="10"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"/></filter></defs>'
  
  stickyBalls.forEach((ball1, i) => {
    stickyBalls.forEach((ball2, j) => {
      if (i < j) {
        const distance = Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2))
        
        if (distance < 100) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', ball1.x.toString())
          line.setAttribute('y1', ball1.y.toString())
          line.setAttribute('x2', ball2.x.toString())
          line.setAttribute('y2', ball2.y.toString())
          line.setAttribute('stroke', 'rgba(255, 255, 255, 0.5)')
          line.setAttribute('stroke-width', '2')
          
          stickySVG.value!.appendChild(line)
        }
      }
    })
  })
}

function drawNetworkConnections() {
  // 实现网络连接可视化
}

// Light Effects
function lightEffect(type: 'spotlight' | 'neon' | 'laser' | 'aurora') {
  switch (type) {
    case 'spotlight':
      createSpotlightEffect()
      break
    case 'neon':
      createNeonEffect()
      break
    case 'laser':
      createLaserEffect()
      break
    case 'aurora':
      createAuroraEffect()
      break
  }
}

function onLightMouseMove(event: MouseEvent) {
  if (!lightContainer.value) return
  
  const rect = lightContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 移动主光源
  if (lightSourceRefs.value[0]) {
    gsap.to(lightSourceRefs.value[0], {
      left: x,
      top: y,
      duration: 0.1,
      ease: "none"
    })
  }
  
  updateLighting(x, y)
}

function createSpotlightEffect() {
  startLightAnimation()
  
  // 创建聚光灯效果
  lightSourceRefs.value.forEach((light, index) => {
    if (light) {
      gsap.to(light, {
        boxShadow: `0 0 50px 20px rgba(255, 255, 0, 0.8)`,
        duration: 1,
        ease: "power2.out"
      })
    }
  })
}

function createNeonEffect() {
  // 创建霓虹灯效果
  lightObjectRefs.value.forEach((obj, index) => {
    if (obj) {
      gsap.to(obj, {
        boxShadow: `0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff`,
        filter: `hue-rotate(0deg)`,
        duration: 0.1,
        repeat: -1,
        ease: "none"
      })
      
      gsap.to(obj, {
        filter: `hue-rotate(360deg)`,
        duration: 3,
        repeat: -1,
        ease: "none"
      })
    }
  })
}

function createLaserEffect() {
  if (!lightCanvas.value) return
  
  const canvas = lightCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  // 绘制激光束
  function drawLaser() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    lightSourceRefs.value.forEach((source, index) => {
      if (!source) return
      
      const sourceRect = source.getBoundingClientRect()
      const containerRect = lightContainer.value!.getBoundingClientRect()
      
      const startX = sourceRect.left - containerRect.left + sourceRect.width / 2
      const startY = sourceRect.top - containerRect.top + sourceRect.height / 2
      
      lightObjectRefs.value.forEach((obj) => {
        if (!obj) return
        
        const objRect = obj.getBoundingClientRect()
        const endX = objRect.left - containerRect.left + objRect.width / 2
        const endY = objRect.top - containerRect.top + objRect.height / 2
        
        // 绘制激光束
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.8)')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.shadowBlur = 10
        ctx.shadowColor = '#ff0000'
        
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      })
    })
    
    requestAnimationFrame(drawLaser)
  }
  
  drawLaser()
}

function createAuroraEffect() {
  startLightAnimation()
  
  // 创建极光效果
  if (lightCanvas.value) {
    const canvas = lightCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    function drawAurora() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制极光波浪
      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, `hsla(${120 + i * 30}, 70%, 50%, 0.3)`)
        gradient.addColorStop(0.5, `hsla(${150 + i * 30}, 70%, 50%, 0.6)`)
        gradient.addColorStop(1, `hsla(${120 + i * 30}, 70%, 50%, 0.3)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        
        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height / 2 + Math.sin((x + Date.now() * 0.001 + i * 100) * 0.01) * (50 + i * 10)
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()
      }
      
      requestAnimationFrame(drawAurora)
    }
    
    drawAurora()
  }
}

function startLightAnimation() {
  if (lightAnimationId !== 0) return
  
  function animate() {
    // 光源脉冲动画
    lightSourceRefs.value.forEach((light, index) => {
      if (light) {
        const pulse = Math.sin(Date.now() * 0.005 + index) * 0.3 + 0.7
        gsap.set(light, { opacity: pulse })
      }
    })
    
    lightAnimationId = requestAnimationFrame(animate)
  }
  
  lightAnimationId = requestAnimationFrame(animate)
}

function updateLighting(mouseX: number, mouseY: number) {
  // 根据鼠标位置更新光照效果
  lightObjectRefs.value.forEach((obj, index) => {
    if (!obj) return
    
    const rect = obj.getBoundingClientRect()
    const containerRect = lightContainer.value!.getBoundingClientRect()
    
    const objX = rect.left - containerRect.left + rect.width / 2
    const objY = rect.top - containerRect.top + rect.height / 2
    
    const distance = Math.sqrt(Math.pow(mouseX - objX, 2) + Math.pow(mouseY - objY, 2))
    const maxDistance = 200
    const intensity = Math.max(0, 1 - distance / maxDistance)
    
    gsap.to(obj, {
      filter: `brightness(${0.5 + intensity}) contrast(${1 + intensity * 0.5})`,
      boxShadow: `0 0 ${intensity * 30}px rgba(255, 255, 255, ${intensity * 0.8})`,
      duration: 0.1,
      ease: "none"
    })
  })
}

// Comprehensive Demo
function comprehensiveDemo(type: 'fireworks' | 'storm' | 'magic') {
  isComprehensiveActive.value = true
  
  if (comprehensiveAnimationId) {
    cancelAnimationFrame(comprehensiveAnimationId)
  }
  
  switch (type) {
    case 'fireworks':
      startFireworksShow()
      break
    case 'storm':
      startStormEffect()
      break
    case 'magic':
      startMagicEffect()
      break
  }
}

function stopComprehensive() {
  isComprehensiveActive.value = false
  
  if (comprehensiveAnimationId) {
    cancelAnimationFrame(comprehensiveAnimationId)
    comprehensiveAnimationId = 0
  }
  
  // 清空所有效果层
  if (effectLayer1.value) effectLayer1.value.innerHTML = ''
  if (effectLayer2.value) effectLayer2.value.innerHTML = ''
  if (effectLayer3.value) effectLayer3.value.innerHTML = ''
  
  if (comprehensiveCanvas.value) {
    const ctx = comprehensiveCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, comprehensiveCanvas.value.width, comprehensiveCanvas.value.height)
    }
  }
}

function startFireworksShow() {
  if (!comprehensiveCanvas.value || !comprehensiveContainer.value) return
  
  const canvas = comprehensiveCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  const fireworks: Array<{
    x: number
    y: number
    particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      color: string
    }>
  }> = []
  
  function createFirework() {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    const particles = []
    
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 / 50) * i
      const speed = Math.random() * 8 + 2
      
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    fireworks.push({ x, y, particles })
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 创建新烟花
    if (Math.random() < 0.03) {
      createFirework()
    }
    
    // 更新和绘制烟花
    fireworks.forEach((firework, fireworkIndex) => {
      firework.particles.forEach((particle, particleIndex) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.2 // 重力
        particle.life--
        
        if (particle.life <= 0) {
          firework.particles.splice(particleIndex, 1)
          return
        }
        
        ctx.save()
        ctx.globalAlpha = particle.life / 60
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()
      })
      
      if (firework.particles.length === 0) {
        fireworks.splice(fireworkIndex, 1)
      }
    })
    
    if (isComprehensiveActive.value) {
      comprehensiveAnimationId = requestAnimationFrame(animate)
    }
  }
  
  comprehensiveAnimationId = requestAnimationFrame(animate)
}

function startStormEffect() {
  // 实现风暴特效
  if (!comprehensiveContainer.value) return
  
  // 添加闪电效果
  function createLightning() {
    const lightning = document.createElement('div')
    lightning.className = 'absolute w-1 bg-white opacity-0'
    lightning.style.height = '100%'
    lightning.style.left = Math.random() * 100 + '%'
    lightning.style.top = '0'
    lightning.style.boxShadow = '0 0 20px #ffffff, 0 0 40px #87ceeb'
    
    comprehensiveContainer.value!.appendChild(lightning)
    
    gsap.to(lightning, {
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        gsap.to(lightning, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => lightning.remove()
        })
      }
    })
  }
  
  // 定期创建闪电
  const lightningInterval = setInterval(() => {
    if (isComprehensiveActive.value && Math.random() < 0.3) {
      createLightning()
    }
  }, 500)
  
  // 清理定时器
  setTimeout(() => clearInterval(lightningInterval), 10000)
}

function startMagicEffect() {
  // 实现魔法效果
  if (!effectLayer1.value) return
  
  // 创建魔法粒子
  function createMagicParticle() {
    const particle = document.createElement('div')
    particle.className = 'absolute w-2 h-2 rounded-full'
    particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    particle.style.boxShadow = `0 0 10px currentColor`
    
    effectLayer1.value!.appendChild(particle)
    
    gsap.fromTo(particle, 
      { scale: 0, rotation: 0 },
      { 
        scale: 1.5, 
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(particle, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            onComplete: () => particle.remove()
          })
        }
      }
    )
  }
  
  // 定期创建魔法粒子
  const magicInterval = setInterval(() => {
    if (isComprehensiveActive.value) {
      createMagicParticle()
    }
  }, 200)
  
  // 清理定时器
  setTimeout(() => clearInterval(magicInterval), 10000)
}

onMounted(async () => {
  await nextTick()
  
  // 页面入场动画
  if (pageTitle.value) {
    gsap.fromTo(pageTitle.value,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
  }
  
  if (pageSubtitle.value) {
    gsap.fromTo(pageSubtitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
    )
  }

  // 背景粒子动画
  bgParticleRefs.value.forEach((particle, index) => {
    if (particle) {
      gsap.to(particle, {
        y: -20,
        opacity: 0.8,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      })
    }
  })
  
  // 初始化各个效果
  initializeCanvases()
  initStickyBalls()
})

onUnmounted(() => {
  // 清理所有动画
  gsap.killTweensOf("*")
  
  if (explosionAnimationId) cancelAnimationFrame(explosionAnimationId)
  if (waterAnimationId) cancelAnimationFrame(waterAnimationId)
  if (stickyAnimationId) cancelAnimationFrame(stickyAnimationId)
  if (lightAnimationId) cancelAnimationFrame(lightAnimationId)
  if (comprehensiveAnimationId) cancelAnimationFrame(comprehensiveAnimationId)
})

function initializeCanvases() {
  // 初始化所有 Canvas
  const canvases = [explosionCanvas, waterCanvas, stickyCanvas, lightCanvas, comprehensiveCanvas]
  
  canvases.forEach(canvasRef => {
    if (canvasRef.value) {
      const canvas = canvasRef.value
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
  })
}
</script>

<style scoped>
.visual-effects-view {
  min-height: 100vh;
}

/* Background animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

.bg-particle {
  animation: float 4s ease-in-out infinite;
}

/* Explosion Effects */
.explosion-container {
  background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
}

.explosion-container:hover {
  cursor: crosshair;
}

/* Water Effects */
.water-container {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  position: relative;
  overflow: hidden;
}

.water-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 30%, rgba(255,255,255,0.1) 70%);
  pointer-events: none;
}

/* Sticky Effects */
.sticky-container {
  background: radial-gradient(circle at center, #2d3748 0%, #1a202c 100%);
}

.sticky-ball {
  transition: all 0.3s ease;
  filter: blur(0px);
}

.sticky-container[style*="filter"] .sticky-ball {
  filter: blur(1px);
}

/* Light Effects */
.light-container {
  background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
  cursor: none;
}

.light-source {
  box-shadow: 0 0 30px currentColor;
  filter: blur(1px);
}

.light-object {
  transition: all 0.1s ease;
  filter: brightness(0.5) contrast(1);
}

/* Comprehensive Effects */
.comprehensive-container {
  background: radial-gradient(circle at center, #0f0f23 0%, #000000 100%);
}

/* Utility animations */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px currentColor;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px currentColor;
    transform: scale(1.1);
  }
}

.glow-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Responsive design */
@media (max-width: 768px) {
  .explosion-container,
  .water-container,
  .sticky-container,
  .light-container,
  .comprehensive-container {
    height: 250px;
  }
}

/* Special effects filters */
.effect-glow {
  filter: drop-shadow(0 0 10px currentColor);
}

.effect-blur {
  filter: blur(2px);
}

.effect-saturate {
  filter: saturate(1.5) contrast(1.2);
}
</style>
