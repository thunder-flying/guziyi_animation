<template>
  <div class="pt-16 text-animations-view">
    <!-- Page Header -->
    <section class="py-20 text-white bg-gradient-to-r from-purple-600 to-blue-600">
      <div class="px-4 mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
        <h1 ref="pageTitle" class="mb-6 text-5xl font-bold md:text-6xl">
          文字动画效果
        </h1>
        <p ref="pageSubtitle" class="mx-auto max-w-3xl text-xl opacity-90 md:text-2xl">
          探索各种令人惊艳的文字动画技术
        </p>
      </div>
    </section>

    <!-- Typewriter Effect -->
    <section class="py-20 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">打字机效果</h2>
          <p class="mb-8 text-gray-600">经典的打字机动画，一个字符接一个字符地显示</p>
          
          <div class="p-8 mx-auto max-w-4xl bg-white rounded-2xl shadow-lg">
            <div class="typewriter-container min-h-[120px] flex items-center justify-center">
              <div class="font-mono text-2xl text-gray-800 md:text-3xl">
                <span ref="typewriterText" class="typewriter-text"></span>
                <span ref="typewriterCursor" class="typewriter-cursor">|</span>
              </div>
            </div>
            <button 
              @click="startTypewriter"
              class="px-6 py-3 mt-6 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
            >
              重新播放
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Text Split Animation -->
    <section class="py-20 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">文字分割动画</h2>
          <p class="mb-8 text-gray-600">将文字拆分为单个字符，创造出惊艳的进入效果</p>
          
          <div class="p-8 mx-auto mb-8 max-w-4xl bg-gray-50 rounded-2xl shadow-lg">
            <div class="split-text-container min-h-[200px] flex items-center justify-center">
              <h3 ref="splitText" class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 md:text-5xl">
                动画展示厅 让动画变得简单
              </h3>
            </div>
            <div class="flex flex-wrap gap-4 justify-center">
              <button 
                @click="animateSplitText('fadeIn')"
                class="px-4 py-2 text-white bg-purple-600 rounded-lg transition-colors hover:bg-purple-700"
              >
                淡入效果
              </button>
              <button 
                @click="animateSplitText('slideUp')"
                class="px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                上滑效果
              </button>
              <button 
                @click="animateSplitText('rotate')"
                class="px-4 py-2 text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              >
                旋转效果
              </button>
              <button 
                @click="animateSplitText('bounce')"
                class="px-4 py-2 text-white bg-orange-600 rounded-lg transition-colors hover:bg-orange-700"
              >
                弹跳效果
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3D Text Animation -->
    <section class="py-20 text-white bg-gray-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">3D文字效果</h2>
          <p class="mb-8 text-gray-300">利用CSS 3D变换创造立体文字动画</p>
          
          <div class="perspective-container" style="perspective: 1000px;">
            <div ref="text3dContainer" class="text-3d-container min-h-[200px] flex items-center justify-center">
              <h3 ref="text3d" class="text-6xl font-bold text-white transform-gpu md:text-8xl">
                3D TEXT
              </h3>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center mt-8">
            <button 
              @click="animate3DText('rotateX')"
              class="px-4 py-2 text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700"
            >
              X轴旋转
            </button>
            <button 
              @click="animate3DText('rotateY')"
              class="px-4 py-2 text-white bg-yellow-600 rounded-lg transition-colors hover:bg-yellow-700"
            >
              Y轴旋转
            </button>
            <button 
              @click="animate3DText('flip')"
              class="px-4 py-2 text-white bg-pink-600 rounded-lg transition-colors hover:bg-pink-700"
            >
              翻转效果
            </button>
            <button 
              @click="animate3DText('wave')"
              class="px-4 py-2 text-white bg-cyan-600 rounded-lg transition-colors hover:bg-cyan-700"
            >
              波浪效果
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Text Morphing -->
    <section class="py-20 bg-white">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">文字变形动画</h2>
          <p class="mb-8 text-gray-600">文字之间的平滑过渡和变形效果</p>
          
          <div class="p-8 mx-auto max-w-4xl bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg">
            <div class="morph-container min-h-[150px] flex items-center justify-center">
              <h3 ref="morphText" class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:text-5xl">
                HELLO
              </h3>
            </div>
            <button 
              @click="startMorphing"
              class="px-6 py-3 mt-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all hover:from-blue-700 hover:to-purple-700"
            >
              开始变形
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Glitch Effect -->
    <section class="py-20 text-white bg-black">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">故障艺术效果</h2>
          <p class="mb-8 text-gray-300">赛博朋克风格的文字故障动画</p>
          
          <div class="glitch-container min-h-[200px] flex items-center justify-center">
            <div ref="glitchText" class="text-5xl font-bold glitch-text md:text-7xl" data-text="GLITCH">
              GLITCH
            </div>
          </div>
          
          <button 
            @click="triggerGlitch"
            class="px-6 py-3 mt-8 font-bold text-black bg-green-500 rounded-lg transition-colors hover:bg-green-400"
          >
            触发故障
          </button>
        </div>
      </div>
    </section>

    <!-- Digital Rain Effect -->
    <section class="py-20 bg-black">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-green-500 md:text-4xl">数字雨效果</h2>
          <p class="mb-8 text-gray-300">Matrix 风格的数字瀑布动画</p>
          
          <div class="overflow-hidden relative bg-black rounded-2xl shadow-lg">
            <canvas 
              ref="digitalRainCanvas"
              class="w-full h-96"
              @click="restartDigitalRain"
            ></canvas>
            
            <!-- 覆盖文字 -->
            <div class="flex absolute inset-0 justify-center items-center pointer-events-none">
              <div ref="rainText" class="text-4xl font-bold text-green-400 opacity-80 md:text-6xl">
                MATRIX
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center mt-8">
            <button 
              @click="restartDigitalRain"
              class="px-6 py-3 text-black bg-green-500 rounded-lg transition-colors hover:bg-green-400"
            >
              重启数字雨
            </button>
            <button 
              @click="toggleRainSpeed"
              class="px-6 py-3 text-green-500 bg-transparent rounded-lg border-2 border-green-500 transition-colors hover:bg-green-500 hover:text-black"
            >
              切换速度
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Audio Wave Text -->
    <section class="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">音波可视化文字</h2>
          <p class="mb-8 text-gray-300">文字随音频波形律动的视觉效果</p>
          
          <div class="p-8 mx-auto max-w-4xl bg-black bg-opacity-50 rounded-2xl shadow-lg">
            <div class="wave-text-container min-h-[200px] flex items-center justify-center relative">
              <div ref="waveText" class="text-5xl font-bold text-white md:text-7xl">
                MUSIC
              </div>
              
              <!-- 音波可视化背景 -->
              <canvas 
                ref="audioWaveCanvas"
                class="absolute inset-0 w-full h-full opacity-30"
              ></canvas>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center mt-8">
              <button 
                @click="startAudioWave"
                class="px-6 py-3 text-white bg-purple-600 rounded-lg transition-colors hover:bg-purple-700"
              >
                开始音波
              </button>
              <button 
                @click="changeWavePattern"
                class="px-6 py-3 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                切换模式
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fractal Text Effect -->
    <section class="py-20 bg-gray-900">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">分形文字效果</h2>
          <p class="mb-8 text-gray-300">基于数学分形的文字变化动画</p>
          
          <div class="p-8 mx-auto max-w-4xl bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl shadow-lg">
            <div class="fractal-text-container min-h-[250px] flex items-center justify-center relative overflow-hidden">
              <div ref="fractalText" class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 md:text-8xl">
                FRACTAL
              </div>
              
              <!-- 分形背景图案 -->
              <svg 
                ref="fractalSvg"
                class="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 800 400"
              >
                <defs>
                  <linearGradient id="fractalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center mt-8">
              <button 
                @click="generateFractal('mandelbrot')"
                class="px-6 py-3 text-white bg-cyan-600 rounded-lg transition-colors hover:bg-cyan-700"
              >
                曼德布洛特集
              </button>
              <button 
                @click="generateFractal('julia')"
                class="px-6 py-3 text-white bg-purple-600 rounded-lg transition-colors hover:bg-purple-700"
              >
                茱莉亚集
              </button>
              <button 
                @click="generateFractal('sierpinski')"
                class="px-6 py-3 text-white bg-pink-600 rounded-lg transition-colors hover:bg-pink-700"
              >
                谢尔宾斯基三角
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
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
const digitalRainCanvas = ref<HTMLCanvasElement>()
const rainText = ref<HTMLElement>()
const audioWaveCanvas = ref<HTMLCanvasElement>()
const waveText = ref<HTMLElement>()
const fractalText = ref<HTMLElement>()
const fractalSvg = ref<SVGElement>()

