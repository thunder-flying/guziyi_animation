<template>
  <main class="ai-lab">
    <div class="lab-content">
      <header class="lab-header">
        <div class="eyebrow"><span></span> ANIMATION / INTELLIGENCE</div>
        <h1>让智能，<span>有迹可循。</span></h1>
        <p>从一次呼吸，到一次信号传递。探索 AI 的交互状态与信息流动。</p>
        <div class="header-meta"><span>AI 动画实验室</span><span>02 个交互实验</span><span>无需 API 密钥</span></div>
      </header>

      <section class="experiment orb-section" aria-labelledby="orb-title">
        <div class="experiment-intro">
          <span class="experiment-number">EXPERIMENT 01</span>
          <h2 id="orb-title">AI 思考能量球</h2>
          <p>用运动赋予状态表情。切换模式，观察同一个粒子球如何回应不同的交互阶段。</p>
          <div class="state-controls" aria-label="能量球状态">
            <button v-for="item in states" :key="item.id" :aria-pressed="state === item.id" :class="{ selected: state === item.id }" @click="state = item.id">
              <span>{{ item.symbol }}</span>{{ item.label }}
            </button>
          </div>
          <div class="state-description" aria-live="polite"><strong>{{ currentState.label }}</strong><p>{{ currentState.description }}</p></div>
          <button class="text-button" :disabled="reduced" @click="orbPaused = !orbPaused">{{ orbPaused ? '▷ 继续动画' : 'Ⅱ 暂停动画' }}</button>
        </div>
        <div class="orb-stage" :style="{ '--state-color': currentState.color }">
          <div class="stage-label"><span>NEURAL CORE</span><span class="status-dot">{{ currentState.label }}</span></div>
          <AIEnergyOrb :state="state" :paused="orbPaused" :reduced="reduced" />
          <div class="stage-footer"><span>520 PARTICLES</span><span>INTERACTIVE STATE FIELD</span></div>
        </div>
      </section>

      <section ref="networkSection" class="experiment network-section" aria-labelledby="network-title">
        <div class="network-header">
          <div><span class="experiment-number">EXPERIMENT 02</span><h2 id="network-title">看见一次信号传递</h2><p>选择输入节点，观察光点穿过隐藏层，抵达输出端。</p></div>
          <span class="simulation-tag">概念动画 · 非真实模型推理</span>
        </div>
        <div class="network-stage">
          <div class="layer-labels"><span>输入层</span><span>隐藏层 01</span><span>隐藏层 02</span><span>输出层</span></div>
          <svg viewBox="0 0 800 330" role="group" aria-label="神经网络信号传播示意">
            <g v-for="edge in edges" :key="edge.id">
              <line :x1="edge.from.x" :y1="edge.from.y" :x2="edge.to.x" :y2="edge.to.y" :class="{ 'active-edge': edgeActive(edge) }" />
              <circle v-if="edgeActive(edge)" :cx="edge.from.x + (edge.to.x - edge.from.x) * segmentProgress" :cy="edge.from.y + (edge.to.y - edge.from.y) * segmentProgress" r="4" class="signal" />
            </g>
            <g v-for="node in nodes" :key="node.id" :role="node.layer === 0 ? 'button' : undefined" :tabindex="node.layer === 0 ? 0 : undefined" :aria-label="node.layer === 0 ? `从输入节点 ${node.index + 1} 开始传播` : undefined" :aria-pressed="node.layer === 0 ? selectedInput === node.index : undefined" :class="['network-node', { clickable: node.layer === 0, lit: nodeLit(node) }]" @click="node.layer === 0 && start(node.index)" @keydown.enter.prevent="node.layer === 0 && start(node.index)" @keydown.space.prevent="node.layer === 0 && start(node.index)">
              <circle :cx="node.x" :cy="node.y" r="20" class="node-halo" />
              <circle :cx="node.x" :cy="node.y" r="10" class="node-core" />
              <text v-if="node.layer === 0" :x="node.x - 32" :y="node.y + 4">{{ String(node.index + 1).padStart(2, '0') }}</text>
            </g>
          </svg>
          <div class="network-feedback" role="status">{{ networkMessage }}</div>
          <div class="progress-track" role="progressbar" aria-label="信号传播进度" :aria-valuenow="Math.round(progress / 3 * 100)" :aria-valuemin="0" :aria-valuemax="100"><div :style="{ width: `${progress / 3 * 100}%` }"></div></div>
        </div>
        <div class="network-controls">
          <div class="play-controls"><button class="primary-button" @click="start(selectedInput)">{{ progress >= 3 ? '↻ 再次传播' : '▷ 开始 / 重播' }}</button><button class="secondary-button" :disabled="progress === 0 || progress >= 3 || reduced" @click="toggleNetwork">{{ playing ? 'Ⅱ 暂停' : '▷ 继续' }}</button></div>
          <label class="speed-control">传播速度 <input v-model.number="speed" type="range" min="0.5" max="2" step="0.25" /><span>{{ speed }}×</span></label>
        </div>
        <p class="explanation">这里展示的是信号逐层传播的视觉概念。真实神经网络会进行权重计算和非线性变换，连线亮起不代表模型的思考过程。</p>
      </section>
      <footer class="lab-footer"><span>把抽象变成可感知的体验。</span><span v-if="reduced">已遵循系统的减少动态效果设置，传播结果直接呈现。</span><span v-else>切换页面或隐藏窗口时，动画自动停止。</span></footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AIEnergyOrb from '@/components/animations/AIEnergyOrb.vue'

