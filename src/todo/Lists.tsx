import { useContext, MouseEvent } from "react";
import { TodoContext, Todo } from "../context/TodoProvider";
import IconButton from "../components/IconButton";
import { TrashIcon } from "@heroicons/react/24/outline";

const Lists = () => {
  const { todoLists, selectedTodo, handleSelectTodo, handleRemoveTodo } =
    useContext(TodoContext);

  const onPressTodo = (todo: Todo) => {
    handleSelectTodo(todo);
  };

  const onPressRemoveTodo = (e: MouseEvent<HTMLButtonElement>, todo: Todo) => {
    e.stopPropagation();
    handleRemoveTodo(todo);
  };

  return (
    <ul>
      {todoLists.map((todo, index) => (
        <li
          key={index}
          className={`flex justify-between items-center py-4 my-2 px-2 rounded-md cursor-pointer ${
            selectedTodo?.id === todo.id && `bg-blue-100`
          } hover:bg-blue-100`}
          onClick={(e) => onPressTodo(todo)}
        >
          <div>
            <p>{todo.text}</p>
          </div>
          <div className="flex">
            <p className="mr-2">{`${
              todo.items.filter((item) => item.isDone).length
            }/${todo.items.length}`}</p>
            <IconButton
              icon={<TrashIcon className="text-red-600 w-6" />}
              onClick={(e) => onPressRemoveTodo(e, todo)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Lists;
