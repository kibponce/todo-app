import { useContext, useState, ChangeEvent, KeyboardEvent } from "react";
import { TodoContext } from "../context/TodoProvider";
import Input from "../components/Input";

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
    <Input
      type="text"
      name="price"
      id="price"
      placeholder="Add Task"
      inputSize="lg"
      value={todoText}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      isError={isError}
      errorMessage="Input should not be empty"
    />
  );
};

export default TodoInput;
