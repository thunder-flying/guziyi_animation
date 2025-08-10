<template>
  <div 
    ref="cardRef"
    class="animation-card bg-white rounded-2xl p-6 shadow-lg card-hover cursor-pointer relative overflow-hidden"
    @click="navigateToRoute"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- 背景渐变 -->
    <div 
      ref="bgGradient"
      class="absolute inset-0 opacity-0 transition-opacity duration-300"
      :style="{ background: gradient }"
    ></div>
    
    <!-- 内容 -->
    <div class="relative z-10">
      <!-- 图标 -->
      <div ref="iconRef" class="text-4xl mb-4 transform transition-transform duration-300">
        {{ icon }}
      </div>
      
      <!-- 标题 -->
      <h3 ref="titleRef" class="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300">
        {{ title }}
      </h3>
      
      <!-- 描述 -->
      <p ref="descRef" class="text-gray-600 transition-colors duration-300 mb-3">
        {{ description }}
      </p>
      
      <!-- Features标签 -->
      <div v-if="features && features.length > 0" ref="featuresRef" class="mb-3 opacity-0 transform translate-y-2 transition-all duration-300">
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="(feature, index) in features.slice(0, 3)" 
            :key="index"
            class="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full feature-tag"
          >
            {{ feature }}
          </span>
          <span v-if="features.length > 3" class="inline-block px-2 py-1 text-xs text-gray-500">
            +{{ features.length - 3 }}
          </span>
        </div>
      </div>
      
      <!-- Coming Soon 标识 -->
      <div v-if="comingSoon" class="absolute top-4 right-4 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full transform rotate-12">
        即将推出
      </div>
      
      <!-- 箭头图标 -->
      <div ref="arrowRef" class="mt-2 flex items-center text-blue-600 font-medium opacity-0 transform translate-x-2 transition-all duration-300">
        <span class="mr-2">{{ comingSoon ? '敬请期待' : '查看详情' }}</span>
        <svg v-if="!comingSoon" class="w-4 h-4 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <svg v-else class="w-4 h-4 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>

    <!-- 装饰性元素 -->
    <div 
      v-for="i in 3" 
      :key="i"
      :ref="el => setDecorRef(el, i)"
      class="absolute w-2 h-2 rounded-full bg-white opacity-0"
      :style="getDecorStyle(i)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

interface Props {
  title: string
  description: string
  route: string
  icon: string
  gradient: string
  features?: string[]
  comingSoon?: boolean
}

const props = defineProps<Props>()
const router = useRouter()

const cardRef = ref<HTMLElement>()
const bgGradient = ref<HTMLElement>()
const iconRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const featuresRef = ref<HTMLElement>()
const decorRefs = ref<HTMLElement[]>([])

function setDecorRef(el: HTMLElement | null, index: number) {
  if (el) decorRefs.value[index] = el
}

function getDecorStyle(index: number) {
  const positions = [
    { top: '20%', right: '15%' },
    { bottom: '25%', left: '10%' },
    { top: '60%', right: '20%' }
  ]
  return positions[index - 1]
}

function navigateToRoute() {
  if (props.comingSoon) {
    // Coming soon 提示动画
    const tl = gsap.timeline()
    
    tl.to(cardRef.value, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(cardRef.value, {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(1, 0.5)"
    })
    
    // 显示提示信息（可以在这里添加toast通知）
    return
  }
  
  // 正常导航动画
  const tl = gsap.timeline({
    onComplete: () => {
      router.push(props.route)
    }
  })
  
  tl.to(cardRef.value, {
    scale: 0.95,
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(cardRef.value, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out"
  })
}

function onMouseEnter() {
  const tl = gsap.timeline()
  
  // 背景渐变显示
  tl.to(bgGradient.value, {
    opacity: 0.85,
    duration: 0.3,
    ease: "power2.out"
  })
  
  // 图标放大旋转
  tl.to(iconRef.value, {
    scale: 1.2,
    rotation: 10,
    duration: 0.3,
    ease: "power2.out"
  }, 0)
  
  // 文字颜色变化
  tl.to([titleRef.value, descRef.value], {
    color: "white",
    duration: 0.3,
    ease: "power2.out"
  }, 0)
  
  // Features显示
  if (featuresRef.value) {
    tl.to(featuresRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0.1)
    
    // Features标签动画
    tl.to(featuresRef.value.querySelectorAll('.feature-tag'), {
      scale: 1.05,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.out"
    }, 0.15)
  }
  
  // 箭头显示
  tl.to(arrowRef.value, {
    opacity: 1,
    x: 0,
    duration: 0.3,
    ease: "power2.out"
  }, 0.1)
  
  // 装饰元素动画
  tl.to(decorRefs.value, {
    opacity: 0.6,
    scale: 1.5,
    duration: 0.4,
    stagger: 0.1,
    ease: "power2.out"
  }, 0.2)
}

function onMouseLeave() {
  const tl = gsap.timeline()
  
  // 重置所有状态
  tl.to(bgGradient.value, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out"
  })
  
  tl.to(iconRef.value, {
    scale: 1,
    rotation: 0,
    duration: 0.3,
    ease: "power2.out"
  }, 0)
  
  tl.to([titleRef.value, descRef.value], {
    color: "",
    duration: 0.3,
    ease: "power2.out"
  }, 0)
  
  // Features隐藏
  if (featuresRef.value) {
    tl.to(featuresRef.value, {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: "power2.out"
    }, 0)
    
    tl.to(featuresRef.value.querySelectorAll('.feature-tag'), {
      scale: 1,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.out"
    }, 0)
  }
  
  tl.to(arrowRef.value, {
    opacity: 0,
    x: 8,
    duration: 0.3,
    ease: "power2.out"
  }, 0)
  
  tl.to(decorRefs.value, {
    opacity: 0,
    scale: 1,
    duration: 0.3,
    stagger: 0.05,
    ease: "power2.out"
  }, 0)
}

onMounted(() => {
  // 初始化装饰元素位置
  decorRefs.value.forEach((el, index) => {
    if (el) {
      gsap.set(el, {
        scale: 0,
        opacity: 0
      })
    }
  })
})
</script>

<style scoped>
.animation-card {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.animation-card:hover {
  transform: translateY(-8px);
}

.feature-tag {
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.animation-card:hover .feature-tag {
  background-color: rgba(255, 255, 255, 0.9);
  color: #374151;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Coming Soon 标识动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: rotate(12deg) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: rotate(12deg) scale(1.05);
  }
}

.animation-card:hover .absolute.top-4.right-4 {
  animation: pulse 2s infinite;
}
</style>
