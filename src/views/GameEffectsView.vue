<template>
  <div class="pt-16 game-effects-view">
    <!-- Page Header -->
    <section class="overflow-hidden relative py-20 text-white bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
      <div class="relative z-10 px-4 mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
        <h1 ref="pageTitle" class="mb-6 text-5xl font-bold md:text-6xl">
          游戏化动画
        </h1>
        <p ref="pageSubtitle" class="mx-auto max-w-3xl text-xl opacity-90 md:text-2xl">
          体验互动游戏动画，探索物理引擎的魅力
        </p>
      </div>
    </section>



    <!-- 天气动画 Section -->
    <section class="py-20 bg-gradient-to-b from-blue-100 to-blue-300">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">天气动画</h2>
          <p class="mb-8 text-gray-700">真实的天气效果模拟，带来沉浸式体验</p>
          
          <div class="p-8 mx-auto max-w-6xl bg-white rounded-2xl shadow-lg">
            <div class="flex flex-wrap gap-4 justify-center mb-8">
              <button 
                @click="setWeather('sunny')"
                class="px-6 py-3 font-medium text-white bg-yellow-500 rounded-lg transition-colors weather-btn hover:bg-yellow-600"
                :class="{ 'ring-4 ring-yellow-300': currentWeather === 'sunny' }"
              >
                ☀️ 晴天
              </button>
              <button 
                @click="setWeather('rainy')"
                class="px-6 py-3 font-medium text-white bg-blue-500 rounded-lg transition-colors weather-btn hover:bg-blue-600"
                :class="{ 'ring-4 ring-blue-300': currentWeather === 'rainy' }"
              >
                🌧️ 雨天
              </button>
              <button 
                @click="setWeather('snowy')"
                class="px-6 py-3 font-medium text-white bg-gray-500 rounded-lg transition-colors weather-btn hover:bg-gray-600"
                :class="{ 'ring-4 ring-gray-300': currentWeather === 'snowy' }"
              >
                ❄️ 雪天
              </button>
            </div>

            <!-- 天气动画区域 -->
            <div ref="weatherContainer" class="overflow-hidden relative h-80 rounded-xl transition-all duration-1000 weather-container" :class="weatherContainerClass">
              <canvas ref="weatherCanvas" class="absolute inset-0 w-full h-full"></canvas>
              
              <!-- 太阳元素 -->
              <div 
                ref="sunElement"
                class="absolute w-20 h-20 rounded-full transition-all duration-1000 sun-element"
                :class="{ 'opacity-100 scale-100': currentWeather === 'sunny', 'opacity-0 scale-50': currentWeather !== 'sunny' }"
                style="top: 15%; right: 15%; background: radial-gradient(circle, #ffeb3b 0%, #ff9800 70%, #ff5722 100%); box-shadow: 0 0 60px rgba(255, 235, 59, 0.8), 0 0 100px rgba(255, 152, 0, 0.6);"
              >
                <!-- 太阳光线 -->
                <div 
                  v-for="i in 12" 
                  :key="i"
                  class="absolute w-1 h-8 bg-yellow-300 rounded-full opacity-80 sun-ray"
                  :style="`
                    top: 50%;
                    left: 50%;
                    transform-origin: center;
                    transform: translate(-50%, -50%) rotate(${i * 30}deg) translateY(-50px);
                    animation: sun-ray-pulse 3s ease-in-out infinite;
                    animation-delay: ${i * 0.1}s;
                  `"
                ></div>
                
                <!-- 太阳核心 -->
                <div class="absolute inset-2 bg-yellow-200 rounded-full animate-pulse"></div>
              </div>
              
              <!-- 云朵（在非晴天显示） -->
              <div 
                v-for="(cloud, index) in weatherClouds"
                :key="index"
                class="absolute transition-all duration-1000 cloud"
                :class="{ 
                  'opacity-90': currentWeather === 'snowy', 
                  'opacity-70': currentWeather === 'rainy', 
                  'opacity-30': currentWeather === 'sunny' 
                }"
                :style="`
                  left: ${cloud.x}%;
                  top: ${cloud.y}%;
                  transform: scale(${cloud.scale}) translateX(${cloud.moveX || 0}px);
                `"
              >
                <div class="flex items-end">
                  <div class="w-6 h-6 rounded-full shadow-lg bg-white/80"></div>
                  <div class="-ml-2 w-10 h-10 rounded-full shadow-lg bg-white/90"></div>
                  <div class="-ml-3 w-8 h-8 rounded-full shadow-lg bg-white/85"></div>
                  <div class="-ml-2 w-4 h-4 rounded-full shadow-lg bg-white/75"></div>
                </div>
              </div>
              
              <!-- 天气信息显示 -->
              <div class="absolute bottom-4 left-4 px-3 py-2 text-sm text-white rounded-lg bg-black/50">
                当前天气: {{ weatherNames[currentWeather] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 时钟效果 Section -->
    <section class="py-20 bg-gray-100">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">时钟效果</h2>
          <p class="mb-8 text-gray-600">精美的动画时钟，展示时间流逝的艺术</p>
          
          <div class="p-8 mx-auto max-w-6xl bg-white rounded-2xl shadow-lg">
            <div class="flex flex-wrap gap-4 justify-center mb-8">
              <button 
                @click="setClockMode('analog')"
                class="px-6 py-3 font-medium text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
                :class="{ 'ring-4 ring-blue-300': clockMode === 'analog' }"
              >
                模拟时钟
              </button>
              <button 
                @click="setClockMode('digital')"
                class="px-6 py-3 font-medium text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
                :class="{ 'ring-4 ring-green-300': clockMode === 'digital' }"
              >
                数字时钟
              </button>
            </div>

            <!-- 时钟显示区域 -->
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <!-- 模拟时钟 -->
              <div class="flex justify-center items-center p-8 bg-gray-900 rounded-xl analog-clock-container" :class="{ 'opacity-100': clockMode === 'analog', 'opacity-30': clockMode !== 'analog' }">
                <div class="relative w-48 h-48">
                  <!-- 时钟外圈 -->
                  <div class="absolute inset-0 rounded-full border-4 border-white"></div>
                  
                  <!-- 时针 -->
                  <div 
                    ref="hourHand"
                    class="absolute w-1 h-12 bg-white rounded-full hour-hand"
                    style="top: 50%; left: 50%; transform-origin: center bottom; transform: translateX(-50%) translateY(-100%);"
                  ></div>
                  
                  <!-- 分针 -->
                  <div 
                    ref="minuteHand"
                    class="absolute w-0.5 h-16 bg-white rounded-full minute-hand"
                    style="top: 50%; left: 50%; transform-origin: center bottom; transform: translateX(-50%) translateY(-100%);"
                  ></div>
                  
                  <!-- 秒针 -->
                  <div 
                    ref="secondHand"
                    class="absolute w-0.5 h-20 bg-red-500 rounded-full second-hand"
                    style="top: 50%; left: 50%; transform-origin: center bottom; transform: translateX(-50%) translateY(-100%);"
                  ></div>
                  
                  <!-- 中心点 -->
                  <div class="absolute top-1/2 left-1/2 z-10 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>

              <!-- 数字时钟 -->
              <div class="flex justify-center items-center p-8 bg-black rounded-xl digital-clock-container" :class="{ 'opacity-100': clockMode === 'digital', 'opacity-30': clockMode !== 'digital' }">
                <div class="text-center">
                  <div ref="digitalTime" class="mb-4 font-mono text-6xl tracking-wider text-green-400 digital-time">
                    {{ formatTime(currentTime) }}
                  </div>
                  <div ref="digitalDate" class="text-xl text-green-300 digital-date">
                    {{ formatDate(currentTime) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 物理引擎 Section -->
    <section class="py-20 text-white bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">物理引擎</h2>
          <p class="mb-8 text-gray-200">真实的物理模拟，体验重力、碰撞、弹性等物理现象</p>
          
          <div class="p-8 mx-auto max-w-6xl rounded-2xl shadow-lg backdrop-blur-sm bg-black/50">
            <div class="flex flex-wrap gap-4 justify-center mb-8">
              <button 
                @click="physicsDemo('gravity')"
                class="px-6 py-3 font-medium text-white bg-red-500 rounded-lg transition-colors hover:bg-red-600"
              >
                重力模拟
              </button>
              <button 
                @click="physicsDemo('collision')"
                class="px-6 py-3 font-medium text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
              >
                碰撞检测
              </button>
              <button 
                @click="clearPhysics()"
                class="px-6 py-3 font-medium text-white bg-gray-600 rounded-lg transition-colors hover:bg-gray-700"
              >
                清空场景
              </button>
            </div>

            <!-- 物理引擎区域 -->
            <div ref="physicsContainer" class="overflow-hidden relative h-96 bg-black rounded-xl border-2 physics-container border-purple-500/50" @click="onPhysicsClick">
              <canvas ref="physicsCanvas" class="absolute inset-0 w-full h-full cursor-crosshair"></canvas>
              
              <!-- 物理参数显示 -->
              <div class="absolute top-4 left-4 space-y-1 text-sm">
                <div class="px-2 py-1 text-green-400 rounded bg-black/70">
                  重力: {{ physicsParams.gravity.toFixed(1) }}
                </div>
                <div class="px-2 py-1 text-blue-400 rounded bg-black/70">
                  摩擦: {{ physicsParams.friction.toFixed(2) }}
                </div>
              </div>
              
              <div class="absolute bottom-4 left-4 text-sm text-gray-400">
                点击添加物理对象
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const weatherContainer = ref<HTMLElement>()
const weatherCanvas = ref<HTMLCanvasElement>()
const sunElement = ref<HTMLElement>()
const physicsContainer = ref<HTMLElement>()
const physicsCanvas = ref<HTMLCanvasElement>()

// Clock refs
const hourHand = ref<HTMLElement>()
const minuteHand = ref<HTMLElement>()
const secondHand = ref<HTMLElement>()
const digitalTime = ref<HTMLElement>()
const digitalDate = ref<HTMLElement>()



// Weather data
const currentWeather = ref<'sunny' | 'rainy' | 'snowy'>('sunny')
const weatherNames = {
  sunny: '晴天',
  rainy: '雨天', 
  snowy: '雪天'
}

let weatherAnimationId: number = 0
let weatherParticles: Array<{
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: string
}> = []

const weatherClouds = [
  { x: 15, y: 20, scale: 0.8, moveX: 0 },
  { x: 35, y: 15, scale: 1.0, moveX: 0 },
  { x: 65, y: 25, scale: 0.9, moveX: 0 },
  { x: 85, y: 18, scale: 0.7, moveX: 0 }
]

// Clock data
const clockMode = ref<'analog' | 'digital'>('analog')
const currentTime = ref(new Date())
let clockAnimationId: ReturnType<typeof setInterval> | number = 0

// Physics engine data
const physicsParams = reactive({
  gravity: 0.5,
  friction: 0.99,
  elasticity: 0.8
})

let physicsObjects: Array<{
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  mass: number
  color: string
}> = []

let physicsAnimationId: number = 0

// Computed
const weatherContainerClass = computed(() => {
  switch (currentWeather.value) {
    case 'sunny':
      return 'bg-gradient-to-b from-blue-300 to-blue-500'
    case 'rainy':
      return 'bg-gradient-to-b from-gray-600 to-gray-800'
    case 'snowy':
      return 'bg-gradient-to-b from-slate-600 to-slate-800'
    default:
      return 'bg-gradient-to-b from-blue-300 to-blue-500'
  }
})



// Weather Functions
function setWeather(weather: typeof currentWeather.value) {
  // 停止天气相关的GSAP动画
  if (sunElement.value) {
    gsap.killTweensOf(sunElement.value)
  }
  
  // 清除现有粒子
  weatherParticles = []
  
  // 停止现有动画循环
  if (weatherAnimationId) {
    cancelAnimationFrame(weatherAnimationId)
    weatherAnimationId = 0
  }
  
  // 重置太阳元素状态
  if (sunElement.value) {
    gsap.set(sunElement.value, {
      scale: weather === 'sunny' ? 1 : 0.5,
      rotation: 0,
      opacity: weather === 'sunny' ? 1 : 0,
      clearProps: "transform, opacity" // 只清除相关属性
    })
  }
  
  // 清空Canvas
  if (weatherCanvas.value) {
    const ctx = weatherCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, weatherCanvas.value.width, weatherCanvas.value.height)
    }
  }
  
  // 设置新的天气状态
  currentWeather.value = weather
  
  // 启动新天气效果
  startWeatherAnimation()
  
  // 特殊天气效果
  if (weather === 'sunny' && sunElement.value) {
    // 太阳出现动画
    gsap.fromTo(sunElement.value, 
      { scale: 0.5, rotation: -45, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
    
    // 启动太阳旋转动画
    gsap.to(sunElement.value, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    })
  }
  
  // 雪天特殊效果
  if (weather === 'snowy' && weatherContainer.value) {
    // 添加雪天的寒冷气氛
    gsap.to(weatherContainer.value, {
      filter: "brightness(0.8) contrast(1.1) saturate(0.7)",
      duration: 1,
      ease: "power2.out"
    })
  } else if (weatherContainer.value) {
    // 清除滤镜效果
    gsap.to(weatherContainer.value, {
      filter: "brightness(1) contrast(1) saturate(1)",
      duration: 1,
      ease: "power2.out"
    })
  }
}

function startWeatherAnimation() {
  if (!weatherCanvas.value) return
  
  const canvas = weatherCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  function animate() {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 创建新粒子
    if (Math.random() < getWeatherParticleRate()) {
      createWeatherParticle()
    }
    
    // 更新和绘制粒子
    weatherParticles.forEach((particle, index) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.opacity -= 0.005
      
      // 移除消失的粒子
      if (particle.opacity <= 0 || 
          particle.y > canvas.height || 
          particle.x < -50 || 
          particle.x > canvas.width + 50) {
        weatherParticles.splice(index, 1)
        return
      }
      
      // 绘制粒子
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      switch (particle.type) {
        case 'sunlight':
          // 阳光粒子 - 发光的黄色圆点
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
          gradient.addColorStop(0, '#ffeb3b')
          gradient.addColorStop(0.5, '#ffc107')
          gradient.addColorStop(1, 'rgba(255, 193, 7, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fill()
          
          // 中心亮点
          ctx.fillStyle = '#fff59d'
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'rain':
          ctx.strokeStyle = '#87ceeb'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x, particle.y + 10)
          ctx.stroke()
          break
        case 'snow':
          // 雪花主体 - 带发光效果的白色圆形
          const snowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
          snowGradient.addColorStop(0, '#ffffff')
          snowGradient.addColorStop(0.3, '#f8fafc')
          snowGradient.addColorStop(0.7, '#e2e8f0')
          snowGradient.addColorStop(1, 'rgba(226, 232, 240, 0.3)')
          ctx.fillStyle = snowGradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          
          // 雪花闪烁效果 - 添加亮点
          if (Math.random() < 0.3) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + Math.random() * 0.2})`
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2)
            ctx.fill()
          }
          
          // 六角形雪花形状（大雪花）
          if (particle.size > 4) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.lineWidth = 1
            ctx.beginPath()
            for (let i = 0; i < 6; i++) {
              const angle = (i * 60) * (Math.PI / 180)
              const x1 = particle.x + Math.cos(angle) * particle.size * 0.8
              const y1 = particle.y + Math.sin(angle) * particle.size * 0.8
              const x2 = particle.x + Math.cos(angle) * particle.size * 0.4
              const y2 = particle.y + Math.sin(angle) * particle.size * 0.4
              
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(x1, y1)
              
              // 添加分支
              const branchAngle1 = angle + 30 * (Math.PI / 180)
              const branchAngle2 = angle - 30 * (Math.PI / 180)
              ctx.moveTo(x2, y2)
              ctx.lineTo(x2 + Math.cos(branchAngle1) * particle.size * 0.3, y2 + Math.sin(branchAngle1) * particle.size * 0.3)
              ctx.moveTo(x2, y2)
              ctx.lineTo(x2 + Math.cos(branchAngle2) * particle.size * 0.3, y2 + Math.sin(branchAngle2) * particle.size * 0.3)
            }
            ctx.stroke()
          }
          break
      }
      
      ctx.restore()
    })
    
    weatherAnimationId = requestAnimationFrame(animate)
  }
  
  weatherAnimationId = requestAnimationFrame(animate)
}

