import express from 'express';
import { newTask ,mytask, updatetask, deletetask} from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post('/new', isAuthenticated, newTask);
router.get('/mytask', isAuthenticated, mytask);

router.route('/:id').put(isAuthenticated,updatetask).delete(isAuthenticated,deletetask )

export default router;

