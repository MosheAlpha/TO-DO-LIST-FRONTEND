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
    IconButton,
    Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LabelSelect from './LabelSelect';

const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
];

const NewTaskForm = ({ submitNewTask, labels }) => {

    const [selectedLabels, setSelectedLabels] = React.useState([]);

    const [formValues, setFormValues] = React.useState({
        taskName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a name'
        },
        description: {
            value: "",
            error: false,
            errorMessage: 'You must enter a description'
        },
        dueDate: {
            value: '',
            error: false,
            errorMessage: 'You must enter the end date'
        },
        priority: {
            value: priorityOptions[0].value,
            error: false,
            errorMessage: 'You must choose the priority of the task'
        }
    })

    const handleLabelsChange = (labels) => {
        setSelectedLabels(labels);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            taskName: formValues.taskName.value,
            description: formValues.description.value,
            dueDate: formValues.dueDate.value,
            priority: formValues.priority.value,
            completed: false,
            labels: selectedLabels
        };

        submitNewTask(newTask);
        //here need to reset formValues
    };



    return (
        <Paper elevation={6} >
            <Box sx={{ flexGrow: 1 }} mt={2} mb={2} bgcolor="#ffd0d047" p={3} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} textAlign='center'>
                        <Typography variant='h5'>
                            New Task
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="taskName"
                            label="Task Name"
                            name="taskName"
                            onChange={handleChange}
                            value={formValues.taskName.value}
                            error={formValues.taskName.error}
                            helpertext={formValues.taskName.error ? formValues.taskName.errorMessage : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            onChange={handleChange}
                            value={formValues.description.value}
                            error={formValues.description.error}
                            helpertext={formValues.description.error ? formValues.description.errorMessage : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
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
                            onChange={handleChange}
                            value={formValues.dueDate.value}
                            error={formValues.dueDate.error}
                            helpertext={formValues.dueDate.error ? formValues.dueDate.errorMessage : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="priority"
                                label="Priority"
                                defaultValue={priorityOptions[0]}
                                onChange={handleChange}
                                value={formValues.priority.value}
                                error={formValues.priority.error}
                                helpertext={formValues.priority.error ? formValues.priority.errorMessage : ''}
                            >
                                {priorityOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                        <LabelSelect labels={labels} selectedLabels={selectedLabels} handleLabelsChange={handleLabelsChange} />
                    </Grid>
                    <Grid item xs={12} style={{
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
