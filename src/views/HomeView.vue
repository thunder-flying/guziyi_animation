<template>
  <div class="home-view">

    <!-- Hero Section -->
    <section class="flex overflow-hidden relative justify-center items-center min-h-screen hero-section gradient-bg">
      <!-- 背景几何图形 -->
      <div class="absolute inset-0">
        <div 
          v-for="i in 20" 
          :key="i"
          :ref="el => setBgShapeRef(el, i)"
          class="absolute opacity-10"
          :style="getRandomShapeStyle(i)"
        >
          <div class="w-full h-full border-2 border-white" :class="getRandomShape()"></div>
        </div>
      </div>

      <div class="z-10 px-4 text-center text-white">
        <h1 ref="heroTitle" class="mb-6 text-6xl font-bold md:text-8xl text-glow">
          <span v-for="(char, index) in 'GSAP'" :key="index" :ref="el => setTitleCharRef(el, index)" class="inline-block">
            {{ char }}
          </span>
        </h1>
        <p ref="heroSubtitle" class="mb-8 text-xl opacity-0 md:text-2xl">
          探索令人惊艳的动画世界
        </p>
        <button 
          ref="heroButton"
          @click="scrollToShowcase"
          @mouseenter="onButtonHover"
          @mouseleave="onButtonLeave"
          class="px-8 py-4 text-lg font-bold text-purple-600 bg-white rounded-full shadow-lg opacity-0 transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span class="relative z-10">开始探索</span>
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 transition-opacity duration-300 hover-gradient"></div>
        </button>
      </div>

      <!-- 滚动指示器 -->
      <div ref="scrollIndicator" class="absolute bottom-8 left-1/2 text-white opacity-0 transform -translate-x-1/2">
        <div class="animate-bounce">
          <svg class="mx-auto mb-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
        <span class="text-sm">向下滚动</span>
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
            体验各种酷炫的GSAP动画效果，从文字动画到几何变换，从滚动触发到交互响应
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
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-16 text-center">
          <h2 ref="featuresTitle" class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            为什么选择 GSAP？
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
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import AnimationCard from '@/components/ui/AnimationCard.vue'


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Refs
const heroTitle = ref<HTMLElement>()
const heroSubtitle = ref<HTMLElement>()
const heroButton = ref<HTMLElement>()
const scrollIndicator = ref<HTMLElement>()
const showcaseSection = ref<HTMLElement>()
const showcaseTitle = ref<HTMLElement>()
const showcaseSubtitle = ref<HTMLElement>()
const featuresTitle = ref<HTMLElement>()

const titleCharRefs = ref<HTMLElement[]>([])
const bgShapeRefs = ref<HTMLElement[]>([])
const cardRefs = ref<HTMLElement[]>([])
const featureRefs = ref<HTMLElement[]>([])

// Data
const animationCards = [
  {
    title: '文字动画',
    description: '打字机效果、文字分割、3D文字旋转等酷炫文字动画',
    route: '/text-animations',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: '几何动画',
    description: '形状变换、路径动画、粒子效果等几何图形动画',
    route: '/geometry-animations',
    icon: '🔷',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: '滚动动画',
    description: '视差滚动、元素进入动画、滚动触发效果',
    route: '/scroll-animations',
    icon: '📜',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    title: '交互动画',
    description: '鼠标悬停、点击反馈、拖拽动画等交互效果',
    route: '/interactive-animations',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    title: '时间轴动画',
    description: '复杂的时间轴控制、序列动画、同步效果',
    route: '/timeline-animations',
    icon: '⏰',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    title: '综合示例',
    description: '结合多种动画技术的综合展示案例',
    route: '/interactive-animations',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  }
]

const features = [
  {
    title: '高性能',
    description: 'GSAP使用最优化的算法，确保动画流畅运行，即使在低端设备上也能保持60fps',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: '易于使用',
    description: '简洁的API设计，让复杂动画变得简单。无论新手还是专家都能快速上手',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: '强大功能',
    description: '支持CSS属性、SVG、Canvas等多种元素类型，提供丰富的缓动函数和插件',
    icon: '💪',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
]

// Methods
function setTitleCharRef(el: HTMLElement | null, index: number) {
  if (el) titleCharRefs.value[index] = el
}

function setBgShapeRef(el: HTMLElement | null, index: number) {
  if (el) bgShapeRefs.value[index] = el
}

function setCardRef(el: any, index: number) {
  if (el) cardRefs.value[index] = el
}

function setFeatureRef(el: HTMLElement | null, index: number) {
  if (el) featureRefs.value[index] = el
}

function getRandomShapeStyle(index: number) {
  const size = Math.random() * 100 + 50
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.5}s`
  }
}

function getRandomShape() {
  const shapes = ['rounded-full', 'rounded-lg', '']
  return shapes[Math.floor(Math.random() * shapes.length)]
}

function scrollToShowcase() {
  if (!showcaseSection.value) return
  
  // 添加按钮点击动画效果
  gsap.to(heroButton.value, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  })
  
  // 平滑滚动到展示区域
  gsap.to(window, {
    duration: 1.5,
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

onMounted(async () => {
  await nextTick()
  initAnimations()
})

function initAnimations() {
  // Hero section animations
  const heroTl = gsap.timeline()
  
  // 标题字符动画
  heroTl.fromTo(titleCharRefs.value,
    { y: 100, opacity: 0, rotationX: -90 },
    { 
      y: 0, 
      opacity: 1, 
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }
  )
  .fromTo(heroSubtitle.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
    "-=0.3"
  )
  .fromTo(heroButton.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
    "-=0.2"
  )
  .fromTo(scrollIndicator.value,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    "-=0.1"
  )

  // 背景图形动画
  bgShapeRefs.value.forEach((shape, index) => {
    if (shape) {
      gsap.set(shape, { rotation: Math.random() * 360 })
      gsap.to(shape, {
        rotation: `+=${Math.random() * 360 + 180}`,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        ease: "none"
      })
      
      gsap.to(shape, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 8 + 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      })
    }
  })

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
</script>

<style scoped>
.hero-section {
  perspective: 1000px;
}
</style>
