<template>
  <div class="geometry-animations-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6">几何动画效果</h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          探索形状变换、路径动画和粒子效果
        </p>
      </div>
    </section>

    <!-- Shape Morphing -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">形状变形动画</h2>
          <p class="text-gray-600 mb-8">SVG路径的平滑变形和几何图形转换</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="morphing-container h-64 flex items-center justify-center">
              <svg ref="morphingSvg" width="200" height="200" viewBox="0 0 200 200" class="overflow-visible">
                <path 
                  ref="morphingPath"
                  d="M100,20 L180,100 L100,180 L20,100 Z"
                  fill="url(#morphGradient)"
                  stroke="#3b82f6"
                  stroke-width="3"
                />
                <defs>
                  <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="flex flex-wrap gap-4 justify-center mt-6">
              <button 
                @click="morphShape('square')"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                正方形
              </button>
              <button 
                @click="morphShape('circle')"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                圆形
              </button>
              <button 
                @click="morphShape('triangle')"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                三角形
              </button>
              <button 
                @click="morphShape('star')"
                class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                星形
              </button>
              <button 
                @click="morphShape('heart')"
                class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                心形
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Particle System -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">粒子系统动画</h2>
          <p class="text-gray-600 mb-8">动态粒子效果和集群动画</p>
          
          <div class="bg-gray-900 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto relative overflow-hidden">
            <div ref="particleContainer" class="particle-system h-80 relative">
              <!-- 粒子将动态创建 -->
            </div>
            <div class="flex flex-wrap gap-4 justify-center mt-6">
              <button 
                @click="createParticleEffect('explosion')"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                爆炸效果
              </button>
              <button 
                @click="createParticleEffect('swirl')"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                漩涡效果
              </button>
              <button 
                @click="createParticleEffect('wave')"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                波浪效果
              </button>
              <button 
                @click="createParticleEffect('galaxy')"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                银河效果
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Path Animation -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">路径动画</h2>
          <p class="text-gray-600 mb-8">元素沿SVG路径运动的动画效果</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="path-animation-container h-80 relative">
              <svg width="100%" height="100%" viewBox="0 0 600 300" class="absolute inset-0">
                <!-- 路径 -->
                <path 
                  ref="animationPath"
                  d="M50,150 Q150,50 250,150 T450,150 Q500,100 550,150"
                  fill="none"
                  stroke="#e5e7eb"
                  stroke-width="3"
                  stroke-dasharray="10,5"
                />
                <!-- 移动的圆形 -->
                <circle 
                  ref="pathCircle"
                  r="8"
                  fill="#3b82f6"
                  opacity="0"
                >
                  <animateMotion 
                    ref="pathMotion"
                    dur="0s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#motionPath"/>
                  </animateMotion>
                </circle>
                <!-- 隐藏的路径用于运动 -->
                <path 
                  id="motionPath"
                  d="M50,150 Q150,50 250,150 T450,150 Q500,100 550,150"
                  fill="none"
                  opacity="0"
                />
              </svg>
              
              <!-- 移动的元素 -->
              <div 
                ref="movingElement"
                class="absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 transform -translate-x-3 -translate-y-3"
              ></div>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center mt-6">
              <button 
                @click="animateAlongPath('smooth')"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                平滑路径
              </button>
              <button 
                @click="animateAlongPath('bouncy')"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                弹跳路径
              </button>
              <button 
                @click="animateAlongPath('elastic')"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                弹性路径
              </button>
              <button 
                @click="createTrail"
                class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                拖尾效果
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Geometric Transformations -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">几何变换动画</h2>
          <p class="text-gray-600 mb-8">复杂的几何图形变换和组合动画</p>
          
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="transform-container h-80 flex items-center justify-center relative">
              <!-- 几何图形网格 -->
              <div 
                v-for="i in 25" 
                :key="i"
                :ref="el => setGeometryRef(el, i)"
                class="absolute w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"
                :style="getGeometryPosition(i)"
              ></div>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center mt-6">
              <button 
                @click="geometricTransform('wave')"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                波浪变换
              </button>
              <button 
                @click="geometricTransform('spiral')"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                螺旋变换
              </button>
              <button 
                @click="geometricTransform('explode')"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                爆炸变换
              </button>
              <button 
                @click="geometricTransform('matrix')"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                矩阵变换
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SVG Drawing Animation Section -->
    <SVGDrawAnimation :auto-start="false" :duration="3" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import SVGDrawAnimation from '@/components/animations/SVGDrawAnimation.vue'

