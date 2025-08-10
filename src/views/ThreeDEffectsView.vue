<template>
  <div class="three-d-effects-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden relative">
      <div class="absolute inset-0">
        <div 
          v-for="i in 15" 
          :key="i"
          :ref="el => setBg3DRef(el, i)"
          class="absolute w-8 h-8 border border-white/20 bg-white/5"
          :style="get3DShapeStyle(i)"
        ></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6 transform perspective-1000 rotateX-10">
          3D视觉效果
        </h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          探索真实3D空间，体验立体视觉的魅力
        </p>
      </div>
    </section>

    <!-- 3D立体相册 Section -->
    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">3D立体相册</h2>
          <p class="text-gray-600 mb-8">体验真实的3D翻页效果和空间层次感</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="photo3DEffect('flip')"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                翻转相册
              </button>
              <button 
                @click="photo3DEffect('carousel')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                旋转木马
              </button>
              <button 
                @click="photo3DEffect('stack')"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                堆叠展开
              </button>
              <button 
                @click="photo3DEffect('sphere')"
                class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                球形排列
              </button>
            </div>

            <!-- 3D相册容器 -->
            <div ref="photoContainer" class="photo-3d-container relative h-96 flex items-center justify-center" style="perspective: 1200px;">
              <div 
                v-for="(photo, index) in photoAlbum"
                :key="index"
                :ref="el => setPhoto3DRef(el, index)"
                class="photo-3d-item absolute w-64 h-40 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                @click="selectPhoto(index)"
                :style="`transform-style: preserve-3d; background: ${photo.gradient};`"
              >
                <div class="w-full h-full flex items-center justify-center text-white text-2xl font-bold relative z-10">
                  {{ photo.title }}
                </div>
                <div class="absolute inset-0 bg-black/10"></div>
                
                <!-- 3D反射效果 -->
                <div class="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 reflection"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 全景展示 Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">全景展示</h2>
          <p class="text-gray-600 mb-8">360度全景视角，沉浸式空间体验</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="panoramaMode('360')"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                360度旋转
              </button>
              <button 
                @click="panoramaMode('zoom')"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                缩放探索
              </button>
              <button 
                @click="panoramaMode('fish')"
                class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                鱼眼视角
              </button>
            </div>

            <!-- 全景容器 -->
            <div ref="panoramaContainer" class="panorama-container relative h-80 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-xl overflow-hidden" style="perspective: 1000px;">
              <!-- 全景场景 -->
              <div ref="panoramaScene" class="panorama-scene w-full h-full relative" style="transform-style: preserve-3d;">
                <!-- 天空盒子 -->
                <div 
                  v-for="(face, index) in skyboxFaces"
                  :key="index"
                  :ref="el => setSkyboxRef(el, index)"
                  class="skybox-face absolute w-full h-full flex items-center justify-center text-white text-4xl font-bold"
                  :style="`background: ${face.gradient}; transform: ${face.transform};`"
                >
                  {{ face.label }}
                </div>
                
                <!-- 3D对象 -->
                <div 
                  v-for="i in 8"
                  :key="i"
                  :ref="el => setPanoramaObjectRef(el, i)"
                  class="panorama-object absolute w-12 h-12 bg-yellow-400 rounded-lg shadow-lg"
                  :style="getPanoramaObjectStyle(i)"
                >
                  <div class="w-full h-full flex items-center justify-center text-gray-800 font-bold">
                    {{ i }}
                  </div>
                </div>
              </div>
              
              <!-- 控制指示器 -->
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
                拖拽鼠标探索全景 | 滚轮缩放
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 真实3D文字 Section -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">真实3D文字</h2>
          <p class="text-gray-300 mb-8">立体文字效果，真实的深度和阴影</p>
          
          <div class="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="text3DEffect('extrude')"
                class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                挤压文字
              </button>
              <button 
                @click="text3DEffect('rotate')"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                旋转文字
              </button>
              <button 
                @click="text3DEffect('wave')"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                波浪文字
              </button>
              <button 
                @click="text3DEffect('explode')"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                爆炸文字
              </button>
            </div>

            <!-- 3D文字容器 -->
            <div ref="text3DContainer" class="text-3d-container h-60 flex items-center justify-center relative" style="perspective: 800px;">
              <div ref="text3DGroup" class="text-3d-group" style="transform-style: preserve-3d;">
                <div 
                  v-for="(char, index) in '3D视觉'"
                  :key="index"
                  :ref="el => setText3DRef(el, index)"
                  class="text-3d-char inline-block text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                  style="transform-style: preserve-3d;"
                >
                  {{ char }}
                  <!-- 3D深度层 -->
                  <div 
                    v-for="depth in 10"
                    :key="depth"
                    class="absolute inset-0 text-8xl font-bold pointer-events-none"
                    :style="`
                      transform: translateZ(-${depth * 2}px);
                      color: rgba(99, 102, 241, ${0.8 - depth * 0.08});
                      z-index: ${-depth};
                    `"
                  >
                    {{ char }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 光线追踪效果 Section -->
    <section class="py-20 bg-black relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">光线追踪效果</h2>
          <p class="text-gray-300 mb-8">真实的光照、反射和阴影效果</p>
          
          <div class="bg-gray-900 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto relative">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="rayTracingEffect('sphere')"
                class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                反射球体
              </button>
              <button 
                @click="rayTracingEffect('glass')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                玻璃材质
              </button>
              <button 
                @click="rayTracingEffect('metal')"
                class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                金属材质
              </button>
              <button 
                @click="rayTracingEffect('hologram')"
                class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                全息效果
              </button>
            </div>

            <!-- 光线追踪容器 -->
            <div ref="rayTracingContainer" class="raytracing-container relative h-80 bg-gradient-to-b from-gray-800 to-black rounded-xl overflow-hidden">
              <!-- 光源 -->
              <div 
                v-for="i in 3"
                :key="i"
                :ref="el => setLightSourceRef(el, i)"
                class="light-source absolute w-4 h-4 bg-white rounded-full shadow-lg"
                :style="getLightSourceStyle(i)"
              >
                <div class="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
              </div>
              
              <!-- 3D对象 -->
              <div 
                v-for="(obj, index) in rayTracingObjects"
                :key="index"
                :ref="el => setRayTracingObjectRef(el, index)"
                class="raytracing-object absolute rounded-lg shadow-2xl"
                :style="`
                  width: ${obj.size}px;
                  height: ${obj.size}px;
                  background: ${obj.material};
                  transform: ${obj.transform};
                  filter: ${obj.filter};
                `"
              >
                <!-- 反射效果 -->
                <div class="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg reflection-layer"></div>
                <!-- 阴影 -->
                <div 
                  class="absolute top-full left-1/2 transform -translate-x-1/2 bg-black/30 rounded-full shadow-element"
                  :style="`width: ${obj.size * 0.8}px; height: ${obj.size * 0.3}px; filter: blur(${obj.size * 0.1}px);`"
                ></div>
              </div>
              
              <!-- 光线 -->
              <svg ref="rayTracingSVG" class="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <radialGradient id="lightGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
                  </radialGradient>
                </defs>
                <!-- 光线路径将通过JS动态生成 -->
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 综合3D演示 Section -->
    <section class="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">综合3D演示</h2>
          <p class="text-gray-200 mb-8">结合多种3D技术的综合展示</p>
          
          <div class="bg-black/30 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto backdrop-blur-sm">
            <div class="flex justify-center gap-4 mb-8">
              <button 
                @click="comprehensiveDemo('start')"
                class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                开始演示
              </button>
              <button 
                @click="comprehensiveDemo('stop')"
                class="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                停止演示
              </button>
            </div>

            <!-- 综合演示容器 -->
            <div ref="comprehensiveContainer" class="comprehensive-container relative h-96 rounded-xl overflow-hidden" style="perspective: 1200px; background: radial-gradient(circle at center, #1f2937 0%, #000000 100%);">
              <!-- 演示内容将通过JS动态生成 -->
              <div class="absolute inset-0 flex items-center justify-center text-gray-400">
                点击"开始演示"体验完整的3D效果
              </div>
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
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const photoContainer = ref<HTMLElement>()
const panoramaContainer = ref<HTMLElement>()
const panoramaScene = ref<HTMLElement>()
const text3DContainer = ref<HTMLElement>()
const text3DGroup = ref<HTMLElement>()
const rayTracingContainer = ref<HTMLElement>()
const rayTracingSVG = ref<SVGElement>()
const comprehensiveContainer = ref<HTMLElement>()

// Ref arrays
const bg3DRefs = ref<HTMLElement[]>([])
const photo3DRefs = ref<HTMLElement[]>([])
const skyboxRefs = ref<HTMLElement[]>([])
const panoramaObjectRefs = ref<HTMLElement[]>([])
const text3DRefs = ref<HTMLElement[]>([])
const lightSourceRefs = ref<HTMLElement[]>([])
const rayTracingObjectRefs = ref<HTMLElement[]>([])

// Data
const photoAlbum = [
  { title: '山川', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: '海洋', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { title: '森林', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { title: '沙漠', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { title: '城市', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { title: '星空', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: '极光', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { title: '雪山', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
]

const skyboxFaces = [
  { label: '前', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', transform: 'translateZ(200px)' },
  { label: '后', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', transform: 'translateZ(-200px) rotateY(180deg)' },
  { label: '左', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', transform: 'rotateY(-90deg) translateZ(200px)' },
  { label: '右', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', transform: 'rotateY(90deg) translateZ(200px)' },
  { label: '上', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', transform: 'rotateX(90deg) translateZ(200px)' },
  { label: '下', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', transform: 'rotateX(-90deg) translateZ(200px)' }
]

const rayTracingObjects = [
  { size: 60, material: 'radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a24)', transform: 'translate(100px, 150px)', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' },
  { size: 80, material: 'linear-gradient(45deg, #0be88e, #00d4aa)', transform: 'translate(250px, 100px)', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' },
  { size: 50, material: 'conic-gradient(from 0deg, #667eea, #764ba2, #667eea)', transform: 'translate(400px, 180px)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))' }
]

// Animation state
let currentDemo: string | null = null
let panoramaDraggable: any = null
let comprehensiveAnimation: gsap.core.Timeline | null = null

// Helper functions
function setBg3DRef(el: HTMLElement | null, index: number) {
  if (el) bg3DRefs.value[index] = el
}

function setPhoto3DRef(el: HTMLElement | null, index: number) {
  if (el) photo3DRefs.value[index] = el
}

function setSkyboxRef(el: HTMLElement | null, index: number) {
  if (el) skyboxRefs.value[index] = el
}

function setPanoramaObjectRef(el: HTMLElement | null, index: number) {
  if (el) panoramaObjectRefs.value[index] = el
}

function setText3DRef(el: HTMLElement | null, index: number) {
  if (el) text3DRefs.value[index] = el
}

function setLightSourceRef(el: HTMLElement | null, index: number) {
  if (el) lightSourceRefs.value[index] = el
}

function setRayTracingObjectRef(el: HTMLElement | null, index: number) {
  if (el) rayTracingObjectRefs.value[index] = el
}

function get3DShapeStyle(index: number) {
  const shapes = ['rotate-45', 'rotate-12', 'rotate-45 scale-75', 'skew-x-12', 'skew-y-12']
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    transform: `${shapes[index % shapes.length]} translateZ(${Math.random() * 50}px)`,
    animationDelay: `${Math.random() * 2}s`
  }
}

function getPanoramaObjectStyle(index: number) {
  const angle = (index - 1) * (360 / 7)
  const radius = 120
  return {
    left: `50%`,
    top: `50%`,
    transform: `
      translate(-50%, -50%) 
      rotateY(${angle}deg) 
      translateZ(${radius}px)
      rotateY(-${angle}deg)
    `
  }
}

function getLightSourceStyle(index: number) {
  const positions = [
    { left: '20%', top: '20%' },
    { right: '20%', top: '30%' },
    { left: '50%', bottom: '20%' }
  ]
  return positions[index - 1]
}

// 3D Photo Album Functions
function photo3DEffect(type: 'flip' | 'carousel' | 'stack' | 'sphere') {
  const photos = photo3DRefs.value.filter(el => el)
  if (!photos.length) return

  gsap.killTweensOf(photos)

  switch (type) {
    case 'flip':
      photos.forEach((photo, index) => {
        gsap.fromTo(photo, 
          { rotationY: 0, z: 0, x: 0, y: 0 },
          { 
            rotationY: 180 + index * 30,
            z: index * -20,
            x: (index - 3.5) * 80,
            y: Math.sin(index * 0.5) * 30,
            duration: 1.5,
            delay: index * 0.1,
            ease: "power2.out"
          }
        )
      })
      break

    case 'carousel':
      photos.forEach((photo, index) => {
        const angle = (index / photos.length) * 360
        gsap.to(photo, {
          rotationY: angle,
          x: Math.cos(angle * Math.PI / 180) * 200,
          z: Math.sin(angle * Math.PI / 180) * 200,
          y: Math.sin(index * 0.8) * 20,
          duration: 2,
          delay: index * 0.1,
          ease: "power2.inOut"
        })
      })
      break

    case 'stack':
      photos.forEach((photo, index) => {
        gsap.to(photo, {
          x: index * 15,
          y: index * -10,
          z: index * 30,
          rotationX: -10,
          rotationY: index * 5,
          duration: 1.2,
          delay: index * 0.08,
          ease: "back.out(1.7)"
        })
      })
      break

    case 'sphere':
      photos.forEach((photo, index) => {
        const phi = Math.acos(-1 + (2 * index) / photos.length)
        const theta = Math.sqrt(photos.length * Math.PI) * phi
        const radius = 180
        
        gsap.to(photo, {
          x: radius * Math.cos(theta) * Math.sin(phi),
          y: radius * Math.cos(phi),
          z: radius * Math.sin(theta) * Math.sin(phi),
          rotationX: phi * 180 / Math.PI,
          rotationY: theta * 180 / Math.PI,
          duration: 2,
          delay: index * 0.05,
          ease: "power2.out"
        })
      })
      break
  }
}

function selectPhoto(index: number) {
  const photo = photo3DRefs.value[index]
  if (!photo) return

  // 突出显示选中的照片
  gsap.to(photo, {
    scale: 1.2,
    z: 100,
    rotationY: 0,
    duration: 0.5,
    ease: "power2.out"
  })

  // 其他照片缩小
  photo3DRefs.value.forEach((p, i) => {
    if (i !== index && p) {
      gsap.to(p, {
        scale: 0.8,
        opacity: 0.6,
        z: -50,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  })

  // 2秒后恢复
  gsap.delayedCall(2, () => {
    photo3DRefs.value.forEach(p => {
      if (p) {
        gsap.to(p, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    })
  })
}

// Panorama Functions
function panoramaMode(mode: '360' | 'zoom' | 'fish') {
  if (!panoramaScene.value) return

  switch (mode) {
    case '360':
      gsap.to(panoramaScene.value, {
        rotationY: "+=360",
        rotationX: "+=180",
        duration: 8,
        ease: "none",
        repeat: -1
      })
      break

    case 'zoom':
      gsap.to(panoramaScene.value, {
        scale: 2,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
      break

    case 'fish':
      if (panoramaContainer.value) {
        gsap.to(panoramaContainer.value, {
          css: { filter: "contrast(1.2) saturate(1.5)" },
          duration: 1
        })
        gsap.to(panoramaScene.value, {
          scale: 0.8,
          rotationX: 20,
          duration: 1,
          ease: "power2.out"
        })
      }
      break
  }

  // Setup drag controls
  setupPanoramaDrag()
}

function setupPanoramaDrag() {
  if (panoramaDraggable) {
    panoramaDraggable.kill()
  }

  if (panoramaScene.value) {
    let startRotation = { x: 0, y: 0 }
    
    panoramaDraggable = Draggable.create(panoramaContainer.value, {
      type: "x,y",
      onDrag: function() {
        const rotationY = startRotation.y + this.x * 0.5
        const rotationX = startRotation.x - this.y * 0.3
        
        gsap.set(panoramaScene.value, {
          rotationY: rotationY,
          rotationX: Math.max(-60, Math.min(60, rotationX))
        })
      },
      onDragStart: function() {
        gsap.killTweensOf(panoramaScene.value)
        const transform = getComputedStyle(panoramaScene.value!).transform
        // 解析当前旋转值
        startRotation = { x: 0, y: 0 } // 简化处理
      }
    })[0]
  }
}

// 3D Text Functions
function text3DEffect(type: 'extrude' | 'rotate' | 'wave' | 'explode') {
  const textChars = text3DRefs.value.filter(el => el)
  if (!textChars.length) return

  gsap.killTweensOf(textChars)

  switch (type) {
    case 'extrude':
      textChars.forEach((char, index) => {
        gsap.fromTo(char,
          { z: 0, rotationY: 0 },
          {
            z: 50 + index * 10,
            rotationY: index * 15,
            duration: 1.5,
            delay: index * 0.1,
            ease: "power2.out"
          }
        )
      })
      break

    case 'rotate':
      textChars.forEach((char, index) => {
        gsap.to(char, {
          rotationY: 360,
          rotationX: 180,
          z: Math.sin(index) * 30,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.inOut"
        })
      })
      break

    case 'wave':
      textChars.forEach((char, index) => {
        gsap.to(char, {
          y: () => Math.sin(Date.now() * 0.002 + index) * 20,
          rotationZ: () => Math.sin(Date.now() * 0.001 + index) * 10,
          z: () => Math.cos(Date.now() * 0.001 + index) * 15,
          duration: 0.1,
          repeat: -1,
          ease: "none"
        })
      })
      
      // 停止波浪效果
      gsap.delayedCall(5, () => {
        gsap.killTweensOf(textChars)
        gsap.to(textChars, {
          y: 0,
          rotationZ: 0,
          z: 0,
          duration: 1,
          ease: "power2.out"
        })
      })
      break

    case 'explode':
      textChars.forEach((char, index) => {
        const angle = (index / textChars.length) * 360
        gsap.to(char, {
          x: Math.cos(angle * Math.PI / 180) * 200,
          y: Math.sin(angle * Math.PI / 180) * 200,
          z: Math.random() * 100,
          rotationX: Math.random() * 360,
          rotationY: Math.random() * 360,
          rotationZ: Math.random() * 360,
          scale: 0.5,
          duration: 1.5,
          ease: "power2.out"
        })
      })

      // 恢复
      gsap.delayedCall(2, () => {
        gsap.to(textChars, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        })
      })
      break
  }
}

// Ray Tracing Functions
function rayTracingEffect(type: 'sphere' | 'glass' | 'metal' | 'hologram') {
  const objects = rayTracingObjectRefs.value.filter(el => el)
  const lights = lightSourceRefs.value.filter(el => el)
  
  if (!objects.length) return

  switch (type) {
    case 'sphere':
      objects.forEach((obj, index) => {
        gsap.to(obj, {
          css: {
            background: `radial-gradient(circle at 30% 30%, #ffffff, #4facfe, #00f2fe)`,
            filter: `drop-shadow(0 20px 40px rgba(79, 172, 254, 0.5))`
          },
          scale: 1.2,
          duration: 1,
          ease: "power2.out"
        })
      })
      break

    case 'glass':
      objects.forEach((obj, index) => {
        gsap.to(obj, {
          css: {
            background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            filter: `drop-shadow(0 15px 35px rgba(0,0,0,0.1))`
          },
          duration: 1,
          ease: "power2.out"
        })
      })
      break

    case 'metal':
      objects.forEach((obj, index) => {
        gsap.to(obj, {
          css: {
            background: `linear-gradient(135deg, #c0c0c0, #808080, #404040)`,
            filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.8))`
          },
          duration: 1,
          ease: "power2.out"
        })
      })
      break

    case 'hologram':
      objects.forEach((obj, index) => {
        gsap.to(obj, {
          css: {
            background: `conic-gradient(from 0deg, transparent, #00ffff, transparent, #ff00ff, transparent)`,
            filter: `hue-rotate(0deg) drop-shadow(0 0 20px #00ffff)`
          },
          duration: 0.1,
          repeat: -1,
          ease: "none"
        })
        
        gsap.to(obj, {
          css: { filter: `hue-rotate(360deg) drop-shadow(0 0 20px #00ffff)` },
          duration: 2,
          repeat: -1,
          ease: "none"
        })
      })
      break
  }

  // 添加光线效果
  createRayTracingLines(type)
}

