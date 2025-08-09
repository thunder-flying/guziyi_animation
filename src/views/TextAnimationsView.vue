<template>
  <div class="text-animations-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6">
          文字动画效果
        </h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          探索各种令人惊艳的文字动画技术
        </p>
      </div>
    </section>

    <!-- Typewriter Effect -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">打字机效果</h2>
          <p class="text-gray-600 mb-8">经典的打字机动画，一个字符接一个字符地显示</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="typewriter-container min-h-[120px] flex items-center justify-center">
              <div class="text-2xl md:text-3xl font-mono text-gray-800">
                <span ref="typewriterText" class="typewriter-text"></span>
                <span ref="typewriterCursor" class="typewriter-cursor">|</span>
              </div>
            </div>
            <button 
              @click="startTypewriter"
              class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新播放
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Text Split Animation -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">文字分割动画</h2>
          <p class="text-gray-600 mb-8">将文字拆分为单个字符，创造出惊艳的进入效果</p>
          
          <div class="bg-gray-50 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-8">
            <div class="split-text-container min-h-[200px] flex items-center justify-center">
              <h3 ref="splitText" class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                动画展示厅 让动画变得简单
              </h3>
            </div>
            <div class="flex flex-wrap gap-4 justify-center">
              <button 
                @click="animateSplitText('fadeIn')"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                淡入效果
              </button>
              <button 
                @click="animateSplitText('slideUp')"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                上滑效果
              </button>
              <button 
                @click="animateSplitText('rotate')"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                旋转效果
              </button>
              <button 
                @click="animateSplitText('bounce')"
                class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                弹跳效果
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3D Text Animation -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">3D文字效果</h2>
          <p class="text-gray-300 mb-8">利用CSS 3D变换创造立体文字动画</p>
          
          <div class="perspective-container" style="perspective: 1000px;">
            <div ref="text3dContainer" class="text-3d-container min-h-[200px] flex items-center justify-center">
              <h3 ref="text3d" class="text-6xl md:text-8xl font-bold text-white transform-gpu">
                3D TEXT
              </h3>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center mt-8">
            <button 
              @click="animate3DText('rotateX')"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              X轴旋转
            </button>
            <button 
              @click="animate3DText('rotateY')"
              class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Y轴旋转
            </button>
            <button 
              @click="animate3DText('flip')"
              class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              翻转效果
            </button>
            <button 
              @click="animate3DText('wave')"
              class="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              波浪效果
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Text Morphing -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">文字变形动画</h2>
          <p class="text-gray-600 mb-8">文字之间的平滑过渡和变形效果</p>
          
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="morph-container min-h-[150px] flex items-center justify-center">
              <h3 ref="morphText" class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                HELLO
              </h3>
            </div>
            <button 
              @click="startMorphing"
              class="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              开始变形
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Glitch Effect -->
    <section class="py-20 bg-black text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">故障艺术效果</h2>
          <p class="text-gray-300 mb-8">赛博朋克风格的文字故障动画</p>
          
          <div class="glitch-container min-h-[200px] flex items-center justify-center">
            <div ref="glitchText" class="glitch-text text-5xl md:text-7xl font-bold" data-text="GLITCH">
              GLITCH
            </div>
          </div>
          
          <button 
            @click="triggerGlitch"
            class="mt-8 bg-green-500 text-black px-6 py-3 rounded-lg hover:bg-green-400 transition-colors font-bold"
          >
            触发故障
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(TextPlugin, ScrollTrigger)

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const typewriterText = ref<HTMLElement>()
const typewriterCursor = ref<HTMLElement>()
const splitText = ref<HTMLElement>()
const text3dContainer = ref<HTMLElement>()
const text3d = ref<HTMLElement>()
const morphText = ref<HTMLElement>()
const glitchText = ref<HTMLElement>()

// Data
const typewriterTexts = [
  "欢迎来到 动画展示厅",
  "创造令人惊艳的动画",
  "让你的网站生动起来",
  "探索无限可能性"
]

const morphingTexts = ["HELLO", "WORLD", "动画", "AMAZING", "CREATIVE"]
let currentMorphIndex = 0

onMounted(async () => {
  await nextTick()
  initPageAnimations()
  startTypewriter()
  startGlitchLoop()
})

function initPageAnimations() {
  // 页面标题动画
  gsap.fromTo(pageTitle.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  )
  
  gsap.fromTo(pageSubtitle.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
  )

  // 光标闪烁动画
  gsap.to(typewriterCursor.value, {
    opacity: 0,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  })
}

function startTypewriter() {
  const text = typewriterTexts[Math.floor(Math.random() * typewriterTexts.length)]
  
  if (typewriterText.value) {
    typewriterText.value.textContent = ""
    
    gsap.to(typewriterText.value, {
      duration: text.length * 0.1,
      text: text,
      ease: "none"
    })
  }
}

