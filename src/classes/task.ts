import TaskInterface  from '../interfaces/taskInterface';



/**
 * Class representing a task
 * @class Task
 * @implements {TaskInterface}
 * @param {string} name - name of the task
 * @param {string} imageUrl - url of the image
 * @param {string} date - date of the task
 * @param {number} id - id of the task
 * @method generateId - generates a random id for the task
 * 
 */
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