function createRayTracingLines(type: string) {
  if (!rayTracingSVG.value) return

  // 清除现有的光线
  rayTracingSVG.value.innerHTML = `
    <defs>
      <radialGradient id="lightGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
      </radialGradient>
    </defs>
  `

  const lights = lightSourceRefs.value.filter(el => el)
  const objects = rayTracingObjectRefs.value.filter(el => el)

  lights.forEach((light, lightIndex) => {
    objects.forEach((obj, objIndex) => {
      const lightRect = light.getBoundingClientRect()
      const objRect = obj.getBoundingClientRect()
      const containerRect = rayTracingContainer.value!.getBoundingClientRect()

      const x1 = lightRect.left + lightRect.width/2 - containerRect.left
      const y1 = lightRect.top + lightRect.height/2 - containerRect.top
      const x2 = objRect.left + objRect.width/2 - containerRect.left
      const y2 = objRect.top + objRect.height/2 - containerRect.top

      // 创建光线路径
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', x1.toString())
      line.setAttribute('y1', y1.toString())
      line.setAttribute('x2', x2.toString())
      line.setAttribute('y2', y2.toString())
      line.setAttribute('stroke', type === 'hologram' ? '#00ffff' : '#ffffff')
      line.setAttribute('stroke-width', '2')
      line.setAttribute('opacity', '0.6')
      
      rayTracingSVG.value!.appendChild(line)

      // 光线动画
      gsap.fromTo(line, 
        { strokeDasharray: "0,1000" },
        { 
          strokeDasharray: "1000,0",
          duration: 1,
          delay: (lightIndex + objIndex) * 0.2,
          ease: "power2.out"
        }
      )
    })
  })
}

