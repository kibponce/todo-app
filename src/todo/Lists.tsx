import { useContext } from "react";
import { TodoContext, Todo } from "../context/TodoProvider";
import IconButton from "../components/IconButton";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const Lists = () => {
  const { todoLists, selectedTodo, handleSelectTodo } = useContext(TodoContext);

  const onPressTodo = (todo: Todo) => {
    handleSelectTodo(todo);
  };

  return (
    <ul>
      {todoLists.map((todo) => (
        <li
          className={`flex justify-between items-center py-4 my-2 px-2 rounded-md ${
            selectedTodo?.id === todo.id && `bg-blue-100`
          } hover:bg-blue-100`}
          onClick={() => onPressTodo(todo)}
        >
          <div>
            <p>{todo.text}</p>
          </div>
          <IconButton icon={<TrashIcon className="text-red-600 w-6" />} />
        </li>
      ))}
    </ul>
  );
};

export default Lists;