function animateSplitText(type: string) {
  if (!splitText.value) return
  
  const text = splitText.value.textContent || ""
  splitText.value.innerHTML = ""
  
  // 创建字符span
  for (let char of text) {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    splitText.value.appendChild(span)
  }
  
  const chars = splitText.value.querySelectorAll('span')
  
  // 重置状态
  gsap.set(chars, { opacity: 0, y: 50, rotationX: -90, scale: 0.5 })
  
  let animation: gsap.core.Timeline
  
  switch (type) {
    case 'fadeIn':
      animation = gsap.timeline()
        .to(chars, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05,
          ease: "power2.out"
        })
      break
      
    case 'slideUp':
      animation = gsap.timeline()
        .to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)"
        })
      break
      
    case 'rotate':
      animation = gsap.timeline()
        .to(chars, {
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        })
      break
      
    case 'bounce':
      animation = gsap.timeline()
        .to(chars, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "bounce.out"
        })
      break
      
    default:
      animation = gsap.timeline()
  }
}

function animate3DText(type: string) {
  if (!text3d.value) return
  
  // 重置
  gsap.set(text3d.value, { 
    rotationX: 0, 
    rotationY: 0, 
    rotationZ: 0,
    scale: 1,
    z: 0
  })
  
  switch (type) {
    case 'rotateX':
      gsap.to(text3d.value, {
        rotationX: 360,
        duration: 2,
        ease: "power2.inOut"
      })
      break
      
    case 'rotateY':
      gsap.to(text3d.value, {
        rotationY: 360,
        duration: 2,
        ease: "power2.inOut"
      })
      break
      
    case 'flip':
      gsap.timeline()
        .to(text3d.value, {
          rotationY: 90,
          duration: 0.5,
          ease: "power2.inOut"
        })
        .set(text3d.value, { textContent: "FLIPPED" })
        .to(text3d.value, {
          rotationY: 0,
          duration: 0.5,
          ease: "power2.inOut"
        })
        .to(text3d.value, {
          rotationY: 90,
          duration: 0.5,
          ease: "power2.inOut",
          delay: 1
        })
        .set(text3d.value, { textContent: "3D TEXT" })
        .to(text3d.value, {
          rotationY: 0,
          duration: 0.5,
          ease: "power2.inOut"
        })
      break
      
    case 'wave':
      const text = text3d.value.textContent || ""
      text3d.value.innerHTML = ""
      
      for (let char of text) {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        text3d.value.appendChild(span)
      }
      
      const chars = text3d.value.querySelectorAll('span')
      
      gsap.fromTo(chars, 
        { rotationX: 0, y: 0 },
        {
          rotationX: 360,
          y: -30,
          duration: 1,
          stagger: 0.1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        }
      )
      break
  }
}

function startMorphing() {
  currentMorphIndex = (currentMorphIndex + 1) % morphingTexts.length
  const newText = morphingTexts[currentMorphIndex]
  
  if (morphText.value) {
    gsap.to(morphText.value, {
      duration: 0.5,
      text: newText,
      ease: "power2.inOut"
    })
  }
}

function triggerGlitch() {
  if (!glitchText.value) return
  
  const tl = gsap.timeline()
  
  // 故障效果
  tl.to(glitchText.value, {
    x: -5,
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(glitchText.value, {
    x: 5,
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(glitchText.value, {
    x: -3,
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(glitchText.value, {
    x: 0,
    duration: 0.1,
    ease: "power2.inOut"
  })
  
  // 颜色闪烁
  tl.to(glitchText.value, {
    color: "#ff0000",
    duration: 0.05,
    yoyo: true,
    repeat: 3
  }, 0)
  .to(glitchText.value, {
    color: "#00ff00",
    duration: 0.05,
    yoyo: true,
    repeat: 2
  }, 0.2)
  .to(glitchText.value, {
    color: "#ffffff",
    duration: 0.1
  })
}

function startGlitchLoop() {
  // 随机触发故障效果
  const glitchLoop = () => {
    triggerGlitch()
    gsap.delayedCall(Math.random() * 5 + 3, glitchLoop)
  }
  
  gsap.delayedCall(2, glitchLoop)
}
</script>

<style scoped>
.typewriter-cursor {
  color: #3b82f6;
}

.glitch-text {
  position: relative;
  text-shadow: 
    0.05em 0 0 #ff0000,
    -0.025em -0.05em 0 #00ff00,
    0.025em 0.05em 0 #0000ff;
  animation: glitch 2s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-1 0.5s infinite;
  color: #ff0000;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.5s infinite;
  color: #00ff00;
  z-index: -2;
}

@keyframes glitch {
  0%, 74%, 100% {
    transform: translate(0);
  }
  75% {
    transform: translate(-2px, 2px);
  }
  76% {
    transform: translate(2px, -2px);
  }
  77% {
    transform: translate(-2px, -2px);
  }
  78% {
    transform: translate(2px, 2px);
  }
  79% {
    transform: translate(-2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
}

@keyframes glitch-1 {
  0%, 70%, 100% {
    transform: translate(0);
  }
  71% {
    transform: translate(-2px, 0);
  }
}

@keyframes glitch-2 {
  0%, 70%, 100% {
    transform: translate(0);
  }
  71% {
    transform: translate(2px, 0);
  }
}

.perspective-container {
  perspective: 1000px;
}

.text-3d-container {
  transform-style: preserve-3d;
}
</style>
