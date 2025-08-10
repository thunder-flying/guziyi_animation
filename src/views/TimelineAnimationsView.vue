<template>
  <div class="timeline-animations-view pt-16">
    <!-- Page Header -->
    <section class="py-20 bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref="pageTitle" class="text-5xl md:text-6xl font-bold mb-6">时间轴动画</h1>
        <p ref="pageSubtitle" class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          掌握复杂的时间轴控制和序列动画
        </p>
      </div>
    </section>

    <!-- Timeline Controls -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">时间轴控制</h2>
          <p class="text-gray-600 mb-8">精确控制动画的播放、暂停、倒放和速度</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <!-- Control Buttons -->
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="playTimeline"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ▶ 播放
              </button>
              <button 
                @click="pauseTimeline"
                class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⏸ 暂停
              </button>
              <button 
                @click="reverseTimeline"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⏪ 倒放
              </button>
              <button 
                @click="restartTimeline"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⏮ 重启
              </button>
            </div>

            <!-- Speed Controls -->
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                v-for="speed in [0.5, 1, 1.5, 2]"
                :key="speed"
                @click="setTimelineSpeed(speed)"
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                :class="{ '!bg-yellow-500': currentSpeed === speed }"
              >
                {{ speed }}x
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="mb-8">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  ref="progressBar"
                  class="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-100"
                  style="width: 0%"
                ></div>
              </div>
              <div class="text-sm text-gray-600 text-center">
                进度: <span ref="progressText">0%</span>
              </div>
            </div>

            <!-- Animation Elements -->
            <div class="timeline-stage h-40 bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center">
              <div 
                ref="box1"
                class="absolute w-12 h-12 bg-red-500 rounded-lg"
                style="left: 20px; top: 50%; transform: translateY(-50%)"
              ></div>
              <div 
                ref="box2"
                class="absolute w-12 h-12 bg-blue-500 rounded-lg"
                style="left: 60px; top: 50%; transform: translateY(-50%)"
              ></div>
              <div 
                ref="box3"
                class="absolute w-12 h-12 bg-green-500 rounded-lg"
                style="left: 100px; top: 50%; transform: translateY(-50%)"
              ></div>
              <div 
                ref="box4"
                class="absolute w-12 h-12 bg-purple-500 rounded-lg"
                style="left: 140px; top: 50%; transform: translateY(-50%)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stagger Animations -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">交错动画</h2>
          <p class="text-gray-600 mb-8">元素按序列依次执行动画，创造层次感</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="runStaggerAnimation('cards')"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                卡片交错
              </button>
              <button 
                @click="runStaggerAnimation('circles')"
                class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                圆形波浪
              </button>
              <button 
                @click="runStaggerAnimation('text')"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                文字展开
              </button>
            </div>

            <!-- Stagger Cards -->
            <div class="grid grid-cols-4 gap-4 mb-8">
              <div 
                v-for="i in 8"
                :key="i"
                :ref="el => setStaggerCardRef(el, i)"
                class="stagger-card bg-gradient-to-br from-blue-400 to-purple-500 h-20 rounded-lg flex items-center justify-center text-white font-bold opacity-0 transform scale-0"
              >
                {{ i }}
              </div>
            </div>

            <!-- Stagger Circles -->
            <div class="flex justify-center gap-2 mb-8">
              <div 
                v-for="i in 12"
                :key="i"
                :ref="el => setStaggerCircleRef(el, i)"
                class="stagger-circle w-8 h-8 bg-pink-500 rounded-full opacity-0 transform scale-0"
              ></div>
            </div>

            <!-- Stagger Text -->
            <div class="text-center">
              <h3 ref="staggerText" class="text-3xl font-bold text-gray-900">
                <span 
                  v-for="(char, index) in staggerTextContent" 
                  :key="index"
                  :ref="el => setStaggerTextRef(el, index)"
                  class="inline-block opacity-0 transform translate-y-8"
                >
                  {{ char === ' ' ? '\u00A0' : char }}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Complex Timeline -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">复杂时间轴动画</h2>
          <p class="text-gray-300 mb-8">多元素协调的复杂动画序列</p>
          
          <div class="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
            <div class="flex justify-center mb-8">
              <button 
                @click="runComplexAnimation"
                class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                🚀 启动复杂动画
              </button>
            </div>

            <!-- Complex Animation Stage -->
            <div class="complex-stage h-96 bg-gray-700 rounded-lg relative overflow-hidden">
              <!-- Background Particles -->
              <div 
                v-for="i in 20"
                :key="i"
                :ref="el => setComplexParticleRef(el, i)"
                class="complex-particle absolute w-2 h-2 bg-white rounded-full opacity-0"
                :style="getRandomParticlePosition(i)"
              ></div>

              <!-- Main Character -->
              <div 
                ref="mainCharacter"
                class="absolute w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 transform scale-0 flex items-center justify-center text-2xl"
                style="left: 50px; top: 50%"
              >
                🎯
              </div>

              <!-- Target Elements -->
              <div 
                v-for="i in 3"
                :key="i"
                :ref="el => setComplexTargetRef(el, i)"
                class="complex-target absolute w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-0 transform scale-0 flex items-center justify-center text-lg"
                :style="getTargetPosition(i)"
              >
                ⭐
              </div>

              <!-- Effects Container -->
              <div ref="effectsContainer" class="absolute inset-0 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading Skeleton Screen Section -->
    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">加载骨架屏动画</h2>
          <p class="text-gray-600 mb-8">模拟真实的内容加载过程，提升用户体验</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="triggerSkeletonLoad('profile')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                用户资料加载
              </button>
              <button 
                @click="triggerSkeletonLoad('list')"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                列表内容加载
              </button>
              <button 
                @click="triggerSkeletonLoad('card')"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                卡片内容加载
              </button>
            </div>

            <!-- Skeleton Content Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Profile Skeleton -->
              <div ref="profileSkeleton" class="skeleton-container relative p-6 bg-gray-50 rounded-xl">
                <div class="skeleton-header flex items-center mb-4">
                  <div class="skeleton-avatar w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                  <div class="skeleton-info flex-1">
                    <div class="skeleton-line h-4 bg-gray-300 rounded mb-2"></div>
                    <div class="skeleton-line h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div class="skeleton-content">
                  <div class="skeleton-line h-3 bg-gray-300 rounded mb-2"></div>
                  <div class="skeleton-line h-3 bg-gray-300 rounded mb-2 w-4/5"></div>
                  <div class="skeleton-line h-3 bg-gray-300 rounded w-3/5"></div>
                </div>
                
                <!-- Real Profile Content -->
                <div ref="profileContent" class="real-content opacity-0 absolute inset-0 p-6 bg-white rounded-xl shadow-sm">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-lg">
                      👤
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">张小明</h4>
                      <p class="text-sm text-gray-600">前端开发工程师</p>
                    </div>
                  </div>
                  <p class="text-gray-700 text-sm">专注于用户体验设计和前端技术，热爱创造优雅的界面动画。</p>
                </div>
              </div>

              <!-- List Skeleton -->
              <div ref="listSkeleton" class="skeleton-container relative p-6 bg-gray-50 rounded-xl">
                <div v-for="i in 4" :key="i" class="skeleton-item flex items-center mb-3 last:mb-0">
                  <div class="skeleton-dot w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <div class="skeleton-line h-4 bg-gray-300 rounded flex-1"></div>
                </div>
                
                <!-- Real List Content -->
                <div ref="listContent" class="real-content opacity-0 absolute inset-0 p-6 bg-white rounded-xl shadow-sm">
                  <div v-for="(item, i) in listItems" :key="i" class="flex items-center mb-3 last:mb-0">
                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span class="text-gray-700">{{ item }}</span>
                  </div>
                </div>
              </div>

              <!-- Card Skeleton -->
              <div ref="cardSkeleton" class="skeleton-container relative p-6 bg-gray-50 rounded-xl">
                <div class="skeleton-image h-32 bg-gray-300 rounded-lg mb-4"></div>
                <div class="skeleton-line h-5 bg-gray-300 rounded mb-3"></div>
                <div class="skeleton-line h-4 bg-gray-300 rounded mb-2"></div>
                <div class="skeleton-line h-4 bg-gray-300 rounded w-3/4"></div>
                
                <!-- Real Card Content -->
                <div ref="cardContent" class="real-content opacity-0 absolute inset-0 p-6 bg-white rounded-xl shadow-sm">
                  <div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
                    🎨
                  </div>
                  <h4 class="font-bold text-gray-900 mb-3">设计系统</h4>
                  <p class="text-gray-700 text-sm">构建一致性的用户界面组件库，提升开发效率。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Progress Indicators Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">进度指示器动画</h2>
          <p class="text-gray-600 mb-8">各种样式的进度条和加载指示器</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="startProgressDemo('linear')"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                线性进度条
              </button>
              <button 
                @click="startProgressDemo('circular')"
                class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                圆形进度条
              </button>
              <button 
                @click="startProgressDemo('step')"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                步骤进度条
              </button>
            </div>

            <div class="space-y-8">
              <!-- Linear Progress -->
              <div class="progress-demo">
                <h4 class="font-semibold text-gray-900 mb-4">线性进度条</h4>
                <div class="space-y-3">
                  <div class="progress-container">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">任务进度</span>
                      <span ref="linearPercent1" class="text-sm text-gray-600">0%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div ref="linearProgress1" class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                  </div>
                  
                  <div class="progress-container">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">下载进度</span>
                      <span ref="linearPercent2" class="text-sm text-gray-600">0%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div ref="linearProgress2" class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Circular Progress -->
              <div class="progress-demo flex justify-center">
                <div class="text-center">
                  <h4 class="font-semibold text-gray-900 mb-4">圆形进度条</h4>
                  <div class="relative w-32 h-32 mx-auto">
                    <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        class="text-gray-200"
                        stroke="currentColor"
                        stroke-width="3"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        ref="circularProgress"
                        class="text-purple-600"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        fill="none"
                        stroke-dasharray="0, 100"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span ref="circularPercent" class="text-xl font-bold text-purple-600">0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step Progress -->
              <div class="progress-demo">
                <h4 class="font-semibold text-gray-900 mb-4">步骤进度条</h4>
                <div class="flex items-center justify-between">
                  <div v-for="i in 5" :key="i" class="flex items-center">
                    <div 
                      :ref="el => setStepRef(el, i)"
                      class="step-indicator w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium bg-white transition-all duration-300"
                    >
                      {{ i }}
                    </div>
                    <div 
                      v-if="i < 5"
                      :ref="el => setStepLineRef(el, i)"
                      class="step-line w-16 h-0.5 bg-gray-300 transition-all duration-300"
                    ></div>
                  </div>
                </div>
                <div class="flex justify-between mt-2 text-xs text-gray-600">
                  <span>开始</span>
                  <span>分析</span>
                  <span>设计</span>
                  <span>开发</span>
                  <span>完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notification System Section -->
    <section class="py-20 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">通知系统动画</h2>
          <p class="text-gray-600 mb-8">优雅的通知弹出和队列管理</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                @click="showNotification('success')"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                成功通知
              </button>
              <button 
                @click="showNotification('warning')"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                警告通知
              </button>
              <button 
                @click="showNotification('error')"
                class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                错误通知
              </button>
              <button 
                @click="showNotification('info')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                信息通知
              </button>
              <button 
                @click="clearAllNotifications"
                class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                清空通知
              </button>
            </div>

            <!-- Notification Container -->
            <div ref="notificationContainer" class="notification-container fixed top-4 right-4 z-50 space-y-2">
              <!-- Notifications will be dynamically added here -->
            </div>

            <!-- Demo Area -->
            <div class="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              <p>通知将在右上角显示</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accordion Effects Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">手风琴效果</h2>
          <p class="text-gray-600 mb-8">可展开折叠的内容面板，流畅的高度动画</p>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div class="flex justify-center gap-4 mb-8">
              <button 
                @click="toggleAccordionMode"
                class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {{ accordionMode === 'single' ? '单开模式' : '多开模式' }}
              </button>
              <button 
                @click="expandAll"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                全部展开
              </button>
              <button 
                @click="collapseAll"
                class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                全部折叠
              </button>
            </div>

            <!-- Accordion Items -->
            <div class="space-y-2">
              <div 
                v-for="(item, index) in accordionItems"
                :key="index"
                class="accordion-item border border-gray-200 rounded-lg overflow-hidden"
              >
                <button 
                  @click="toggleAccordion(index)"
                  class="accordion-header w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span class="font-medium text-gray-900">{{ item.title }}</span>
                  <svg 
                    :ref="el => setAccordionIconRef(el, index)"
                    class="accordion-icon w-5 h-5 text-gray-500 transition-transform duration-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div 
                  :ref="el => setAccordionContentRef(el, index)"
                  class="accordion-content overflow-hidden"
                  style="height: 0"
                >
                  <div class="p-6 text-gray-700">
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Card 3D Flip Animation Section -->
    <Card3DFlipAnimation :auto-play="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import Card3DFlipAnimation from '@/components/animations/Card3DFlipAnimation.vue'

