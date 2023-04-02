import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import List from '../Components/List';
import NewTaskForm from '../Components/NewTaskForm';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AlertPopup from '../Components/AlertPopup';
import Loading from '../Components/Loading';
import globals from '../globals';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [labels, setLabels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [snackbars, setSnackbars] = useState([]);
    const navigate = useNavigate();

    const showSnackbar = (severity, message) => {
        const newSnackbar = {
            id: Date.now(),
            message,
            severity,
        };
        setSnackbars([...snackbars, newSnackbar]);
    };

    useEffect(() => {
        if (!globals.token) {
            navigate('login');
            return;
        }

        //Fetching all labels from DB
        const fetchLabels = async () => {
            let response = await axios
                .get(globals.apiUrl + 'api/labels', {
                    headers: {
                        Authorization: "JWT " + globals.token,
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    setLabels(res.data);
                    showSnackbar("success", "All labels fetched!")
                })
                .catch((err) => {
                    console.error(err);
                    showSnackbar("error", "Labels didn't fetched. Try to login again!")
                });
        };
        fetchLabels();

        //Fetching all tasks from DB
        setIsLoading(true);
        const fetchTasks = async () => {
            let response = await axios
                .get(globals.apiUrl + 'api/tasks', {
                    headers: {
                        Authorization: "JWT " + globals.token,
                    }
                })
                .then((res) => {
                    setTasks(res.data);
                    console.log(res.data)
                    setIsLoading(false);
                    showSnackbar("success", "All tasks fetched!")
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                    showSnackbar("error", "Tasks didn't fetched. Try to login again!")
                });
        }
        fetchTasks();

    }, []);

    const submitNewTask = (task) => {
        if (task.taskName == "" || task.dueDate == "") {
            showSnackbar("error", "Tasks didn't created. Fill all required fields first!")
            return
        }
        axios
            .post(globals.apiUrl + 'api/tasks', task, {
                headers: {
                    Authorization: "JWT " + globals.token,
                }
            })
            .then((res) => {
                console.log(res.data)
                setTasks([...tasks, res.data.task]);
                showSnackbar("success", "New Task created!")
            })
            .catch((err) => {
                console.error(err);
                showSnackbar("error", "Tasks didn't created. Try to send again or check the fiedls again!")
            });
    };

    const deleteTask = (id) => {
        if (id) {
            axios
                .delete(globals.apiUrl + 'api/tasks/' + id, {
                    headers: {
                        Authorization: "JWT " + globals.token,
                    }
                })
                .then((res) => {
                    setTasks([...tasks].filter(obj => obj._id != id));
                    showSnackbar("success", "Task deleted!")
                })
                .catch((err) => {
                    console.error(err);
                    showSnackbar("error", "Tasks didn't deleted. Try again!")
                });
        }
    }

    const updateTask = (id, updatedTask) => {
        if (id) {
            axios
                .update(globals.apiUrl + 'api/tasks/' + id, updatedTask, {
                    headers: {
                        Authorization: "JWT " + globals.token,
                    }
                })
                .then((res) => {
                    const newState = tasks.map(obj => {
                        if (obj._id === id) {
                            return updatedTask;
                        }
                        return obj;
                    });
                    setTasks(newState);
                    showSnackbar("success", "Task updated!")
                })
                .catch((err) => {
                    console.error(err);
                    showSnackbar("error", "Tasks didn't updated. Try again!")
                });
        }
    }

    return (
        <Container maxWidth="md" style={{ minHeight: '100vh', marginTop: '64px', textAlign: 'center', width: '100%' }}>
            {isLoading ? (
                <Loading open={isLoading} />
            ) : (
                <Box>
                    {!tasks || tasks.length == 0 ? (
                        <p>You don't have tasks yet! Create your first tasks below!</p>
                    ) : (
                        <List tasks={tasks} labels={labels} deleteTask={deleteTask} updateTask={updateTask} />
                    )}
                    <NewTaskForm submitNewTask={submitNewTask} labels={labels} />

                    {snackbars && snackbars.map((snackbar) => (
                        <AlertPopup key={snackbar.id} snackbar={snackbar} id={snackbar.id} />
                    ))}
                </Box>
            )}
        </Container>
    );
}