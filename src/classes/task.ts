import TaskInterface  from '../interfaces/taskInterface';

class Task implements TaskInterface {
    id: number;
    name: string;
    imageUrl: string;
    date: string;
    constructor(name: string, imageUrl: string, date: string) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.date = date;
        this.id = this.generateId();

    }
    generateId(): number {
        return Math.floor(Math.random() * 1000000000);
    }
}

export default Task;