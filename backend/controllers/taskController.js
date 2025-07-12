import Task from '../models/Task.js';

export const getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find().populate('assignedTo','name email');
        res.json(tasks);
    }catch(err){
        res.status(500).json({message:'Server error'});
    }
};

export const createTask=async(req,res)=>{
    const { taskTitle, taskDescription, taskDate, category, assignedTo }=req.body;
    try{
        const newTask=new Task({ taskTitle, taskDescription, taskDate, category, assignedTo});
        await newTask.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({message:'Server error'});
    }
};

export const updateTasks=async(req,res)=>{
    const {taskId}=req.params;
    const {status}=req.body;
    try{
        const task=await Task.findByIdAndUpdate(taskId, {status}, {new:true});
        res.json(task);
    }catch(err){
        res.status(500).json({message:'Server error'});
    }
};

export const deleteTask=async(req,res)=>{
    const {taskId}=req.params;
    try{
        await Task.findByIdAndUpdate(taskId);
        res.json({message:'Task deleted'});
    }catch(err){
        req.status(500).json({message:'Server error'});
    }
};