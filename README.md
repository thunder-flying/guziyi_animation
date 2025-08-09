# 动画展示厅 - 酷炫动画展示网站

这是一个使用 Vue 3 + TypeScript + 动画引擎 构建的动画展示网站，展示了各种令人惊艳的动画效果。

## 🎨 功能特色

### 已实现功能


- ✅ **文字动画效果**
  - 打字机效果
  - 文字分割动画（淡入、上滑、旋转、弹跳）
  - 3D文字效果（轴旋转、翻转、波浪）
  - 文字变形动画
  - 故障艺术效果

### 规划中功能

- 🚧 **几何图形动画** - 形状变换、路径动画、粒子效果
- 🚧 **滚动动画** - 视差滚动、元素进入动画
- 🚧 **交互动画** - 鼠标响应、点击反馈
- 🚧 **时间轴动画** - 复杂序列动画控制

## 🚀 推荐的酷炫动画效果

### 1. 文字动画
- **打字机效果** - 经典且实用的文字逐字显示
- **分割文字动画** - 将文字拆分为字符，创造惊艳的进入效果
- **3D文字变换** - 利用CSS 3D变换创造立体效果
- **故障艺术** - 赛博朋克风格的视觉效果

### 2. 几何动画（规划中）
- **形状变形** - SVG路径的平滑过渡
- **粒子系统** - 动态粒子效果
- **路径动画** - 元素沿路径运动

### 3. 滚动动画（规划中）
- **视差滚动** - 多层次的滚动速度差
- **滚动触发** - 元素进入视口时的动画
- **进度指示** - 滚动进度的可视化

### 4. 交互动画（规划中）
- **鼠标跟随** - 元素跟随鼠标移动
- **悬停效果** - 丰富的hover动画
- **拖拽交互** - 可拖拽的动画元素

## 🛠 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript
- **动画引擎** - 高性能动画库
- **Tailwind CSS** - 实用优先的CSS框架
- **Element Plus** - Vue 3组件库
- **Vite** - 下一代前端构建工具

## 📦 安装与运行

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 🎯 动画最佳实践

### 性能优化
- 使用 `transform` 和 `opacity` 属性进行动画
- 避免动画 `layout` 属性（width、height、padding等）
- 使用 `will-change` 属性优化渲染性能
- 合理使用 `force3D` 启用硬件加速

### 动画设计原则
- **缓动函数** - 使用自然的缓动效果
- **时长控制** - 适中的动画时长（300-800ms）
- **交错动画** - 使用 `stagger` 创造层次感
- **响应式** - 考虑移动设备的性能限制

### 常用动画技巧
```javascript
// 基础动画
// 基本动画
animationEngine.to(".element", { x: 100, duration: 1 })

// 时间轴控制
// 时间轴动画
const tl = animationEngine.timeline()
tl.to(".element1", { x: 100 })
  .to(".element2", { y: 50 }, "-=0.5")

// 滚动触发
ScrollTrigger.create({
  trigger: ".element",
  start: "top 80%",
  animation: animationEngine.from(".element", { opacity: 0, y: 50 })
})

// 交错动画
animationEngine.fromTo(".items", 
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, stagger: 0.1 }
)
```

## 🌟 动画灵感来源

- **Apple官网** - 流畅的产品展示动画
- **Stripe官网** - 优雅的微交互
- **CodePen** - 创意动画示例
- **Awwwards** - 获奖网站设计

## 📱 响应式设计

网站采用移动优先的设计理念：
- 移动端优化的触摸交互
- 响应式动画参数调整
- 性能优化的动画降级

## 🔧 自定义动画

你可以轻松添加自己的动画效果：

1. 在对应的组件中导入动画引擎
2. 使用Vue的生命周期钩子初始化动画
3. 利用ref获取DOM元素
4. 创建动画实例

## 📚 学习资源

- [动画引擎官方文档](https://greensock.com/docs/)
- [动画引擎学习指南](https://greensock.com/learning/)
- [Vue 3官方文档](https://vuejs.org/)
- [TypeScript文档](https://www.typescriptlang.org/)

## 🤝 贡献

欢迎提交PR来添加更多酷炫的动画效果！

## 📄 许可证

MIT License
