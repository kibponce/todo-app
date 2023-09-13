import { useContext, ChangeEvent } from "react";
import { TodoContext, TodoItem } from "../context/TodoProvider";

const ListItemLists = ({ items }: { items: TodoItem[] }) => {
  const { handleCompleteItem } = useContext(TodoContext);

  const onItemCheck = (
    e: ChangeEvent<HTMLInputElement>,
    todoItem: TodoItem
  ) => {
    const newItem: TodoItem = { ...todoItem };
    newItem.isDone = e.target.checked;

    handleCompleteItem(newItem);
  };

  return (
    <div className="mt-2">
      <ul className="rounded-md divide-y divide-slate-400 border border-slate-400">
        {items.map((item) => (
          <li
            key={item.id}
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
    </div>
  );
};

export default ListItemLists;
