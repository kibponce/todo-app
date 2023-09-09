import { useContext, useState, ChangeEvent, KeyboardEvent } from "react";
import { TodoContext } from "../context/TodoProvider";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";

const TodoInput = () => {
  const { handleAddTodo } = useContext(TodoContext);
  const [todoText, setTodoText] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const onClickAddTodoList = () => {
    if (todoText.length > 0) {
      handleAddTodo(todoText);
    } else {
      setIsError(true);
    }

    // clear input
    setTodoText("");
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setTodoText(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickAddTodoList();
    }
  };

  return (
    <div>
      <div
        className={`flex mt-2 rounded-md shadow-sm h-12 border  ${
          isError ? "border-red-400" : "border-slate-400"
        }`}
      >
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0py-1.5 pl-4 pr-20 text-gray-90 focus:outline-none"
          placeholder="Add Task"
          value={todoText}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />

        <Button
          label={
            <div className="flex items-center">
              <PlusCircleIcon className="w-6 mr-2" />
              <p>Add</p>
            </div>
          }
          color="blue"
          onClick={onClickAddTodoList}
        />
      </div>
      {isError && (
        <p className="text-sm mt-2 text-red-600">Input should not be empty</p>
      )}
    </div>
  );
};

export default TodoInput;
