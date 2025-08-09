<template>
  <div class="card-3d-flip-animation py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
    <div class="max-w-7xl mx-auto px-8">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 ref="title" class="text-4xl md:text-6xl font-bold text-white mb-6">
          3D 卡片翻转
        </h2>
        <p ref="subtitle" class="text-xl text-gray-300 mb-8">
          鼠标悬停体验立体翻转效果
        </p>
        
        <!-- Control Buttons -->
        <div ref="controls" class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            @click="flipAllCards"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🔄 全部翻转
          </button>
          <button 
            @click="shuffleCards"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🃏 重新洗牌
          </button>
          <button 
            @click="animateAllCards"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ✨ 动画展示
          </button>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="(card, index) in cards"
          :key="card.id"
          :ref="el => setCardRef(el, index)"
          class="card-container perspective-1000"
          @mouseenter="onCardHover(index, true)"
          @mouseleave="onCardHover(index, false)"
          @click="onCardClick(index)"
        >
          <!-- 3D Card -->
          <div 
            :ref="el => setCard3DRef(el, index)"
            class="card-3d w-full h-80 relative transform-style-preserve-3d cursor-pointer"
          >
            
            <!-- Front Face -->
            <div 
              :ref="el => setCardFrontRef(el, index)"
              class="card-face card-front absolute inset-0 rounded-2xl shadow-2xl backface-hidden"
              :style="{ background: card.frontGradient }"
            >
              <div class="p-8 h-full flex flex-col justify-between text-white relative overflow-hidden">
                
                <!-- Front Background Pattern -->
                <div class="absolute inset-0 opacity-20">
                  <div 
                    v-for="i in 15"
                    :key="`front-${i}`"
                    :ref="el => setCardPatternRef(el, index, i)"
                    class="absolute w-4 h-4 border border-white rounded-full"
                    :style="getPatternStyle(i)"
                  ></div>
                </div>
                
                <!-- Front Content -->
                <div class="relative z-10">
                  <div 
                    :ref="el => setCardIconRef(el, index)"
                    class="text-5xl mb-4 inline-block transform"
                  >
                    {{ card.icon }}
                  </div>
                  <h3 
                    :ref="el => setCardTitleRef(el, index)"
                    class="text-2xl font-bold mb-2"
                  >
                    {{ card.title }}
                  </h3>
                  <p 
                    :ref="el => setCardSubtitleRef(el, index)"
                    class="text-lg opacity-90"
                  >
                    {{ card.subtitle }}
                  </p>
                </div>
                
                <!-- Front Footer -->
                <div class="relative z-10">
                  <div class="flex items-center justify-between">
                    <span class="text-sm opacity-75">点击翻转</span>
                    <div class="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Back Face -->
            <div 
              :ref="el => setCardBackRef(el, index)"
              class="card-face card-back absolute inset-0 rounded-2xl shadow-2xl backface-hidden rotate-y-180"
              :style="{ background: card.backGradient }"
            >
              <div class="p-8 h-full flex flex-col justify-between text-white relative overflow-hidden">
                
                <!-- Back Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                  <div 
                    v-for="i in 20"
                    :key="`back-${i}`"
                    class="absolute w-2 h-2 bg-white rounded-full"
                    :style="getBackPatternStyle(i)"
                  ></div>
                </div>
                
                <!-- Back Content -->
                <div class="relative z-10">
                  <h3 class="text-2xl font-bold mb-4">{{ card.backTitle }}</h3>
                  <p class="text-base leading-relaxed mb-6">
                    {{ card.description }}
                  </p>
                  
                  <!-- Features List -->
                  <ul class="space-y-2">
                    <li 
                      v-for="(feature, fIndex) in card.features"
                      :key="fIndex"
                      class="flex items-center text-sm"
                    >
                      <div class="w-2 h-2 bg-white rounded-full mr-3"></div>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                
                <!-- Back Footer -->
                <div class="relative z-10">
                  <button class="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg py-3 font-medium transition-all">
                    了解更多
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Demo Section -->
      <div ref="demoSection" class="text-center">
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 class="text-3xl font-bold text-white mb-6">交互演示</h3>
          
          <!-- Demo Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            <!-- Continuous Rotation Card -->
            <div class="demo-card-container perspective-1000">
              <div 
                ref="rotatingCard"
                class="demo-card w-full h-48 relative transform-style-preserve-3d"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  自动旋转卡片
                </div>
              </div>
            </div>
            
            <!-- Mouse Follow Card -->
            <div 
              class="demo-card-container perspective-1000"
              @mousemove="onMouseFollow"
              @mouseleave="resetMouseFollow"
            >
              <div 
                ref="mouseFollowCard"
                class="demo-card w-full h-48 relative transform-style-preserve-3d"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  鼠标跟随卡片
                </div>
              </div>
            </div>
          </div>
          
          <!-- Demo Info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="space-y-2">
              <h4 class="font-bold text-blue-400">3D变换</h4>
              <p class="text-gray-300 text-sm">
                使用CSS 3D transforms和动画引擎实现流畅的立体翻转效果
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold text-purple-400">鼠标交互</h4>
              <p class="text-gray-300 text-sm">
                响应鼠标移动和悬浮，提供丰富的用户体验反馈
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold text-green-400">性能优化</h4>
              <p class="text-gray-300 text-sm">
                硬件加速和GPU渲染确保动画流畅运行
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

