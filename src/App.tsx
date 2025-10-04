import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { PostForm } from './PostForm';
import { Todo } from './types/Todo';
import { User } from './types/User';

// Підготовка початкових TODO
const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

// Надійне визначення нового ID
function getNewTodoId(todos: Todo[]) {
  const maxId = todos.length > 0
    ? Math.max(...todos.map(todo => todo.id))
    : 0;

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [users] = useState<User[]>(usersFromServer);

  const handleAddTodo = ({ title, userId }: { title: string; userId: number }) => {
    const user = getUserById(userId);

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm users={users} onSubmit={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
