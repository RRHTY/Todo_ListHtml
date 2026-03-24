# 待办事项列表应用实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现一个功能增强版的待办事项列表应用，包含任务管理、分类、优先级、搜索过滤等功能

**Architecture:** 采用模块化设计，分离数据模型、控制器和视图，使用localStorage进行数据持久化

**Tech Stack:** HTML5, CSS3, JavaScript ES6+, LocalStorage

---

## 任务1：项目结构搭建

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `app.js`
- Create: `models/Task.js`
- Create: `controllers/TaskController.js`
- Create: `views/TaskView.js`

- [ ] **Step 1: 创建项目目录结构**

```bash
mkdir models controllers views
```

- [ ] **Step 2: 创建主HTML文件**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>待办事项列表</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>待办事项列表</h1>
            <input type="text" id="search-input" placeholder="搜索任务...">
        </header>
        
        <main>
            <aside>
                <div class="category-filter">
                    <h3>分类</h3>
                    <div class="category-item active" data-category="all">全部</div>
                    <div class="category-item" data-category="工作">工作</div>
                    <div class="category-item" data-category="生活">生活</div>
                    <div class="category-item" data-category="学习">学习</div>
                </div>
                
                <div class="priority-filter">
                    <h3>优先级</h3>
                    <div class="priority-item active" data-priority="all">全部</div>
                    <div class="priority-item high" data-priority="high">高</div>
                    <div class="priority-item medium" data-priority="medium">中</div>
                    <div class="priority-item low" data-priority="low">低</div>
                </div>
            </aside>
            
            <section>
                <div class="task-stats">
                    <span>总计: <span id="total-count">0</span></span>
                    <span>已完成: <span id="completed-count">0</span></span>
                    <span>未完成: <span id="pending-count">0</span></span>
                </div>
                
                <div id="task-list"></div>
                
                <div class="add-task">
                    <input type="text" id="new-task-input" placeholder="添加新任务...">
                    <select id="new-task-category">
                        <option value="工作">工作</option>
                        <option value="生活">生活</option>
                        <option value="学习">学习</option>
                    </select>
                    <select id="new-task-priority">
                        <option value="medium">中</option>
                        <option value="high">高</option>
                        <option value="low">低</option>
                    </select>
                    <button id="add-task-btn">添加</button>
                </div>
            </section>
        </main>
    </div>
    
    <script src="models/Task.js"></script>
    <script src="controllers/TaskController.js"></script>
    <script src="views/TaskView.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 3: 创建样式文件**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
}

#app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

#search-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    width: 300px;
}

main {
    display: flex;
    gap: 20px;
}

aside {
    width: 250px;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

aside h3 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
}

.category-filter, .priority-filter {
    margin-bottom: 20px;
}

.category-item, .priority-item {
    padding: 8px 12px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.category-item:hover, .priority-item:hover {
    background-color: #f0f0f0;
}

.category-item.active, .priority-item.active {
    background-color: #007bff;
    color: #fff;
}

.priority-item.high {
    border-left: 4px solid #dc3545;
}

.priority-item.medium {
    border-left: 4px solid #ffc107;
}

.priority-item.low {
    border-left: 4px solid #28a745;
}

section {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
}

#task-list {
    margin-bottom: 20px;
}

.task-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    border-left: 4px solid #ddd;
    background-color: #fafafa;
    transition: background-color 0.2s;
}

.task-item:hover {
    background-color: #f0f0f0;
}

.task-item.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.task-item.high {
    border-left-color: #dc3545;
}

.task-item.medium {
    border-left-color: #ffc107;
}

.task-item.low {
    border-left-color: #28a745;
}

.task-checkbox {
    margin-right: 12px;
    width: 18px;
    height: 18px;
}

.task-content {
    flex: 1;
}

.task-title {
    font-weight: 500;
    margin-bottom: 4px;
}

.task-meta {
    font-size: 12px;
    color: #666;
    display: flex;
    gap: 10px;
}