interface Card {
  id: number
  title: string
  subtitle: string
  backTitle: string
  description: string
  icon: string
  frontGradient: string
  backGradient: string
  features: string[]
  isFlipped: boolean
}

interface Props {
  autoPlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true
})

// Refs
const title = ref<HTMLElement>()
const subtitle = ref<HTMLElement>()
const controls = ref<HTMLElement>()
const demoSection = ref<HTMLElement>()
const rotatingCard = ref<HTMLElement>()
const mouseFollowCard = ref<HTMLElement>()

const cardRefs = ref<HTMLElement[]>([])
const card3DRefs = ref<HTMLElement[]>([])
const cardFrontRefs = ref<HTMLElement[]>([])
const cardBackRefs = ref<HTMLElement[]>([])
const cardIconRefs = ref<HTMLElement[]>([])
const cardTitleRefs = ref<HTMLElement[]>([])
const cardSubtitleRefs = ref<HTMLElement[]>([])
const cardPatternRefs = ref<HTMLElement[][]>([])

// Data
const cards = ref<Card[]>([
  {
    id: 1,
    title: '文字动画',
    subtitle: '打字机效果',
    backTitle: '丰富的文字动效',
    description: '包含打字机、分割文字、3D文字等多种文字动画效果，让文字更加生动有趣。',
    icon: '✨',
    frontGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backGradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    features: ['打字机效果', '文字分割', '3D旋转', '故障艺术'],
    isFlipped: false
  },
  {
    id: 2,
    title: '几何动画',
    subtitle: '形状变换',
    backTitle: '动态几何效果',
    description: 'SVG路径变形、粒子系统、路径动画等几何图形相关的动画效果。',
    icon: '🔷',
    frontGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    backGradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
    features: ['SVG变形', '粒子系统', '路径动画', '几何变换'],
    isFlipped: false
  },
  {
    id: 3,
    title: '滚动动画',
    subtitle: '视差效果',
    backTitle: '滚动触发动画',
    description: '基于ScrollTrigger实现的视差滚动、元素进入动画等滚动相关效果。',
    icon: '📜',
    frontGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    backGradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    features: ['视差滚动', '元素进入', '固定动画', '进度指示'],
    isFlipped: false
  },
  {
    id: 4,
    title: '交互动画',
    subtitle: '用户响应',
    backTitle: '丰富的交互体验',
    description: '鼠标悬浮、点击反馈、拖拽交互等用户交互相关的动画效果。',
    icon: '🎯',
    frontGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    backGradient: 'linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)',
    features: ['鼠标跟随', '点击反馈', '拖拽交互', '磁性吸引'],
    isFlipped: false
  },
  {
    id: 5,
    title: '时间轴动画',
    subtitle: '序列控制',
    backTitle: '精确的时序控制',
    description: 'Timeline实现的复杂时间轴动画，精确控制动画的播放顺序。',
    icon: '⏰',
    frontGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    backGradient: 'linear-gradient(135deg, #fee140 0%, #fa709a 100%)',
    features: ['时间轴控制', '交错动画', '序列播放', '进度控制'],
    isFlipped: false
  },
  {
    id: 6,
    title: '3D效果',
    subtitle: '立体视觉',
    backTitle: '沉浸式3D体验',
    description: '利用CSS 3D transforms和WebGL技术实现的立体动画效果。',
    icon: '🎭',
    frontGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    backGradient: 'linear-gradient(135deg, #fed6e3 0%, #a8edea 100%)',
    features: ['3D变换', '透视效果', '立体翻转', '空间动画'],
    isFlipped: false
  }
])

// Helper functions
function setCardRef(el: HTMLElement | null, index: number) {
  if (el) cardRefs.value[index] = el
}

function setCard3DRef(el: HTMLElement | null, index: number) {
  if (el) card3DRefs.value[index] = el
}

function setCardFrontRef(el: HTMLElement | null, index: number) {
  if (el) cardFrontRefs.value[index] = el
}

function setCardBackRef(el: HTMLElement | null, index: number) {
  if (el) cardBackRefs.value[index] = el
}

function setCardIconRef(el: HTMLElement | null, index: number) {
  if (el) cardIconRefs.value[index] = el
}

function setCardTitleRef(el: HTMLElement | null, index: number) {
  if (el) cardTitleRefs.value[index] = el
}

function setCardSubtitleRef(el: HTMLElement | null, index: number) {
  if (el) cardSubtitleRefs.value[index] = el
}

