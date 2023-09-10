import React, { createContext, useState, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

export interface Todo {
  id: number;
  text: string;
  items: TodoItem[];
}

export interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
}

interface iTodoContext {
  todoLists: Todo[];
  selectedTodo: Todo | null;
  handleAddTodo?(text: string): void;
  handleSelectTodo?(todo: Todo): void;
  handleRemoveTodo?(todo: Todo): void;
  handleAddTodoItems?(todoItemText: string): void;
  handleCompleteItem?(todoItem: TodoItem): void;
}

export const TodoContext = createContext<iTodoContext>({
  // default values
  todoLists: [],
  selectedTodo: null,
});

export const TodoProvider = ({ children }: Props) => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleAddTodo = (text: string) => {
    const listId: number = Date.now();
    const todoList = { id: listId, text: text, items: [] } as Todo;

    if (todoLists.length === 0) {
      setSelectedTodo(todoList);
    }

    setTodoLists([...todoLists, todoList]);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleRemoveTodo = (todo: Todo) => {
    const filteredTodos = [...todoLists].filter((item) => item.id !== todo.id);

    setTodoLists([...filteredTodos]);
    setSelectedTodo(filteredTodos[filteredTodos.length - 1]);
  };

  const handleAddTodoItems = useCallback(
    (todoItemText: string) => {
      if (selectedTodo) {
        const todoIndex = todoLists.findIndex(
          (item) => item.id === selectedTodo.id
        );

        const itemId: number = Date.now();
        // create a deep copy
        let todos = [...todoLists];

        // update array value using index
        todos[todoIndex].items = [
          ...todos[todoIndex].items,
          { id: itemId, text: todoItemText, isDone: false },
        ];

        setTodoLists(todos);
      }
    },
    [selectedTodo, todoLists]
  );

  const handleCompleteItem = useCallback(
    (todoItem: TodoItem) => {
      if (selectedTodo) {
        const todoIndex = todoLists.findIndex(
          (item) => item.id === selectedTodo.id
        );

        // create a deep copy
        let todos = [...todoLists];

        // get todo items
        let selectedTodoItems = { ...selectedTodo }.items;
        // update item
        const todoItemIndex = selectedTodoItems.findIndex(
          (item) => item.id === todoItem.id
        )!;

        // override todo items
        selectedTodoItems[todoItemIndex] = todoItem;
        todos[todoIndex].items = [...selectedTodoItems];

        setTodoLists(todos);
      }
    },
    [selectedTodo, todoLists]
  );

  const contextValue = {
    todoLists,
    selectedTodo,
    handleAddTodo,
    handleSelectTodo,
    handleRemoveTodo,
    handleAddTodoItems,
    handleCompleteItem,
  } as iTodoContext;

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
