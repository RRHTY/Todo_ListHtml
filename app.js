// app.js
// 先加载模块
const script1 = document.createElement('script');
script1.src = './models/Task.js';
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.src = './controllers/TaskController.js';
document.head.appendChild(script2);

const script3 = document.createElement('script');
script3.src = './views/TaskView.js';
document.head.appendChild(script3);

// 等待模块加载完成
script3.onload = function() {
    // 定义应用类
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

            // 绑定导出按钮事件
            const exportBtn = document.getElementById('export-btn');
            exportBtn.addEventListener('click', () => {
                this.controller.exportTasks();
            });
        }

        render() {
            const tasks = this.controller.getTasks(this.currentFilter);
            const stats = this.controller.getStats();
            
            this.view.renderTasks(tasks);
            this.view.renderStats(stats);
        }
    }

    // 初始化应用
    const app = new App();
    app.init();
};