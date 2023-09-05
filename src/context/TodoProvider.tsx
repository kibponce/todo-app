import React, { ReactNode, createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface ITodoList {
  id: number | string;
  text: string;
}

interface ITodoContext {
  todoList: ITodoList[];
  handleAddTodoList: (text: string) => void;
}

export const TodoContext = createContext<ITodoContext>({
  todoList: [],
  handleAddTodoList: (text: string) => {},
});

export const TodoProvider = ({ children }: Props) => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);

  const handleAddTodoList = (text: string) => {
    const listId: number = Date.now();
    setTodoList([...todoList, { id: listId, text: text }]);
  };

  const contextValue = {
    todoList,
    handleAddTodoList,
  } as ITodoContext;

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