gsap.registerPlugin(MotionPathPlugin)

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const morphingSvg = ref<SVGElement>()
const morphingPath = ref<SVGPathElement>()
const particleContainer = ref<HTMLElement>()
const animationPath = ref<SVGPathElement>()
const pathCircle = ref<SVGCircleElement>()
const movingElement = ref<HTMLElement>()
const geometryRefs = ref<HTMLElement[]>([])

// Shape paths
const shapePaths = {
  square: "M50,50 L150,50 L150,150 L50,150 Z",
  circle: "M100,50 A50,50 0 1,1 100,149.99 A50,50 0 1,1 100,50 Z",
  triangle: "M100,50 L150,150 L50,150 Z",
  star: "M100,50 L110,80 L140,80 L118,98 L128,128 L100,110 L72,128 L82,98 L60,80 L90,80 Z",
  heart: "M100,130 C100,120 85,110 75,120 C65,110 50,120 50,130 C50,140 100,180 100,180 C100,180 150,140 150,130 C150,120 135,110 125,120 C115,110 100,120 100,130 Z"
}

function setGeometryRef(el: HTMLElement | null, index: number) {
  if (el) geometryRefs.value[index] = el
}

function getGeometryPosition(index: number) {
  const row = Math.floor((index - 1) / 5)
  const col = (index - 1) % 5
  return {
    left: `${col * 15 + 10}%`,
    top: `${row * 15 + 10}%`
  }
}

onMounted(async () => {
  await nextTick()
  initPageAnimations()
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

  // SVG路径动画
  if (morphingPath.value) {
    gsap.to(morphingPath.value, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "center"
    })
  }
}

function morphShape(shapeType: keyof typeof shapePaths) {
  if (!morphingPath.value) return
  
  const newPath = shapePaths[shapeType]
  
  gsap.to(morphingPath.value, {
    morphSVG: newPath,
    duration: 1.5,
    ease: "power2.inOut"
  })
}

function createParticleEffect(effectType: string) {
  if (!particleContainer.value) return
  
  // 清除现有粒子
  particleContainer.value.innerHTML = ''
  
  const particleCount = 50
  const particles: HTMLElement[] = []
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-2 h-2 rounded-full bg-white'
    particle.style.left = '50%'
    particle.style.top = '50%'
    particleContainer.value.appendChild(particle)
    particles.push(particle)
  }
  
  switch (effectType) {
    case 'explosion':
      particles.forEach((particle, index) => {
        const angle = (index / particleCount) * Math.PI * 2
        const distance = Math.random() * 200 + 100
        
        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: Math.random() * 2 + 0.5,
          duration: 2,
          ease: "power2.out",
          delay: Math.random() * 0.5
        })
      })
      break
      
    case 'swirl':
      particles.forEach((particle, index) => {
        const delay = index * 0.05
        gsap.to(particle, {
          motionPath: {
            path: "M0,0 Q100,100 200,0 T400,0",
            autoRotate: true
          },
          opacity: 0,
          duration: 3,
          delay: delay,
          ease: "power1.inOut"
        })
      })
      break
      
    case 'wave':
      particles.forEach((particle, index) => {
        const y = Math.sin((index / particleCount) * Math.PI * 4) * 100
        gsap.to(particle, {
          x: (index - particleCount / 2) * 8,
          y: y,
          opacity: 0,
          duration: 2,
          delay: index * 0.02,
          ease: "power2.out"
        })
      })
      break
      
    case 'galaxy':
      particles.forEach((particle, index) => {
        const angle = (index / particleCount) * Math.PI * 6
        const radius = index * 3
        
        gsap.to(particle, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotation: angle * 180 / Math.PI,
          opacity: 0,
          duration: 4,
          ease: "power1.out"
        })
      })
      break
  }
}