// Refs
const pageTitle = ref<HTMLElement>()
const pageSubtitle = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()
const progressText = ref<HTMLElement>()
const box1 = ref<HTMLElement>()
const box2 = ref<HTMLElement>()
const box3 = ref<HTMLElement>()
const box4 = ref<HTMLElement>()
const staggerText = ref<HTMLElement>()
const mainCharacter = ref<HTMLElement>()
const effectsContainer = ref<HTMLElement>()

const staggerCardRefs = ref<HTMLElement[]>([])
const staggerCircleRefs = ref<HTMLElement[]>([])
const staggerTextRefs = ref<HTMLElement[]>([])
const complexParticleRefs = ref<HTMLElement[]>([])
const complexTargetRefs = ref<HTMLElement[]>([])

// New Skeleton refs
const profileSkeleton = ref<HTMLElement>()
const profileContent = ref<HTMLElement>()
const listSkeleton = ref<HTMLElement>()
const listContent = ref<HTMLElement>()
const cardSkeleton = ref<HTMLElement>()
const cardContent = ref<HTMLElement>()

// Progress refs
const linearProgress1 = ref<HTMLElement>()
const linearProgress2 = ref<HTMLElement>()
const linearPercent1 = ref<HTMLElement>()
const linearPercent2 = ref<HTMLElement>()
const circularProgress = ref<SVGPathElement>()
const circularPercent = ref<HTMLElement>()

