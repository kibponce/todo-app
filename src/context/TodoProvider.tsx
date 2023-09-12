import React, { createContext, useState } from "react";
import { deepClone } from "../helpers/utils";
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
    // create a deep copy and remove
    const filteredTodos = [...todoLists].filter((item) => item.id !== todo.id);

    setTodoLists(filteredTodos);
    setSelectedTodo(filteredTodos[filteredTodos.length - 1]);
  };

  const handleAddTodoItems = (todoItemText: string) => {
    if (selectedTodo) {
      const todoIndex = todoLists.findIndex(
        (item) => item.id === selectedTodo.id
      );

      const itemId: number = Date.now();
      // create a deep copy
      let todos = deepClone(todoLists);

      // push new todo item
      todos[todoIndex].items.push({
        id: itemId,
        text: todoItemText,
        isDone: false,
      });

      setSelectedTodo(todos[todoIndex]);
      setTodoLists(todos);
    }
  };

  const handleCompleteItem = (todoItem: TodoItem) => {
    if (selectedTodo) {
      const todoIndex = todoLists.findIndex(
        (item) => item.id === selectedTodo.id
      );

      // create a shallow copy
      let todos: Todo[] = deepClone(todoLists);

      // create a deep clone copy and get todo items
      let selectedTodoItems: TodoItem[] = deepClone({ ...selectedTodo }).items;

      // update item
      const todoItemIndex = selectedTodoItems.findIndex(
        (item) => item.id === todoItem.id
      )!;

      // update/repleace todo list items
      selectedTodoItems[todoItemIndex] = todoItem;

      // update/repleace todo lists
      todos[todoIndex].items = selectedTodoItems;

      setSelectedTodo(todos[todoIndex]);
      setTodoLists(todos);
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
