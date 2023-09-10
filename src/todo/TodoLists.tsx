import Lists from "./Lists";
import ListItems from "./ListItems";

const TodoLists = () => {
  return (
    <div className="lg:flex mt-6">
      {/* Left Side - Todo Lists */}
      <Lists />
      {/* Right side - List Items and Input */}
      <ListItems />
    </div>
  );
};

export default TodoLists;
