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