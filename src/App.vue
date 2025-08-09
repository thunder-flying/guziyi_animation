<template>
  <div id="app" class="min-h-screen">
    <AppLoader v-if="isLoading" @loaded="handleLoaded" />
    <div v-else>
      <AppNavigation />
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppNavigation from '@/components/layout/AppNavigation.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

const isLoading = ref(true)

function handleLoaded() {
  isLoading.value = false
}

onMounted(() => {
  // 模拟加载时间
  setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
    }
  }, 3000)
})
</script>
