<template>
  <section ref="section" class="generation-experiment" aria-labelledby="generation-title">
    <div class="generation-heading">
      <div><span class="experiment-number">EXPERIMENT 03</span><h2 id="generation-title">从噪点，到想象。</h2><p>写下一幅画面，看混沌逐渐变得清晰。</p></div>
      <span class="demo-tag">生成过程 · 本地动画演示</span>
    </div>
    <div class="generation-layout">
      <div class="prompt-panel">
        <form @submit.prevent="generate">
          <label for="generation-prompt">描述你想看到的图案</label>
          <textarea id="generation-prompt" v-model="prompt" maxlength="200" rows="4" placeholder="例如：一颗蓝色的星球，带着发光的星环" :aria-invalid="!!error" :aria-describedby="error ? 'generation-error' : 'generation-help'"></textarea>
          <p id="generation-help" class="prompt-help">识别星球、山脉、花朵、星形，以及蓝、绿、紫、粉、橙、金等颜色关键词。</p>
          <p v-if="error" id="generation-error" class="prompt-error" role="alert">{{ error }}</p>
          <div class="example-prompts" aria-label="示例描述"><button v-for="example in examples" :key="example.label" type="button" @click="useExample(example.prompt)">{{ example.label }} ↗</button></div>
          <button class="generate-button" type="submit">✧ {{ started ? '重新生成' : '开始生成' }}</button>
        </form>
        <div class="generation-steps" aria-label="生成阶段"><div v-for="(label, index) in stages" :key="label" :class="{ active: started && stageIndex === index, done: started && stageIndex > index }"><span>{{ stageIndex > index && started ? '✓' : `0${index + 1}` }}</span>{{ label }}</div></div>
        <p class="local-note">根据关键词选择预设图案并演示生成过程，未连接图像生成模型。</p>
      </div>
      <div class="generation-display">
        <div class="display-top"><span>IMAGINATION FIELD</span><span>{{ started ? `${Math.round(progress * 100)}%` : 'READY' }}</span></div>
        <div ref="canvasHost" class="generation-canvas">
          <canvas ref="canvas" role="img" :aria-label="started ? `${resultLabel}，${stages[stageIndex]}，进度 ${Math.round(progress * 100)}%` : '生成过程预览：等待输入描述'"></canvas>
          <div v-if="!started" class="empty-preview"><span>✧</span><strong>每个画面，都始于一个想法。</strong><p>选择示例，或写下你的描述。</p></div>
        </div>
        <div class="generation-status" role="status">{{ status }}</div>
        <div v-if="started" class="result-caption">{{ submittedPrompt }}</div>
        <div class="generation-progress" role="progressbar" aria-label="图案生成进度" :aria-valuenow="Math.round(progress * 100)" :aria-valuemin="0" :aria-valuemax="100"><span :style="{ width: `${progress * 100}%` }"></span></div>
        <div class="generation-controls">
          <button :disabled="!started || progress >= 1 || reduced" @click="togglePlayback">{{ playing ? 'Ⅱ 暂停生成' : '▷ 继续生成' }}</button>
          <button :disabled="!started" @click="replay">↻ 重播过程</button>
          <label>速度 <select v-model.number="speed" aria-label="生成动画速度"><option :value="0.5">0.5×</option><option :value="1">1×</option><option :value="2">2×</option></select></label>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ reduced: boolean }>()
