# Tailwind CSS 常用组件模板

## 按钮样式
```html
<!-- 主要按钮 -->
<button class="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600">
  点击我
</button>

<!-- 次要按钮 -->
<button class="px-4 py-2 font-semibold text-gray-700 rounded-lg border border-gray-300 transition-colors hover:bg-gray-50">
  取消
</button>
```

## 卡片样式
```html
<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
  <h3 class="mb-2 text-lg font-semibold text-gray-900">卡片标题</h3>
  <p class="text-gray-600">卡片内容...</p>
</div>
```

## 表单输入
```html
<input class="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
       type="text" 
       placeholder="请输入内容">
```

## 导航栏
```html
<nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- 导航内容 -->
    </div>
  </div>
</nav>
```

## 响应式网格
```html
<!-- 响应式卡片网格 -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div class="p-6 bg-white rounded-lg shadow-md">...</div>
  <div class="p-6 bg-white rounded-lg shadow-md">...</div>
  <div class="p-6 bg-white rounded-lg shadow-md">...</div>
</div>
```

## 常用布局组合
```html
<!-- 居中容器 -->
<div class="flex justify-center items-center min-h-screen bg-gray-50">
  <div class="space-y-8 w-full max-w-md">
    <!-- 内容 -->
  </div>
</div>

<!-- 两栏布局 -->
<div class="flex flex-col gap-8 lg:flex-row">
  <div class="lg:w-2/3">主内容</div>
  <div class="lg:w-1/3">侧边栏</div>
</div>
```
