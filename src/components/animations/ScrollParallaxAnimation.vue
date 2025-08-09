<template>
  <div class="scroll-parallax-animation">
    <!-- Section 1: Hero with Parallax Background -->
    <section ref="heroSection" class="hero-section h-screen relative overflow-hidden flex items-center justify-center">
      <!-- Parallax Background Layers -->
      <div ref="bgLayer1" class="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"></div>
      
      <!-- Background Elements -->
      <div ref="bgLayer2" class="absolute inset-0">
        <div 
          v-for="i in 20"
          :key="`bg-${i}`"
          :ref="el => setBgShapeRef(el, i)"
          class="absolute opacity-20"
          :style="getBgShapeStyle(i)"
        >
          <div class="w-full h-full border-2 border-white" :class="getShapeClass(i)"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div ref="heroContent" class="relative z-10 text-center text-white px-8">
        <h1 ref="heroTitle" class="text-6xl md:text-8xl font-bold mb-6">
          视差滚动
        </h1>
        <p ref="heroSubtitle" class="text-xl md:text-2xl opacity-90 mb-8">
          多层次的滚动动画体验
        </p>
        <div ref="scrollIndicator" class="animate-bounce">
          <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      <!-- Floating Objects -->
      <div 
        v-for="i in 15"
        :key="`float-${i}`"
        :ref="el => setFloatingObjectRef(el, i)"
        class="absolute text-white text-2xl opacity-60"
        :style="getFloatingObjectStyle(i)"
      >
        {{ getFloatingIcon(i) }}
      </div>
    </section>

    <!-- Section 2: Image Reveal with Parallax -->
    <section ref="imageSection" class="image-section min-h-screen bg-gray-100 py-20 relative">
      <div class="max-w-7xl mx-auto px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <!-- Text Content -->
          <div ref="textContent" class="space-y-6">
            <h2 ref="sectionTitle" class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              图片<br/>
              <span class="text-purple-600">渐显</span><br/>
              效果
            </h2>
            <p ref="sectionText1" class="text-lg text-gray-600 leading-relaxed">
              通过ScrollTrigger控制图片的显示时机，配合视差效果创造出层次丰富的视觉体验。
            </p>
            <p ref="sectionText2" class="text-lg text-gray-600 leading-relaxed">
              每个元素都有独特的进入动画，使整个页面充满生命力。
            </p>
          </div>

          <!-- Image Grid -->
          <div ref="imageGrid" class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="(image, index) in imageItems"
                :key="index"
                :ref="el => setImageItemRef(el, index)"
                class="image-item relative overflow-hidden rounded-2xl shadow-lg"
                :style="{ height: image.height }"
              >
                <!-- Image Overlay -->
                <div 
                  :ref="el => setImageOverlayRef(el, index)"
                  class="absolute inset-0 z-10"
                  :style="{ background: image.overlayColor }"
                ></div>
                
                <!-- Image Content -->
                <div 
                  class="w-full h-full flex items-center justify-center text-4xl text-white"
                  :style="{ background: image.bgGradient }"
                >
                  {{ image.icon }}
                </div>
              </div>
            </div>

            <!-- Decorative Elements -->
            <div 
              v-for="i in 5"
              :key="`decor-${i}`"
              :ref="el => setDecorElementRef(el, i)"
              class="absolute w-4 h-4 bg-purple-500 rounded-full opacity-60"
              :style="getDecorElementStyle(i)"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Scale and Rotate Elements -->
    <section ref="transformSection" class="transform-section min-h-screen bg-gray-900 text-white py-20 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-8">
        <div class="text-center mb-20">
          <h2 ref="transformTitle" class="text-5xl md:text-7xl font-bold mb-8">
            缩放 & 旋转
          </h2>
          <p ref="transformSubtitle" class="text-xl text-gray-300 max-w-3xl mx-auto">
            元素在滚动过程中的动态变换效果
          </p>
        </div>

        <!-- Transform Elements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div 
            v-for="(item, index) in transformItems"
            :key="index"
            :ref="el => setTransformItemRef(el, index)"
            class="transform-item text-center p-8"
          >
            <div 
              :ref="el => setTransformIconRef(el, index)"
              class="text-6xl mb-6 inline-block"
              :style="{ color: item.color }"
            >
              {{ item.icon }}
            </div>
            <h3 
              :ref="el => setTransformTextRef(el, index)"
              class="text-xl font-bold mb-4"
            >
              {{ item.title }}
            </h3>
            <p 
              :ref="el => setTransformDescRef(el, index)"
              class="text-gray-400"
            >
              {{ item.description }}
            </p>
          </div>
        </div>

        <!-- Large Central Element -->
        <div ref="centralElement" class="text-center">
          <div 
            ref="centralIcon"
            class="text-9xl mx-auto mb-8 inline-block text-purple-400"
          >
            ⭐
          </div>
          <h3 ref="centralText" class="text-3xl font-bold">
            滚动中心元素
          </h3>
        </div>
      </div>

      <!-- Background Shapes -->
      <div 
        v-for="i in 10"
        :key="`bg-shape-${i}`"
        :ref="el => setBgTransformShapeRef(el, i)"
        class="absolute opacity-10 border-2 border-white"
        :style="getBgTransformShapeStyle(i)"
      ></div>
    </section>

    <!-- Section 4: Final Reveal -->
    <section ref="finalSection" class="final-section h-screen bg-gradient-to-t from-black via-purple-900 to-blue-900 flex items-center justify-center relative">
      <div ref="finalContent" class="text-center text-white px-8">
        <h2 ref="finalTitle" class="text-6xl md:text-8xl font-bold mb-8">
          完美<br/>
          <span class="text-gradient bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            融合
          </span>
        </h2>
        <p ref="finalText" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          所有动画元素的完美结合，创造出令人难忘的滚动体验
        </p>
      </div>

      <!-- Final Particles -->
      <div 
        v-for="i in 30"
        :key="`final-particle-${i}`"
        :ref="el => setFinalParticleRef(el, i)"
        class="absolute w-2 h-2 bg-white rounded-full opacity-0"
        :style="getFinalParticleStyle(i)"
      ></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoStart: true
})

