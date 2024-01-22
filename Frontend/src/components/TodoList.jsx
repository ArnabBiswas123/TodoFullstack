import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      {props.data.length !== 0
        ? props.data.map((item, index) => {
            return (
              <TodoItem key={item._id} index={index} items={item}></TodoItem>
            );
          })
        : ""}
    </ul>
  );
}
