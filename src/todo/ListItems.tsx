import { useState, KeyboardEvent, ChangeEvent } from "react";
import { useContext } from "react";
import { TodoContext, TodoItem } from "../context/TodoProvider";
import { PlusIcon } from "@heroicons/react/24/outline";
import IconButton from "../components/IconButton";

const ListItems = () => {
  const { selectedTodo, handleAddTodoItems, handleCompleteItem } =
    useContext(TodoContext);
  const [listItemText, setListItemText] = useState<string>("");

  const onAddTodoListItem = () => {
    handleAddTodoItems(listItemText);

    // clear input
    setListItemText("");
  };

  const onItemCheck = (
    e: ChangeEvent<HTMLInputElement>,
    todoItem: TodoItem
  ) => {
    let newItem: TodoItem = { ...todoItem };
    newItem.isDone = e.target.checked;

    handleCompleteItem(newItem);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddTodoListItem();
    }
  };

  return (
    <>
      <div className="flex mt-2 rounded-md shadow-sm h-12 border border-slate-400">
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-90 focus:outline-none"
          placeholder="Add Items"
          value={listItemText}
          onChange={(e) => setListItemText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <IconButton
          icon={<PlusIcon className="text-blue-600 w-6 mr-2" />}
          onClick={onAddTodoListItem}
        />
      </div>
      <div className="mt-4">
        {selectedTodo && selectedTodo.items.length > 0 && (
          <ul className="rounded-md divide-y divide-slate-400 border border-slate-400">
            {selectedTodo.items.map((item, index) => (
              <li key={index} className="flex p-4">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={(e) => onItemCheck(e, item)}
                  checked={item.isDone}
                />
                <p className={`ml-4 ${item.isDone && "line-through italic"}`}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ListItems;
