<template>
  <div class="timeline-animations-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6">时间轴动画</h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          掌握复杂的时间轴控制和序列动画
        </p>
      </div>
    </section>

    <!-- Timeline Controls -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">时间轴控制</h2>
          <p class="text-gray-600 mb-8">精确控制动画的播放、暂停、倒放和速度</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <!-- Control Buttons -->
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="playTimeline"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ▶ 播放
              </button>
              <button 
                @click="pauseTimeline"
                class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⏸ 暂停
              </button>
              <button 
                @click="reverseTimeline"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⏪ 倒放
              </button>
              <button 
                @click="restartTimeline"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⏮ 重启
              </button>
            </div>

            <!-- Speed Controls -->
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                v-for="speed in [0.5, 1, 1.5, 2]"
                :key="speed"
                @click="setTimelineSpeed(speed)"
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                :class="{ '!bg-yellow-500': currentSpeed === speed }"
              >
                {{ speed }}x
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="mb-8">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  ref="progressBar"
                  class="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-100"
                  style="width: 0%"
                ></div>
              </div>
              <div class="text-sm text-gray-600 text-center">
                进度: <span ref="progressText">0%</span>
              </div>
            </div>

            <!-- Animation Elements -->
            <div class="timeline-stage h-40 bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center">
              <div 
                ref="box1"
                class="absolute w-12 h-12 bg-red-500 rounded-lg"
                style="left: 20px; top: 50%; transform: translateY(-50%)"
              ></div>
              <div 
                ref="box2"
                class="absolute w-12 h-12 bg-blue-500 rounded-lg"
                style="left: 60px; top: 50%; transform: translateY(-50%)"
              ></div>
              <div 
                ref="box3"
                class="absolute w-12 h-12 bg-green-500 rounded-lg"
                style="left: 100px; top: 50%; transform: translateY(-50%)"
              ></div>
              <div 
                ref="box4"
                class="absolute w-12 h-12 bg-purple-500 rounded-lg"
                style="left: 140px; top: 50%; transform: translateY(-50%)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stagger Animations -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">交错动画</h2>
          <p class="text-gray-600 mb-8">元素按序列依次执行动画，创造层次感</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="runStaggerAnimation('cards')"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                卡片交错
              </button>
              <button 
                @click="runStaggerAnimation('circles')"
                class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                圆形波浪
              </button>
              <button 
                @click="runStaggerAnimation('text')"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                文字展开
              </button>
            </div>

            <!-- Stagger Cards -->
            <div class="grid grid-cols-4 gap-4 mb-8">
              <div 
                v-for="i in 8"
                :key="i"
                :ref="el => setStaggerCardRef(el, i)"
                class="stagger-card bg-gradient-to-br from-blue-400 to-purple-500 h-20 rounded-lg flex items-center justify-center text-white font-bold opacity-0 transform scale-0"
              >
                {{ i }}
              </div>
            </div>

            <!-- Stagger Circles -->
            <div class="flex justify-center gap-2 mb-8">
              <div 
                v-for="i in 12"
                :key="i"
                :ref="el => setStaggerCircleRef(el, i)"
                class="stagger-circle w-8 h-8 bg-pink-500 rounded-full opacity-0 transform scale-0"
              ></div>
            </div>

            <!-- Stagger Text -->
            <div class="text-center">
              <h3 ref="staggerText" class="text-3xl font-bold text-gray-900">
                <span 
                  v-for="(char, index) in staggerTextContent" 
                  :key="index"
                  :ref="el => setStaggerTextRef(el, index)"
                  class="inline-block opacity-0 transform translate-y-8"
                >
                  {{ char === ' ' ? '\u00A0' : char }}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Complex Timeline -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">复杂时间轴动画</h2>
          <p class="text-gray-300 mb-8">多元素协调的复杂动画序列</p>
          
          <div class="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex justify-center mb-8">
              <button 
                @click="runComplexAnimation"
                class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                🚀 启动复杂动画
              </button>
            </div>

            <!-- Complex Animation Stage -->
            <div class="complex-stage h-96 bg-gray-700 rounded-lg relative overflow-hidden">
              <!-- Background Particles -->
              <div 
                v-for="i in 20"
                :key="i"
                :ref="el => setComplexParticleRef(el, i)"
                class="complex-particle absolute w-2 h-2 bg-white rounded-full opacity-0"
                :style="getRandomParticlePosition(i)"
              ></div>

              <!-- Main Character -->
              <div 
                ref="mainCharacter"
                class="absolute w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 transform scale-0 flex items-center justify-center text-2xl"
                style="left: 50px; top: 50%"
              >
                🎯
              </div>

              <!-- Target Elements -->
              <div 
                v-for="i in 3"
                :key="i"
                :ref="el => setComplexTargetRef(el, i)"
                class="complex-target absolute w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-0 transform scale-0 flex items-center justify-center text-lg"
                :style="getTargetPosition(i)"
              >
                ⭐
              </div>

              <!-- Effects Container -->
              <div ref="effectsContainer" class="absolute inset-0 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Card 3D Flip Animation Section -->
    <Card3DFlipAnimation :auto-play="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import Card3DFlipAnimation from '@/components/animations/Card3DFlipAnimation.vue'

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()
const progressText = ref<HTMLElement>()
const box1 = ref<HTMLElement>()
const box2 = ref<HTMLElement>()
const box3 = ref<HTMLElement>()
const box4 = ref<HTMLElement>()
const staggerText = ref<HTMLElement>()
const mainCharacter = ref<HTMLElement>()
const effectsContainer = ref<HTMLElement>()