function getWeatherParticleRate(): number {
  switch (currentWeather.value) {
    case 'sunny': return 0.05  // 阳光粒子
    case 'rainy': return 0.3
    case 'snowy': return 0.25  // 增加雪花密度
    default: return 0
  }
}

function createWeatherParticle() {
  if (!weatherCanvas.value) return
  
  const canvas = weatherCanvas.value
  
  switch (currentWeather.value) {
    case 'sunny':
      weatherParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0.2 - Math.random() * 0.4,
        vy: 0.2 - Math.random() * 0.4,
        size: 1 + Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.4,
        type: 'sunlight'
      })
      break
    case 'rainy':
      weatherParticles.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: -1 + Math.random() * 2,
        vy: 5 + Math.random() * 5,
        size: 2,
        opacity: 0.8,
        type: 'rain'
      })
      break
    case 'snowy':
      weatherParticles.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: -0.5 + Math.random() * 1, // 减少水平摆动
        vy: 0.5 + Math.random() * 2,  // 慢一点的下降速度
        size: 1 + Math.random() * 6,  // 更大的尺寸范围
        opacity: 0.7 + Math.random() * 0.3, // 稍微透明一点，更自然
        type: 'snow'
      })
      break
  }
}

// Clock Functions
function setClockMode(mode: typeof clockMode.value) {
  clockMode.value = mode
}

