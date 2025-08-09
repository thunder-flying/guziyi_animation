<template>
  <div class="svg-draw-animation py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen flex items-center justify-center">
    <div class="max-w-6xl mx-auto px-8 text-center">
      
      <!-- Header -->
      <div class="mb-16">
        <h2 ref="title" class="text-4xl md:text-6xl font-bold text-white mb-6">
          SVG 路径描边
        </h2>
        <p ref="subtitle" class="text-xl text-gray-300 mb-8">
          Logo从无到有的绘制过程
        </p>
        
        <!-- Control Buttons -->
        <div ref="controls" class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            @click="drawLogo"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ✏️ 绘制Logo
          </button>
          <button 
            @click="drawSignature"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ✍️ 手写签名
          </button>
          <button 
            @click="drawIcon"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🎨 绘制图标
          </button>
          <button 
            @click="resetAll"
            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🔄 重置
          </button>
        </div>
      </div>

      <!-- SVG Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Logo SVG -->
        <div class="svg-container">
          <h3 ref="logoTitle" class="text-2xl font-bold text-white mb-6">GSAP Logo</h3>
          <div class="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <svg ref="logoSvg" width="200" height="200" viewBox="0 0 200 200" class="mx-auto">
              <!-- GSAP Text Logo -->
              <path 
                ref="logoPath1"
                d="M20,50 Q20,20 50,20 L80,20 Q110,20 110,50 Q110,80 80,80 L50,80 Q20,80 20,50 M20,50 L80,50"
                fill="none" 
                stroke="#3b82f6" 
                stroke-width="4" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path 
                ref="logoPath2"
                d="M130,20 Q130,10 140,10 Q150,10 150,20 Q150,30 140,30 Q130,30 130,20 M130,50 Q130,40 140,40 Q150,40 150,50 Q150,60 140,60 Q130,60 130,50 M130,50 L150,80"
                fill="none" 
                stroke="#8b5cf6" 
                stroke-width="4" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path 
                ref="logoPath3"
                d="M20,120 L50,120 Q80,120 80,150 Q80,180 50,180 L20,180 M20,150 L70,150"
                fill="none" 
                stroke="#06d6a0" 
                stroke-width="4" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path 
                ref="logoPath4"
                d="M110,120 L110,180 M110,150 L140,150 Q150,150 150,140 Q150,130 140,130 L110,130"
                fill="none" 
                stroke="#f72585" 
                stroke-width="4" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Progress Circle -->
              <circle 
                ref="logoProgressCircle"
                cx="100" 
                cy="100" 
                r="90" 
                fill="none" 
                stroke="rgba(255,255,255,0.2)" 
                stroke-width="2"
                opacity="0"
              />
            </svg>
            
            <!-- Progress Info -->
            <div ref="logoProgress" class="mt-4 text-white opacity-0">
              <div class="text-sm">绘制进度: <span ref="logoProgressText">0%</span></div>
            </div>
          </div>
        </div>

        <!-- Signature SVG -->
        <div class="svg-container">
          <h3 ref="signatureTitle" class="text-2xl font-bold text-white mb-6">手写签名</h3>
          <div class="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <svg ref="signatureSvg" width="200" height="150" viewBox="0 0 200 150" class="mx-auto">
              <!-- Signature Path -->
              <path 
                ref="signaturePath"
                d="M20,80 Q40,20 80,60 Q120,100 140,40 Q160,20 180,80 Q170,120 140,100 Q100,80 80,110 Q60,130 40,100 Q30,90 20,80"
                fill="none" 
                stroke="#ffd60a" 
                stroke-width="3" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Signature Dots -->
              <circle ref="signatureDot1" cx="25" cy="85" r="2" fill="#ffd60a" opacity="0"/>
              <circle ref="signatureDot2" cx="175" cy="75" r="2" fill="#ffd60a" opacity="0"/>
              <circle ref="signatureDot3" cx="145" cy="45" r="2" fill="#ffd60a" opacity="0"/>
            </svg>
            
            <div ref="signatureProgress" class="mt-4 text-white opacity-0">
              <div class="text-sm">签名进度: <span ref="signatureProgressText">0%</span></div>
            </div>
          </div>
        </div>

        <!-- Icon SVG -->
        <div class="svg-container">
          <h3 ref="iconTitle" class="text-2xl font-bold text-white mb-6">创意图标</h3>
          <div class="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <svg ref="iconSvg" width="200" height="200" viewBox="0 0 200 200" class="mx-auto">
              <!-- Star Icon -->
              <path 
                ref="iconPath1"
                d="M100,20 L110,60 L150,60 L118,88 L128,128 L100,110 L72,128 L82,88 L50,60 L90,60 Z"
                fill="none" 
                stroke="#ff006e" 
                stroke-width="4" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Inner Circle -->
              <circle 
                ref="iconPath2"
                cx="100" 
                cy="100" 
                r="25" 
                fill="none" 
                stroke="#8338ec" 
                stroke-width="3"
              />
              
              <!-- Outer Rays -->
              <g ref="iconRays">
                <line ref="iconRay1" x1="100" y1="10" x2="100" y2="30" stroke="#ffbe0b" stroke-width="3" stroke-linecap="round"/>
                <line ref="iconRay2" x1="170" y1="100" x2="150" y2="100" stroke="#ffbe0b" stroke-width="3" stroke-linecap="round"/>
                <line ref="iconRay3" x1="100" y1="190" x2="100" y2="170" stroke="#ffbe0b" stroke-width="3" stroke-linecap="round"/>
                <line ref="iconRay4" x1="30" y1="100" x2="50" y2="100" stroke="#ffbe0b" stroke-width="3" stroke-linecap="round"/>
              </g>
            </svg>
            
            <div ref="iconProgress" class="mt-4 text-white opacity-0">
              <div class="text-sm">图标进度: <span ref="iconProgressText">0%</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div ref="infoSection" class="mt-16 text-center">
        <div class="bg-white bg-opacity-5 rounded-2xl p-8 backdrop-blur-sm max-w-4xl mx-auto">
          <h3 class="text-2xl font-bold text-white mb-6">技术要点</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="space-y-2">
              <h4 class="font-bold text-blue-400">路径绘制</h4>
              <p class="text-gray-300 text-sm">
                使用 stroke-dasharray 和 stroke-dashoffset 属性控制路径的绘制过程
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold text-purple-400">动画时序</h4>
              <p class="text-gray-300 text-sm">
                GSAP Timeline 精确控制多条路径的绘制顺序和时间
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold text-green-400">进度反馈</h4>
              <p class="text-gray-300 text-sm">
                实时显示绘制进度，提供良好的用户体验反馈
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

