import { useState, KeyboardEvent, ChangeEvent } from "react";
import { useContext } from "react";
import { TodoContext, TodoItem } from "../context/TodoProvider";
import Input from "../components/Input";

const ListItems = () => {
  const { selectedTodo, handleAddTodoItems, handleCompleteItem } =
    useContext(TodoContext);
  const [listItemText, setListItemText] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const onAddTodoListItem = () => {
    if (listItemText.length > 0) {
      handleAddTodoItems(listItemText);
    } else {
      setIsError(true);
    }

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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setListItemText(e.target.value);
  };

  const ItemsRemaining = ({ data }: { data: TodoItem[] }) => {
    const remaining = data.length - data.filter((item) => item.isDone).length;

    return (
      <div className="text-sm mt-4 text-right">
        <label className="mr-2">{remaining}</label>
        <label>item(s) left</label>
      </div>
    );
  };

  return (
    selectedTodo && (
      <div className="w-full mt-8 lg:w-3/5 lg:mt-0">
        <Input
          type="text"
          name="price"
          id="price"
          inputSize="md"
          placeholder="Add Items"
          value={listItemText}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          isError={isError}
          errorMessage="Input should not be empty"
        />
        {selectedTodo && selectedTodo.items.length > 0 && (
          <ItemsRemaining data={selectedTodo.items} />
        )}

        <div className="mt-2">
          {selectedTodo && selectedTodo.items.length > 0 && (
            <ul className="rounded-md divide-y divide-slate-400 border border-slate-400">
              {selectedTodo.items.map((item, index) => (
                <li
                  key={index}
                  className={`flex p-4 first:rounded-md first:rounded-t-md last:rounded-b-md ${
                    item.isDone && "bg-slate-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={(e) => onItemCheck(e, item)}
                    checked={item.isDone}
                  />
                  <p
                    className={`ml-4 ${
                      item.isDone && "line-through italic text-slate-600"
                    }`}
                  >
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  );
};

export default ListItems;
