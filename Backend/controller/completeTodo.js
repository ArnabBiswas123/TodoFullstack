const Todo = require("../models/TodoModel");
const completeTodo=async(req,res)=>{
    try {

        const{id,iscompleted}=req.body
        if(!id||iscompleted===undefined){
            return res.json({success:false, msg:"send all fields"})
        }
        const completedTodo=await Todo.findByIdAndUpdate(id,{
            iscompleted:iscompleted
        },{
            new:true
        });
        if(!completedTodo){
            return res.json({success:false, msg:'Not valid id'})
        }


        return  res.json({success:true, data:completedTodo});


    } catch (error) {
        console.log(error);
        res.json({success: false, msg:error.message });
    }
}
module.exports=completeTodo