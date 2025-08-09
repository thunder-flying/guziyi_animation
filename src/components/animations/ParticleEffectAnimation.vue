<template>
  <div class="particle-effect-animation relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 overflow-hidden">
    <!-- Canvas Container -->
    <div class="relative w-full h-screen">
      <canvas 
        ref="canvas"
        @mousemove="onMouseMove"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click="onMouseClick"
        class="absolute inset-0 cursor-none"
      ></canvas>
      
      <!-- Custom Cursor -->
      <div 
        ref="customCursor"
        class="custom-cursor fixed pointer-events-none z-50 w-8 h-8 border-2 border-white rounded-full mix-blend-difference"
        style="transform: translate(-50%, -50%)"
      ></div>
    </div>

    <!-- UI Controls -->
    <div class="absolute top-8 left-8 z-40 transform-none">
      <div class="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-6 text-white">
        <h3 class="text-lg font-bold mb-4">粒子控制面板</h3>
        
        <!-- Effect Buttons -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button 
            @click="triggerExplosion"
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            💥 爆炸
          </button>
          <button 
            @click="triggerWave"
            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            🌊 波浪
          </button>
          <button 
            @click="triggerVortex"
            class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            🌀 漩涡
          </button>
          <button 
            @click="triggerRain"
            class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            🌧️ 粒子雨
          </button>
        </div>

        <!-- Particle Count Slider -->
        <div class="mb-4">
          <label class="block text-sm mb-2">粒子数量: {{ particleCount }}</label>
          <input 
            v-model="particleCount"
            @input="updateParticleCount"
            type="range" 
            min="50" 
            max="500" 
            step="50"
            class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          >
        </div>

        <!-- Speed Slider -->
        <div class="mb-4">
          <label class="block text-sm mb-2">动画速度: {{ animationSpeed }}x</label>
          <input 
            v-model="animationSpeed"
            @input="updateAnimationSpeed"
            type="range" 
            min="0.5" 
            max="3" 
            step="0.5"
            class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          >
        </div>

        <!-- Reset Button -->
        <button 
          @click="resetParticles"
          class="w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          🔄 重置粒子
        </button>
      </div>
    </div>

    <!-- Info Panel -->
    <div class="absolute top-8 right-8 z-40 transform-none">
      <div class="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-6 text-white max-w-xs">
        <h3 class="text-lg font-bold mb-4">使用说明</h3>
        <ul class="text-sm space-y-2 text-gray-300">
          <li>🖱️ 移动鼠标与粒子交互</li>
          <li>🖱️ 点击鼠标触发波纹效果</li>
          <li>🎮 使用左侧控制面板</li>
          <li>⚡ 实时调整粒子参数</li>
        </ul>
        
        <div class="mt-4 pt-4 border-t border-gray-600">
          <div class="text-xs text-gray-400">
            <div>FPS: <span ref="fpsCounter" class="text-green-400">60</span></div>
            <div>粒子: <span ref="particleCounter" class="text-blue-400">{{ particleCount }}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 20"
        :key="i"
        :ref="el => setDecorRef(el, i)"
        class="absolute w-1 h-1 bg-white rounded-full opacity-20"
        :style="getDecorStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  alpha: number
}

interface Props {
  initialParticleCount?: number
  autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialParticleCount: 200,
  autoStart: true
})

// Refs
const canvas = ref<HTMLCanvasElement>()
const customCursor = ref<HTMLElement>()
const fpsCounter = ref<HTMLElement>()
const particleCounter = ref<HTMLElement>()
const decorRefs = ref<HTMLElement[]>([])

// Reactive data
const particleCount = ref(props.initialParticleCount)
const animationSpeed = ref(1)

// Canvas and animation variables
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number = 0
let mouse = { x: 0, y: 0, isActive: false }
let lastTime = 0
let fps = 0
let frameCount = 0
let lastFpsTime = 0

// Colors for particles
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
  '#ffeaa7', '#fd79a8', '#a29bfe', '#74b9ff',
  '#00cec9', '#55a3ff', '#fd79a8', '#fdcb6e'
]

function setDecorRef(el: HTMLElement | null, index: number) {
  if (el) decorRefs.value[index] = el
}

function getDecorStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`
  }
}

onMounted(async () => {
  await nextTick()
  initCanvas()
  initParticles()
  if (props.autoStart) {
    startAnimation()
  }
  animateDecor()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

function initCanvas() {
  if (!canvas.value) return
  
  ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
  if (!canvas.value || !ctx) return
  
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function initParticles() {
  particles = []
  
  for (let i = 0; i < particleCount.value; i++) {
    createParticle()
  }
}

function createParticle(x?: number, y?: number): Particle {
  const particle: Particle = {
    x: x ?? Math.random() * (canvas.value?.width || window.innerWidth),
    y: y ?? Math.random() * (canvas.value?.height || window.innerHeight),
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1,
    maxLife: 1,
    alpha: Math.random() * 0.8 + 0.2
  }
  
  particles.push(particle)
  return particle
}

function updateParticles(deltaTime: number) {
  const speed = animationSpeed.value
  
  particles.forEach((particle, index) => {
    // Update position
    particle.x += particle.vx * speed * deltaTime
    particle.y += particle.vy * speed * deltaTime
    
    // Apply gravity
    particle.vy += 0.01 * speed
    
    // Mouse interaction
    if (mouse.isActive) {
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.5
        particle.vy += (dy / distance) * force * 0.5
      }
    }
    
    // Bounce off edges
    if (particle.x < 0 || particle.x > (canvas.value?.width || 0)) {
      particle.vx *= -0.8
      particle.x = Math.max(0, Math.min(particle.x, canvas.value?.width || 0))
    }
    
    if (particle.y < 0 || particle.y > (canvas.value?.height || 0)) {
      particle.vy *= -0.8
      particle.y = Math.max(0, Math.min(particle.y, canvas.value?.height || 0))
    }
    
    // Friction
    particle.vx *= 0.99
    particle.vy *= 0.99
    
    // Update life
    particle.life -= 0.001 * speed
    if (particle.life <= 0) {
      particles.splice(index, 1)
      createParticle()
    }
  })
}

function drawParticles() {
  if (!ctx || !canvas.value) return
  
  // Clear canvas with fade effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Draw connections between nearby particles
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach(otherParticle => {
      const dx = particle.x - otherParticle.x
      const dy = particle.y - otherParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 80) {
        const alpha = (80 - distance) / 80 * 0.3
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(otherParticle.x, otherParticle.y)
        ctx.stroke()
      }
    })
  })
  
  // Draw particles
  particles.forEach(particle => {
    ctx.save()
    ctx.globalAlpha = particle.alpha * particle.life
    ctx.fillStyle = particle.color
    ctx.shadowBlur = 10
    ctx.shadowColor = particle.color
    
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })
}

function animate(currentTime: number) {
  const deltaTime = currentTime - lastTime
  lastTime = currentTime
  
  // Calculate FPS
  frameCount++
  if (currentTime - lastFpsTime >= 1000) {
    fps = Math.round((frameCount * 1000) / (currentTime - lastFpsTime))
    frameCount = 0
    lastFpsTime = currentTime
    
    if (fpsCounter.value) {
      fpsCounter.value.textContent = fps.toString()
    }
  }
  
  updateParticles(deltaTime * 0.016) // Normalize to 60fps
  drawParticles()
  
  animationId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  lastTime = performance.now()
  animate(lastTime)
}

// Mouse event handlers
function onMouseMove(event: MouseEvent) {
  mouse.x = event.clientX
  mouse.y = event.clientY
  
  // Update custom cursor
  if (customCursor.value) {
    gsap.to(customCursor.value, {
      x: mouse.x,
      y: mouse.y,
      duration: 0.1,
      ease: "power2.out"
    })
  }
}

function onMouseEnter() {
  mouse.isActive = true
  
  if (customCursor.value) {
    gsap.to(customCursor.value, {
      scale: 1.5,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

function onMouseLeave() {
  mouse.isActive = false
  
  if (customCursor.value) {
    gsap.to(customCursor.value, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

function onMouseClick(event: MouseEvent) {
  // Create ripple effect
  createRipple(event.clientX, event.clientY)
  
  // Add burst of particles
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2
    const speed = Math.random() * 5 + 2
    const particle = createParticle(event.clientX, event.clientY)
    particle.vx = Math.cos(angle) * speed
    particle.vy = Math.sin(angle) * speed
    particle.size = Math.random() * 5 + 2
  }
}

function createRipple(x: number, y: number) {
  if (!ctx) return
  
  const ripple = { x, y, radius: 0, alpha: 1 }
  
  gsap.to(ripple, {
    radius: 150,
    alpha: 0,
    duration: 1,
    ease: "power2.out",
    onUpdate: () => {
      // This will be drawn in the next frame
    }
  })
}

// Effect functions
function triggerExplosion() {
  const centerX = (canvas.value?.width || 0) / 2
  const centerY = (canvas.value?.height || 0) / 2
  
  // Clear existing particles
  particles = []
  
  // Create explosion particles
  for (let i = 0; i < particleCount.value; i++) {
    const angle = (i / particleCount.value) * Math.PI * 2
    const speed = Math.random() * 8 + 2
    const particle = createParticle(centerX, centerY)
    particle.vx = Math.cos(angle) * speed
    particle.vy = Math.sin(angle) * speed
    particle.size = Math.random() * 4 + 1
    particle.color = colors[Math.floor(Math.random() * colors.length)]
  }
}

function triggerWave() {
  particles = []
  
  const waveHeight = (canvas.value?.height || 0) / 2
  const width = canvas.value?.width || 0
  
  for (let i = 0; i < particleCount.value; i++) {
    const x = (i / particleCount.value) * width
    const y = waveHeight + Math.sin((i / particleCount.value) * Math.PI * 4) * 50
    const particle = createParticle(x, y)
    particle.vx = Math.random() * 2 - 1
    particle.vy = Math.random() * 2 - 1
    particle.color = colors[Math.floor((i / particleCount.value) * colors.length)]
  }
}

function triggerVortex() {
  particles = []
  
  const centerX = (canvas.value?.width || 0) / 2
  const centerY = (canvas.value?.height || 0) / 2
  
  for (let i = 0; i < particleCount.value; i++) {
    const angle = (i / particleCount.value) * Math.PI * 8
    const radius = (i / particleCount.value) * 200
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    
    const particle = createParticle(x, y)
    particle.vx = Math.cos(angle + Math.PI / 2) * 2
    particle.vy = Math.sin(angle + Math.PI / 2) * 2
    particle.color = colors[Math.floor((i / particleCount.value) * colors.length)]
  }
}

function triggerRain() {
  particles = []
  
  const width = canvas.value?.width || 0
  
  for (let i = 0; i < particleCount.value; i++) {
    const x = Math.random() * width
    const y = Math.random() * -200
    const particle = createParticle(x, y)
    particle.vx = Math.random() * 1 - 0.5
    particle.vy = Math.random() * 3 + 2
    particle.size = Math.random() * 2 + 0.5
    particle.color = '#4facfe'
  }
}

function updateParticleCount() {
  const diff = particleCount.value - particles.length
  
  if (diff > 0) {
    // Add particles
    for (let i = 0; i < diff; i++) {
      createParticle()
    }
  } else if (diff < 0) {
    // Remove particles
    particles.splice(0, Math.abs(diff))
  }
  
  if (particleCounter.value) {
    particleCounter.value.textContent = particleCount.value.toString()
  }
}

function updateAnimationSpeed() {
  // Animation speed is already reactive
}

function resetParticles() {
  particles = []
  initParticles()
}

function animateDecor() {
  // 只给背景装饰元素添加动画，控制面板保持静止
  decorRefs.value.forEach((decor, index) => {
    if (decor) {
      gsap.to(decor, {
        y: -20,
        opacity: 0.6,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      })
    }
  })
}

// Expose methods
defineExpose({
  triggerExplosion,
  triggerWave,
  triggerVortex,
  triggerRain,
  resetParticles
})
</script>

<style scoped>
.custom-cursor {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

/* Custom range slider styles */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: none;
}

/* Hide default cursor on canvas */
canvas {
  cursor: none !important;
}

/* 控制面板和信息面板保持静止 */
.transform-none {
  transform: none !important;
  animation: none !important;
}

/* 只有背景装饰元素有动画 */
.absolute:not(.z-40):nth-child(odd) {
  animation: float 4s ease-in-out infinite;
}

.absolute:not(.z-40):nth-child(even) {
  animation: float 6s ease-in-out infinite reverse;
}

/* Decorative elements animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.6;
  }
}
</style>
