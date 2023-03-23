import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import List from '../Components/List';
import NewTaskForm from '../Components/NewTaskForm';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Home() {
    const [tasks, setTasks] = useState([]);
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

        setIsLoading(true);
        axios
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
    }, []);


    const handleChange = (event) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };

    const handleSubmit = (task) => {
        debugger
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
                    <Box sx={{height: '100vh'}}>
                        {!tasks || tasks.length == 0 ? (
                            <p>You don't have tasks yet! Create your first tasks below!</p>
                        ) : (
                            <List tasks={tasks} />
                        )}
                        <NewTaskForm onSubmit={handleSubmit} />

                    </Box>
                </Container>
            )}
        </div>
    );
}