// Step progress refs
const stepRefs = ref<HTMLElement[]>([])
const stepLineRefs = ref<HTMLElement[]>([])

// Notification refs
const notificationContainer = ref<HTMLElement>()

// Accordion refs
const accordionIconRefs = ref<HTMLElement[]>([])
const accordionContentRefs = ref<HTMLElement[]>([])

// Data
const staggerTextContent = "动画展示厅 时间轴动画"
const currentSpeed = ref(1)
let mainTimeline: gsap.core.Timeline

// New data
const listItems = [
  '用户界面设计规范',
  '组件开发文档',
  '性能优化指南',
  '测试流程说明'
]

const accordionMode = ref<'single' | 'multiple'>('single')
const accordionOpenStates = ref<boolean[]>([false, false, false, false])

const accordionItems = [
  {
    title: '什么是时间轴动画？',
    content: '时间轴动画是一种精确控制动画序列和时间的技术。它允许开发者创建复杂的动画效果，包括元素的进入、退出、变换等，并可以精确控制每个动画的开始时间、持续时间和缓动函数。'
  },
  {
    title: '如何优化动画性能？',
    content: '动画性能优化包括：使用transform和opacity属性进行动画，避免触发重排和重绘；使用will-change属性预先告知浏览器元素将要发生变化；合理使用requestAnimationFrame；避免在动画过程中操作DOM；使用CSS3硬件加速等技术。'
  },
  {
    title: '响应式动画设计',
    content: '响应式动画设计需要考虑不同设备的性能差异和屏幕尺寸。在移动设备上应该简化动画效果，减少动画时长；使用媒体查询为不同屏幕尺寸设计不同的动画效果；考虑用户的偏好设置，如减少动画选项。'
  },
  {
    title: '动画的用户体验原则',
    content: '优秀的动画应该有明确的目的，引导用户注意力，提供视觉反馈，增强界面的连贯性。动画应该快速而流畅，避免过度复杂或干扰用户的操作。同时要考虑可访问性，为有需要的用户提供禁用动画的选项。'
  }
]