// Data
const typewriterTexts = [
  "欢迎来到 动画展示厅",
  "创造令人惊艳的动画",
  "让你的网站生动起来",
  "探索无限可能性"
]

const morphingTexts = ["HELLO", "WORLD", "动画", "AMAZING", "CREATIVE"]
let currentMorphIndex = 0

// Digital Rain variables
let rainCtx: CanvasRenderingContext2D | null = null
let rainAnimationId: number = 0
let rainDrops: Array<{ x: number; y: number; speed: number; char: string }> = []
let rainSpeed = 1

// Audio Wave variables  
let waveCtx: CanvasRenderingContext2D | null = null
let waveAnimationId: number = 0
let wavePattern = 0
let waveTime = 0

// Fractal variables
let fractalType = 'mandelbrot'

onMounted(async () => {
  await nextTick()
  initPageAnimations()
  startTypewriter()
  startGlitchLoop()
  initDigitalRain()
  initAudioWave()
  generateFractal('mandelbrot')
})

function initPageAnimations() {
  // 页面标题动画
  if (pageTitle.value) {
    gsap.fromTo(pageTitle.value,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
  }
  
  if (pageSubtitle.value) {
    gsap.fromTo(pageSubtitle.value,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
    )
  }

  // 光标闪烁动画
  if (typewriterCursor.value) {
    gsap.to(typewriterCursor.value, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })
  }
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

function animateSplitText(type: 'fadeIn' | 'slideUp' | 'rotate' | 'bounce') {
  const textEl = splitText.value
  if (!textEl) return

  // 停止当前运行的所有动画
  gsap.killTweensOf(textEl)
  gsap.killTweensOf(textEl.children)

  // 获取原始文本内容
  const originalText = "动画展示厅 让动画变得简单"
  
  // 清空并重新创建字符元素
  textEl.innerHTML = ''
  
  // 创建字符 span 元素
  const characters = originalText.split('').map(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.position = 'relative'
    textEl.appendChild(span)
    return span
  })

  // 根据动画类型执行不同的动画逻辑
  switch (type) {
    case 'fadeIn':
      // 淡入效果：从透明到不透明，同时带有轻微的缩放
      gsap.set(characters, { 
        opacity: 0, 
        scale: 0.5,
        filter: 'blur(10px)',
        color: '#9333ea' // 初始紫色
      })
      
      gsap.to(characters, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: {
          amount: 1.2,
          from: "center"
        },
        ease: "power3.out",
        onComplete: () => {
          // 动画完成后添加彩虹色彩效果
          gsap.to(characters, {
            color: '#ec4899', // 粉色
            duration: 0.5,
            stagger: 0.05,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(characters, {
                color: '#8b5cf6', // 最终紫色
                duration: 0.3
              })
            }
          })
        }
      })
      break

    case 'slideUp':
      // 上滑效果：从下方滑入
      gsap.set(characters, { 
        y: 80, 
        opacity: 0,
        rotationX: 45,
        color: '#2563eb' // 初始蓝色
      })
      
      gsap.to(characters, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "power2.out",
        onComplete: () => {
          // 动画完成后添加渐变色彩效果
          gsap.to(characters, {
            color: '#06b6d4', // 青色
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(characters, {
                color: '#3b82f6', // 最终蓝色
                duration: 0.4
              })
            }
          })
        }
      })
      break

    case 'rotate':
      // 旋转效果：3D旋转进入
      gsap.set(characters, { 
        rotationY: -180, 
        opacity: 0,
        transformOrigin: "50% 50%",
        z: -100,
        color: '#059669' // 初始绿色
      })
      
      gsap.to(characters, {
        rotationY: 0,
        opacity: 1,
        z: 0,
        duration: 1.2,
        stagger: {
          amount: 1,
          from: "random"
        },
        ease: "power3.out",
        onComplete: () => {
          // 动画完成后添加多彩旋转效果
          const colors = ['#10b981', '#34d399', '#6ee7b7', '#059669']
          characters.forEach((char, index) => {
            gsap.to(char, {
              color: colors[index % colors.length],
              duration: 0.4,
              delay: index * 0.03,
              ease: "power2.out"
            })
          })
        }
      })
      break

    case 'bounce':
      // 弹跳效果：从上方弹跳进入
      gsap.set(characters, { 
        y: -100, 
        opacity: 0,
        scale: 0.3,
        rotation: Math.random() * 720 - 360,
        color: '#ea580c' // 初始橙色
      })
      
      gsap.to(characters, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        stagger: {
          amount: 0.6,
          from: "start"
        },
        ease: "bounce.out",
        onComplete: () => {
          // 动画完成后添加跳跃色彩效果
          gsap.to(characters, {
            color: '#f59e0b', // 黄色
            duration: 0.3,
            stagger: {
              amount: 0.5,
              from: "random"
            },
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(characters, {
                color: '#f97316', // 最终橙色
                duration: 0.4
              })
            }
          })
        }
      })
      break
  }
}

