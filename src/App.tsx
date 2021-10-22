import React, { MouseEvent, useEffect, useState } from 'react';
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from '@mui/icons-material';
import {
  Button,
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { db } from './firebase';

export const App = () => {
  const [todos, setTodos] = useState<{ id: any; title: any; timestamp: any }[]>(
    []
  );
  const [input, setInput] = useState('');

  useEffect(() => {
    db.ref('todos').on('value', (snapshot) => {
      const docs = snapshot.val();
      const data = docs
        ? Object.keys(docs).map((key) => ({
            id: key,
            title: docs[key].title,
            timestamp: docs[key].timestamp,
          }))
        : [];
      setTodos(data);
    });
  }, []);

  const addTodo = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    db.ref('todos').push({
      title: input,
      timestamp: new Date().getTime(),
    });
    setInput('');
  };

  const deleteTodo = (id: any) => {
    db.ref('todos').child(id).remove();
  };

  return (
    <Container maxWidth="sm">
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addTodo}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add ToDo
        </Button>
      </form>
      <List dense>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} secondary={todo.timestamp} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Edit" onClick={() => {}}>
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="Delete"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