function animateAlongPath(style: string) {
  if (!movingElement.value || !animationPath.value) return
  
  gsap.set(movingElement.value, { opacity: 1 })
  
  let ease = "power2.inOut"
  let duration = 3
  
  switch (style) {
    case 'bouncy':
      ease = "bounce.out"
      duration = 4
      break
    case 'elastic':
      ease = "elastic.out(1, 0.3)"
      duration = 5
      break
  }
  
  gsap.to(movingElement.value, {
    motionPath: {
      path: animationPath.value,
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    },
    duration: duration,
    ease: ease,
    onComplete: () => {
      gsap.to(movingElement.value, { opacity: 0, duration: 0.5 })
    }
  })
}

function createTrail() {
  if (!movingElement.value || !animationPath.value) return
  
  const trailElements: HTMLElement[] = []
  
  // 创建拖尾元素
  for (let i = 0; i < 10; i++) {
    const trail = movingElement.value.cloneNode(true) as HTMLElement
    trail.style.opacity = (10 - i) / 10 * 0.5 + ''
    trail.style.transform = `scale(${(10 - i) / 10})`
    trail.style.backgroundColor = `hsl(${220 + i * 10}, 70%, 60%)`
    particleContainer.value?.appendChild(trail)
    trailElements.push(trail)
  }
  
  gsap.set(movingElement.value, { opacity: 1 })
  
  // 主元素动画
  gsap.to(movingElement.value, {
    motionPath: {
      path: animationPath.value,
      autoRotate: true
    },
    duration: 3,
    ease: "power2.inOut"
  })
  
  // 拖尾动画
  trailElements.forEach((trail, index) => {
    gsap.to(trail, {
      motionPath: {
        path: animationPath.value,
        autoRotate: true
      },
      duration: 3,
      delay: index * 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        trail.remove()
      }
    })
  })
}

function geometricTransform(transformType: string) {
  const elements = geometryRefs.value.filter(Boolean)
  
  switch (transformType) {
    case 'wave':
      elements.forEach((element, index) => {
        const row = Math.floor(index / 5)
        const col = index % 5
        const y = Math.sin((col / 5) * Math.PI * 2) * 50
        
        gsap.to(element, {
          y: y,
          rotation: col * 72,
          duration: 2,
          delay: row * 0.1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        })
      })
      break
      
    case 'spiral':
      elements.forEach((element, index) => {
        const angle = (index / elements.length) * Math.PI * 4
        const radius = index * 5
        
        gsap.to(element, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotation: angle * 180 / Math.PI,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        })
      })
      break
      
    case 'explode':
      elements.forEach((element, index) => {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 200 + 50
        
        gsap.to(element, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: Math.random() * 2 + 0.5,
          rotation: Math.random() * 720,
          duration: 2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        })
      })
      break
      
    case 'matrix':
      elements.forEach((element, index) => {
        const row = Math.floor(index / 5)
        const col = index % 5
        const delay = (row + col) * 0.1
        
        gsap.to(element, {
          scaleX: 0,
          duration: 0.5,
          delay: delay,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(element, {
              scaleY: 0,
              duration: 0.5,
              ease: "power2.inOut",
              yoyo: true,
              repeat: 1
            })
          }
        })
      })
      break
  }
}
</script>

<style scoped>
.particle-system {
  background: radial-gradient(circle at center, #1f2937 0%, #111827 100%);
}

.transform-container {
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
}
</style>
