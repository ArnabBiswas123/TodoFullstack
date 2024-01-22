const Todo = require("../models/TodoModel");
const deleteTodo=async (req,res)=>{
        try {
       
            if(req.params.id===undefined){
                return res.json({success:false, msg:"send id"})
            }
           const deletetodo=await Todo.findByIdAndDelete(req.params.id);
        if(!deletetodo){
            return res.json({success:false, msg:'Not valid id'})
        }

            return res.json({success:true, data:deletetodo})
        } catch (error) {
            console.log(error);
            res.json({ success: false, msg:error.message });
        }
}
module.exports=deleteTodo