function updateClock() {
  currentTime.value = new Date()
  
  if (clockMode.value === 'analog') {
    updateAnalogClock()
  }
}

function updateAnalogClock() {
  const now = currentTime.value
  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours() % 12
  
  const secondAngle = (seconds * 6) - 90
  const minuteAngle = (minutes * 6) - 90
  const hourAngle = (hours * 30 + minutes * 0.5) - 90
  
  if (secondHand.value) {
    gsap.to(secondHand.value, {
      rotation: secondAngle,
      duration: 0.1,
      ease: "power2.out"
    })
  }
  
  if (minuteHand.value) {
    gsap.to(minuteHand.value, {
      rotation: minuteAngle,
      duration: 0.5,
      ease: "power2.out"
    })
  }
  
  if (hourHand.value) {
    gsap.to(hourHand.value, {
      rotation: hourAngle,
      duration: 0.5,
      ease: "power2.out"
    })
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// Physics Functions
function physicsDemo(type: 'gravity' | 'collision') {
  clearPhysics()
  
  switch (type) {
    case 'gravity':
      createGravityDemo()
      break
    case 'collision':
      createCollisionDemo()
      break
  }
  
  startPhysicsAnimation()
}

function onPhysicsClick(event: MouseEvent) {
  if (!physicsContainer.value) return
  
  const rect = physicsContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 创建新物理对象
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
  
  physicsObjects.push({
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 10,
    radius: 10 + Math.random() * 15,
    mass: 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  })
}

function createGravityDemo() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
  
  for (let i = 0; i < 5; i++) {
    physicsObjects.push({
      x: 100 + i * 80,
      y: 50,
      vx: (Math.random() - 0.5) * 4,
      vy: 0,
      radius: 10 + Math.random() * 10,
      mass: 1,
      color: colors[i % colors.length]
    })
  }
}

function createCollisionDemo() {
  const colors = ['#ff6b6b', '#4ecdc4']
  
  physicsObjects.push({
    x: 100,
    y: 200,
    vx: 5,
    vy: 0,
    radius: 20,
    mass: 2,
    color: colors[0]
  })
  
  physicsObjects.push({
    x: 300,
    y: 200,
    vx: -3,
    vy: 0,
    radius: 15,
    mass: 1,
    color: colors[1]
  })
}

function startPhysicsAnimation() {
  if (!physicsCanvas.value || physicsAnimationId !== 0) return
  
  const canvas = physicsCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  
  function animate() {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 更新物理对象
    physicsObjects.forEach((obj, index) => {
      // 应用重力
      obj.vy += physicsParams.gravity
      
      // 应用摩擦力
      obj.vx *= physicsParams.friction
      obj.vy *= physicsParams.friction
      
      // 更新位置
      obj.x += obj.vx
      obj.y += obj.vy
      
      // 边界碰撞
      if (obj.x <= obj.radius || obj.x >= canvas.width - obj.radius) {
        obj.vx *= -physicsParams.elasticity
        obj.x = Math.max(obj.radius, Math.min(canvas.width - obj.radius, obj.x))
      }
      
      if (obj.y <= obj.radius || obj.y >= canvas.height - obj.radius) {
        obj.vy *= -physicsParams.elasticity
        obj.y = Math.max(obj.radius, Math.min(canvas.height - obj.radius, obj.y))
      }
      
      // 对象间碰撞
      physicsObjects.forEach((other, otherIndex) => {
        if (index === otherIndex) return
        
        const dx = other.x - obj.x
        const dy = other.y - obj.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const minDistance = obj.radius + other.radius
        
        if (distance < minDistance) {
          // 碰撞响应
          const angle = Math.atan2(dy, dx)
          const targetX = obj.x + Math.cos(angle) * minDistance
          const targetY = obj.y + Math.sin(angle) * minDistance
          
          const ax = (targetX - other.x) * 0.05
          const ay = (targetY - other.y) * 0.05
          
          obj.vx -= ax
          obj.vy -= ay
          other.vx += ax
          other.vy += ay
        }
      })
      
      // 绘制对象
      ctx.save()
      ctx.fillStyle = obj.color
      ctx.shadowBlur = 10
      ctx.shadowColor = obj.color
      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2)
      ctx.fill()
      
      // 高光
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.beginPath()
      ctx.arc(obj.x - obj.radius * 0.3, obj.y - obj.radius * 0.3, obj.radius * 0.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
    
    physicsAnimationId = requestAnimationFrame(animate)
  }
  
  physicsAnimationId = requestAnimationFrame(animate)
}

function clearPhysics() {
  physicsObjects = []
  
  if (physicsAnimationId) {
    cancelAnimationFrame(physicsAnimationId)
    physicsAnimationId = 0
  }
  
  if (physicsCanvas.value) {
    const ctx = physicsCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, physicsCanvas.value.width, physicsCanvas.value.height)
    }
  }
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
  
  // 初始化时钟
  clockAnimationId = setInterval(updateClock, 1000)
  updateClock()
  
  // 初始化天气
  setWeather('sunny')
  
  // 初始化物理引擎
  startPhysicsAnimation()
})

