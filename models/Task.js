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