// Notification management
let notificationCounter = 0
const activeNotifications = ref<Array<{
  id: number
  type: string
  title: string
  message: string
  element?: HTMLElement
}>>([])

// Helper functions
function setStaggerCardRef(el: HTMLElement | null, index: number) {
  if (el) staggerCardRefs.value[index] = el
}

function setStaggerCircleRef(el: HTMLElement | null, index: number) {
  if (el) staggerCircleRefs.value[index] = el
}

function setStaggerTextRef(el: HTMLElement | null, index: number) {
  if (el) staggerTextRefs.value[index] = el
}

function setComplexParticleRef(el: HTMLElement | null, index: number) {
  if (el) complexParticleRefs.value[index] = el
}

function setComplexTargetRef(el: HTMLElement | null, index: number) {
  if (el) complexTargetRefs.value[index] = el
}

function setStepRef(el: HTMLElement | null, index: number) {
  if (el) stepRefs.value[index] = el
}

function setStepLineRef(el: HTMLElement | null, index: number) {
  if (el) stepLineRefs.value[index] = el
}

function setAccordionIconRef(el: HTMLElement | null, index: number) {
  if (el) accordionIconRefs.value[index] = el
}

function setAccordionContentRef(el: HTMLElement | null, index: number) {
  if (el) accordionContentRefs.value[index] = el
}

