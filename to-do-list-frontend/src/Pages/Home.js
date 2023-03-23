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

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [labels, setLabels] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', description: '' });
    const [isLoading, setIsLoading] = useState(true);
    const serverBaseUrl = "http://localhost:5000/";
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('login');
            return;
        }

        //Fetching all labels from DB
        const fetchLabels = async () => {
            let response = await axios
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

        //Fetching all tasks from DB
        setIsLoading(true);
        const fetchTasks = async () => {
            let response = await axios
                .get(serverBaseUrl + 'api/tasks', {
                    headers: {
                        Authorization: "JWT " + token,
                    }
                })
                .then((res) => {
                    setTasks(res.data);
                    console.log(res.data)
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                });
        }
        fetchTasks();

    }, []);


    const handleChange = (event) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };

    const submitNewTask = (task) => {
        console.log(task, token)
        axios
            .post(serverBaseUrl + 'api/tasks', task, {
                headers: {
                    Authorization: "JWT " + token,
                }
            })
            .then((res) => {
                console.log(res.data)
                setTasks([...tasks, res.data.task]);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading tasks...</p>
            ) : (
                <Container maxWidth="md">
                    <Box>
                        {!tasks || tasks.length == 0 ? (
                            <p>You don't have tasks yet! Create your first tasks below!</p>
                        ) : (
                            <List tasks={tasks} labels={labels}/>
                        )}
                        <NewTaskForm submitNewTask={submitNewTask} labels={labels}/>

                    </Box>
                </Container>
            )}
        </div>
    );
}