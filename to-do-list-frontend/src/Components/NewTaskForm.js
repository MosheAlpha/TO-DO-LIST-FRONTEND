import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Paper,
    Grid,
    styled,
    IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LabelSelect from './LabelSelect';

const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
];

const NewTaskForm = ({ submitNewTask, labels }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [priority, setPriority] = useState(priorityOptions[0].value);

    const [selectedLabels, setSelectedLabels] = React.useState([]);
    const serverBaseUrl = "http://localhost:5000/";
    const token = JSON.parse(localStorage.getItem('accessToken'));

    useEffect(() => {

    }, []);

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleCompletedChange = (event) => {
        setCompleted(event.target.checked);
    };

    const handleLabelsChange = (labels) => {
        setSelectedLabels(labels);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            taskName,
            description,
            completed,
            dueDate,
            priority,
            labels: selectedLabels
        };

        submitNewTask(newTask);
        setTaskName('');
        setDescription('');
        setDueDate('');
        setPriority('');
        setCompleted(false);
    };



    return (
        <Paper elevation={6} >

            <Box sx={{ flexGrow: 1 }} mt={2} mb={2} bgcolor="#ffd0d047" p={3} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="taskName"
                            label="Task Name"
                            name="taskName"
                            value={taskName}
                            onChange={handleTaskNameChange}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="dueDate"
                            label="Due Date"
                            name="dueDate"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dueDate}
                            onChange={handleDueDateChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="priority"
                                value={priority}
                                defaultValue={priorityOptions[0]}
                                onChange={handlePriorityChange}
                                label="Priority"
                            >
                                {priorityOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControlLabel sx={{ ml: 0 }}
                            control={
                                <Checkbox
                                    checked={completed}
                                    onChange={handleCompletedChange}
                                    name="completed"
                                    color="primary"
                                />
                            }
                            label="Completed"
                        />
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <LabelSelect labels={labels} selectedLabels={selectedLabels} handleLabelsChange={handleLabelsChange} />

                    </Grid>
                    <Grid item xs={6} md={8} style={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center'
                    }}>
                        <IconButton aria-label="submit-task" color='primary' onClick={handleSubmit} >
                            <AddCircleOutlineIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Paper >


    );
};

export default NewTaskForm;