// Comprehensive Demo
function comprehensiveDemo(action: 'start' | 'stop') {
  if (action === 'stop') {
    if (comprehensiveAnimation) {
      comprehensiveAnimation.kill()
      comprehensiveAnimation = null
    }
    if (comprehensiveContainer.value) {
      comprehensiveContainer.value.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center text-gray-400">
          点击"开始演示"体验完整的3D效果
        </div>
      `
    }
    return
  }

  if (!comprehensiveContainer.value) return

  // 创建综合演示内容
  comprehensiveContainer.value.innerHTML = `
    <div class="demo-stage absolute inset-0" style="transform-style: preserve-3d;">
      <div class="demo-element absolute w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg" style="left: 20%; top: 30%; transform-style: preserve-3d;"></div>
      <div class="demo-element absolute w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg" style="right: 20%; top: 40%; transform-style: preserve-3d;"></div>
      <div class="demo-element absolute w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg" style="left: 50%; bottom: 20%; transform-style: preserve-3d;"></div>
      <div class="demo-text absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white" style="transform-style: preserve-3d;">3D</div>
    </div>
  `

  const stage = comprehensiveContainer.value.querySelector('.demo-stage') as HTMLElement
  const elements = comprehensiveContainer.value.querySelectorAll('.demo-element')
  const text = comprehensiveContainer.value.querySelector('.demo-text') as HTMLElement

  // 创建综合动画时间轴
  comprehensiveAnimation = gsap.timeline({ repeat: -1 })

  // 舞台旋转
  comprehensiveAnimation.to(stage, {
    rotationY: 360,
    duration: 10,
    ease: "none"
  })

  // 元素动画
  elements.forEach((element, index) => {
    comprehensiveAnimation.to(element, {
      rotationX: 360,
      rotationY: 360,
      z: 100,
      duration: 3,
      delay: index * 0.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    }, 0)
  })

  // 文字动画
  comprehensiveAnimation.to(text, {
    z: 200,
    rotationY: 720,
    scale: 1.5,
    duration: 4,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
  }, 0)
}

onMounted(async () => {
  await nextTick()
  
  // 页面标题动画
  if (pageTitle.value) {
    gsap.fromTo(pageTitle.value,
      { opacity: 0, y: 50, rotationX: -30 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power2.out" }
    )
  }
  
  if (pageSubtitle.value) {
    gsap.fromTo(pageSubtitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
    )
  }

  // 背景3D形状动画
  bg3DRefs.value.forEach((shape, index) => {
    if (shape) {
      gsap.to(shape, {
        rotationY: 360,
        rotationX: 180,
        duration: 10 + index * 2,
        repeat: -1,
        ease: "none"
      })
    }
  })

  // 初始化相册
  initPhotoAlbum()
  
  // 初始化全景
  initPanorama()
  
  // 初始化3D文字
  init3DText()
  
  // 初始化光线追踪
  initRayTracing()
})

onUnmounted(() => {
  // 清理所有动画
  gsap.killTweensOf("*")
  if (panoramaDraggable) {
    panoramaDraggable.kill()
  }
  if (comprehensiveAnimation) {
    comprehensiveAnimation.kill()
  }
})

function initPhotoAlbum() {
  photo3DRefs.value.forEach((photo, index) => {
    if (photo) {
      gsap.set(photo, {
        x: (index - 3.5) * 70,
        y: 0,
        z: 0,
        rotationY: 0,
        scale: 1
      })
    }
  })
}

function initPanorama() {
  // 初始化天空盒子
  skyboxRefs.value.forEach((face, index) => {
    if (face) {
      gsap.set(face, { opacity: 0.8 })
    }
  })

  // 初始化全景对象
  panoramaObjectRefs.value.forEach((obj, index) => {
    if (obj) {
      gsap.set(obj, {
        opacity: 0.9
      })
      
      // 添加悬浮动画
      gsap.to(obj, {
        y: "+=10",
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }
  })
}

function init3DText() {
  text3DRefs.value.forEach((char, index) => {
    if (char) {
      gsap.set(char, {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1
      })
    }
  })
}

function initRayTracing() {
  // 初始化光源动画
  lightSourceRefs.value.forEach((light, index) => {
    if (light) {
      gsap.to(light, {
        opacity: 0.8,
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.5
      })
    }
  })

  // 初始化对象
  rayTracingObjectRefs.value.forEach((obj, index) => {
    if (obj) {
      gsap.set(obj, {
        transformOrigin: "center center"
      })
    }
  })
}
</script>

<style scoped>
.three-d-effects-view {
  transform-style: preserve-3d;
}

.perspective-1000 {
  perspective: 1000px;
}

.rotateX-10 {
  transform: rotateX(10deg);
}

/* 3D Photo Album Styles */
.photo-3d-container {
  transform-style: preserve-3d;
}

.photo-3d-item {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.photo-3d-item:hover {
  filter: brightness(1.1);
}

.photo-3d-item:hover .reflection {
  opacity: 0.3;
}

/* Panorama Styles */
.panorama-container {
  transform-style: preserve-3d;
  cursor: grab;
}

.panorama-container:active {
  cursor: grabbing;
}

.panorama-scene {
  transform-style: preserve-3d;
}

.skybox-face {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.panorama-object {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.panorama-object:hover {
  filter: brightness(1.2) scale(1.1);
}

/* 3D Text Styles */
.text-3d-container {
  transform-style: preserve-3d;
}

.text-3d-group {
  transform-style: preserve-3d;
}

.text-3d-char {
  transform-style: preserve-3d;
  text-shadow: 
    0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25);
}

/* Ray Tracing Styles */
.raytracing-container {
  transform-style: preserve-3d;
}

.raytracing-object {
  transform-style: preserve-3d;
  transition: all 0.5s ease;
}

.light-source {
  transform-style: preserve-3d;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

.reflection-layer {
  mix-blend-mode: overlay;
  pointer-events: none;
}

.shadow-element {
  transform-style: preserve-3d;
}

/* Comprehensive Demo Styles */
.comprehensive-container {
  transform-style: preserve-3d;
}

.demo-stage {
  transform-style: preserve-3d;
}

.demo-element {
  transform-style: preserve-3d;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.demo-text {
  transform-style: preserve-3d;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

/* Background 3D Shapes */
@keyframes float3D {
  0%, 100% {
    transform: translateY(0px) rotateY(0deg);
  }
  50% {
    transform: translateY(-20px) rotateY(180deg);
  }
}

.bg-3d-shape {
  animation: float3D 6s ease-in-out infinite;
  transform-style: preserve-3d;
}

/* Utility classes for 3D transforms */
.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.perspective-origin-center {
  perspective-origin: center;
}
</style>