type State = 'idle' | 'listening' | 'thinking' | 'speaking'
const states: { id: State; label: string; symbol: string; color: string; description: string }[] = [
  { id: 'idle', label: '待机', symbol: '◌', color: '#5bd5e5', description: '轻柔呼吸，粒子缓慢旋转，安静等待下一次交互。' },
  { id: 'listening', label: '聆听', symbol: '≋', color: '#5defb3', description: '波动沿球面起伏，模拟正在接收声音的视觉反馈。' },
  { id: 'thinking', label: '思考', symbol: '✧', color: '#ffbf69', description: '粒子向核心收拢并加速旋转，表现处理中的节奏。' },
  { id: 'speaking', label: '回答', symbol: '◎', color: '#72b1ff', description: '球面如声波般律动，光环向外扩散，呈现输出状态。' }
]
const state = ref<State>('idle')
const currentState = computed(() => states.find(item => item.id === state.value)!)
const orbPaused = ref(false)
const reduced = ref(false)
const networkSection = ref<HTMLElement>()
const selectedInput = ref(0)
const progress = ref(0)
const speed = ref(1)
const playing = ref(false)
type NetworkNode = { id: string; layer: number; index: number; x: number; y: number }
const sizes = [3, 5, 5, 2]
const nodes: NetworkNode[] = sizes.flatMap((count, layer) => Array.from({ length: count }, (_, index) => ({ id: `${layer}-${index}`, layer, index, x: 80 + layer * 213, y: 330 / (count + 1) * (index + 1) })))
const edges = nodes.flatMap(from => nodes.filter(to => to.layer === from.layer + 1).map(to => ({ id: `${from.id}:${to.id}`, from, to })))
const segment = computed(() => Math.min(2, Math.floor(progress.value)))
const segmentProgress = computed(() => progress.value >= 3 ? 1 : progress.value % 1)
const networkMessage = computed(() => progress.value >= 3 ? '传播完成 · 信号已抵达输出层' : progress.value === 0 ? '点击左侧节点，或按开始，发出一个信号。' : `${playing.value ? '传播中' : '已暂停'} · ${['输入 → 隐藏层 01', '隐藏层 01 → 隐藏层 02', '隐藏层 02 → 输出'][segment.value]}`)
function edgeActive(edge: typeof edges[number]) { return progress.value > 0 && progress.value < 3 && edge.from.layer === segment.value && (edge.from.layer !== 0 || edge.from.index === selectedInput.value) }
function nodeLit(node: NetworkNode) { return node.layer === 0 ? node.index === selectedInput.value : progress.value >= node.layer }
let frame = 0, last = 0
let visible = true
let observer: IntersectionObserver | undefined
let media: MediaQueryList | undefined
function cancel() { cancelAnimationFrame(frame); frame = 0; last = 0 }
function tick(timestamp: number) {
  if (last) progress.value = Math.min(3, progress.value + Math.min((timestamp - last) / 1000, .05) * speed.value / 1.2)
  last = timestamp
  if (progress.value >= 3) { playing.value = false; cancel(); return }
  frame = requestAnimationFrame(tick)
}
function sync() {
  cancel()
  if (playing.value && !document.hidden && visible && !reduced.value) frame = requestAnimationFrame(tick)
}
function start(input: number) { selectedInput.value = input; progress.value = reduced.value ? 3 : 0; playing.value = !reduced.value; sync() }
function toggleNetwork() { playing.value = !playing.value; sync() }
function updateMotion() { reduced.value = !!media?.matches; if (reduced.value && playing.value) { progress.value = 3; playing.value = false }; sync() }
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion(); media.addEventListener('change', updateMotion)
  document.addEventListener('visibilitychange', sync)
  observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync() })
  observer.observe(networkSection.value!)
})
onUnmounted(() => { cancel(); observer?.disconnect(); media?.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', sync) })
</script>

<style scoped>
.ai-lab { background: #071119; color: #dbe9ed; min-height: 100vh; padding: 140px 24px 48px; background-image: radial-gradient(ellipse at 85% 5%, #12334180, transparent 42%); }
.lab-content { max-width: 1120px; margin: auto; }
.lab-header { padding: 28px 0 62px; }
.eyebrow, .experiment-number, .stage-label, .stage-footer { font-family: 'Consolas', monospace; font-size: 11px; letter-spacing: .16em; }
.eyebrow { color: #81b6bd; display: flex; align-items: center; gap: 10px; }
.eyebrow span { width: 7px; height: 7px; background: #80e6d2; border-radius: 50%; box-shadow: 0 0 14px #80e6d2; }
h1 { font-size: clamp(36px, 5.5vw, 66px); letter-spacing: -.05em; margin: 22px 0; font-weight: 600; }
h1 span { color: #83e1d2; }
.lab-header p, .experiment p { color: #91a8b6; line-height: 1.9; }
.header-meta { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-top: 26px; color: #7c98a6; font-size: 12px; }
.header-meta span + span::before { content: '/'; margin-right: 24px; color: #37535f; }
.experiment { border: 1px solid #25404c; border-radius: 20px; background: #0c1a23cc; margin-bottom: 26px; overflow: hidden; }
.orb-section { display: grid; grid-template-columns: 1fr 1.15fr; }
.experiment-intro { padding: 36px; }
.experiment-number { color: #71b8bc; }
h2 { font-size: 28px; margin: 12px 0; font-weight: 600; letter-spacing: -.02em; }
.experiment-intro > p { font-size: 14px; max-width: 350px; }
.state-controls { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 28px 0 22px; }
button { cursor: pointer; transition: background .2s, border-color .2s; }
button:focus-visible, input:focus-visible { outline: 2px solid #88ead8; outline-offset: 5px; }
button:disabled { opacity: .4; cursor: default; }
.state-controls button { background: #102530; border: 1px solid #2b4654; border-radius: 10px; padding: 10px 4px; font-size: 13px; }
.state-controls button span { display: block; font-size: 23px; margin-bottom: 3px; }
.state-controls button.selected { background: #183d43; border-color: #75cfc0; color: #9bf0df; }
.state-description { min-height: 85px; }
.state-description strong { font-size: 14px; }
.state-description p { font-size: 13px; margin-top: 4px; }
.text-button { color: #95d9cf; font-size: 13px; margin-top: 10px; }
.orb-stage { background: #07141e; border-left: 1px solid #25404c; padding: 24px; display: flex; flex-direction: column; justify-content: center; background-image: linear-gradient(#5c8caa08 1px, transparent 1px), linear-gradient(90deg, #5c8caa08 1px, transparent 1px); background-size: 32px 32px; }
.stage-label, .stage-footer { display: flex; justify-content: space-between; color: #668794; gap: 12px; }
.status-dot { color: var(--state-color); letter-spacing: .05em; }
.status-dot::before { content: '●'; margin-right: 6px; }
.stage-footer { font-size: 9px; }
.network-section { padding: 36px; }
.network-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.network-header p { font-size: 14px; }
.simulation-tag { font-size: 11px; color: #a3b9c4; border: 1px solid #37525f; padding: 6px 10px; border-radius: 30px; white-space: nowrap; }
.network-stage { margin-top: 32px; background: #08151e; border: 1px solid #213944; border-radius: 12px; padding: 24px 16px 0; }
.layer-labels { display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; color: #849eab; font-size: 12px; }
svg { display: block; width: 100%; height: auto; max-height: 370px; }
line { stroke: #284350; stroke-width: 1; }
line.active-edge { stroke: #74d6c6; stroke-opacity: .5; }
.signal { fill: #b0ffe9; filter: drop-shadow(0 0 5px #80ffe0); }
.node-halo { fill: #65d8c4; opacity: 0; }
.node-core { fill: #122d3b; stroke: #547787; stroke-width: 1.5; }
.lit .node-core { fill: #8ce6d2; stroke: #c2ffee; }
.lit .node-halo { opacity: .12; }
.network-node text { font-size: 10px; fill: #89adbd; font-family: monospace; }
.clickable { cursor: pointer; outline: none; }
.clickable:hover .node-halo, .clickable:focus-visible .node-halo { opacity: .3; }
.network-feedback { text-align: center; min-height: 40px; color: #9ac6c5; font-size: 12px; }
.progress-track { height: 3px; background: #19313d; margin: 0 -16px; overflow: hidden; border-radius: 0 0 12px 12px; }
.progress-track div { height: 100%; background: #84e4d0; }
.network-controls { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-top: 24px; }
.play-controls { display: flex; gap: 10px; }
.primary-button, .secondary-button { border-radius: 8px; padding: 10px 18px; font-size: 13px; border: 1px solid #355563; }
.primary-button { background: #89e2cf; color: #0a2529; border-color: #89e2cf; font-weight: 600; }
.primary-button:hover { background: #aff1e2; }
.secondary-button { background: #132a36; }
.speed-control { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #97b4c0; }
.speed-control input { width: 110px; accent-color: #88e2cf; }
.speed-control span { min-width: 36px; font-family: monospace; }
.explanation { font-size: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid #233d49; }
.lab-footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 20px 0; color: #6d8b9a; font-size: 12px; }
@media (max-width: 760px) { .ai-lab { padding: 112px 16px 24px; } .orb-section { grid-template-columns: 1fr; } .experiment-intro, .network-section { padding: 24px; } .orb-stage { border-left: 0; border-top: 1px solid #25404c; padding: 20px; } .network-header { align-items: flex-start; flex-direction: column; } h2 { font-size: 24px; } .network-stage { padding: 20px 8px 0; } .progress-track { margin: 0 -8px; } .layer-labels { font-size: 10px; } .lab-header { padding-bottom: 36px; } }
</style>