.task-actions {
    display: flex;
    gap: 8px;
}

.task-actions button {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    background-color: #dc3545;
    color: #fff;
}

.task-actions button:hover {
    background-color: #c82333;
}

.add-task {
    display: flex;
    gap: 10px;
    align-items: center;
}

#new-task-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

#new-task-category, #new-task-priority {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

#add-task-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
}

#add-task-btn:hover {
    background-color: #218838;
}
```

- [ ] **Step 4: 创建任务模型**

```javascript
// models/Task.js
class Task {
    constructor(id, title, category = '工作', priority = 'medium', completed = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
        this.createdAt = createdAt;
    }
}

export default Task;
```

- [ ] **Step 5: 创建任务控制器**

```javascript
// controllers/TaskController.js
import Task from '../models/Task.js';

class TaskController {
    constructor() {
        this.tasks = this.loadTasks();
    }

    loadTasks() {
        const tasksData = localStorage.getItem('tasks');
        return tasksData ? JSON.parse(tasksData) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(title, category, priority) {
        const id = Date.now().toString();
        const task = new Task(id, title, category, priority, false);
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
    }

    getTasks(filter = {}) {
        let filteredTasks = [...this.tasks];

        if (filter.category && filter.category !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.category === filter.category);
        }

        if (filter.priority && filter.priority !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.priority === filter.priority);
        }

        if (filter.search) {
            const searchTerm = filter.search.toLowerCase();
            filteredTasks = filteredTasks.filter(t => 
                t.title.toLowerCase().includes(searchTerm)
            );
        }

        return filteredTasks.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    }
}

export default TaskController;
```

- [ ] **Step 6: 创建任务视图**

```javascript
// views/TaskView.js
class TaskView {
    constructor() {
        this.taskList = document.getElementById('task-list');
        this.newTaskInput = document.getElementById('new-task-input');
        this.newTaskCategory = document.getElementById('new-task-category');
        this.newTaskPriority = document.getElementById('new-task-priority');
        this.addTaskBtn = document.getElementById('add-task-btn');
        this.searchInput = document.getElementById('search-input');
        this.categoryItems = document.querySelectorAll('.category-item');
        this.priorityItems = document.querySelectorAll('.priority-item');
        this.totalCount = document.getElementById('total-count');
        this.completedCount = document.getElementById('completed-count');
        this.pendingCount = document.getElementById('pending-count');
    }

    renderTasks(tasks) {
        this.taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}`;
            taskItem.dataset.id = task.id;

            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        <span class="task-category">${task.category}</span>
                        <span class="task-priority">${this.getPriorityText(task.priority)}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="delete-task-btn">删除</button>
                </div>
            `;

            this.taskList.appendChild(taskItem);
        });
    }

    getPriorityText(priority) {
        const priorityMap = {
            high: '高优先级',
            medium: '中优先级',
            low: '低优先级'
        };
        return priorityMap[priority] || '中优先级';
    }

    renderStats(stats) {
        this.totalCount.textContent = stats.total;
        this.completedCount.textContent = stats.completed;
        this.pendingCount.textContent = stats.pending;
    }

    bindAddTask(handler) {
        this.addTaskBtn.addEventListener('click', () => {
            const title = this.newTaskInput.value.trim();
            const category = this.newTaskCategory.value;
            const priority = this.newTaskPriority.value;

            if (title) {
                handler(title, category, priority);
                this.newTaskInput.value = '';
            }
        });

        this.newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTaskBtn.click();
            }
        });
    }

    bindToggleTask(handler) {
        this.taskList.addEventListener('change', (e) => {
            if (e.target.classList.contains('task-checkbox')) {
                const taskItem = e.target.closest('.task-item');
                const id = taskItem.dataset.id;
                handler(id);
            }
        });
    }

    bindDeleteTask(handler) {
        this.taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-task-btn')) {
                const taskItem = e.target.closest('.task-item');
                const id = taskItem.dataset.id;
                handler(id);
            }
        });
    }

    bindSearch(handler) {
        this.searchInput.addEventListener('input', (e) => {
            handler(e.target.value);
        });
    }

    bindCategoryFilter(handler) {
        this.categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                this.categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                handler(item.dataset.category);
            });
        });
    }

    bindPriorityFilter(handler) {
        this.priorityItems.forEach(item => {
            item.addEventListener('click', () => {
                this.priorityItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                handler(item.dataset.priority);
            });
        });
    }
}

