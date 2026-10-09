<template>
  <nav class="breadcrumb-nav bg-gray-50 border-b border-gray-200 py-3" v-if="breadcrumbs.length > 0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <router-link 
            to="/" 
            class="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            首页
          </router-link>
        </li>
        
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.path" class="flex items-center">
          <!-- 分隔符 -->
          <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
          
          <!-- 面包屑项 -->
          <router-link 
            v-if="index < breadcrumbs.length - 1"
            :to="breadcrumb.path"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
          >
            <span class="text-base mr-1">{{ breadcrumb.icon }}</span>
            {{ breadcrumb.name }}
          </router-link>
          
          <!-- 当前页面（不可点击） -->
          <span 
            v-else 
            class="text-gray-900 font-medium flex items-center"
          >
            <span class="text-base mr-1">{{ breadcrumb.icon }}</span>
            {{ breadcrumb.name }}
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface BreadcrumbItem {
  name: string
  path: string
  icon: string
  category?: string
}

// 页面配置映射
const pageConfigs: Record<string, BreadcrumbItem> = {
  '/ai-animations': {
    name: 'AI 动画实验室',
    path: '/ai-animations',
    icon: '🧠',
    category: 'advanced'
  },
  '/text-animations': {
    name: '文字动画',
    path: '/text-animations',
    icon: '📝',
    category: 'basic'
  },
  '/geometry-animations': {
    name: '几何动画',
    path: '/geometry-animations',
    icon: '🔷',
    category: 'basic'
  },
  '/scroll-animations': {
    name: '滚动动画',
    path: '/scroll-animations',
    icon: '📜',
    category: 'basic'
  },
  '/interactive-animations': {
    name: '交互动画',
    path: '/interactive-animations',
    icon: '🎮',
    category: 'basic'
  },
  '/timeline-animations': {
    name: '时间轴动画',
    path: '/timeline-animations',
    icon: '⏰',
    category: 'basic'
  },
  '/3d-effects': {
    name: '3D效果',
    path: '/3d-effects',
    icon: '🎯',
    category: 'advanced'
  },
  '/visual-effects': {
    name: '视觉特效',
    path: '/visual-effects',
    icon: '✨',
    category: 'advanced'
  },
  '/game-effects': {
    name: '游戏动画',
    path: '/game-effects',
    icon: '🎮',
    category: 'advanced'
  }
}

// 分类配置
const categoryConfigs = {
  basic: {
    name: '基础动画',
    path: '#basic',
    icon: '🎨'
  },
  advanced: {
    name: '高级动画',
    path: '#advanced',
    icon: '✨'
  }
}

// 计算面包屑
const breadcrumbs = computed(() => {
  const currentPath = route.path
  
  // 如果是首页，不显示面包屑
  if (currentPath === '/') {
    return []
  }
  
  const config = pageConfigs[currentPath]
  if (!config) {
    return []
  }
  
  const crumbs: BreadcrumbItem[] = []
  
  // 添加分类层级
  if (config.category) {
    const categoryConfig = categoryConfigs[config.category as keyof typeof categoryConfigs]
    if (categoryConfig) {
      crumbs.push(categoryConfig)
    }
  }
  
  // 添加当前页面
  crumbs.push(config)
  
  return crumbs
})
</script>

<style scoped>
.breadcrumb-nav {
  margin-top: 64px; /* 导航栏高度 */
}

/* 面包屑动画 */
.breadcrumb-nav ol li {
  animation: fadeInUp 0.4s ease-out;
  animation-fill-mode: both;
}

.breadcrumb-nav ol li:nth-child(2) {
  animation-delay: 0.1s;
}

.breadcrumb-nav ol li:nth-child(3) {
  animation-delay: 0.2s;
}

.breadcrumb-nav ol li:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 悬浮效果 */
.breadcrumb-nav a {
  position: relative;
  transition: all 0.2s ease;
}

.breadcrumb-nav a:hover {
  transform: translateY(-1px);
}

.breadcrumb-nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.2s ease;
}

.breadcrumb-nav a:hover::after {
  width: 100%;
}
</style>
