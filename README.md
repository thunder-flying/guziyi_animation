# 动画展示厅 - GSAP + Vue 3 动画展示网站

一个使用 Vue 3 + TypeScript + GSAP + Vite 构建的动画展示网站，聚合多类动画示例与最佳实践，并内置性能优化与代码行数统计。

## 🎨 功能概览

### 已实现
- AI 动画实验室（`/ai-animations`）
  - 520 粒子能量球：待机、聆听、思考、回答四种视觉状态，支持暂停
  - 神经网络概念动画：选择输入节点，逐层传播，支持暂停、继续、重播和调速
  - 生成过程动画：文字关键词选择星球、山脉、花朵、星形和颜色，演示噪点 → 轮廓 → 细节 → 完整图案；支持暂停、继续、重播和调速
  - 图案由本地预设绘制，不调用图像生成模型；不支持的描述会提示可用关键词
  - 无需模型服务或 API 密钥；聆听为视觉模拟，不采集麦克风
  - 遵循减少动态效果设置，窗口隐藏或画面离开视口时停止动画，离开页面释放资源
- 首页（Hero）
  - 画布粒子系统（小球运动，支持距离阈值连线，可自动降级）
  - 终端式打字机文案、按钮与入场动效
  - 动画卡片总览、特性说明、滚动触发动画
- 文字动画页（TextAnimations）
  - 打字机效果
  - 文字分割动画（淡入、上滑、旋转、弹跳）
  - 3D 文字效果（轴旋转、翻转、波浪）
  - 文字变形动画
  - 故障艺术效果（Glitch）

### 路由与页面
- `/` 首页
- `/text-animations` 文字动画
- `/geometry-animations` 几何动画
- `/scroll-animations` 滚动动画
- `/interactive-animations` 交互动画
- `/timeline-animations` 时间轴动画
- `/3d-effects` 3D 视觉效果
- `/visual-effects` 视觉特效
- `/game-effects` 游戏化动画

> 部分页面为进行中，示例将逐步完善。

## 🛠 技术栈
- Vue 3、TypeScript、Vite
- Vue Router、Element Plus、Tailwind CSS、@vueuse/core
- GSAP（含 ScrollTrigger、TextPlugin 等）

## ⚡ 性能优化
- 性能模式：根据 `prefers-reduced-motion`、`hardwareConcurrency`、屏幕宽度自动降级
- 粒子系统降载：减少粒子数、关闭连线与阴影等重计算
- 懒触发：滚动进入时才执行部分动画

## 📊 代码行数统计（用于首页展示）
项目内置脚本统计 `src` 目录代码总行数并写入 `public/stats.json`，首页自动读取并显示。

1) 安装依赖（推荐 pnpm）：
```bash
pnpm install
```

2) 安装 tsx（用于运行 TS 脚本）：
```bash
pnpm add -D tsx
```

3) 生成统计文件：
```bash
pnpm run count:lines
```

执行后会生成 `public/stats.json`，刷新首页即可看到“代码行数”。

## 🧭 本地开发与构建
```bash
# 开发
pnpm dev

# 构建
pnpm build

# 预览
pnpm preview
```

## 📚 参考与资源
- GSAP 文档: https://greensock.com/docs/
- Vue 3 文档: https://vuejs.org/
- TypeScript 文档: https://www.typescriptlang.org/

## 📄 许可证
MIT
