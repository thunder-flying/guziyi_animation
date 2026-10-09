<template>
  <div ref="host" class="orb-host">
    <canvas ref="canvas" role="img" :aria-label="`AI ${state}状态粒子能量球`"></canvas>
    <span class="orb-caption">{{ paused ? '动画已暂停' : '实时粒子场' }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ state: 'idle' | 'listening' | 'thinking' | 'speaking'; paused: boolean; reduced: boolean }>()
const host = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()
const points = Array.from({ length: 520 }, (_, i) => {
  const y = 1 - (i / 519) * 2
  const angle = i * Math.PI * (3 - Math.sqrt(5))
  return { x: Math.cos(angle) * Math.sqrt(1 - y * y), y, z: Math.sin(angle) * Math.sqrt(1 - y * y), phase: i * .37 }
})
let frame = 0
let observer: ResizeObserver | undefined
let visible = true
let visibilityObserver: IntersectionObserver | undefined
let time = 0
let last = 0
let width = 0
let height = 0

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx || !width || !height) return
  ctx.clearRect(0, 0, width, height)
  const cx = width / 2, cy = height / 2
  const radius = Math.min(width * .3, height * .32)
  const colors = { idle: '91,213,229', listening: '93,239,179', thinking: '255,191,105', speaking: '114,177,255' }
  const color = colors[props.state]
  const glow = ctx.createRadialGradient(cx, cy, radius * .1, cx, cy, radius * 1.7)
  glow.addColorStop(0, `rgba(${color},.12)`)
  glow.addColorStop(1, `rgba(${color},0)`)
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)
  const rotation = time * (props.state === 'thinking' ? .9 : .22)
  const projected = points.map(p => {
    const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation)
    const z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation)
    let scale = 1 + Math.sin(time * 1.8) * .035
    if (props.state === 'listening') scale += Math.sin(p.y * 9 + time * 5) * .09
    if (props.state === 'thinking') scale = .88 + Math.sin(p.phase + time * 3) * .12
    if (props.state === 'speaking') scale += Math.sin(p.y * 12 - time * 7) * .13
    return { x: cx + x * radius * scale, y: cy + p.y * radius * scale, z }
  }).sort((a, b) => a.z - b.z)
  projected.forEach(p => {
    ctx.fillStyle = `rgba(${color},${.18 + (p.z + 1) * .36})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1 + (p.z + 1) * .85, 0, Math.PI * 2)
    ctx.fill()
  })
  for (let i = 0; i < 3; i++) {
    const phase = (time * .3 + i / 3) % 1
    ctx.strokeStyle = `rgba(${color},${props.state === 'speaking' ? (1 - phase) * .3 : .12})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.ellipse(cx, cy, radius * (1.2 + phase * .4), radius * (.35 + phase * .12), -.3, 0, Math.PI * 2)
    ctx.stroke()
  }
}
function stop() { cancelAnimationFrame(frame); frame = 0; last = 0 }
function animate(timestamp: number) {
  if (last) time += Math.min((timestamp - last) / 1000, .05)
  last = timestamp
  draw()
  frame = requestAnimationFrame(animate)
}
function sync() {
  stop()
  draw()
  if (!props.paused && !props.reduced && visible && !document.hidden) frame = requestAnimationFrame(animate)
}
onMounted(() => {
  observer = new ResizeObserver(() => {
    if (!host.value || !canvas.value) return
    width = host.value.clientWidth; height = host.value.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.value.width = width * dpr; canvas.value.height = height * dpr
    canvas.value.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
    draw()
  })
  observer.observe(host.value!)
  visibilityObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync() })
  visibilityObserver.observe(host.value!)
  document.addEventListener('visibilitychange', sync)
  sync()
})
watch(() => [props.state, props.paused, props.reduced], sync)
onUnmounted(() => { stop(); observer?.disconnect(); visibilityObserver?.disconnect(); document.removeEventListener('visibilitychange', sync) })
</script>

<style scoped>
.orb-host { position: relative; height: 370px; width: 100%; }
canvas { width: 100%; height: 100%; display: block; }
.orb-caption { position: absolute; bottom: 18px; left: 0; right: 0; text-align: center; font-size: 11px; letter-spacing: .2em; color: #8ca9b8; }
@media (max-width: 600px) { .orb-host { height: 300px; } }
</style>
