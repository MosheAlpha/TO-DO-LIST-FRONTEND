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
} from '@mui/material';
import LabelSelect from './LabelSelect';

const NewTaskForm = ({ onSubmit }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [priority, setPriority] = useState(0);
    const [labels, setLabels] = useState([]);
    const [selectedLabels, setSelectedLabels] = React.useState([]);
    const serverBaseUrl = "http://localhost:5000/";
    const token = JSON.parse(localStorage.getItem('accessToken'));

    useEffect(() => {
        const fetchLabels = async () => {
            const response = await axios
                .get(serverBaseUrl + 'api/labels', {
                    headers: {
                        Authorization: "JWT " + token,
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    setLabels(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        fetchLabels();
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
        console.log(newTask)

        onSubmit(newTask);
        setTaskName('');
        setDescription('');
        setDueDate('');
        setPriority('');
        setCompleted(false);
    };

    const priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit}>
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
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
                <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priority"
                        value={priority}
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
                <LabelSelect labels={labels} selectedLabels={selectedLabels} handleLabelsChange={handleLabelsChange}/>
                <FormControlLabel
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
                <Button type="submit" variant="contained" color="primary">
                    Create Task
                </Button>
            </form>
        </Box>
    );
};

export default NewTaskForm;
