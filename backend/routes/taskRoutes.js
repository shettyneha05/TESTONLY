import express from 'express';
import {createTask, getTasks, deleteTask, updateTasks } from '../controllers/taskController.js' ; // we need taskController code
//we need auth.js code
import authMiddleware from '../middleware/auth.js';

const router=express.Router();
router.post('/',authMiddleware,createTask);
router.get('/',authMiddleware,getTasks);
router.put('/:taskId',authMiddleware,updateTasks);
router.delete('/:taskId',authMiddleware,deleteTask);

export default router;