function animate3DText(type: string) {
  console.log('animate3DText called with type:', type)
  if (!text3d.value) {
    console.error('text3d element not found')
    return
  }
  
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
        span.style.fontSize = 'inherit'
        span.style.fontWeight = 'inherit'
        span.style.color = 'inherit'
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
          repeat: 1,
          onComplete: () => {
            // 动画完成后恢复原始文本
            if (text3d.value) {
              text3d.value.innerHTML = "3D TEXT"
            }
          }
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

// Digital Rain Functions
function initDigitalRain() {
  if (!digitalRainCanvas.value) return
  
  rainCtx = digitalRainCanvas.value.getContext('2d')
  if (!rainCtx) return
  
  // 设置画布尺寸
  digitalRainCanvas.value.width = digitalRainCanvas.value.offsetWidth
  digitalRainCanvas.value.height = digitalRainCanvas.value.offsetHeight
  
  // 初始化雨滴
  const columns = Math.floor(digitalRainCanvas.value.width / 20)
  rainDrops = []
  
  for (let i = 0; i < columns; i++) {
    rainDrops.push({
      x: i * 20,
      y: Math.random() * digitalRainCanvas.value.height,
      speed: Math.random() * 3 + 1,
      char: getRandomChar()
    })
  }
  
  startDigitalRain()
}

function getRandomChar(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  return chars[Math.floor(Math.random() * chars.length)]
}

function startDigitalRain() {
  if (!rainCtx || !digitalRainCanvas.value) return
  
  const animate = () => {
    const canvas = digitalRainCanvas.value
    if (!rainCtx || !canvas) return
    // 半透明黑色背景创造拖尾效果
    rainCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    rainCtx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 绘制字符
    rainCtx.fillStyle = '#0F0'
    rainCtx.font = '15px monospace'
    rainCtx.shadowBlur = 10
    rainCtx.shadowColor = '#0F0'
    
    rainDrops.forEach(drop => {
      rainCtx.fillText(drop.char, drop.x, drop.y)
      
      // 更新位置
      drop.y += drop.speed * rainSpeed
      
      // 重置到顶部
      if (drop.y > canvas.height) {
        drop.y = -20
        drop.char = getRandomChar()
      }
      
      // 随机更改字符
      if (Math.random() < 0.02) {
        drop.char = getRandomChar()
      }
    })
    
    rainAnimationId = requestAnimationFrame(animate)
  }
  
  animate()
}

function restartDigitalRain() {
  if (rainAnimationId) {
    cancelAnimationFrame(rainAnimationId)
  }
  initDigitalRain()
  
  // 文字动画
  if (rainText.value) {
    gsap.fromTo(rainText.value,
      { scale: 0.5, opacity: 0, rotationY: 180 },
      { scale: 1, opacity: 0.8, rotationY: 0, duration: 1, ease: "power2.out" }
    )
  }
}

function toggleRainSpeed() {
  rainSpeed = rainSpeed === 1 ? 3 : rainSpeed === 3 ? 0.5 : 1
}

// Audio Wave Functions
function initAudioWave() {
  if (!audioWaveCanvas.value) return
  
  waveCtx = audioWaveCanvas.value.getContext('2d')
  if (!waveCtx) return
  
  // 设置画布尺寸
  audioWaveCanvas.value.width = audioWaveCanvas.value.offsetWidth
  audioWaveCanvas.value.height = audioWaveCanvas.value.offsetHeight
}

function startAudioWave() {
  if (!waveCtx || !audioWaveCanvas.value) return
  
  if (waveAnimationId) {
    cancelAnimationFrame(waveAnimationId)
  }
  
  const animate = () => {
    const canvas = audioWaveCanvas.value
    if (!waveCtx || !canvas) return
    waveCtx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerY = canvas.height / 2
    const amplitude = 50
    const frequency = 0.02
    
    // 绘制波形
    waveCtx.strokeStyle = '#8b5cf6'
    waveCtx.lineWidth = 3
    waveCtx.shadowBlur = 15
    waveCtx.shadowColor = '#8b5cf6'
    waveCtx.beginPath()
    
    for (let x = 0; x < canvas.width; x++) {
      let y = centerY
      
      switch (wavePattern) {
        case 0: // 正弦波
          y += Math.sin(x * frequency + waveTime) * amplitude
          break
        case 1: // 多重波
          y += Math.sin(x * frequency + waveTime) * amplitude * 0.5
          y += Math.sin(x * frequency * 2 + waveTime * 1.5) * amplitude * 0.3
          y += Math.sin(x * frequency * 4 + waveTime * 2) * amplitude * 0.2
          break
        case 2: // 音频条
          const barWidth = 10
          const barIndex = Math.floor(x / barWidth)
          const barHeight = Math.sin(barIndex * 0.5 + waveTime) * amplitude + amplitude
          if (x % barWidth < 6) {
            waveCtx.fillStyle = `hsl(${(barIndex * 20 + waveTime * 50) % 360}, 70%, 60%)`
            waveCtx.fillRect(x, centerY - barHeight / 2, 6, barHeight)
          }
          continue
      }
      
      if (x === 0) {
        waveCtx.moveTo(x, y)
      } else {
        waveCtx.lineTo(x, y)
      }
    }
    
    if (wavePattern < 2) {
      waveCtx.stroke()
    }
    
    // 同步文字动画
    if (waveText.value) {
      const scale = 1 + Math.sin(waveTime * 2) * 0.1
      const hue = (waveTime * 50) % 360
      waveText.value.style.transform = `scale(${scale})`
      waveText.value.style.filter = `hue-rotate(${hue}deg)`
    }
    
    waveTime += 0.05
    waveAnimationId = requestAnimationFrame(animate)
  }
  
  animate()
}

onUnmounted(() => {
  if (rainAnimationId) {
    cancelAnimationFrame(rainAnimationId)
    rainAnimationId = 0
  }
  if (waveAnimationId) {
    cancelAnimationFrame(waveAnimationId)
    waveAnimationId = 0
  }
  rainCtx = null
  waveCtx = null
})

function changeWavePattern() {
  wavePattern = (wavePattern + 1) % 3
  
  // 切换文字内容
  if (waveText.value) {
    const patterns = ['MUSIC', 'WAVE', 'BEAT']
    gsap.to(waveText.value, {
      text: patterns[wavePattern],
      duration: 0.5,
      ease: "power2.inOut"
    })
  }
}

// Fractal Functions
function generateFractal(type: string) {
  fractalType = type
  if (!fractalSvg.value) return
  
  // 清除现有内容
  const existingPaths = fractalSvg.value.querySelectorAll('path, circle, polygon')
  existingPaths.forEach(el => el.remove())
  
  switch (type) {
    case 'mandelbrot':
      drawMandelbrot()
      break
    case 'julia':
      drawJulia()
      break
    case 'sierpinski':
      drawSierpinski()
      break
  }
  
  // 文字动画
  if (fractalText.value) {
    gsap.fromTo(fractalText.value,
      { scale: 0.8, opacity: 0.5, rotationX: 45 },
      { scale: 1, opacity: 1, rotationX: 0, duration: 1, ease: "power2.out" }
    )
  }
}

function drawMandelbrot() {
  if (!fractalSvg.value) return
  
  // 简化的曼德布洛特集可视化
  const width = 800
  const height = 400
  const maxIter = 20
  
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    
    // 将屏幕坐标转换为复数平面
    const real = (x - width / 2) / (width / 4)
    const imag = (y - height / 2) / (height / 4)
    
    const iterations = mandelbrotIterations(real, imag, maxIter)
    const opacity = iterations / maxIter
    
    if (iterations < maxIter) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x.toString())
      circle.setAttribute('cy', y.toString())
      circle.setAttribute('r', '2')
      circle.setAttribute('fill', 'url(#fractalGradient)')
      circle.setAttribute('opacity', opacity.toString())
      fractalSvg.value.appendChild(circle)
    }
  }
}

