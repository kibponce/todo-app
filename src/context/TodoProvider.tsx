import React, { createContext, useState } from "react";
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
  handleAddTodo(text: string): void;
  handleSelectTodo(todo: Todo): void;
  handleRemoveTodo(todo: Todo): void;
  handleAddTodoItems(todoItemText: string): void;
  handleCompleteItem(todoItem: TodoItem): void;
}

export const TodoContext = createContext<iTodoContext>({} as iTodoContext);

export const TodoProvider = ({ children }: Props) => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleAddTodo = (text: string) => {
    const listId = Date.now();
    const todo = { id: listId, text: text, items: [] };

    if (todoLists.length === 0) {
      handleSelectTodo(todo);
    }

    setTodoLists([...todoLists, todo]);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleRemoveTodo = (todo: Todo) => {
    // create a copy and remove
    const filteredTodos = [...todoLists].filter((item) => item.id !== todo.id);

    setTodoLists(filteredTodos);
    setSelectedTodo(filteredTodos[filteredTodos.length - 1]);
  };

  const handleAddTodoItems = (todoItemText: string) => {
    if (selectedTodo) {
      // create a copy
      const todosListsCopy = [...todoLists];
      const todoIndex = todosListsCopy.findIndex(
        (item) => item.id === selectedTodo.id
      );
      const itemId: number = Date.now();

      // push new todo item
      todosListsCopy[todoIndex].items = [
        ...todosListsCopy[todoIndex].items,
        {
          id: itemId,
          text: todoItemText,
          isDone: false,
        },
      ];

      setSelectedTodo(todosListsCopy[todoIndex]);
      setTodoLists(todosListsCopy);
    }
  };

  const handleCompleteItem = (todoItem: TodoItem) => {
    if (selectedTodo) {
      // create a copy
      const todoListsCopy = [...todoLists];
      const todoIndex = todoListsCopy.findIndex(
        (item) => item.id === selectedTodo.id
      );
      // create a copy and get todo items
      const selectedTodoItems = selectedTodo.items;
      // get index
      const todoItemIndex = selectedTodoItems.findIndex(
        (item) => item.id === todoItem.id
      )!;

      // update/replace todo list item
      selectedTodoItems[todoItemIndex] = todoItem;

      // update/repleace todo lists
      todoListsCopy[todoIndex].items = selectedTodoItems;

      setSelectedTodo(todoListsCopy[todoIndex]);
      setTodoLists(todoListsCopy);
    }
  };

  const contextValue: iTodoContext = {
    todoLists,
    selectedTodo,
    handleAddTodo,
    handleSelectTodo,
    handleRemoveTodo,
    handleAddTodoItems,
    handleCompleteItem,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
