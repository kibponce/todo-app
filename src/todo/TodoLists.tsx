import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconButton from "../components/IconButton";
import List from "./Lists";

const TodoLists = () => {
  const { todoLists } = useContext(TodoContext);

  return (
    <div className="flex mt-6">
      <div className="w-2/5 pr-6">
        <List />
      </div>
      <div className="w-3/5">
        <div className="flex mt-2 rounded-md shadow-sm h-12 border border-slate-400">
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-90 focus:outline-none"
            placeholder="Add Items"
          />
          <IconButton icon={<PlusIcon className="text-blue-600 w-6" />} />
        </div>
        <div className="mt-4">
          <ul className="rounded-md divide-y divide-slate-400 border border-slate-400">
            <li className="flex p-4">
              <input type="checkbox" />
              <p className="ml-4">Test</p>
            </li>
            <li className="flex p-4">
              <input type="checkbox" />
              <p className="ml-4 line-through">Test</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoLists;
