import { TodoItem } from "../context/TodoProvider";

const ListItemsRemaining = ({ items }: { items: TodoItem[] }) => {
  const remaining = items.length - items.filter((item) => item.isDone).length;

  return (
    <div className="text-sm mt-4 text-right">
      <label className="mr-2">{remaining}</label>
      <label>item(s) left</label>
    </div>
  );
};

export default ListItemsRemaining;
