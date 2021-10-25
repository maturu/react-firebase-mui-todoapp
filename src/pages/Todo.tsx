import React, { MouseEvent, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from '@mui/icons-material';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { auth, db } from '../firebase';

type TodoData = { id: any; title: any; timestamp: any };
type TodoDataArray = TodoData[];

export const Todo = withRouter((props) => {
  const [todos, setTodos] = useState<TodoDataArray>([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');
  const [toUpdateId, setToUpdateId] = useState('');

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

  const openUpdateDialog = (todo: TodoData) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.title);
  };

  const editTodo = () => {
    db.ref('todos').child(toUpdateId).update({
      title: update,
    });
    setOpen(false);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      props.history.push('/signin');
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => openUpdateDialog(todo)}
              >
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
      <Button
        type="button"
        variant="contained"
        color="primary"
        fullWidth
        onClick={signOut}
      >
        Sign Out
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            margin="normal"
            label="Update ToDo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={(event) => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
