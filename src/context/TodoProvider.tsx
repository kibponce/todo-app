import React, { ReactNode, createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface TodoList {
  id: number | string;
  text: string;
}

interface TodoContext {
  todoList: TodoList[];
  handleAddTodoList(text: string): void;
}

export const TodoContext = createContext<TodoContext>({
  todoList: [],
  handleAddTodoList: (text: string) => {},
});

export const TodoProvider = ({ children }: Props) => {
  const [todoList, setTodoList] = useState<TodoList[]>([]);

  const handleAddTodoList = (text: string) => {
    const listId: number = Date.now();
    setTodoList([...todoList, { id: listId, text: text }]);
  };

  const contextValue = {
    todoList,
    handleAddTodoList,
  } as TodoContext;

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
