<template>
  <div ref="loaderRef" class="fixed inset-0 z-50 flex items-center justify-center gradient-bg">
    <div class="text-center">
      <!-- 主要加载动画 -->
      <div class="relative mb-8">
        <!-- 外圈 -->
        <div ref="outerCircle" class="w-32 h-32 border-4 border-white/30 rounded-full"></div>
        <!-- 内圈 -->
        <div ref="innerCircle" class="absolute inset-4 border-4 border-white rounded-full"></div>
        <!-- 中心点 -->
        <div ref="centerDot" class="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <!-- 加载文字 -->
      <div ref="loadingText" class="text-white text-2xl font-bold mb-4">
        <span class="inline-block" v-for="(char, index) in 'GSAP动画加载中'" :key="index" :ref="el => setCharRef(el, index)">
          {{ char }}
        </span>
      </div>

      <!-- 进度条 -->
      <div ref="progressContainer" class="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <div ref="progressBar" class="h-full bg-white rounded-full w-0"></div>
      </div>

      <!-- 百分比 -->
      <div ref="percentText" class="text-white text-lg mt-4 opacity-0">0%</div>
    </div>

    <!-- 粒子效果 -->
    <div ref="particles" class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 50" 
        :key="i" 
        :ref="el => setParticleRef(el, i)"
        class="absolute w-1 h-1 bg-white rounded-full opacity-0"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{
  loaded: []
}>()

const loaderRef = ref<HTMLElement>()
const outerCircle = ref<HTMLElement>()
const innerCircle = ref<HTMLElement>()
const centerDot = ref<HTMLElement>()
const loadingText = ref<HTMLElement>()
const progressContainer = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()
const percentText = ref<HTMLElement>()
const particles = ref<HTMLElement>()

const charRefs = ref<HTMLElement[]>([])
const particleRefs = ref<HTMLElement[]>([])

function setCharRef(el: HTMLElement | null, index: number) {
  if (el) {
    charRefs.value[index] = el
  }
}

function setParticleRef(el: HTMLElement | null, index: number) {
  if (el) {
    particleRefs.value[index] = el
  }
}

onMounted(async () => {
  await nextTick()
  startLoadingAnimation()
})

function startLoadingAnimation() {
  const tl = gsap.timeline()

  // 初始设置
  gsap.set([outerCircle.value, innerCircle.value, centerDot.value], { scale: 0 })
  gsap.set(charRefs.value, { y: 50, opacity: 0 })
  gsap.set(progressContainer.value, { scale: 0, opacity: 0 })
  gsap.set(percentText.value, { opacity: 0 })

  // 圆圈动画
  tl.to(outerCircle.value, { scale: 1, duration: 0.8, ease: "back.out(1.7)" })
    .to(innerCircle.value, { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
    .to(centerDot.value, { scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")

  // 文字动画
  tl.to(charRefs.value, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.3")

  // 进度条出现
  tl.to(progressContainer.value, {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.3")

  // 百分比显示
  tl.to(percentText.value, { opacity: 1, duration: 0.3 })

  // 循环动画
  gsap.to(outerCircle.value, {
    rotation: 360,
    duration: 2,
    ease: "none",
    repeat: -1
  })

  gsap.to(innerCircle.value, {
    rotation: -360,
    duration: 1.5,
    ease: "none",
    repeat: -1
  })

  gsap.to(centerDot.value, {
    scale: 1.5,
    duration: 1,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  })

  // 文字浮动效果
  gsap.to(charRefs.value, {
    y: -10,
    duration: 2,
    ease: "power2.inOut",
    stagger: 0.1,
    yoyo: true,
    repeat: -1
  })

  // 粒子动画
  animateParticles()

  // 进度条动画
  animateProgress()
}

function animateParticles() {
  particleRefs.value.forEach((particle, index) => {
    if (particle) {
      // 随机位置
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      })

      // 动画
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      })

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 4 + 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      })
    }
  })
}

function animateProgress() {
  let progress = 0
  const progressTween = gsap.to({}, {
    duration: 2.5,
    ease: "power2.out",
    onUpdate: function() {
      progress = Math.round(this.progress() * 100)
      gsap.set(progressBar.value, { width: `${progress}%` })
      if (percentText.value) {
        percentText.value.textContent = `${progress}%`
      }
    },
    onComplete: () => {
      // 加载完成动画
      setTimeout(() => {
        exitAnimation()
      }, 500)
    }
  })
}

function exitAnimation() {
  const tl = gsap.timeline({
    onComplete: () => {
      emit('loaded')
    }
  })

  // 所有元素向上消失
  tl.to([outerCircle.value, innerCircle.value, centerDot.value], {
    scale: 0,
    duration: 0.6,
    ease: "back.in(1.7)"
  })
    .to(charRefs.value, {
      y: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    }, "-=0.4")
    .to([progressContainer.value, percentText.value], {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.3")
    .to(particleRefs.value, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      stagger: 0.01
    }, "-=0.2")
    .to(loaderRef.value, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    })
}
</script>
