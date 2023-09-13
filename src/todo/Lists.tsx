import { useContext, MouseEvent } from "react";
import { TodoContext, Todo, TodoItem } from "../context/TodoProvider";
import Button from "../components/Button";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Lists = () => {
  const { todoLists, activeTodoId, handleSelectTodo, handleRemoveTodo } =
    useContext(TodoContext);

  const onPressTodo = (todo: Todo) => {
    handleSelectTodo(todo.id);
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
    <ul className="w-full lg:w-2/5 lg:pr-6">
      {todoLists.map((todo, index) => (
        <li
          key={index}
          className={`flex justify-between items-center py-4 my-2 px-2 rounded-md cursor-pointer ${
            activeTodoId === todo.id && `bg-blue-100`
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
            <Button
              label={<TrashIcon className="text-red-600 w-5" />}
              onClick={(e) => onPressRemoveTodo(e, todo)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Lists;