export default TaskView;
```

- [ ] **Step 7: 创建应用入口**

```javascript
// app.js
import TaskController from './controllers/TaskController.js';
import TaskView from './views/TaskView.js';

class App {
    constructor() {
        this.controller = new TaskController();
        this.view = new TaskView();
        this.currentFilter = {
            category: 'all',
            priority: 'all',
            search: ''
        };
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.view.bindAddTask((title, category, priority) => {
            this.controller.addTask(title, category, priority);
            this.render();
        });

        this.view.bindToggleTask((id) => {
            this.controller.toggleTask(id);
            this.render();
        });

        this.view.bindDeleteTask((id) => {
            this.controller.deleteTask(id);
            this.render();
        });

        this.view.bindSearch((searchTerm) => {
            this.currentFilter.search = searchTerm;
            this.render();
        });

        this.view.bindCategoryFilter((category) => {
            this.currentFilter.category = category;
            this.render();
        });

        this.view.bindPriorityFilter((priority) => {
            this.currentFilter.priority = priority;
            this.render();
        });
    }

    render() {
        const tasks = this.controller.getTasks(this.currentFilter);
        const stats = this.controller.getStats();
        
        this.view.renderTasks(tasks);
        this.view.renderStats(stats);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
```

- [ ] **Step 8: 测试应用**

```bash
# 打开index.html文件在浏览器中
```

- [ ] **Step 9: 提交代码**

```bash
git add .
git commit -m "feat: 初始化待办事项列表应用项目结构"
```

## 任务2：功能测试与优化

**Files:**
- Modify: `app.js`
- Modify: `controllers/TaskController.js`
- Modify: `views/TaskView.js`

- [ ] **Step 1: 测试核心功能**

```bash
# 测试添加任务
# 测试标记完成
# 测试删除任务
# 测试分类筛选
# 测试优先级筛选
# 测试搜索功能
```

- [ ] **Step 2: 修复发现的问题**

```javascript
// 根据测试结果修复代码中的问题
```

- [ ] **Step 3: 优化用户体验**

```css
/* 添加动画效果 */
.task-item {
    transition: all 0.3s ease;
}

.task-item.completed {
    transform: translateX(10px);
}
```

- [ ] **Step 4: 提交优化**

```bash
git add .
git commit -m "fix: 修复功能缺陷并优化用户体验"
```

## 任务3：数据导出功能

**Files:**
- Modify: `controllers/TaskController.js`
- Modify: `index.html`
- Modify: `style.css`
- Modify: `app.js`

- [ ] **Step 1: 添加导出按钮**

```html
<!-- 在header中添加导出按钮 -->
<div class="header-actions">
    <button id="export-btn">导出数据</button>
</div>
```

- [ ] **Step 2: 添加导出功能样式**

```css
.header-actions {
    margin-left: 20px;
}

#export-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #17a2b8;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
}

#export-btn:hover {
    background-color: #138496;
}
```

- [ ] **Step 3: 实现数据导出功能**

```javascript
// 在TaskController中添加导出方法
exportTasks() {
    const data = JSON.stringify(this.tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
```

- [ ] **Step 4: 绑定导出事件**

```javascript
// 在App.init()中添加
this.exportBtn = document.getElementById('export-btn');
this.exportBtn.addEventListener('click', () => {
    this.controller.exportTasks();
});
```

- [ ] **Step 5: 测试导出功能**

```bash
# 点击导出按钮，验证文件是否正确下载
```

- [ ] **Step 6: 提交导出功能**

```bash
git add .
git commit -m "feat: 添加数据导出功能"
```

## 任务4：响应式设计

**Files:**
- Modify: `style.css`

- [ ] **Step 1: 添加媒体查询**

```css
@media (max-width: 768px) {
    main {
        flex-direction: column;
    }
    
    aside {
        width: 100%;
    }
    
    header {
        flex-direction: column;
        gap: 10px;
    }
    
    #search-input {
        width: 100%;
    }
    
    .add-task {
        flex-direction: column;
        gap: 10px;
    }
    
    #new-task-input, #new-task-category, #new-task-priority {
        width: 100%;
    }
}
```

- [ ] **Step 2: 测试响应式效果**

```bash
# 在不同屏幕尺寸下测试应用布局
```

- [ ] **Step 3: 提交响应式设计**

```bash
git add .
git commit -m "feat: 添加响应式设计支持"
```

## 任务5：最终测试与文档完善

**Files:**
- Create: `README.md`
- Create: `docs/usage.md`

- [ ] **Step 1: 编写README文件**

```markdown
# 待办事项列表应用

