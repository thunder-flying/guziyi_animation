<template>
  <div class="split-reveal-animation h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 30"
        :key="i"
        :ref="el => setBgElementRef(el, i)"
        class="absolute opacity-10 bg-white"
        :style="getBgElementStyle(i)"
      ></div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 h-full flex items-center justify-center">
      <div class="max-w-6xl mx-auto px-8 text-center">
        
        <!-- Title Section -->
        <div class="mb-16">
          <h1 ref="titleContainer" class="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            <div class="title-line overflow-hidden">
              <span 
                v-for="(char, index) in titleText"
                :key="index"
                :ref="el => setTitleCharRef(el, index)"
                class="inline-block transform translate-y-full"
                :style="{ color: getTitleCharColor(index) }"
              >
                {{ char === ' ' ? '\u00A0' : char }}
              </span>
            </div>
          </h1>
          
          <div ref="subtitleContainer" class="subtitle-reveal overflow-hidden">
            <p ref="subtitle" class="text-xl md:text-2xl text-gray-300 transform translate-y-full">
              {{ subtitleText }}
            </p>
          </div>
        </div>

        <!-- Image Grid Section -->
        <div ref="imageGrid" class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div 
            v-for="(image, index) in imageItems"
            :key="index"
            :ref="el => setImageItemRef(el, index)"
            class="image-item relative h-32 md:h-40 rounded-lg overflow-hidden opacity-0"
          >
            <!-- Image Overlay for Split Effect -->
            <div 
              :ref="el => setImageOverlayRef(el, index)"
              class="absolute inset-0 z-10"
              :style="{ background: image.overlayColor }"
            ></div>
            
            <!-- Image Content -->
            <div 
              class="w-full h-full flex items-center justify-center text-4xl"
              :style="{ background: image.bgGradient }"
            >
              {{ image.icon }}
            </div>
            
            <!-- Image Label -->
            <div 
              :ref="el => setImageLabelRef(el, index)"
              class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 transform translate-y-full"
            >
              {{ image.label }}
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div ref="buttonContainer" class="opacity-0">
          <button 
            @click="startAnimation"
            class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            🚀 重新播放动画
          </button>
        </div>

        <!-- Progress Indicator -->
        <div ref="progressContainer" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0">
          <div class="flex items-center space-x-2 text-white">
            <div class="w-32 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div ref="progressBar" class="h-full bg-white transition-all duration-300" style="width: 0%"></div>
            </div>
            <span ref="progressText" class="text-sm">0%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Particle Effects -->
    <div ref="particleContainer" class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 50"
        :key="i"
        :ref="el => setParticleRef(el, i)"
        class="absolute w-1 h-1 bg-white rounded-full opacity-0"
        :style="getParticleStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

interface Props {
  titleText?: string
  subtitleText?: string
  autoPlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  titleText: '动画展示厅 炫酷动画',
  subtitleText: '探索令人惊艳的动画世界',
  autoPlay: true
})

// Refs
const titleContainer = ref<HTMLElement>()
const subtitleContainer = ref<HTMLElement>()
const subtitle = ref<HTMLElement>()
const imageGrid = ref<HTMLElement>()
const buttonContainer = ref<HTMLElement>()
const progressContainer = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()
const progressText = ref<HTMLElement>()
const particleContainer = ref<HTMLElement>()

const titleCharRefs = ref<HTMLElement[]>([])
const imageItemRefs = ref<HTMLElement[]>([])
const imageOverlayRefs = ref<HTMLElement[]>([])
const imageLabelRefs = ref<HTMLElement[]>([])
const bgElementRefs = ref<HTMLElement[]>([])
const particleRefs = ref<HTMLElement[]>([])

// Data
const imageItems = [
  {
    icon: '✨',
    label: '文字动画',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overlayColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: '🔷',
    label: '几何动画',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    overlayColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: '📜',
    label: '滚动动画',
    bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    overlayColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: '🎯',
    label: '交互动画',
    bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    overlayColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
]

let mainTimeline: gsap.core.Timeline

// Helper functions
function setTitleCharRef(el: HTMLElement | null, index: number) {
  if (el) titleCharRefs.value[index] = el
}

function setImageItemRef(el: HTMLElement | null, index: number) {
  if (el) imageItemRefs.value[index] = el
}

function setImageOverlayRef(el: HTMLElement | null, index: number) {
  if (el) imageOverlayRefs.value[index] = el
}

function setImageLabelRef(el: HTMLElement | null, index: number) {
  if (el) imageLabelRefs.value[index] = el
}

function setBgElementRef(el: HTMLElement | null, index: number) {
  if (el) bgElementRefs.value[index] = el
}

function setParticleRef(el: HTMLElement | null, index: number) {
  if (el) particleRefs.value[index] = el
}

function getTitleCharColor(index: number) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8']
  return colors[index % colors.length]
}

