import { useState, useMemo, KeyboardEvent, ChangeEvent } from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";
import ListItemsRemaining from "./ListItemsRemaining";
import ListItemLists from "./ListItemLists";
import Input from "../components/Input";

const ListItems = () => {
  const { todoLists, activeTodoId, handleAddTodoItems } =
    useContext(TodoContext);
  const [listItemText, setListItemText] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const activeTodo = useMemo(
    () => todoLists.find((item) => item.id === activeTodoId),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTodoId]
  );

  const onAddTodoListItem = () => {
    if (listItemText.length > 0) {
      handleAddTodoItems(listItemText);
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

  return (
    <div className="w-full mt-8 lg:w-3/5 lg:mt-0">
      {activeTodo && (
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
      )}
      {activeTodo && activeTodo.items.length > 0 && (
        <>
          <ListItemsRemaining items={activeTodo.items} />
          <ListItemLists items={activeTodo.items} />
        </>
      )}
    </div>
  );
};

export default ListItems;
