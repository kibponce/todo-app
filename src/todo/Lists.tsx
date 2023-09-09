import { useContext, MouseEvent } from "react";
import { TodoContext, Todo, TodoItem } from "../context/TodoProvider";
import IconButton from "../components/IconButton";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

  const checkIsDone = (data: TodoItem[]) => {
    return data.length !== 0
      ? data.length === data.filter((item) => item.isDone).length
      : false;
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
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex items-center">
                {!!checkIsDone(todo.items) && (
                  <CheckIcon className="text-green-600 w-5 mr-2" />
                )}
                {!checkIsDone(todo.items) && (
                  <XMarkIcon className="text-red-600 w-5 mr-2" />
                )}
              </div>
              <p>{todo.text}</p>
            </div>
          </div>
          <div className="flex items-center">
            <IconButton
              icon={<TrashIcon className="text-red-600 w-5" />}
              onClick={(e) => onPressRemoveTodo(e, todo)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Lists;