const section = ref<HTMLElement>()
const canvasHost = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()
const prompt = ref('一颗蓝色的星球，带着发光的星环')
const submittedPrompt = ref('')
const error = ref('')
const started = ref(false)
const playing = ref(false)
const progress = ref(0)
const speed = ref(1)
const resultLabel = ref('')
const stages = ['噪点采样', '轮廓显现', '细节填充', '生成完成']
const stageIndex = computed(() => progress.value >= 1 ? 3 : progress.value < .25 ? 0 : progress.value < .6 ? 1 : 2)
const status = computed(() => !started.value ? '等待你的第一个想法' : progress.value >= 1 ? '生成完成 · 想象已显现' : `${playing.value ? '生成中' : '已暂停'} · ${stages[stageIndex.value]}`)
const examples = [
  { label: '环绕星球', prompt: '一颗蓝色的星球，带着发光的星环' },
  { label: '日落山脉', prompt: '橙色的山脉，远处有一轮落日' },
  { label: '绽放花朵', prompt: '一朵粉色的花，在夜色里绽放' },
  { label: '金色星形', prompt: '一颗金色的五角星，闪闪发光' }
]
type Particle = { x: number; y: number; tx: number; ty: number; r: number; g: number; b: number; phase: number }
type Shape = 'planet' | 'mountain' | 'flower' | 'star'
let particles: Particle[] = []
let target: HTMLCanvasElement | undefined
let outline: HTMLCanvasElement | undefined
let width = 0, height = 0, frame = 0, last = 0
let visible = false
let resizeObserver: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined
const imageWidth = 560, imageHeight = 340
const FULL_TURN = Math.PI * 2
const IMAGE_CENTER = { x: imageWidth / 2, y: imageHeight / 2 }
const IMAGE_GRADIENT = { start: { x: 180, y: 70 }, end: { x: 360, y: 290 } }
const PLANET_STYLE = {
  radius: 87,
  bands: { count: 5, centerX: 278, startY: 110, spacing: 29, radiusX: 115, radiusY: 18, rotation: -.25, opacity: .22, lineWidth: 9 },
  ring: { radiusX: 163, radiusY: 43, rotation: -.35, lineWidth: 5 },
  outerRing: { radiusX: 172, radiusY: 50, rotation: -.35, lineWidth: 2, opacity: .35 }
}
const MOUNTAIN_STYLE = {
  sun: { x: 350, y: 108, radius: 43 },
  peaks: [
    { left: { x: 70, y: 272 }, summit: { x: 175, y: 133 }, right: { x: 270, y: 272 }, fill: 'dark' },
    { left: { x: 205, y: 272 }, summit: { x: 320, y: 155 }, right: { x: 460, y: 272 }, fill: 'light' },
    { left: { x: 100, y: 288 }, summit: { x: 245, y: 180 }, right: { x: 395, y: 288 }, fill: 'gradient' }
  ],
  reflections: { count: 4, leftX: 110, rightX: 450, startY: 297, insetStep: 25, spacing: 7, opacity: .5, opacityStep: .1, lineWidth: 2 }
}
const FLOWER_STYLE = {
  center: { x: IMAGE_CENTER.x, y: 153 },
  stem: { start: { x: IMAGE_CENTER.x, y: 190 }, control: { x: 260, y: 240 }, end: { x: IMAGE_CENTER.x, y: 300 }, lineWidth: 5 },
  petals: { count: 8, offsetY: -40, radiusX: 24, radiusY: 53 },
  core: { radius: 22, color: '#fff0b5' },
  leaf: { x: 298, y: 249, radiusX: 27, radiusY: 10, rotation: -.55 }
}
const STAR_STYLE = { center: { x: IMAGE_CENTER.x, y: 175 }, points: 5, innerRadius: 47, outerRadius: 109, startAngle: -Math.PI / 2, lineWidth: 2 }
const SPARK_STYLE = { radius: 2.5, positions: [{ x: 90, y: 80 }, { x: 460, y: 105 }, { x: 140, y: 200 }, { x: 420, y: 265 }, { x: 380, y: 45 }] }
const PIXEL_FORMAT = { channels: 4, red: 0, green: 1, blue: 2, alpha: 3, opaque: 255 }
const PARTICLE_SAMPLING = { alphaThreshold: 80, gridSpacing: 5 }
const COLOR_PALETTE: [RegExp, string, string][] = [
  [/蓝|blue/i, '#428cff', '#9ef0ff'], [/绿|green/i, '#22a984', '#b0ffe0'], [/紫|purple/i, '#9152d3', '#e6bfff'],
  [/粉|pink/i, '#e466a6', '#ffc9e6'], [/橙|orange/i, '#e47a36', '#ffdf9a'], [/金|黄|gold|yellow/i, '#dca737', '#fff0a1']
]
const DEFAULT_COLORS: Record<Shape, [string, string]> = {
  planet: ['#428cff', '#9ef0ff'], mountain: ['#e47a36', '#ffdf9a'], flower: ['#e466a6', '#ffc9e6'], star: ['#dca737', '#fff0a1']
}
function smooth(value: number) { const p = Math.min(1, Math.max(0, value)); return p * p * (3 - 2 * p) }
function useExample(value: string) { prompt.value = value; error.value = '' }
function generate() {
  const text = prompt.value.trim()
  if (!text) { error.value = '先写下一段描述，或选择一个示例。'; return }
  const shape: Shape | undefined = /星球|行星|土星|planet/i.test(text) ? 'planet' : /山|日落|mountain/i.test(text) ? 'mountain' : /花|flower/i.test(text) ? 'flower' : /星形|五角星|星星|star/i.test(text) ? 'star' : undefined
  if (!shape) { error.value = '试着加入“星球”“山脉”“花朵”或“星形”，也可以直接选择下方示例。'; return }
  error.value = ''
  submittedPrompt.value = text
  resultLabel.value = { planet: '环绕星球', mountain: '日落山脉', flower: '绽放花朵', star: '星形' }[shape]
  buildImage(shape, text)
  started.value = true
  replay()
}
function buildImage(shape: Shape, text: string) {
  target = createImageCanvas()
  const ctx = target.getContext('2d')!
  const selected = COLOR_PALETTE.find(([pattern]) => pattern.test(text))
  const [dark, light] = selected ? [selected[1], selected[2]] : DEFAULT_COLORS[shape]
  const { start, end } = IMAGE_GRADIENT
  const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y)
  gradient.addColorStop(0, light)
  gradient.addColorStop(1, dark)
  ctx.fillStyle = gradient
  switch (shape) {
    case 'planet': drawPlanet(ctx, light); break
    case 'mountain': drawMountain(ctx, dark, light, gradient); break
    case 'flower': drawFlower(ctx, dark, gradient); break
    case 'star': drawStar(ctx, light); break
  }
  ctx.fillStyle = light
  SPARK_STYLE.positions.forEach(({ x, y }) => {
    ctx.beginPath()
    ctx.arc(x, y, SPARK_STYLE.radius, 0, FULL_TURN)
    ctx.fill()
  })
  const pixels = ctx.getImageData(0, 0, imageWidth, imageHeight)
  outline = buildOutline(pixels)
  particles = sampleParticles(pixels, text)
}
function createImageCanvas() {
  const image = document.createElement('canvas')
  image.width = imageWidth
  image.height = imageHeight
  return image
}
function drawPlanet(ctx: CanvasRenderingContext2D, light: string) {
  const { radius, bands, ring, outerRing } = PLANET_STYLE
  ctx.beginPath()
  ctx.arc(IMAGE_CENTER.x, IMAGE_CENTER.y, radius, 0, FULL_TURN)
  ctx.fill()
  ctx.save()
  ctx.beginPath()
  ctx.arc(IMAGE_CENTER.x, IMAGE_CENTER.y, radius, 0, FULL_TURN)
  ctx.clip()
  ctx.strokeStyle = light
  ctx.globalAlpha = bands.opacity
  ctx.lineWidth = bands.lineWidth
  for (let i = 0; i < bands.count; i++) {
    ctx.beginPath()
    ctx.ellipse(bands.centerX, bands.startY + i * bands.spacing, bands.radiusX, bands.radiusY, bands.rotation, 0, FULL_TURN)
    ctx.stroke()
  }
  ctx.restore()
  ctx.strokeStyle = light
  ctx.lineWidth = ring.lineWidth
  ctx.beginPath()
  ctx.ellipse(IMAGE_CENTER.x, IMAGE_CENTER.y, ring.radiusX, ring.radiusY, ring.rotation, 0, FULL_TURN)
  ctx.stroke()
  ctx.globalAlpha = outerRing.opacity
  ctx.lineWidth = outerRing.lineWidth
  ctx.beginPath()
  ctx.ellipse(IMAGE_CENTER.x, IMAGE_CENTER.y, outerRing.radiusX, outerRing.radiusY, outerRing.rotation, 0, FULL_TURN)
  ctx.stroke()
  ctx.globalAlpha = 1
}
function drawMountain(ctx: CanvasRenderingContext2D, dark: string, light: string, gradient: CanvasGradient) {
  const { sun, peaks, reflections } = MOUNTAIN_STYLE
  ctx.beginPath()
  ctx.arc(sun.x, sun.y, sun.radius, 0, FULL_TURN)
  ctx.fill()
  const fills: Record<string, string | CanvasGradient> = { dark, light, gradient }
  peaks.forEach(({ left, summit, right, fill }) => {
    ctx.fillStyle = fills[fill]
    ctx.beginPath()
    ctx.moveTo(left.x, left.y)
    ctx.lineTo(summit.x, summit.y)
    ctx.lineTo(right.x, right.y)
    ctx.closePath()
    ctx.fill()
  })
  ctx.strokeStyle = light
  ctx.lineWidth = reflections.lineWidth
  for (let i = 0; i < reflections.count; i++) {
    const y = reflections.startY + i * reflections.spacing
    ctx.globalAlpha = reflections.opacity - i * reflections.opacityStep
    ctx.beginPath()
    ctx.moveTo(reflections.leftX + i * reflections.insetStep, y)
    ctx.lineTo(reflections.rightX - i * reflections.insetStep, y)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}
function drawFlower(ctx: CanvasRenderingContext2D, dark: string, gradient: CanvasGradient) {
  const { center, stem, petals, core, leaf } = FLOWER_STYLE
  ctx.strokeStyle = dark
  ctx.lineWidth = stem.lineWidth
  ctx.beginPath()
  ctx.moveTo(stem.start.x, stem.start.y)
  ctx.quadraticCurveTo(stem.control.x, stem.control.y, stem.end.x, stem.end.y)
  ctx.stroke()
  for (let i = 0; i < petals.count; i++) {
    ctx.save()
    ctx.translate(center.x, center.y)
    ctx.rotate(i * FULL_TURN / petals.count)
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(0, petals.offsetY, petals.radiusX, petals.radiusY, 0, 0, FULL_TURN)
    ctx.fill()
    ctx.restore()
  }
  ctx.fillStyle = core.color
  ctx.beginPath()
  ctx.arc(center.x, center.y, core.radius, 0, FULL_TURN)
  ctx.fill()
  ctx.fillStyle = dark
  ctx.beginPath()
  ctx.ellipse(leaf.x, leaf.y, leaf.radiusX, leaf.radiusY, leaf.rotation, 0, FULL_TURN)
  ctx.fill()
}
function drawStar(ctx: CanvasRenderingContext2D, light: string) {
  const { center, points, innerRadius, outerRadius, startAngle, lineWidth } = STAR_STYLE
  const vertices = points * 2
  ctx.beginPath()
  for (let i = 0; i < vertices; i++) {
    const angle = i * Math.PI / points + startAngle
    const radius = i % 2 ? innerRadius : outerRadius
    const x = center.x + Math.cos(angle) * radius
    const y = center.y + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = light
  ctx.lineWidth = lineWidth
  ctx.stroke()
}
function buildOutline(pixels: ImageData) {
  const image = createImageCanvas()
  const outlineCtx = image.getContext('2d')!
  const edgePixels = outlineCtx.createImageData(imageWidth, imageHeight)
  const { channels, alpha, opaque } = PIXEL_FORMAT
  const rowStride = imageWidth * channels
  // Alpha boundaries form a contour independent of the filled result.
  for (let y = 1; y < imageHeight - 1; y++) for (let x = 1; x < imageWidth - 1; x++) {
    const i = (y * imageWidth + x) * channels
    const neighbors = [i - channels, i + channels, i - rowStride, i + rowStride]
    if (pixels.data[i + alpha] > PARTICLE_SAMPLING.alphaThreshold && neighbors.some(j => pixels.data[j + alpha] < PARTICLE_SAMPLING.alphaThreshold)) {
      edgePixels.data.set(pixels.data.subarray(i, i + channels), i)
      edgePixels.data[i + alpha] = opaque
    }
  }
  outlineCtx.putImageData(edgePixels, 0, 0)
  return image
}
function createSeededRandom(text: string) {
  // FNV-1a hashes the prompt; xorshift32 then produces repeatable particle positions.
  const FNV_OFFSET_BASIS = 2166136261
  const FNV_PRIME = 16777619
  const UINT32_RANGE = 2 ** 32
  let seed = FNV_OFFSET_BASIS
  for (const char of text) seed = Math.imul(seed ^ char.charCodeAt(0), FNV_PRIME)
  // These shifts are the standard xorshift32 algorithm parameters, not visual settings.
  return () => {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    return (seed >>> 0) / UINT32_RANGE
  }
}
function sampleParticles(pixels: ImageData, text: string) {
  const random = createSeededRandom(text)
  const sampled: Particle[] = []
  const { channels, red, green, blue, alpha } = PIXEL_FORMAT
  const { gridSpacing, alphaThreshold } = PARTICLE_SAMPLING
  for (let y = 0; y < imageHeight; y += gridSpacing) for (let x = 0; x < imageWidth; x += gridSpacing) {
    const i = (y * imageWidth + x) * channels
    if (pixels.data[i + alpha] > alphaThreshold) sampled.push({ x: random() * imageWidth, y: random() * imageHeight, tx: x, ty: y, r: pixels.data[i + red], g: pixels.data[i + green], b: pixels.data[i + blue], phase: random() * FULL_TURN })
  }
  return sampled
}
function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx || !width || !height) return
  ctx.clearRect(0, 0, width, height)
  const scale = Math.min(width / imageWidth, height / imageHeight)
  ctx.save(); ctx.translate((width - imageWidth * scale) / 2, (height - imageHeight * scale) / 2); ctx.scale(scale, scale)
  if (!started.value) {
    ctx.fillStyle = '#7cadbe'
    for (let i = 0; i < 100; i++) { ctx.globalAlpha = .1 + (i % 4) * .035; ctx.fillRect((i * 137.3) % imageWidth, (i * 73.9) % imageHeight, 1.5, 1.5) }
  } else if (target && outline) {
    const p = progress.value, convergence = smooth((p - .16) / .6), imageOpacity = smooth((p - .6) / .4)
    ctx.globalAlpha = smooth((p - .23) / .15) * (1 - imageOpacity); ctx.drawImage(outline, 0, 0)
    particles.forEach(particle => {
      const jitter = (1 - convergence) * 12
      const x = particle.x + (particle.tx - particle.x) * convergence + Math.sin(p * 38 + particle.phase) * jitter
      const y = particle.y + (particle.ty - particle.y) * convergence + Math.cos(p * 29 + particle.phase) * jitter
      ctx.globalAlpha = (.45 + convergence * .45) * (1 - imageOpacity)
      ctx.fillStyle = `rgb(${particle.r},${particle.g},${particle.b})`; ctx.fillRect(x, y, 2 + convergence, 2 + convergence)
    })
    ctx.globalAlpha = imageOpacity; ctx.drawImage(target, 0, 0)
  }
  ctx.restore()
}
function stop() { cancelAnimationFrame(frame); frame = 0; last = 0 }
function tick(timestamp: number) {
  if (last) progress.value = Math.min(1, progress.value + Math.min((timestamp - last) / 1000, .05) * speed.value / 8)
  last = timestamp; draw()
  if (progress.value >= 1) { playing.value = false; stop(); return }
  frame = requestAnimationFrame(tick)
}
function sync() { stop(); draw(); if (playing.value && visible && !document.hidden && !props.reduced) frame = requestAnimationFrame(tick) }
function replay() { progress.value = props.reduced ? 1 : 0; playing.value = !props.reduced; sync() }
function togglePlayback() { playing.value = !playing.value; sync() }
watch(() => props.reduced, value => { if (value && started.value) { progress.value = 1; playing.value = false }; sync() })
onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    if (!canvasHost.value || !canvas.value) return
    width = canvasHost.value.clientWidth; height = canvasHost.value.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.value.width = width * dpr; canvas.value.height = height * dpr
    canvas.value.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0); draw()
  })
  resizeObserver.observe(canvasHost.value!)
  visibilityObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync() })
  visibilityObserver.observe(section.value!)
  document.addEventListener('visibilitychange', sync)
})
onUnmounted(() => { stop(); resizeObserver?.disconnect(); visibilityObserver?.disconnect(); document.removeEventListener('visibilitychange', sync) })
</script>

