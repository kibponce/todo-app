import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";
import Lists from "./Lists";
import ListItems from "./ListItems";

const TodoLists = () => {
  const { selectedTodo } = useContext(TodoContext);

  return (
    <div className="flex mt-6">
      <div className="w-2/5 pr-6">
        <Lists />
      </div>
      <div className="w-3/5">{selectedTodo && <ListItems />}</div>
    </div>
  );
};

export default TodoLists;
