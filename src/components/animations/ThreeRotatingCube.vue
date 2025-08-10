<template>
  <div ref="canvasContainer" class="relative w-full h-96 bg-black/80 rounded-xl overflow-hidden">
    <canvas ref="canvasEl" class="w-full h-full block"></canvas>

    <div class="absolute top-3 right-3 z-10 flex gap-2">
      <button
        @click="toggleAnimation"
        class="px-3 py-1 text-xs text-white bg-purple-600 rounded hover:bg-purple-700"
      >暂停/继续</button>
      <button
        @click="resetCube"
        class="px-3 py-1 text-xs text-white bg-gray-600 rounded hover:bg-gray-700"
      >重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRafFn, useResizeObserver, useElementVisibility, useStorage } from '@vueuse/core'

const canvasContainer = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

let renderer: any = null
let scene: any = null
let camera: any = null
let cube: any = null
let clock: any = null
const isPlaying = useStorage<boolean>('three-cube-playing', true)
const ready = ref(false)

// 可见性：不在视口内自动暂停
const isVisible = useElementVisibility(canvasContainer)

// RAF 动画循环（由 VueUse 管理，便于暂停/恢复和自动清理）
const { pause: pauseRaf, resume: resumeRaf } = useRafFn(() => {
  if (!scene || !camera || !renderer || !cube || !clock || !ready.value) return
  const elapsed = clock.getElapsedTime()
  cube.rotation.x = elapsed * 0.6
  cube.rotation.y = elapsed * 1.0
  renderer.render(scene, camera)
}, { immediate: false })

async function init() {
  const THREE = await import('three')
  const {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    AmbientLight,
    DirectionalLight,
    Color,
    Clock,
  } = THREE

  scene = new Scene()
  scene.background = new Color('#0b1220')

  const container = canvasContainer.value!
  const width = container.clientWidth
  const height = container.clientHeight

  camera = new PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(2.5, 2, 3.5)
  camera.lookAt(0, 0, 0)

  renderer = new WebGLRenderer({ canvas: canvasEl.value!, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ color: '#7c3aed', roughness: 0.35, metalness: 0.2 })
  cube = new Mesh(geometry, material)
  scene.add(cube)

  const ambient = new AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  const dir = new DirectionalLight(0xffffff, 1.2)
  dir.position.set(3, 4, 2)
  scene.add(dir)

  const dir2 = new DirectionalLight(0x55ddff, 0.6)
  dir2.position.set(-2, -3, -1)
  scene.add(dir2)

  clock = new Clock()
  ready.value = true
  // 初始播放策略：仅当用户设为播放且组件在可视区域
  if (isPlaying.value && isVisible.value) resumeRaf()
}

function handleResize() {
  if (!canvasContainer.value || !renderer || !camera) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

function toggleAnimation() {
  isPlaying.value = !isPlaying.value
}

function resetCube() {
  if (!cube || !clock) return
  cube.rotation.set(0, 0, 0)
  clock.start()
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  pauseRaf()
  if (renderer) {
    renderer.dispose()
  }
  scene = null
  camera = null
  cube = null
  renderer = null
  clock = null
})

// 容器尺寸监听（更可靠，避免全局 resize）
useResizeObserver(canvasContainer, () => handleResize())

// 自动播放/暂停：根据可见性与用户开关
watch([isVisible, isPlaying, ready], ([visible, playing, isReady]) => {
  if (!isReady) return
  if (visible && playing) {
    resumeRaf()
  } else {
    pauseRaf()
  }
})
</script>


