const Todo = require("../models/TodoModel");
const editTodo=async(req,res)=>{
    try {
        const{id,name}=req.body
        if(!id||!name){
            return res.json({success:false, msg:'send all the fields'})
        }
        const editTodo=await Todo.findByIdAndUpdate(id,{
            name:name
        },
        {new:true})

        if(!editTodo){
            return res.json({success:false, msg:'Not valid id'})
        }

      return  res.json({success:true, data:editTodo});
    

    } catch (error) {
        console.log(error);
        res.json({ success: false, msg:error.message});
    }
}
module.exports=editTodo