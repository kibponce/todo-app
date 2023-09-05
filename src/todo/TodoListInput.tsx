import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoProvider";
import Button from "../components/Button";

const TodoListInput = () => {
  const { handleAddTodoList } = useContext(TodoContext);
  const [listText, setListText] = useState<string>("");

  const onClickAddTodoList = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleAddTodoList(listText);

    // clear input
    setListText("");
  };

  return (
    <div className="flex mt-2 rounded-md shadow-sm h-12 border border-slate-400">
      <input
        type="text"
        name="price"
        id="price"
        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-90 focus:outline-none"
        placeholder="Add your To Do List"
        value={listText}
        onChange={(e) => setListText(e.target.value)}
      />

      <Button label="ADD" color="blue" onClick={onClickAddTodoList} />
    </div>
  );
};

export default TodoListInput;
