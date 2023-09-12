import { useState, KeyboardEvent, ChangeEvent } from "react";
import { useContext } from "react";
import { TodoContext, TodoItem } from "../context/TodoProvider";
import ListItemLists from "./ListItemLists";
import Input from "../components/Input";

const ListItems = () => {
  const { selectedTodo, handleAddTodoItems } = useContext(TodoContext);
  const [listItemText, setListItemText] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const onAddTodoListItem = () => {
    if (listItemText.length > 0) {
      handleAddTodoItems && handleAddTodoItems(listItemText);
    } else {
      setIsError(true);
    }

    // clear input
    setListItemText("");
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

  const ItemsRemaining = ({ items }: { items: TodoItem[] }) => {
    const remaining = items.length - items.filter((item) => item.isDone).length;

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
          <ItemsRemaining items={selectedTodo.items} />
        )}

        {selectedTodo && <ListItemLists items={selectedTodo.items} />}
      </div>
    )
  );
};

export default ListItems;