// Refs
const heroSection = ref<HTMLElement>()
const bgLayer1 = ref<HTMLElement>()
const bgLayer2 = ref<HTMLElement>()
const heroContent = ref<HTMLElement>()
const heroTitle = ref<HTMLElement>()
const heroSubtitle = ref<HTMLElement>()
const scrollIndicator = ref<HTMLElement>()
const imageSection = ref<HTMLElement>()
const textContent = ref<HTMLElement>()
const sectionTitle = ref<HTMLElement>()
const sectionText1 = ref<HTMLElement>()
const sectionText2 = ref<HTMLElement>()
const imageGrid = ref<HTMLElement>()
const transformSection = ref<HTMLElement>()
const transformTitle = ref<HTMLElement>()
const transformSubtitle = ref<HTMLElement>()
const centralElement = ref<HTMLElement>()
const centralIcon = ref<HTMLElement>()
const centralText = ref<HTMLElement>()
const finalSection = ref<HTMLElement>()
const finalContent = ref<HTMLElement>()
const finalTitle = ref<HTMLElement>()
const finalText = ref<HTMLElement>()

const bgShapeRefs = ref<HTMLElement[]>([])
const floatingObjectRefs = ref<HTMLElement[]>([])
const imageItemRefs = ref<HTMLElement[]>([])
const imageOverlayRefs = ref<HTMLElement[]>([])
const decorElementRefs = ref<HTMLElement[]>([])
const transformItemRefs = ref<HTMLElement[]>([])
const transformIconRefs = ref<HTMLElement[]>([])
const transformTextRefs = ref<HTMLElement[]>([])
const transformDescRefs = ref<HTMLElement[]>([])
const bgTransformShapeRefs = ref<HTMLElement[]>([])
const finalParticleRefs = ref<HTMLElement[]>([])

