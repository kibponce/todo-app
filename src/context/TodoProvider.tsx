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
  activeTodoId: number;
  handleAddTodo(text: string): void;
  handleSelectTodo(id: number): void;
  handleRemoveTodo(todo: Todo): void;
  handleAddTodoItems(todoItemText: string): void;
  handleCompleteItem(todoItem: TodoItem): void;
}

export const TodoContext = createContext<iTodoContext>({} as iTodoContext);

export const TodoProvider = ({ children }: Props) => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [activeTodoId, setActiveTodoId] = useState<number>(0); // 0 == empty

  const handleAddTodo = (text: string) => {
    const listId = Date.now();
    const todo = { id: listId, text: text, items: [] };

    if (todoLists.length === 0) {
      handleSelectTodo(listId);
    }

    setTodoLists([...todoLists, todo]);
  };

  const handleSelectTodo = (id: number) => {
    setActiveTodoId(id);
  };

  const handleRemoveTodo = (todo: Todo) => {
    // create a copy and remove
    const filteredTodos = [...todoLists].filter((item) => item.id !== todo.id);

    // update the lists
    setTodoLists(filteredTodos);

    // if the deleted item is the active item
    if (todo.id === activeTodoId) {
      // get the index of the to be deleted todo
      const deletedTodoIndex = todoLists.findIndex(
        (item) => item.id === todo.id
      );
      // if no todo on the lists, set active id to empty
      // else, set to active index
      // default id: 0 (empty)
      setActiveTodoId(
        filteredTodos.length > 0 ? filteredTodos[deletedTodoIndex]?.id || 0 : 0
      );
    }
  };

  const handleAddTodoItems = (todoItemText: string) => {
    // create a copy
    const todosListsCopy = [...todoLists];
    const todoIndex = todosListsCopy.findIndex(
      (item) => item.id === activeTodoId
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

    setTodoLists(todosListsCopy);
  };

  const handleCompleteItem = (todoItem: TodoItem) => {
    // create a copy
    const todoListsCopy = [...todoLists];
    const todoIndex = todoListsCopy.findIndex(
      (item) => item.id === activeTodoId
    );

    // create a copy and get todo items
    const selectedTodoItems = [...todoListsCopy[todoIndex].items];

    // get index
    const todoItemIndex = selectedTodoItems.findIndex(
      (item) => item.id === todoItem.id
    )!;

    // update/replace todo list item
    selectedTodoItems[todoItemIndex] = todoItem;

    // update/repleace todo lists
    todoListsCopy[todoIndex].items = selectedTodoItems;

    setTodoLists(todoListsCopy);
  };

  const contextValue: iTodoContext = {
    todoLists,
    activeTodoId,
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
