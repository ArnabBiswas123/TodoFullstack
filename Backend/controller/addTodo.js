const Todo = require("../models/TodoModel");
const addTodo = async (req, res) => {
  try {
    const { name, iscompleted } = req.body;
    if (!name || iscompleted===undefined) {
      return res.json({ success: false, msg: "send all fields" });
    }
    const todoexists = await Todo.findOne({ name: name });

    if (todoexists) {
      return res.json({ success: false, msg: "This todo allready exists" });
    }
   const newtodo= await Todo.create({
      name,
      iscompleted,
    });
    return res.json({ success: true, data:newtodo});
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg:error.message });
  }
};
module.exports = addTodo;
