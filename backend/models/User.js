const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{ type:String , required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true},
    role:{ type:String, enum:['admin','employee'], default:'employee'},
    taskCounts: {
                active:    { type: Number, default: 0 },
                newTask:   { type: Number, default: 0 },
                completed: { type: Number, default: 0 },
                failed:    { type: Number, default: 0 }
                },
    tasks:[{ type:mongoose.Schema.Types.ObjectId, ref:'Task'}]
});

module.exports=mongoose.model('User',userSchema);