function getRandomParticlePosition(index: number) {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }
}

function getTargetPosition(index: number) {
  const positions = [
    { left: '200px', top: '100px' },
    { left: '400px', top: '50px' },
    { left: '600px', top: '150px' }
  ]
  return positions[index - 1]
}

onMounted(async () => {
  await nextTick()
  initPageAnimations()
  createMainTimeline()
})

function initPageAnimations() {
  gsap.fromTo(pageTitle.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  )
  
  gsap.fromTo(pageSubtitle.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
  )
}

function createMainTimeline() {
  mainTimeline = gsap.timeline({ 
    paused: true,
    onUpdate: updateProgress
  })

  mainTimeline
    .to(box1.value, { x: 300, rotation: 360, duration: 1, ease: "power2.out" })
    .to(box2.value, { x: 300, scale: 1.5, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
    .to(box3.value, { x: 300, y: -50, duration: 1, ease: "bounce.out" }, "-=0.5")
    .to(box4.value, { x: 300, borderRadius: "50%", duration: 1, ease: "elastic.out(1, 0.3)" }, "-=0.5")
}

function updateProgress() {
  if (progressBar.value && progressText.value) {
    const progress = mainTimeline.progress() * 100
    progressBar.value.style.width = `${progress}%`
    progressText.value.textContent = `${Math.round(progress)}%`
  }
}

// Timeline Controls
function playTimeline() {
  mainTimeline.play()
}

function pauseTimeline() {
  mainTimeline.pause()
}

function reverseTimeline() {
  mainTimeline.reverse()
}

function restartTimeline() {
  mainTimeline.restart()
}

function setTimelineSpeed(speed: number) {
  currentSpeed.value = speed
  mainTimeline.timeScale(speed)
}

// Stagger Animations
function runStaggerAnimation(type: string) {
  switch (type) {
    case 'cards':
      gsap.fromTo(staggerCardRefs.value,
        { opacity: 0, scale: 0, rotation: -180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      )
      break
      
    case 'circles':
      gsap.fromTo(staggerCircleRefs.value,
        { opacity: 0, scale: 0, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(1, 0.3)"
        }
      )
      break
      
    case 'text':
      gsap.fromTo(staggerTextRefs.value,
        { opacity: 0, y: 30, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        }
      )
      break
  }
}

// Complex Animation
function runComplexAnimation() {
  const tl = gsap.timeline()

  // Stage 1: Setup
  tl.to(mainCharacter.value, { opacity: 1, scale: 1, duration: 0.5 })
    .to(complexTargetRefs.value, { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 }, "-=0.3")

  // Stage 2: Particles
  tl.to(complexParticleRefs.value, {
    opacity: 0.8,
    scale: 1.5,
    duration: 1,
    stagger: 0.05,
    ease: "power2.out"
  })

  // Stage 3: Main Character Journey
  tl.to(mainCharacter.value, {
    x: 500,
    y: -100,
    rotation: 720,
    duration: 3,
    ease: "power2.inOut"
  })

  // Stage 4: Final Effects
  tl.call(() => {
    createExplosionEffect()
  })
}

function createExplosionEffect() {
  if (!effectsContainer.value || !mainCharacter.value) return

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full'
    particle.style.left = '500px'
    particle.style.top = '50%'
    particle.style.transform = 'translate(50%, 50%)'
    
    effectsContainer.value.appendChild(particle)
    
    const angle = (i / 15) * Math.PI * 2
    const distance = Math.random() * 100 + 50
    
    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 2,
      ease: "power2.out",
      onComplete: () => particle.remove()
    })
  }
}