interface Props {
  autoStart?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoStart: false,
  duration: 3
})

// Refs
const title = ref<HTMLElement>()
const subtitle = ref<HTMLElement>()
const controls = ref<HTMLElement>()
const logoTitle = ref<HTMLElement>()
const signatureTitle = ref<HTMLElement>()
const iconTitle = ref<HTMLElement>()
const logoSvg = ref<SVGElement>()
const signatureSvg = ref<SVGElement>()
const iconSvg = ref<SVGElement>()
const infoSection = ref<HTMLElement>()

// Logo refs
const logoPath1 = ref<SVGPathElement>()
const logoPath2 = ref<SVGPathElement>()
const logoPath3 = ref<SVGPathElement>()
const logoPath4 = ref<SVGPathElement>()
const logoProgressCircle = ref<SVGCircleElement>()
const logoProgress = ref<HTMLElement>()
const logoProgressText = ref<HTMLElement>()

// Signature refs
const signaturePath = ref<SVGPathElement>()
const signatureDot1 = ref<SVGCircleElement>()
const signatureDot2 = ref<SVGCircleElement>()
const signatureDot3 = ref<SVGCircleElement>()
const signatureProgress = ref<HTMLElement>()
const signatureProgressText = ref<HTMLElement>()

// Icon refs
const iconPath1 = ref<SVGPathElement>()
const iconPath2 = ref<SVGPathElement>()
const iconRays = ref<SVGGElement>()
const iconRay1 = ref<SVGLineElement>()
const iconRay2 = ref<SVGLineElement>()
const iconRay3 = ref<SVGLineElement>()
const iconRay4 = ref<SVGLineElement>()
const iconProgress = ref<HTMLElement>()
const iconProgressText = ref<HTMLElement>()

