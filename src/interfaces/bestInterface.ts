import Task  from "../classes/task";
import streakCounter from "../classes/streakCounter";



/**
 * @interface BestInterface
 * @property {streakCounter} streakCounter - streakCounter object
 * @method getBest - returns the best task
 * 
 */
interface BestInterface {
    streakCounter: streakCounter;
    getBest(): Task;
}

export default BestInterface;