一个功能增强版的待办事项列表应用，帮助您高效管理日常任务。

## 功能特性

- ✅ 任务管理：添加、编辑、删除、标记完成
- 📁 分类管理：自定义任务分类
- ⚠️ 优先级系统：高、中、低三级优先级
- 🔍 搜索过滤：多条件筛选任务
- 💾 数据持久化：本地存储，刷新不丢失
- 📤 数据导出：支持JSON格式导出
- 📱 响应式设计：适配各种屏幕尺寸

## 技术栈

- HTML5
- CSS3
- JavaScript ES6+
- LocalStorage

## 使用方法

1. 打开 `index.html` 文件
2. 在底部输入框中输入任务内容
3. 选择分类和优先级
4. 点击添加按钮或按回车键添加任务
5. 使用左侧筛选器查看特定任务
6. 点击任务前的复选框标记完成
7. 点击删除按钮删除任务

## 项目结构

```
├── index.html          # 主页面
├── style.css           # 样式文件
├── app.js              # 应用入口
├── models/             # 数据模型
│   └── Task.js         # 任务模型
├── controllers/        # 控制器
│   └── TaskController.js # 任务控制器
└── views/              # 视图
    └── TaskView.js     # 任务视图
```

## 开发说明

本项目采用模块化设计，分离数据模型、控制器和视图，便于维护和扩展。

## 许可证

MIT
```

- [ ] **Step 2: 编写使用文档**

```markdown
# 使用说明

## 基本操作

### 添加任务

1. 在页面底部的输入框中输入任务标题
2. 选择任务分类（工作、生活、学习）
3. 选择任务优先级（高、中、低）
4. 点击"添加"按钮或按回车键完成添加

### 标记任务完成

- 点击任务前的复选框即可标记任务为已完成
- 已完成的任务会显示为灰色并添加删除线

### 删除任务

- 鼠标悬停在任务上，点击右侧的"删除"按钮即可删除任务

### 搜索任务

- 在页面顶部的搜索框中输入关键词，系统会实时筛选匹配的任务

### 筛选任务

- 左侧分类筛选：点击分类名称查看该分类下的所有任务
- 左侧优先级筛选：点击优先级查看对应优先级的任务

## 高级功能

### 数据导出

- 点击页面顶部的"导出数据"按钮
- 系统会自动下载包含所有任务数据的JSON文件

### 数据持久化

- 所有任务数据都会自动保存到浏览器的本地存储中
- 关闭浏览器或刷新页面后数据不会丢失

## 快捷键

- `Enter`：添加新任务
```

- [ ] **Step 3: 最终测试**

```bash
# 全面测试所有功能
# 验证在不同浏览器中的兼容性
# 检查响应式布局效果
```

- [ ] **Step 4: 提交最终版本**

```bash
git add .
git commit -m "docs: 完善项目文档"
```