onMounted(async () => {
  await nextTick()
  initSVGPaths()
  initPageAnimations()
  
  if (props.autoStart) {
    setTimeout(() => {
      drawLogo()
    }, 1000)
  }
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
  
  gsap.fromTo([logoTitle.value, signatureTitle.value, iconTitle.value],
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.8, ease: "power2.out" }
  )
  
  gsap.fromTo(infoSection.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power2.out" }
  )
}

function initSVGPaths() {
  // Initialize all paths
  const allPaths = [
    logoPath1.value, logoPath2.value, logoPath3.value, logoPath4.value,
    signaturePath.value,
    iconPath1.value, iconPath2.value
  ]
  
  allPaths.forEach(path => {
    if (path) {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length.toString()
      path.style.strokeDashoffset = length.toString()
    }
  })
  
  // Initialize rays
  const rays = [iconRay1.value, iconRay2.value, iconRay3.value, iconRay4.value]
  rays.forEach(ray => {
    if (ray) {
      const length = ray.getTotalLength()
      ray.style.strokeDasharray = length.toString()
      ray.style.strokeDashoffset = length.toString()
    }
  })
  
  // Hide progress circles and dots
  gsap.set([logoProgressCircle.value, signatureDot1.value, signatureDot2.value, signatureDot3.value], { opacity: 0 })
  gsap.set([logoProgress.value, signatureProgress.value, iconProgress.value], { opacity: 0 })
}

function drawLogo() {
  const timeline = gsap.timeline({
    onUpdate: () => updateProgress('logo', timeline.progress())
  })
  
  // Show progress indicator
  timeline.to(logoProgress.value, { opacity: 1, duration: 0.3 })
  
  // Draw logo paths in sequence
  const logoPaths = [logoPath1.value, logoPath2.value, logoPath3.value, logoPath4.value]
  
  logoPaths.forEach((path, index) => {
    if (path) {
      timeline.to(path, {
        strokeDashoffset: 0,
        duration: props.duration / 4,
        ease: "power2.inOut"
      }, index * (props.duration / 4) * 0.7)
    }
  })
  
  // Draw progress circle
  timeline.to(logoProgressCircle.value, {
    opacity: 1,
    duration: 0.3
  }, 0)
  
  if (logoProgressCircle.value) {
    const circleLength = logoProgressCircle.value.getTotalLength()
    logoProgressCircle.value.style.strokeDasharray = circleLength.toString()
    logoProgressCircle.value.style.strokeDashoffset = circleLength.toString()
    
    timeline.to(logoProgressCircle.value, {
      strokeDashoffset: 0,
      duration: props.duration,
      ease: "none"
    }, 0)
  }
  
  return timeline
}

function drawSignature() {
  const timeline = gsap.timeline({
    onUpdate: () => updateProgress('signature', timeline.progress())
  })
  
  // Show progress indicator
  timeline.to(signatureProgress.value, { opacity: 1, duration: 0.3 })
  
  // Draw signature path
  if (signaturePath.value) {
    timeline.to(signaturePath.value, {
      strokeDashoffset: 0,
      duration: props.duration,
      ease: "power1.inOut"
    })
  }
  
  // Add dots at the end
  const dots = [signatureDot1.value, signatureDot2.value, signatureDot3.value]
  timeline.to(dots, {
    opacity: 1,
    scale: 1.2,
    duration: 0.4,
    stagger: 0.2,
    ease: "back.out(1.7)"
  }, "-=0.5")
  
  return timeline
}

