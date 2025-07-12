const express=require('express');
const {createTask, getTasks, updateTask, deleteTask }=require('../controllers/taskController'); // we need taskController code
const authMiddleware=require('../middleware/auth'); //we need auth.js code

const router=express.Router();
router.post('/',authMiddleware,createTask);
router.get('/',authMiddleware,getTasks);
router.put('/:taskId',authMiddleware,updateTask);
router.delete('/:taskId',authMiddleware,deleteTask);

module.exports=router;