// New Animation Functions

// Skeleton Loading Functions
function triggerSkeletonLoad(type: 'profile' | 'list' | 'card') {
  const skeletonMap = {
    profile: { skeleton: profileSkeleton, content: profileContent },
    list: { skeleton: listSkeleton, content: listContent },
    card: { skeleton: cardSkeleton, content: cardContent }
  }
  
  const { skeleton, content } = skeletonMap[type]
  if (!skeleton.value || !content.value) return
  
  // Reset state
  gsap.set(content.value, { opacity: 0, scale: 0.9 })
  gsap.set(skeleton.value.querySelectorAll('.skeleton-avatar, .skeleton-line, .skeleton-dot, .skeleton-image'), { 
    opacity: 1 
  })
  
  // Animate skeleton shimmer
  const skeletonElements = skeleton.value.querySelectorAll('.skeleton-avatar, .skeleton-line, .skeleton-dot, .skeleton-image')
  gsap.to(skeletonElements, {
    backgroundPosition: '200% 0',
    duration: 1.5,
    ease: "power2.inOut",
    repeat: 2
  })
  
  // Replace with real content
  gsap.delayedCall(3, () => {
    gsap.to(skeletonElements, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.fromTo(content.value, 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
      }
    })
  })
}

// Progress Demo Functions
function startProgressDemo(type: 'linear' | 'circular' | 'step') {
  switch (type) {
    case 'linear':
      animateLinearProgress()
      break
    case 'circular':
      animateCircularProgress()
      break
    case 'step':
      animateStepProgress()
      break
  }
}

function animateLinearProgress() {
  // Reset
  gsap.set([linearProgress1.value, linearProgress2.value], { width: '0%' })
  if (linearPercent1.value) linearPercent1.value.textContent = '0%'
  if (linearPercent2.value) linearPercent2.value.textContent = '0%'
  
  // Animate first progress bar
  gsap.to({ progress: 0 }, {
    progress: 85,
    duration: 3,
    ease: "power2.out",
    onUpdate: function() {
      const progress = Math.round(this.targets()[0].progress)
      if (linearProgress1.value) {
        gsap.set(linearProgress1.value, { width: `${progress}%` })
      }
      if (linearPercent1.value) {
        linearPercent1.value.textContent = `${progress}%`
      }
    }
  })
  
  // Animate second progress bar with delay
  gsap.to({ progress: 0 }, {
    progress: 100,
    duration: 2.5,
    delay: 0.5,
    ease: "power2.out",
    onUpdate: function() {
      const progress = Math.round(this.targets()[0].progress)
      if (linearProgress2.value) {
        gsap.set(linearProgress2.value, { width: `${progress}%` })
      }
      if (linearPercent2.value) {
        linearPercent2.value.textContent = `${progress}%`
      }
    }
  })
}

