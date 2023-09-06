import TodoLists from "./TodoLists";
import TodoInput from "./TodoInput";

function Todo() {
  return (
    <div className="h-full m-auto w-1/2 p-8 border-2 border-slate-50 bg-white rounded-md drop-shadow-xl">
      <h1 className="text-3xl font-bold ">To Do App</h1>
      <div className="mt-6">
        {/* TO DO ADD INPUT */}
        <TodoInput />
        {/* TO DO LIST */}
        <TodoLists />
      </div>
    </div>
  );
}

export default Todo;