function setCardPatternRef(el: HTMLElement | null, cardIndex: number, patternIndex: number) {
  if (el) {
    if (!cardPatternRefs.value[cardIndex]) {
      cardPatternRefs.value[cardIndex] = []
    }
    cardPatternRefs.value[cardIndex][patternIndex] = el
  }
}

function getPatternStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`
  }
}

function getBackPatternStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`
  }
}

onMounted(async () => {
  await nextTick()
  initPageAnimations()
  startDemoAnimations()
  animatePatterns()
})

function initPageAnimations() {
  // Page entrance animations
  gsap.fromTo([title.value, subtitle.value],
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
  )
  
  gsap.fromTo(controls.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
  )
  
  // Cards entrance animations
  cardRefs.value.forEach((card, index) => {
    if (card) {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          delay: 0.8 + index * 0.1,
          ease: "back.out(1.7)"
        }
      )
    }
  })
  
  gsap.fromTo(demoSection.value,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: "power2.out" }
  )
}

function startDemoAnimations() {
  // Continuous rotation for demo card
  if (rotatingCard.value) {
    gsap.to(rotatingCard.value, {
      rotationY: 360,
      duration: 4,
      repeat: -1,
      ease: "none"
    })
  }
}

function animatePatterns() {
  cardPatternRefs.value.forEach((patterns, cardIndex) => {
    patterns.forEach((pattern, patternIndex) => {
      if (pattern) {
        gsap.to(pattern, {
          scale: Math.random() * 0.5 + 0.5,
          rotation: Math.random() * 360,
          duration: Math.random() * 4 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2
        })
      }
    })
  })
}

// Card interaction handlers
function onCardHover(index: number, isEntering: boolean) {
  const card3D = card3DRefs.value[index]
  const icon = cardIconRefs.value[index]
  const title = cardTitleRefs.value[index]
  const subtitle = cardSubtitleRefs.value[index]
  
  if (!card3D) return
  
  if (isEntering) {
    gsap.to(card3D, {
      scale: 1.05,
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    })
    
    if (icon) {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
    }
    
    gsap.to([title, subtitle], {
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    })
  } else {
    gsap.to(card3D, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    })
    
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
    
    gsap.to([title, subtitle], {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

function onCardClick(index: number) {
  const card3D = card3DRefs.value[index]
  if (!card3D) return
  
  const card = cards.value[index]
  card.isFlipped = !card.isFlipped
  
  gsap.to(card3D, {
    rotationY: card.isFlipped ? 180 : 0,
    duration: 0.8,
    ease: "power2.inOut"
  })
}

function flipAllCards() {
  cards.value.forEach((card, index) => {
    card.isFlipped = !card.isFlipped
    const card3D = card3DRefs.value[index]
    
    if (card3D) {
      gsap.to(card3D, {
        rotationY: card.isFlipped ? 180 : 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.inOut"
      })
    }
  })
}

function shuffleCards() {
  // Shuffle animation
  cardRefs.value.forEach((card, index) => {
    if (card) {
      gsap.to(card, {
        y: -20,
        scale: 0.95,
        duration: 0.3,
        delay: index * 0.05,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Reset flip states
          cards.value[index].isFlipped = false
          const card3D = card3DRefs.value[index]
          if (card3D) {
            gsap.set(card3D, { rotationY: 0 })
          }
        }
      })
    }
  })
}

function animateAllCards() {
  cardRefs.value.forEach((card, index) => {
    if (card) {
      const tl = gsap.timeline({ delay: index * 0.2 })
      
      tl.to(card, {
        rotationX: 10,
        rotationY: 10,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(card, {
        rotationX: -5,
        rotationY: -5,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)"
      })
    }
  })
}

// Mouse follow effect
function onMouseFollow(event: MouseEvent) {
  if (!mouseFollowCard.value) return
  
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / centerY * -10
  const rotateY = (x - centerX) / centerX * 10
  
  gsap.to(mouseFollowCard.value, {
    rotationX: rotateX,
    rotationY: rotateY,
    duration: 0.3,
    ease: "power2.out"
  })
}

function resetMouseFollow() {
  if (!mouseFollowCard.value) return
  
  gsap.to(mouseFollowCard.value, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)"
  })
}

// Expose methods
defineExpose({
  flipAllCards,
  shuffleCards,
  animateAllCards
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.card-container {
  transition: transform 0.3s ease;
}

.card-3d {
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-face {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.demo-card {
  transform-style: preserve-3d;
}

/* Pattern animations */
@keyframes float-pattern {
  0%, 100% {
    transform: translateY(0px) scale(1) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-10px) scale(1.2) rotate(180deg);
    opacity: 0.6;
  }
}

.card-face div:nth-child(odd) {
  animation: float-pattern 4s ease-in-out infinite;
}

.card-face div:nth-child(even) {
  animation: float-pattern 6s ease-in-out infinite reverse;
}

/* Glow effect on hover */
.card-container:hover .card-3d {
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
}
</style>