const staggerCardRefs = ref<HTMLElement[]>([])
const staggerCircleRefs = ref<HTMLElement[]>([])
const staggerTextRefs = ref<HTMLElement[]>([])
const complexParticleRefs = ref<HTMLElement[]>([])
const complexTargetRefs = ref<HTMLElement[]>([])

// Data
const staggerTextContent = "动画展示厅 时间轴动画"
const currentSpeed = ref(1)
let mainTimeline: gsap.core.Timeline

// Helper functions
function setStaggerCardRef(el: HTMLElement | null, index: number) {
  if (el) staggerCardRefs.value[index] = el
}

function setStaggerCircleRef(el: HTMLElement | null, index: number) {
  if (el) staggerCircleRefs.value[index] = el
}

function setStaggerTextRef(el: HTMLElement | null, index: number) {
  if (el) staggerTextRefs.value[index] = el
}

function setComplexParticleRef(el: HTMLElement | null, index: number) {
  if (el) complexParticleRefs.value[index] = el
}

function setComplexTargetRef(el: HTMLElement | null, index: number) {
  if (el) complexTargetRefs.value[index] = el
}

function getRandomParticlePosition(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }
}

function getTargetPosition(index: number) {
  const positions = [
    { left: '200px', top: '100px' },
    { left: '400px', top: '50px' },
    { left: '600px', top: '150px' }
  ]
  return positions[index - 1]
}

onMounted(async () => {
  await nextTick()
  initPageAnimations()
  createMainTimeline()
})

function initPageAnimations() {
  gsap.fromTo(pageTitle.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  )
  
  gsap.fromTo(pageSubtitle.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
  )
}

function createMainTimeline() {
  mainTimeline = gsap.timeline({ 
    paused: true,
    onUpdate: updateProgress
  })

  mainTimeline
    .to(box1.value, { x: 300, rotation: 360, duration: 1, ease: "power2.out" })
    .to(box2.value, { x: 300, scale: 1.5, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
    .to(box3.value, { x: 300, y: -50, duration: 1, ease: "bounce.out" }, "-=0.5")
    .to(box4.value, { x: 300, borderRadius: "50%", duration: 1, ease: "elastic.out(1, 0.3)" }, "-=0.5")
}

function updateProgress() {
  if (progressBar.value && progressText.value) {
    const progress = mainTimeline.progress() * 100
    progressBar.value.style.width = `${progress}%`
    progressText.value.textContent = `${Math.round(progress)}%`
  }
}

// Timeline Controls
function playTimeline() {
  mainTimeline.play()
}

function pauseTimeline() {
  mainTimeline.pause()
}

function reverseTimeline() {
  mainTimeline.reverse()
}

function restartTimeline() {
  mainTimeline.restart()
}

function setTimelineSpeed(speed: number) {
  currentSpeed.value = speed
  mainTimeline.timeScale(speed)
}

// Stagger Animations
function runStaggerAnimation(type: string) {
  switch (type) {
    case 'cards':
      gsap.fromTo(staggerCardRefs.value,
        { opacity: 0, scale: 0, rotation: -180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      )
      break
      
    case 'circles':
      gsap.fromTo(staggerCircleRefs.value,
        { opacity: 0, scale: 0, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(1, 0.3)"
        }
      )
      break
      
    case 'text':
      gsap.fromTo(staggerTextRefs.value,
        { opacity: 0, y: 30, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        }
      )
      break
  }
}

// Complex Animation
function runComplexAnimation() {
  const tl = gsap.timeline()

  // Stage 1: Setup
  tl.to(mainCharacter.value, { opacity: 1, scale: 1, duration: 0.5 })
    .to(complexTargetRefs.value, { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 }, "-=0.3")

  // Stage 2: Particles
  tl.to(complexParticleRefs.value, {
    opacity: 0.8,
    scale: 1.5,
    duration: 1,
    stagger: 0.05,
    ease: "power2.out"
  })

  // Stage 3: Main Character Journey
  tl.to(mainCharacter.value, {
    x: 500,
    y: -100,
    rotation: 720,
    duration: 3,
    ease: "power2.inOut"
  })

  // Stage 4: Final Effects
  tl.call(() => {
    createExplosionEffect()
  })
}

function createExplosionEffect() {
  if (!effectsContainer.value || !mainCharacter.value) return

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full'
    particle.style.left = '500px'
    particle.style.top = '50%'
    particle.style.transform = 'translate(50%, 50%)'
    
    effectsContainer.value.appendChild(particle)
    
    const angle = (i / 15) * Math.PI * 2
    const distance = Math.random() * 100 + 50
    
    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 2,
      ease: "power2.out",
      onComplete: () => particle.remove()
    })
  }
}
</script>

<style scoped>
.timeline-stage {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.complex-stage {
  background: radial-gradient(circle at center, #374151 0%, #1f2937 100%);
}

.stagger-card {
  background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
}

.complex-particle {
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>
