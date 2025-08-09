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

const bgStarRefs = ref<HTMLElement[]>([])
const pinItemRefs = ref<HTMLElement[]>([])
const counterRefs = ref<HTMLElement[]>([])
const counterNumberRefs = ref<HTMLElement[]>([])
const textLineRefs = ref<HTMLElement[]>([])
const horizontalPanelRefs = ref<HTMLElement[]>([])

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
</style>