function animateCircularProgress() {
  // Reset
  if (circularProgress.value) {
    gsap.set(circularProgress.value, { strokeDasharray: '0, 100' })
  }
  if (circularPercent.value) {
    circularPercent.value.textContent = '0%'
  }
  
  // Animate
  gsap.to({ progress: 0 }, {
    progress: 75,
    duration: 3,
    ease: "power2.out",
    onUpdate: function() {
      const progress = Math.round(this.targets()[0].progress)
      if (circularProgress.value) {
        gsap.set(circularProgress.value, { strokeDasharray: `${progress}, 100` })
      }
      if (circularPercent.value) {
        circularPercent.value.textContent = `${progress}%`
      }
    }
  })
}

function animateStepProgress() {
  // Reset
  stepRefs.value.forEach(step => {
    if (step) {
      gsap.set(step, { 
        backgroundColor: '#ffffff',
        borderColor: '#d1d5db',
        color: '#6b7280'
      })
    }
  })
  stepLineRefs.value.forEach(line => {
    if (line) {
      gsap.set(line, { backgroundColor: '#d1d5db' })
    }
  })
  
  // Animate steps
  stepRefs.value.forEach((step, index) => {
    if (step) {
      gsap.delayedCall(index * 0.8, () => {
        gsap.to(step, {
          backgroundColor: '#8b5cf6',
          borderColor: '#8b5cf6',
          color: '#ffffff',
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(step, { scale: 1, duration: 0.2 })
          }
        })
        
        // Animate line after step
        if (index < stepLineRefs.value.length && stepLineRefs.value[index]) {
          gsap.to(stepLineRefs.value[index], {
            backgroundColor: '#8b5cf6',
            duration: 0.5,
            delay: 0.2
          })
        }
      })
    }
  })
}

// Notification Functions
function showNotification(type: 'success' | 'warning' | 'error' | 'info') {
  const notificationConfig = {
    success: {
      title: '操作成功',
      message: '您的操作已成功完成！',
      color: 'bg-green-500',
      icon: '✓'
    },
    warning: {
      title: '警告提示',
      message: '请检查您的输入信息。',
      color: 'bg-yellow-500',
      icon: '⚠'
    },
    error: {
      title: '操作失败',
      message: '操作过程中发生错误，请重试。',
      color: 'bg-red-500',
      icon: '✕'
    },
    info: {
      title: '信息提示',
      message: '这是一条重要的信息通知。',
      color: 'bg-blue-500',
      icon: 'ℹ'
    }
  }
  
  const config = notificationConfig[type]
  const id = ++notificationCounter
  
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `notification-item ${config.color} text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-72 opacity-0 transform translate-x-full`
  notification.innerHTML = `
    <div class="flex-shrink-0 text-xl">${config.icon}</div>
    <div class="flex-1">
      <div class="font-semibold">${config.title}</div>
      <div class="text-sm opacity-90">${config.message}</div>
    </div>
    <button class="notification-close flex-shrink-0 text-xl opacity-70 hover:opacity-100 transition-opacity">&times;</button>
  `
  
  if (!notificationContainer.value) return
  
  // Add to container
  notificationContainer.value.appendChild(notification)
  
  // Store notification
  const notificationData = { id, type, title: config.title, message: config.message, element: notification }
  activeNotifications.value.push(notificationData)
  
  // Animate in
  gsap.fromTo(notification, 
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.7)" }
  )
  
  // Setup close button
  const closeBtn = notification.querySelector('.notification-close')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => removeNotification(id))
  }
  
  // Auto remove after 5 seconds
  gsap.delayedCall(5, () => removeNotification(id))
}

