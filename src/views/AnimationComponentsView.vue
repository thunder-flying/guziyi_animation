<template>
  <div class="animation-components-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">动画组件展示</h1>
        <p class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
          5个核心动画组件的完整展示
        </p>
        
        <!-- Component Navigation -->
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            v-for="(component, index) in components"
            :key="component.id"
            @click="scrollToComponent(component.id)"
            class="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            {{ component.icon }} {{ component.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Component 1: Split Reveal Animation -->
    <section id="split-reveal" class="component-section">
      <div class="component-header bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold mb-4">1. 全屏开场动画</h2>
          <p class="text-xl opacity-90">页面载入时文字 & 图片分块揭示 (Split Reveal)</p>
        </div>
      </div>
      <SplitRevealAnimation 
        title-text="动画展示厅 开场动画"
        subtitle-text="文字与图片的分块揭示效果"
        :auto-play="false"
      />
    </section>

    <!-- Component 2: Scroll Parallax Animation -->
    <section id="scroll-parallax" class="component-section">
      <div class="component-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold mb-4">2. 滚动分镜动画</h2>
          <p class="text-xl opacity-90">用 ScrollTrigger 实现视差、图片渐显、缩放、旋转</p>
        </div>
      </div>
      <ScrollParallaxAnimation :auto-start="true" />
    </section>

    <!-- Component 3: SVG Draw Animation -->
    <section id="svg-draw" class="component-section">
      <div class="component-header bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold mb-4">3. SVG路径描边</h2>
          <p class="text-xl opacity-90">一个 SVG logo 从无到有描绘出来</p>
        </div>
      </div>
      <SVGDrawAnimation :auto-start="false" :duration="3" />
    </section>

    <!-- Component 4: Particle Effect Animation -->
    <section id="particle-effect" class="component-section">
      <div class="component-header bg-gradient-to-r from-red-600 to-pink-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold mb-4">4. 粒子滴滴特效</h2>
          <p class="text-xl opacity-90">鼠标点击页面时爆发粒子动画 (canvas+动画引擎)</p>
        </div>
      </div>
      <ParticleEffectAnimation 
        :initial-particle-count="200"
        :auto-start="true"
      />
    </section>

    <!-- Component 5: Card 3D Flip Animation -->
    <section id="card-flip" class="component-section">
      <div class="component-header bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold mb-4">5. 卡片翻转展示</h2>
          <p class="text-xl opacity-90">鼠标悬停时 3D 翻转卡片</p>
        </div>
      </div>
      <Card3DFlipAnimation :auto-play="false" />
    </section>

    <!-- Summary Section -->
    <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-8">组件化动画开发</h2>
        <p class="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-12">
          这些组件展示了如何将复杂的动画效果模块化，让动画可以在不同页面中复用。
        </p>
        
        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-bold mb-3">高性能</h3>
            <p class="text-gray-300">使用先进动画引擎确保60fps流畅动画，硬件加速优化</p>
          </div>
          
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-4xl mb-4">🔧</div>
            <h3 class="text-xl font-bold mb-3">组件化</h3>
            <p class="text-gray-300">Vue 3 + TypeScript，可配置参数，易于复用</p>
          </div>
          
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-xl font-bold mb-3">视觉效果</h3>
            <p class="text-gray-300">现代化UI设计，渐变配色，视觉冲击力强</p>
          </div>
          
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-bold mb-3">响应式</h3>
            <p class="text-gray-300">移动端适配，触摸交互，性能降级优化</p>
          </div>
          
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-bold mb-3">易扩展</h3>
            <p class="text-gray-300">清晰的代码结构，丰富的配置选项</p>
          </div>
          
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-4xl mb-4">💡</div>
            <h3 class="text-xl font-bold mb-3">最佳实践</h3>
            <p class="text-gray-300">遵循动画最佳实践，性能与美观并重</p>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="mt-16">
          <h3 class="text-2xl font-bold mb-8">技术栈</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <span class="bg-blue-600 text-white px-4 py-2 rounded-lg">Vue 3</span>
            <span class="bg-blue-600 text-white px-4 py-2 rounded-lg">TypeScript</span>
            <span class="bg-green-600 text-white px-4 py-2 rounded-lg">动画引擎</span>
            <span class="bg-purple-600 text-white px-4 py-2 rounded-lg">ScrollTrigger</span>
            <span class="bg-orange-600 text-white px-4 py-2 rounded-lg">Canvas</span>
            <span class="bg-pink-600 text-white px-4 py-2 rounded-lg">CSS 3D</span>
            <span class="bg-teal-600 text-white px-4 py-2 rounded-lg">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import SplitRevealAnimation from '@/components/animations/SplitRevealAnimation.vue'
import ScrollParallaxAnimation from '@/components/animations/ScrollParallaxAnimation.vue'
import SVGDrawAnimation from '@/components/animations/SVGDrawAnimation.vue'
import ParticleEffectAnimation from '@/components/animations/ParticleEffectAnimation.vue'
import Card3DFlipAnimation from '@/components/animations/Card3DFlipAnimation.vue'

// Data
const components = [
  {
    id: 'split-reveal',
    name: '开场动画',
    icon: '✨'
  },
  {
    id: 'scroll-parallax',
    name: '滚动分镜',
    icon: '📜'
  },
  {
    id: 'svg-draw',
    name: 'SVG描边',
    icon: '✏️'
  },
  {
    id: 'particle-effect',
    name: '粒子特效',
    icon: '💫'
  },
  {
    id: 'card-flip',
    name: '卡片翻转',
    icon: '🃏'
  }
]

function scrollToComponent(componentId: string) {
  const element = document.getElementById(componentId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

onMounted(() => {
  // 简单的入场动画
  gsap.fromTo('.component-section',
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.component-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  )
})
</script>

<style scoped>
.component-section {
  opacity: 0;
}

.component-header {
  background-attachment: fixed;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}
</style>