// Data
const imageItems = [
  {
    icon: '🎨',
    height: '200px',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overlayColor: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: '🚀',
    height: '160px',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    overlayColor: 'linear-gradient(to right, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: '⭐',
    height: '180px',
    bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    overlayColor: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: '💎',
    height: '220px',
    bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    overlayColor: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)'
  }
]

const transformItems = [
  {
    icon: '🔄',
    title: '旋转效果',
    description: '元素随滚动进行旋转变换',
    color: '#ff6b6b'
  },
  {
    icon: '📐',
    title: '缩放效果',
    description: '动态缩放创造视觉层次',
    color: '#4ecdc4'
  },
  {
    icon: '✨',
    title: '透明度变化',
    description: '渐进式的透明度动画',
    color: '#ffe66d'
  }
]

// Helper functions
function setBgShapeRef(el: HTMLElement | null, index: number) {
  if (el) bgShapeRefs.value[index] = el
}

function setFloatingObjectRef(el: HTMLElement | null, index: number) {
  if (el) floatingObjectRefs.value[index] = el
}

function setImageItemRef(el: HTMLElement | null, index: number) {
  if (el) imageItemRefs.value[index] = el
}

function setImageOverlayRef(el: HTMLElement | null, index: number) {
  if (el) imageOverlayRefs.value[index] = el
}

function setDecorElementRef(el: HTMLElement | null, index: number) {
  if (el) decorElementRefs.value[index] = el
}

function setTransformItemRef(el: HTMLElement | null, index: number) {
  if (el) transformItemRefs.value[index] = el
}

function setTransformIconRef(el: HTMLElement | null, index: number) {
  if (el) transformIconRefs.value[index] = el
}

function setTransformTextRef(el: HTMLElement | null, index: number) {
  if (el) transformTextRefs.value[index] = el
}

function setTransformDescRef(el: HTMLElement | null, index: number) {
  if (el) transformDescRefs.value[index] = el
}

function setBgTransformShapeRef(el: HTMLElement | null, index: number) {
  if (el) bgTransformShapeRefs.value[index] = el
}

function setFinalParticleRef(el: HTMLElement | null, index: number) {
  if (el) finalParticleRefs.value[index] = el
}

function getBgShapeStyle(index: number) {
  const size = Math.random() * 60 + 20
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    transform: `rotate(${Math.random() * 360}deg)`
  }
}

function getShapeClass(index: number) {
  const shapes = ['rounded-full', 'rounded-lg', '']
  return shapes[index % shapes.length]
}

function getFloatingObjectStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    transform: `scale(${Math.random() * 0.5 + 0.5})`
  }
}

function getFloatingIcon(index: number) {
  const icons = ['⭐', '💫', '✨', '🌟', '💎', '🔷', '🔶', '⚡']
  return icons[index % icons.length]
}

function getDecorElementStyle(index: number) {
  const positions = [
    { top: '10%', right: '10%' },
    { bottom: '20%', left: '5%' },
    { top: '50%', right: '5%' },
    { bottom: '10%', right: '15%' },
    { top: '30%', left: '10%' }
  ]
  return positions[index] || { top: '50%', left: '50%' }
}

function getBgTransformShapeStyle(index: number) {
  const size = Math.random() * 100 + 50
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    borderRadius: Math.random() > 0.5 ? '50%' : '0%'
  }
}

function getFinalParticleStyle(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }
}

