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