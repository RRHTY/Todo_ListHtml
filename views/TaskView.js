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