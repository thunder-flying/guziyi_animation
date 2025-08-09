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
              <button 
                @click="morphShape('diamond')"
                class="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                菱形
              </button>
              <button 
                @click="morphShape('hexagon')"
                class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                六边形
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

// 自定义SVG路径插值函数
interface Point {
  x: number
  y: number
}

function parsePath(path: string): Point[] {
  // 简化的路径解析，适用于基本形状
  const points: Point[] = []
  const commands = path.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || []
  
  let currentX = 0
  let currentY = 0
  
  commands.forEach(cmd => {
    const type = cmd[0].toUpperCase()
    const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n))
    
    switch (type) {
      case 'M':
        currentX = args[0]
        currentY = args[1]
        points.push({ x: currentX, y: currentY })
        break
      case 'L':
        currentX = args[0]
        currentY = args[1]
        points.push({ x: currentX, y: currentY })
        break
      case 'Z':
        if (points.length > 0) {
          points.push({ x: points[0].x, y: points[0].y })
        }
        break
    }
  })
  
  return points
}

function interpolatePaths(pathA: string, pathB: string, progress: number): string {
  const pointsA = parsePath(pathA)
  const pointsB = parsePath(pathB)
  
  // 确保两个路径有相同的点数
  const maxLength = Math.max(pointsA.length, pointsB.length)
  
  while (pointsA.length < maxLength) {
    pointsA.push(pointsA[pointsA.length - 1])
  }
  while (pointsB.length < maxLength) {
    pointsB.push(pointsB[pointsB.length - 1])
  }
  
  const interpolatedPoints = pointsA.map((pointA, index) => {
    const pointB = pointsB[index]
    return {
      x: pointA.x + (pointB.x - pointA.x) * progress,
      y: pointA.y + (pointB.y - pointA.y) * progress
    }
  })
  
  let result = `M${interpolatedPoints[0].x},${interpolatedPoints[0].y}`
  for (let i = 1; i < interpolatedPoints.length; i++) {
    result += ` L${interpolatedPoints[i].x},${interpolatedPoints[i].y}`
  }
  result += ' Z'
  
  return result
}

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

// Shape paths - 简化为线性路径以支持自定义变形
const shapePaths = {
  square: "M50,50 L150,50 L150,150 L50,150 Z",
  circle: "M100,25 L125,35 L145,55 L155,80 L155,105 L155,130 L145,155 L125,175 L100,185 L75,175 L55,155 L45,130 L45,105 L45,80 L55,55 L75,35 Z",
  triangle: "M100,50 L150,150 L50,150 Z",
  star: "M100,40 L110,75 L140,75 L120,95 L130,130 L100,110 L70,130 L80,95 L60,75 L90,75 Z",
  heart: "M100,65 L90,55 L75,55 L65,65 L65,80 L75,90 L100,120 L125,90 L135,80 L135,65 L125,55 L110,55 Z",
  diamond: "M100,40 L140,100 L100,160 L60,100 Z",
  hexagon: "M100,50 L130,75 L130,125 L100,150 L70,125 L70,75 Z"
}

// 当前形状状态
let currentShapeKey: keyof typeof shapePaths = 'square'

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

  // SVG路径动画 - 缓慢旋转
  if (morphingPath.value) {
    gsap.to(morphingPath.value, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "center"
    })
    
    // 添加悬浮动画
    gsap.to(morphingPath.value, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }
}