function mandelbrotIterations(cReal: number, cImag: number, maxIter: number): number {
  let zReal = 0
  let zImag = 0
  let iter = 0
  
  while (iter < maxIter && zReal * zReal + zImag * zImag < 4) {
    const newZReal = zReal * zReal - zImag * zImag + cReal
    const newZImag = 2 * zReal * zImag + cImag
    zReal = newZReal
    zImag = newZImag
    iter++
  }
  
  return iter
}

function drawJulia() {
  if (!fractalSvg.value) return
  
  // 茱莉亚集
  for (let i = 0; i < 150; i++) {
    const angle = (i / 150) * Math.PI * 2
    const radius = 50 + Math.sin(angle * 3) * 30
    const x = 400 + Math.cos(angle) * radius
    const y = 200 + Math.sin(angle) * radius
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x.toString())
    circle.setAttribute('cy', y.toString())
    circle.setAttribute('r', (2 + Math.sin(angle * 5)).toString())
    circle.setAttribute('fill', 'url(#fractalGradient)')
    circle.setAttribute('opacity', (0.3 + Math.sin(angle * 2) * 0.3).toString())
    fractalSvg.value.appendChild(circle)
    
    // 添加动画
    const circleOpacity = circle.getAttribute('opacity') || '0.5'
    gsap.fromTo(circle,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: parseFloat(circleOpacity), duration: 2, delay: i * 0.01, ease: "power2.out" }
    )
  }
}