<style scoped>
.generation-experiment { border: 1px solid #25404c; border-radius: 20px; background: #0c1a23cc; margin-bottom: 26px; padding: 36px; overflow: hidden; }
.generation-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 28px; }
.experiment-number { color: #71b8bc; font: 11px 'Consolas', monospace; letter-spacing: .16em; }
h2 { font-size: 28px; font-weight: 600; letter-spacing: -.02em; margin: 12px 0; }
.generation-heading p { color: #91a8b6; font-size: 14px; }
.demo-tag { font-size: 11px; color: #a3b9c4; border: 1px solid #37525f; padding: 6px 10px; border-radius: 30px; white-space: nowrap; }
.generation-layout { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 28px; }
.prompt-panel label { display: block; color: #c5dbe0; font-size: 13px; margin-bottom: 10px; }
textarea { width: 100%; resize: vertical; min-height: 115px; max-height: 230px; background: #08151e; border: 1px solid #345361; border-radius: 10px; padding: 14px; line-height: 1.8; font-size: 14px; color: #cce9e8; }
textarea::placeholder { color: #6a8795; }
.prompt-help, .local-note { font-size: 11px; color: #839caa; line-height: 1.9; margin-top: 10px; }
.prompt-error { color: #ffc49c; font-size: 12px; margin-top: 8px; }
.example-prompts { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0; }
button { cursor: pointer; transition: background .2s; }
button:disabled { opacity: .4; cursor: default; }
button:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid #88ead8; outline-offset: 3px; }
.example-prompts button { border: 1px solid #2b4654; border-radius: 6px; background: #122832; padding: 6px 10px; font-size: 11px; color: #aac6ce; }
.example-prompts button:hover { background: #21434a; }
.generate-button { width: 100%; background: #89e2cf; color: #0a2529; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; }
.generate-button:hover { background: #aff1e2; }
.generation-steps { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 8px; margin-top: 26px; }
.generation-steps div { color: #728b99; font-size: 12px; display: flex; align-items: center; gap: 8px; }
.generation-steps span { font: 10px 'Consolas', monospace; width: 24px; height: 24px; display: grid; place-items: center; border: 1px solid #2c4754; border-radius: 50%; }
.generation-steps .active { color: #a0f1df; }
.generation-steps .active span { border-color: #89e2cf; background: #21443f; }
.generation-steps .done { color: #94b7b4; }
.local-note { margin-top: 20px; }
.generation-display { min-width: 0; background: #07141e; border: 1px solid #25404c; border-radius: 12px; overflow: hidden; background-image: linear-gradient(#5c8caa08 1px, transparent 1px), linear-gradient(90deg, #5c8caa08 1px, transparent 1px); background-size: 28px 28px; }
.display-top { display: flex; justify-content: space-between; padding: 18px 20px 0; color: #71949e; font: 10px 'Consolas', monospace; letter-spacing: .13em; }
.generation-canvas { position: relative; width: 100%; height: 320px; }
canvas { display: block; width: 100%; height: 100%; }
.empty-preview { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; text-align: center; }
.empty-preview > span { font-size: 42px; color: #76cfc3; margin-bottom: 14px; }
.empty-preview strong { color: #acc9d0; font-size: 14px; font-weight: 500; }
.empty-preview p { font-size: 12px; color: #6e939f; margin-top: 8px; }
.generation-status { text-align: center; color: #9ac6c5; font-size: 12px; padding: 4px 16px; }
.result-caption { text-align: center; color: #7898a6; font-size: 11px; padding: 4px 20px 12px; overflow-wrap: anywhere; }
.generation-progress { height: 3px; background: #19313d; margin-top: 12px; }
.generation-progress span { display: block; height: 100%; background: #84e4d0; }
.generation-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 16px; background: #0e202bcc; }
.generation-controls button { font-size: 12px; padding: 7px 10px; border: 1px solid #355563; border-radius: 6px; background: #132a36; color: #c5dbe0; }
.generation-controls label { margin-left: auto; display: flex; align-items: center; gap: 8px; color: #97b4c0; font-size: 11px; }
select { color: #b7d7da; background: #132a36; border: 1px solid #355563; border-radius: 5px; padding: 5px; }
@media (max-width: 760px) { .generation-experiment { padding: 24px; } .generation-heading { flex-direction: column; align-items: flex-start; } .generation-layout { grid-template-columns: 1fr; gap: 24px; } h2 { font-size: 24px; } .generation-canvas { height: 250px; } .generation-controls { padding: 12px; gap: 8px; } }
</style>
