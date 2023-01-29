import  Task from  './task' ;
import streakCounterInterface from '../interfaces/streakCounterInterface';

class  StreakCounter  implements  streakCounterInterface {
    tasks: Task[];
    constructor() {
        this.tasks = [];
    }
}

export default StreakCounter;