function morphShape(shapeType: keyof typeof shapePaths) {
  if (!morphingPath.value) return
  
  const currentPath = shapePaths[currentShapeKey]
  const newPath = shapePaths[shapeType]
  
  // 使用自定义路径插值替代MorphSVG
  gsap.to({ progress: 0 }, {
    progress: 1,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: function() {
      if (morphingPath.value) {
        const interpolatedPath = interpolatePaths(currentPath, newPath, this.targets()[0].progress)
        morphingPath.value.setAttribute('d', interpolatedPath)
      }
    },
    onComplete: () => {
      currentShapeKey = shapeType
      // 添加变形完成后的脉冲效果
      if (morphingPath.value) {
        gsap.to(morphingPath.value, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          transformOrigin: "center"
        })
      }
    }
  })
  
  // 添加颜色渐变效果
  if (morphingSvg.value) {
    const gradient = morphingSvg.value.querySelector('#morphGradient')
    if (gradient) {
      const colors = {
        square: ['#3b82f6', '#10b981'],
        circle: ['#8b5cf6', '#06b6d4'],
        triangle: ['#f59e0b', '#ef4444'],
        star: ['#ec4899', '#8b5cf6'],
        heart: ['#f43f5e', '#ec4899'],
        diamond: ['#06b6d4', '#3b82f6'],
        hexagon: ['#10b981', '#059669']
      }
      
      const stops = gradient.querySelectorAll('stop')
      if (stops.length >= 2) {
        gsap.to(stops[0], {
          attr: { 'stop-color': colors[shapeType][0] },
          duration: 1.5,
          ease: "power2.inOut"
        })
        gsap.to(stops[1], {
          attr: { 'stop-color': colors[shapeType][1] },
          duration: 1.5,
          ease: "power2.inOut"
        })
      }
    }
  }
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
        const armCount = 3 // 三个螺旋臂
        const armIndex = index % armCount
        const particleInArm = Math.floor(index / armCount)
        const totalInArm = Math.ceil(particleCount / armCount)
        
        const baseAngle = (armIndex * 2 * Math.PI) / armCount
        const spiralAngle = (particleInArm / totalInArm) * Math.PI * 4
        const finalAngle = baseAngle + spiralAngle
        
        const radius = (particleInArm / totalInArm) * 180 + 30
        const x = Math.cos(finalAngle) * radius
        const y = Math.sin(finalAngle) * radius
        
        gsap.set(particle, { scale: 0 })
        
        const tl = gsap.timeline()
        
        tl.to(particle, {
          scale: Math.random() * 1.5 + 0.5,
          duration: 0.5,
          delay: (particleInArm / totalInArm) * 2,
          ease: "power2.out"
        })
        .to(particle, {
          x: x,
          y: y,
          rotation: finalAngle * 180 / Math.PI,
          duration: 3,
          ease: "power1.inOut"
        }, "-=0.3")
        .to(particle, {
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: "power2.in"
        }, "-=0.5")
      })
      break
  }
  
  // 添加容器震动效果
  if (effectType === 'explosion') {
    gsap.to(particleContainer.value, {
      x: 5,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(particleContainer.value, { x: 0 })
      }
    })
  }
}

function animateAlongPath(style: string) {
  if (!movingElement.value || !animationPath.value) return
  
  // 重置元素状态
  gsap.set(movingElement.value, { 
    opacity: 1, 
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  })
  
  let ease = "power2.inOut"
  let duration = 3
  
  switch (style) {
    case 'smooth':
      // 平滑路径动画
      gsap.to(movingElement.value, {
        motionPath: {
          path: animationPath.value,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        scale: 1.2,
        duration: duration,
        ease: ease,
        onComplete: () => {
          gsap.to(movingElement.value, { 
            opacity: 0, 
            scale: 0.5,
            duration: 0.5 
          })
        }
      })
      break
      
    case 'bouncy':
      // 弹跳路径动画
      ease = "bounce.out"
      duration = 4
      
      gsap.to(movingElement.value, {
        motionPath: {
          path: animationPath.value,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        scale: 1.5,
        duration: duration,
        ease: ease,
        onUpdate: function() {
          // 添加随机弹跳效果
          if (Math.random() < 0.1) {
            gsap.to(movingElement.value, {
              scaleY: 0.8,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            })
          }
        },
        onComplete: () => {
          gsap.to(movingElement.value, { 
            opacity: 0, 
            scale: 0,
            duration: 0.5,
            ease: "back.in(2)" 
          })
        }
      })
      break
      
    case 'elastic':
      // 弹性路径动画
      ease = "elastic.out(1, 0.3)"
      duration = 5
      
      const tl = gsap.timeline()
      
      tl.to(movingElement.value, {
        motionPath: {
          path: animationPath.value,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: duration,
        ease: ease
      })
      .to(movingElement.value, {
        scale: 2,
        duration: 0.5,
        ease: "elastic.out(2, 0.5)"
      }, "-=1")
      .to(movingElement.value, {
        scale: 0,
        opacity: 0,
        rotation: 720,
        duration: 1,
        ease: "power2.in"
      })
      break
  }
}

function createTrail() {
  if (!movingElement.value || !animationPath.value || !particleContainer.value) return
  
  const trailElements: HTMLElement[] = []
  const trailCount = 15
  
  // 创建拖尾元素
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div')
    const size = 24 - (i * 1.2) // 渐变大小
    const opacity = (trailCount - i) / trailCount * 0.8
    
    trail.className = 'absolute rounded-full'
    trail.style.width = `${size}px`
    trail.style.height = `${size}px`
    trail.style.opacity = opacity + ''
    trail.style.transform = 'translate(-50%, -50%)'
    
    // 彩虹色拖尾
    const hue = 220 + (i * 15)
    const saturation = 70 + (i * 2)
    const lightness = 50 + (i * 3)
    trail.style.background = `radial-gradient(circle, hsl(${hue}, ${saturation}%, ${lightness}%), hsl(${hue + 20}, ${saturation}%, ${lightness - 10}%))`
    trail.style.boxShadow = `0 0 ${size / 2}px hsl(${hue}, ${saturation}%, ${lightness}%)`
    
    particleContainer.value.appendChild(trail)
    trailElements.push(trail)
  }
  
  // 重置主元素
  gsap.set(movingElement.value, { 
    opacity: 1, 
    scale: 1.5,
    boxShadow: '0 0 20px #3b82f6'
  })
  
  // 主元素动画
  gsap.to(movingElement.value, {
    motionPath: {
      path: animationPath.value,
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    },
    duration: 4,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(movingElement.value, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(2)"
      })
    }
  })
  
  // 拖尾动画 - 逐渐延迟
  trailElements.forEach((trail, index) => {
    const delay = index * 0.08 // 更密集的拖尾
    
    gsap.to(trail, {
      motionPath: {
        path: animationPath.value,
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      },
      duration: 4,
      delay: delay,
      ease: "power1.inOut",
      onComplete: () => {
        // 渐隐并移除
        gsap.to(trail, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => trail.remove()
        })
      }
    })
    
    // 添加轻微的难以理解的抖动
    gsap.to(trail, {
      rotation: Math.random() * 360,
      duration: 4,
      delay: delay,
      ease: "none"
    })
  })
}

