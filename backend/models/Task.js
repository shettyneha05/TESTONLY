import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    taskTitle:{ type:String, required:true},
    taskDescription:{ type:String},
    taskDate:{ type:String }, //can keep type:Date na?
    category:{ type:String},
    status: {
             type: String,
             enum: ['newTask', 'active', 'completed', 'failed'],
             default: 'newTask'
            },
    assignedTo:{ type:mongoose.Schema.Types.ObjectId, required:true, ref:'User' },
});

const taskModel=mongoose.model('Task',taskSchema);
export default taskModel;