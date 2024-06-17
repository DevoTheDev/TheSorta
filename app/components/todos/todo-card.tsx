import useAPIController from "@/app/controllers/apiController";
import { useAPI } from "@/app/contexts/useAPI";
import * as React from 'react';

interface TodoCardProps {
    todo?: string;
    id?: string;
    handleDelete?: () => void;
  }
  
  const TodoCard: React.FC<TodoCardProps> = ({
    todo,
    id,
    handleDelete
  }) => {
  
    const { baseUrl } = useAPI(); 
  
    const url = (id?: string) => {
      return `${baseUrl}/api/todos${id ? `/${id}` : ''}`;
    };
  
    const {
      Put,
      Delete
    } = useAPIController();
  
    const [activeTodo, setActiveTodo] = React.useState<string>(todo || '');
    const [todoEditing, setTodoEditing] = React.useState(false);
    const [draft, setDraft] = React.useState<string>(todo || '');
    const [bgCol, setBGCol] = React.useState<string>('red');
  
    const handleBlur = () => {
      setTodoEditing(false);
      setActiveTodo(draft);
      setBGCol('red');
      Put({ url: url(id), body: { 'todo': draft } });
    };
  
    const handleFocus = () => {
      setBGCol('blue');
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraft(e.target.value);
    };
  
    const todoStyles: React.CSSProperties = {
      backgroundColor: 'black',
      color: 'cyan',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      width: '16rem'
    };
  
    const handleDeleteClick = () => {
      if (handleDelete) {
        handleDelete();
      }
    };
  
    return (
      <div onDoubleClick={handleDeleteClick}>
        {!todoEditing && (
          <div
            style={todoStyles}
            className="todo-card"
            onClick={() => setTodoEditing(true)}
          >
            {activeTodo}
          </div>
        )}
        {todoEditing && (
          <input
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={draft}
            onChange={handleChange}
            style={todoStyles}
          />
        )}
      </div>
    );
  };
  
  export default TodoCard;