onUnmounted(() => {
  // 清理所有动画和定时器
  gsap.killTweensOf("*")
  
  // 清理天气动画
  if (weatherAnimationId) {
    cancelAnimationFrame(weatherAnimationId)
    weatherAnimationId = 0
  }
  
  // 清理物理动画
  if (physicsAnimationId) {
    cancelAnimationFrame(physicsAnimationId)
    physicsAnimationId = 0
  }
  
  // 清理时钟动画
  if (clockAnimationId) {
    clearInterval(clockAnimationId as ReturnType<typeof setInterval>)
    clockAnimationId = 0
  }
  
  // 清空所有粒子数组
  weatherParticles = []
  physicsObjects = []
})
</script>

<style scoped>
.game-effects-view {
  min-height: 100vh;
}



/* Weather Effects */
.weather-container {
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.sun-element {
  animation: sun-float 6s ease-in-out infinite;
}

@keyframes sun-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes sun-ray-pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-50px) scaleY(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-60px) scaleY(1.5);
  }
}

.cloud {
  animation: cloud-drift 12s ease-in-out infinite;
}

@keyframes cloud-drift {
  0%, 100% {
    transform: translateX(0px) scale(var(--scale));
  }
  50% {
    transform: translateX(15px) scale(var(--scale));
  }
}

.weather-btn {
  position: relative;
  overflow: hidden;
}

.weather-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.weather-btn:hover::before {
  left: 100%;
}

/* Clock Effects */
.analog-clock-container {
  background: radial-gradient(circle, #2d3748 0%, #1a202c 100%);
}

.digital-clock-container {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border: 2px solid #00ff00;
}

.digital-time {
  text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
  animation: digital-glow 2s ease-in-out infinite alternate;
}

@keyframes digital-glow {
  from {
    text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
  }
  to {
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00;
  }
}

/* Physics Engine */
.physics-container {
  background: radial-gradient(circle at center, #1a1a2e 0%, #0f0f23 100%);
  cursor: crosshair;
}

.physics-container:hover {
  border-color: rgba(168, 85, 247, 0.8);
}

/* Responsive */
@media (max-width: 768px) {
  .weather-container,
  .physics-container {
    height: 250px;
  }
  
  .analog-clock-container .relative {
    width: 150px;
    height: 150px;
  }
  
  .digital-time {
    font-size: 2rem;
  }
}
</style>