function geometricTransform(transformType: string) {
  const elements = geometryRefs.value.filter(Boolean)
  
  // 重置所有元素到初始状态
  gsap.set(elements, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1
  })
  
  switch (transformType) {
    case 'wave':
      elements.forEach((element, index) => {
        const row = Math.floor(index / 5)
        const col = index % 5
        const y = Math.sin((col / 5) * Math.PI * 2) * 60
        const phase = (row * 5 + col) * 0.2
        
        const tl = gsap.timeline()
        
        tl.to(element, {
          y: y,
          rotation: col * 45,
          scale: 1.2,
          duration: 1.5,
          delay: phase,
          ease: "power2.out"
        })
        .to(element, {
          y: y * 1.5,
          rotation: col * 90,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(element, {
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        })
      })
      break
      
    case 'spiral':
      const centerX = 0
      const centerY = 0
      
      elements.forEach((element, index) => {
        const totalElements = elements.length
        const angle = (index / totalElements) * Math.PI * 6 // 更多圈数
        const radius = (index / totalElements) * 120 + 20
        const finalX = Math.cos(angle) * radius
        const finalY = Math.sin(angle) * radius
        
        const tl = gsap.timeline()
        
        tl.to(element, {
          x: finalX,
          y: finalY,
          rotation: angle * 180 / Math.PI,
          scale: 0.8 + (index / totalElements) * 0.6,
          duration: 2.5,
          delay: index * 0.05,
          ease: "power2.inOut"
        })
        .to(element, {
          rotation: `+=${360}`,
          duration: 1,
          ease: "power1.inOut"
        }, "-=1")
        .to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          delay: (totalElements - index) * 0.03,
          ease: "back.out(1.7)"
        })
      })
      break
      
    case 'explode':
      // 创建中心爆炸效果
      elements.forEach((element, index) => {
        const angle = (index / elements.length) * Math.PI * 2 + Math.random() * 0.5
        const distance = Math.random() * 150 + 80
        const finalScale = Math.random() * 1.5 + 0.5
        
        const tl = gsap.timeline()
        
        // 首先缩放准备
        tl.to(element, {
          scale: 0.1,
          duration: 0.2,
          ease: "power2.in"
        })
        // 然后爆炸弹出
        .to(element, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: finalScale,
          rotation: Math.random() * 720 - 360,
          duration: 1.5,
          ease: "power2.out"
        })
        // 最后恢复
        .to(element, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 2,
          delay: Math.random() * 0.5,
          ease: "elastic.out(1, 0.8)"
        })
      })
      break
      
    case 'matrix':
      // 矩阵变换动画
      elements.forEach((element, index) => {
        const row = Math.floor(index / 5)
        const col = index % 5
        const delay = (row + col) * 0.1
        
        const tl = gsap.timeline()
        
        // 水平压缩
        tl.to(element, {
          scaleX: 0,
          duration: 0.4,
          delay: delay,
          ease: "power2.inOut"
        })
        // 改变颜色
        .to(element, {
          backgroundColor: '#ef4444',
          duration: 0.1
        })
        // 水平恢复
        .to(element, {
          scaleX: 1,
          duration: 0.4,
          ease: "back.out(2)"
        })
        // 垂直压缩
        .to(element, {
          scaleY: 0,
          duration: 0.4,
          ease: "power2.inOut"
        })
        // 再次改变颜色
        .to(element, {
          backgroundColor: '#10b981',
          duration: 0.1
        })
        // 垂直恢复
        .to(element, {
          scaleY: 1,
          duration: 0.4,
          ease: "back.out(2)"
        })
        // 恢复原始颜色
        .to(element, {
          backgroundColor: '',
          duration: 0.3
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
