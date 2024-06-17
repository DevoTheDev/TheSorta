"use client"
import { useAPI } from "@/app/contexts/useAPI";
import * as React from 'react';
import useAPIController from "@/app/controllers/apiController";
import TodoCard from "@/app/components/todos/todo-card";

interface ToDo {
    id: string;
    todo: string;
  }
  
  const Todos: React.FC = () => {
    const { baseUrl } = useAPI();
    const todosUrl = `${baseUrl}/api/todos`;
  
    const [todos, setTodos] = React.useState<ToDo[]>([]);
    const [newTodo, setNewTodo] = React.useState<string>('');
  
    const { Get, Post, Delete } = useAPIController();

    const handleNewTodo = async () => {
      try {
        const res = await Post({ url: todosUrl, body: { todo: newTodo } });
        setTodos([...todos, res]);
        setNewTodo('');
      } catch (error) {
        console.error('Error creating new todo:', error);
      }
    };
  
    const handleDelete = async (id: string) => {
      try {
        await Delete({ url: `${todosUrl}/${id}` });
        setTodos(todos.filter(todo => todo.id !== id)); // Remove deleted todo from todos state
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
  
    return (
      <div
        style={{
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}
      >
        <div
        style={{
            display: 'flex',
        }}
        className="header">
        <p>Dashboard</p>
        <h1
            style={{
                fontSize: '3rem',
                backgroundColor: 'lightblue',
                color: 'darkblue',
                fontWeight: 'bolder',
                fontStyle: 'initial',
                textDecoration: 'underline',
                display: 'flex',
                width: '100%',
                padding: '1rem 2rem',
            }}
            >
                {"To Do App"}
            </h1>
            </div>
              <div
              style={{
                backgroundColor: 'pink',
                display: 'flex',
                justifyContent: 'space-around',
                width: '30rem',
                alignSelf: 'center',
              }}
              >
              <input
              style={{
                padding: '1rem 2rem',
                alignSelf: 'center',
                width: '100%',
              }}
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
              />
              <div
              style={{
                padding: '1rem 2rem'
              }}
              onClick={handleNewTodo}
              >
                Add
              </div>
            </div>
            <h1
            style={{
                padding: '1rem 2rem',
                backgroundColor: 'lavender',
                fontSize: '2rem',
                fontWeight: 'bold',
            }}
            >
                To Dos :
            </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
          className="todos"
        >
          {todos.map((todo: ToDo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              todo={todo.todo}
              handleDelete={() => handleDelete(todo.id)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Todos;