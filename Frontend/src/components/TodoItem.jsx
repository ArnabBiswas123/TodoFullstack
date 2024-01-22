import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { deleteTodos } from "../redux/features/todoSlice";
import { completeTodos } from "../redux/features/todoSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editTodos } from "../redux/features/todoSlice";


const TodoItem = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.items.name);
 const editHandler=()=>{
  if (name.trim().length === 0) {
    return;
  }
  dispatch(editTodos({id:props.items._id, name:name}));
  setEdit(!edit)
 }




  const dispatch = useDispatch();
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      {!edit ? (
        <div className="flex items-center">
          <span className="mr-4 text-black-500">{props.index + 1}.</span>
          <span
            className={`mr-4 ${
              props.items.iscompleted ? "line-through text-black-500" : ""
            }`}
          >
            {props.items.name}
          </span>
        </div>
      ) : (
        <input
          value={name}
          className="flex-grow px-2 py-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={(e)=>{setName(e.target.value)}}
        ></input>
      )}
      <div className="space-x-3 ml-8">
      { !edit? <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => setEdit(!edit)}
        >
          <FiEdit />
        </button>: <button
          className="mr-2 ml-0 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
         onClick={editHandler}
        >
          Edit
        </button>}
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(deleteTodos(props.items._id))}
        >
          <FaTrash />
        </button>
        {!props.items.iscompleted && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() =>
              dispatch(completeTodos({ id: props.items._id, completed: true }))
            }
          >
            <FaCheck />
          </button>
        )}
        {props.items.iscompleted && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() =>
              dispatch(completeTodos({ id: props.items._id, completed: false }))
            }
          >
            <FaTimes />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
