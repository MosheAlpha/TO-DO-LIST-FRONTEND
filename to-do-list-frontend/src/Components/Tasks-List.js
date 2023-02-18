import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    const handleAddTask = (event) => {
        event.preventDefault();
        if (taskInput) {
            setTasks([...tasks, taskInput]);
            setTaskInput('');
        }
    };

    return (
        <Paper className="TodoList">
            <Typography variant="h4" className="TodoList-heading">Todo List</Typography>
            <form onSubmit={handleAddTask} className="TodoList-form">
                <TextField
                    label="New Task"
                    variant="outlined"
                    className="TodoList-input"
                    value={taskInput}
                    onChange={(event) => setTaskInput(event.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="TodoList-button"
                >
                    Add Task
                </Button>
            </form>
            <List className="TodoList-list">
                {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={task} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
