<template>
  <div id="app" class="min-h-screen">
    <AppNavigation />
    <BreadcrumbNavigation />
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '@/components/layout/AppNavigation.vue'
import BreadcrumbNavigation from '@/components/ui/BreadcrumbNavigation.vue'
</script>
