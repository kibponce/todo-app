import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface Todo {
  id: number | string;
  text: string;
}

interface iTodoContext {
  todoLists: Todo[];
  selectedTodo: Todo | null;
  handleAddTodo(text: string): void;
  handleSelectTodo(todo: Todo): void;
}

export const TodoContext = createContext<iTodoContext>({
  // default values
  todoLists: [],
  selectedTodo: null,
  handleAddTodo: (text: string) => {},
  handleSelectTodo: (todo: Todo) => {},
});

export const TodoProvider = ({ children }: Props) => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleAddTodo = (text: string) => {
    const listId: number = Date.now();
    setTodoLists([...todoLists, { id: listId, text: text }]);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const contextValue = {
    todoLists,
    selectedTodo,
    handleAddTodo,
    handleSelectTodo,
  } as iTodoContext;

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
