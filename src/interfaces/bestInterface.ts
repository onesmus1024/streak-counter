import Task  from "../classes/task";
import streakCounter from "../classes/streakCounter";
interface BestInterface {
    streakCounter: streakCounter;
    getBest(): Task;
}

export default BestInterface;