function getBgElementStyle(index: number) {
  const shapes = ['circle', 'square', 'triangle']
  const shape = shapes[index % shapes.length]
  const size = Math.random() * 20 + 10
  
  let clipPath = ''
  switch (shape) {
    case 'circle':
      clipPath = 'circle(50%)'
      break
    case 'triangle':
      clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
      break
    default:
      clipPath = 'none'
  }
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    clipPath: clipPath,
    transform: `rotate(${Math.random() * 360}deg)`
  }
}

function getParticleStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`
  }
}

onMounted(async () => {
  await nextTick()
  createMainTimeline()
  
  if (props.autoPlay) {
    startAnimation()
  }
})

function createMainTimeline() {
  mainTimeline = gsap.timeline({
    onUpdate: updateProgress,
    onComplete: () => {
      gsap.to(buttonContainer.value, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  })

  // Stage 1: Background elements animation
  mainTimeline.to(bgElementRefs.value, {
    opacity: 0.3,
    rotation: "+=180",
    duration: 2,
    stagger: 0.05,
    ease: "power2.out"
  })

  // Stage 2: Title reveal animation
  mainTimeline.fromTo(titleCharRefs.value,
    { y: "100%", rotation: -15, opacity: 0 },
    {
      y: "0%",
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)"
    },
    "-=1.5"
  )

  // Stage 3: Subtitle reveal
  mainTimeline.fromTo(subtitle.value,
    { y: "100%" },
    {
      y: "0%",
      duration: 0.8,
      ease: "power2.out"
    },
    "-=0.5"
  )

  // Stage 4: Images appear and overlay split
  mainTimeline.to(imageItemRefs.value, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.3")

  // Image overlay split effect
  imageOverlayRefs.value.forEach((overlay, index) => {
    if (overlay) {
      mainTimeline.to(overlay, {
        x: index % 2 === 0 ? "-100%" : "100%",
        duration: 0.8,
        ease: "power2.inOut"
      }, `-=${0.8 - index * 0.1}`)
    }
  })

  // Image labels slide up
  mainTimeline.to(imageLabelRefs.value, {
    y: "0%",
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.5")

  // Stage 5: Particle burst
  mainTimeline.to(particleRefs.value, {
    opacity: 1,
    scale: 2,
    duration: 1.5,
    stagger: 0.02,
    ease: "power2.out",
    onComplete: () => {
      // Particle floating animation
      particleRefs.value.forEach(particle => {
        if (particle) {
          gsap.to(particle, {
            y: "-=20",
            x: `+=${Math.random() * 40 - 20}`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          })
        }
      })
    }
  }, "-=0.3")

  // Stage 6: Progress indicator
  mainTimeline.to(progressContainer.value, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  }, "-=1")
}

function updateProgress() {
  const progress = mainTimeline.progress() * 100
  if (progressBar.value && progressText.value) {
    progressBar.value.style.width = `${progress}%`
    progressText.value.textContent = `${Math.round(progress)}%`
  }
}

function startAnimation() {
  // Reset all elements
  gsap.set(titleCharRefs.value, { y: "100%", rotation: -15, opacity: 0 })
  gsap.set(subtitle.value, { y: "100%" })
  gsap.set(imageItemRefs.value, { opacity: 0, scale: 0.8 })
  gsap.set(imageOverlayRefs.value, { x: "0%" })
  gsap.set(imageLabelRefs.value, { y: "100%" })
  gsap.set(particleRefs.value, { opacity: 0, scale: 1 })
  gsap.set(buttonContainer.value, { opacity: 0, y: 20 })
  gsap.set(progressContainer.value, { opacity: 0 })
  
  // Restart timeline
  mainTimeline.restart()
}

// Expose methods for parent component
defineExpose({
  startAnimation,
  timeline: mainTimeline
})
</script>

<style scoped>
.title-line {
  perspective: 1000px;
}

.subtitle-reveal {
  perspective: 1000px;
}

.image-item {
  transform: scale(0.8);
  transform-style: preserve-3d;
}

.split-reveal-animation {
  background-attachment: fixed;
}

/* Background animation */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
}

.bg-element {
  animation: float 6s ease-in-out infinite;
}
</style>
