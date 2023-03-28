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
import Loading from '../Components/Loading'

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [labels, setLabels] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', description: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const serverBaseUrl = "http://localhost:5000/";
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const navigate = useNavigate();



    const showAlertPopup = (status = "success", text = "") => {
        setShowAlert(true);
        setAlertType({ status, text });
        setTimeout(() => {
            setShowAlert(false);
            setAlertType(null);
        }, "3000");
    }

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
                    showAlertPopup("success", "All labels fetched!")
                })
                .catch((err) => {
                    console.error(err);
                    showAlertPopup("error", "Labels didn't fetched. Try to login again!")
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
                    showAlertPopup("success", "All tasks fetched!")
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                    showAlertPopup("error", "Tasks didn't fetched. Try to login again!")
                });
        }
        fetchTasks();

    }, []);


    const handleChange = (event) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };


    const submitNewTask = (task) => {
        if (task.taskName == "" || task.dueDate == "") {
            showAlertPopup("error", "Tasks didn't created. Fill all required fields first!")
            return
        }
        axios
            .post(serverBaseUrl + 'api/tasks', task, {
                headers: {
                    Authorization: "JWT " + token,
                }
            })
            .then((res) => {
                console.log(res.data)
                setTasks([...tasks, res.data.task]);
                showAlertPopup("success", "New Task created!")
            })
            .catch((err) => {
                console.error(err);
                showAlertPopup("error", "Tasks didn't created. Try to send again or check the fiedls again!")
            });
    };

    return (
        <div>

            {isLoading ? (
                <Loading open={isLoading} />
            ) : (
                <Container maxWidth="md" style={{minHeight: '100vh'}}>
                    <Box>
                        {!tasks || tasks.length == 0 ? (
                            <p>You don't have tasks yet! Create your first tasks below!</p>
                        ) : (
                            <List tasks={tasks} labels={labels} />
                        )}
                        <NewTaskForm submitNewTask={submitNewTask} labels={labels} />
                        {showAlert && <AlertPopup type={alertType} />}
                    </Box>
                </Container>
            )}
        </div>
    );
}