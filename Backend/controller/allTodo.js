const Todo = require("../models/TodoModel");
const allTodo = async (req, res) => {
  try {
    const alltodo = await Todo.find({});
    return res.json({ success: true, data: alltodo });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg:error.message });
  }
};
module.exports = allTodo;