onMounted(async () => {
  await nextTick()
  if (props.autoStart) {
    initScrollAnimations()
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

function initScrollAnimations() {
  // Hero section parallax
  ScrollTrigger.create({
    trigger: heroSection.value,
    start: "top top",
    end: "bottom top",
    scrub: true,
    animation: gsap.to(bgLayer1.value, {
      y: -300,
      scale: 1.2,
      ease: "none"
    })
  })

  // Background shapes parallax
  bgShapeRefs.value.forEach((shape, index) => {
    if (shape) {
      ScrollTrigger.create({
        trigger: heroSection.value,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(shape, {
          y: -(100 + index * 20),
          rotation: `+=${180 + index * 30}`,
          ease: "none"
        })
      })
    }
  })

  // Floating objects parallax
  floatingObjectRefs.value.forEach((obj, index) => {
    if (obj) {
      ScrollTrigger.create({
        trigger: heroSection.value,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(obj, {
          y: -(50 + index * 15),
          x: Math.sin(index) * 100,
          rotation: `+=${index * 45}`,
          ease: "none"
        })
      })
    }
  })

  // Hero content fade out
  ScrollTrigger.create({
    trigger: heroSection.value,
    start: "top top",
    end: "bottom top",
    scrub: true,
    animation: gsap.to(heroContent.value, {
      opacity: 0,
      y: -100,
      ease: "none"
    })
  })

  // Image section animations
  ScrollTrigger.create({
    trigger: imageSection.value,
    start: "top 80%",
    animation: gsap.timeline()
      .fromTo(sectionTitle.value,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
      .fromTo([sectionText1.value, sectionText2.value],
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      )
  })

  // Image reveal animations
  imageItemRefs.value.forEach((item, index) => {
    if (item && imageOverlayRefs.value[index]) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        animation: gsap.timeline()
          .to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          })
          .to(imageOverlayRefs.value[index], {
            x: index % 2 === 0 ? "-100%" : "100%",
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.3")
      })
    }
  })

  // Transform section animations
  ScrollTrigger.create({
    trigger: transformSection.value,
    start: "top 80%",
    animation: gsap.fromTo([transformTitle.value, transformSubtitle.value],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    )
  })

  // Transform items with scroll-based scaling and rotation
  transformItemRefs.value.forEach((item, index) => {
    if (item) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        animation: gsap.fromTo(item,
          { opacity: 0, y: 60, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.2, ease: "back.out(1.7)" }
        )
      })

      // Icon rotation on scroll
      if (transformIconRefs.value[index]) {
        ScrollTrigger.create({
          trigger: transformSection.value,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          animation: gsap.to(transformIconRefs.value[index], {
            rotation: 360 * (index + 1),
            ease: "none"
          })
        })
      }
    }
  })

  // Central element scale animation
  ScrollTrigger.create({
    trigger: centralElement.value,
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    animation: gsap.fromTo(centralIcon.value,
      { scale: 0.5, rotation: 0 },
      { scale: 1.5, rotation: 720, ease: "none" }
    )
  })

  // Background transform shapes
  bgTransformShapeRefs.value.forEach((shape, index) => {
    if (shape) {
      ScrollTrigger.create({
        trigger: transformSection.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(shape, {
          y: -(200 + index * 30),
          rotation: `+=${180 + index * 45}`,
          scale: 1 + index * 0.2,
          ease: "none"
        })
      })
    }
  })

  // Final section animations
  ScrollTrigger.create({
    trigger: finalSection.value,
    start: "top 80%",
    animation: gsap.timeline()
      .fromTo([finalTitle.value, finalText.value],
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.3, ease: "power2.out" }
      )
      .to(finalParticleRefs.value, {
        opacity: 0.8,
        scale: 2,
        duration: 2,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.5")
  })

  // Decorative elements floating animation
  decorElementRefs.value.forEach((decor, index) => {
    if (decor) {
      gsap.to(decor, {
        y: -20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    }
  })
}

function resetAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  initScrollAnimations()
}

// Expose methods
defineExpose({
  initScrollAnimations,
  resetAnimations
})
</script>

<style scoped>
.scroll-parallax-animation {
  overflow-x: hidden;
}

.hero-section {
  background-attachment: fixed;
}

.image-item {
  opacity: 0;
  transform: scale(0.9);
}

.text-gradient {
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  to {
    background-position: 200% center;
  }
}
</style>