function removeNotification(id: number) {
  const index = activeNotifications.value.findIndex(n => n.id === id)
  if (index === -1) return
  
  const notification = activeNotifications.value[index]
  if (notification.element) {
    gsap.to(notification.element, {
      opacity: 0,
      x: 100,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        notification.element?.remove()
      }
    })
  }
  
  activeNotifications.value.splice(index, 1)
}

function clearAllNotifications() {
  activeNotifications.value.forEach(notification => {
    if (notification.element) {
      gsap.to(notification.element, {
        opacity: 0,
        x: 100,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          notification.element?.remove()
        }
      })
    }
  })
  activeNotifications.value = []
}

// Accordion Functions
function toggleAccordionMode() {
  accordionMode.value = accordionMode.value === 'single' ? 'multiple' : 'single'
  if (accordionMode.value === 'single') {
    // Close all but first when switching to single mode
    accordionOpenStates.value.forEach((_, index) => {
      if (index > 0 && accordionOpenStates.value[index]) {
        toggleAccordion(index)
      }
    })
  }
}

function toggleAccordion(index: number) {
  const isOpen = accordionOpenStates.value[index]
  
  if (accordionMode.value === 'single' && !isOpen) {
    // Close all others first
    accordionOpenStates.value.forEach((state, i) => {
      if (i !== index && state) {
        closeAccordionItem(i)
      }
    })
  }
  
  if (isOpen) {
    closeAccordionItem(index)
  } else {
    openAccordionItem(index)
  }
}

function openAccordionItem(index: number) {
  const content = accordionContentRefs.value[index]
  const icon = accordionIconRefs.value[index]
  
  if (!content) return
  
  accordionOpenStates.value[index] = true
  
  // Get content height
  const contentHeight = content.scrollHeight
  
  // Animate content
  gsap.fromTo(content,
    { height: 0 },
    { height: contentHeight, duration: 0.4, ease: "power2.out" }
  )
  
  // Rotate icon
  if (icon) {
    gsap.to(icon, { rotation: 180, duration: 0.3, ease: "power2.out" })
  }
}

function closeAccordionItem(index: number) {
  const content = accordionContentRefs.value[index]
  const icon = accordionIconRefs.value[index]
  
  if (!content) return
  
  accordionOpenStates.value[index] = false
  
  // Animate content
  gsap.to(content, { height: 0, duration: 0.3, ease: "power2.in" })
  
  // Rotate icon back
  if (icon) {
    gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" })
  }
}

function expandAll() {
  accordionItems.forEach((_, index) => {
    if (!accordionOpenStates.value[index]) {
      gsap.delayedCall(index * 0.1, () => openAccordionItem(index))
    }
  })
}

function collapseAll() {
  accordionItems.forEach((_, index) => {
    if (accordionOpenStates.value[index]) {
      gsap.delayedCall(index * 0.1, () => closeAccordionItem(index))
    }
  })
}
</script>

<style scoped>
.timeline-stage {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.complex-stage {
  background: radial-gradient(circle at center, #374151 0%, #1f2937 100%);
}

.stagger-card {
  background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
}

.complex-particle {
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* New Skeleton Styles */
.skeleton-container {
  position: relative;
}

.skeleton-avatar,
.skeleton-line,
.skeleton-dot,
.skeleton-image {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.real-content {
  backdrop-filter: blur(10px);
}

/* Progress Styles */
.step-indicator.active {
  background-color: #8b5cf6;
  border-color: #8b5cf6;
  color: white;
}

.step-line.active {
  background-color: #8b5cf6;
}

/* Notification Styles */
.notification-container {
  pointer-events: none;
}

.notification-item {
  pointer-events: auto;
  max-width: 400px;
}

.notification-close {
  cursor: pointer;
  padding: 0 4px;
}

/* Accordion Styles */
.accordion-item {
  transition: box-shadow 0.2s ease;
}

.accordion-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.accordion-header:focus {
  outline: none;
  background-color: #f3f4f6;
}

.accordion-content {
  transition: height 0.3s ease;
}

.accordion-icon {
  transform-origin: center;
}
</style>