function drawIcon() {
  const timeline = gsap.timeline({
    onUpdate: () => updateProgress('icon', timeline.progress())
  })
  
  // Show progress indicator
  timeline.to(iconProgress.value, { opacity: 1, duration: 0.3 })
  
  // Draw star path
  if (iconPath1.value) {
    timeline.to(iconPath1.value, {
      strokeDashoffset: 0,
      duration: props.duration * 0.6,
      ease: "power2.inOut"
    })
  }
  
  // Draw inner circle
  if (iconPath2.value) {
    timeline.to(iconPath2.value, {
      strokeDashoffset: 0,
      duration: props.duration * 0.3,
      ease: "power2.inOut"
    }, "-=0.2")
  }
  
  // Draw rays
  const rays = [iconRay1.value, iconRay2.value, iconRay3.value, iconRay4.value]
  rays.forEach((ray, index) => {
    if (ray) {
      timeline.to(ray, {
        strokeDashoffset: 0,
        duration: 0.3,
        ease: "power2.out"
      }, `-=${0.5 - index * 0.1}`)
    }
  })
  
  // Final glow effect
  timeline.to(iconSvg.value, {
    filter: "drop-shadow(0 0 10px rgba(255, 0, 110, 0.5))",
    duration: 0.5,
    ease: "power2.out"
  })
  
  return timeline
}

function updateProgress(type: string, progress: number) {
  const percentage = Math.round(progress * 100)
  
  switch (type) {
    case 'logo':
      if (logoProgressText.value) {
        logoProgressText.value.textContent = `${percentage}%`
      }
      break
    case 'signature':
      if (signatureProgressText.value) {
        signatureProgressText.value.textContent = `${percentage}%`
      }
      break
    case 'icon':
      if (iconProgressText.value) {
        iconProgressText.value.textContent = `${percentage}%`
      }
      break
  }
}

function resetAll() {
  // Kill all active animations
  gsap.killTweensOf([
    logoPath1.value, logoPath2.value, logoPath3.value, logoPath4.value,
    logoProgressCircle.value, signaturePath.value, signatureDot1.value, 
    signatureDot2.value, signatureDot3.value, iconPath1.value, iconPath2.value,
    iconRay1.value, iconRay2.value, iconRay3.value, iconRay4.value, iconSvg.value
  ])
  
  // Reset all paths
  initSVGPaths()
  
  // Reset progress displays
  gsap.set([logoProgress.value, signatureProgress.value, iconProgress.value], { opacity: 0 })
  
  // Reset progress text
  if (logoProgressText.value) logoProgressText.value.textContent = '0%'
  if (signatureProgressText.value) signatureProgressText.value.textContent = '0%'
  if (iconProgressText.value) iconProgressText.value.textContent = '0%'
  
  // Reset icon glow
  if (iconSvg.value) {
    iconSvg.value.style.filter = 'none'
  }
}

function drawAll() {
  const masterTimeline = gsap.timeline()
  
  masterTimeline
    .add(drawLogo())
    .add(drawSignature(), "-=1")
    .add(drawIcon(), "-=0.5")
  
  return masterTimeline
}

// Expose methods
defineExpose({
  drawLogo,
  drawSignature,
  drawIcon,
  drawAll,
  resetAll
})
</script>

<style scoped>
.svg-container svg {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.svg-container {
  transition: transform 0.3s ease;
}

.svg-container:hover {
  transform: translateY(-5px);
}

/* Custom animations for SVG elements */
@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)); }
}

.svg-container:hover svg {
  animation: glow 2s ease-in-out infinite;
}
</style>