function drawSierpinski() {
  if (!fractalSvg.value) return
  
  // 谢尔宾斯基三角
  const levels = 5
  drawSierpinskiTriangle(400, 50, 200, levels)
}

function drawSierpinskiTriangle(centerX: number, centerY: number, size: number, level: number) {
  if (!fractalSvg.value || level === 0) return
  
  const height = size * Math.sqrt(3) / 2
  
  // 三个顶点
  const points = [
    [centerX, centerY],
    [centerX - size / 2, centerY + height],
    [centerX + size / 2, centerY + height]
  ]
  
  const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  triangle.setAttribute('points', points.map(p => p.join(',')).join(' '))
  triangle.setAttribute('fill', 'none')
  triangle.setAttribute('stroke', 'url(#fractalGradient)')
  triangle.setAttribute('stroke-width', (level * 0.5).toString())
  triangle.setAttribute('opacity', (0.2 + level * 0.15).toString())
  fractalSvg.value.appendChild(triangle)
  
  // 递归绘制子三角形
  if (level > 1) {
    const newSize = size / 2
    drawSierpinskiTriangle(centerX, centerY + height / 4, newSize, level - 1)
    drawSierpinskiTriangle(centerX - size / 4, centerY + height * 3 / 4, newSize, level - 1)
    drawSierpinskiTriangle(centerX + size / 4, centerY + height * 3 / 4, newSize, level - 1)
  }
  
  // 添加动画
  const triangleOpacity = triangle.getAttribute('opacity') || '0.5'
  gsap.fromTo(triangle,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: parseFloat(triangleOpacity), duration: 1, delay: (5 - level) * 0.2, ease: "power2.out" }
  )
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

/* Simplified to ensure visibility during split animations */
.split-char {
  display: inline-block;
  color: #111827; /* gray-900 for readability */
}
</style>
