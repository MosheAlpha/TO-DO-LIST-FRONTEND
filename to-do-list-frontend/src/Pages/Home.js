import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import List from '../Components/List'
import TodoList from '../Components/Tasks-List';
import AnotherList from '../Components/AnotherList'

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', description: '' });
    const [isLoading, setIsLoading] = useState(true);
    const serverBaseUrl = "http://localhost:5000/"
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));

        if (!token) {
            navigate('login')
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
                setTasks(res.data.tasks);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(serverBaseUrl + 'api/tasks', newTask)
            .then((res) => {
                setTasks([...tasks, res.data.task]);
                setNewTask({ name: '', description: '' });
            })
            .catch((err) => {
                console.error(err);
            });
    };
    // const { pathname } = useLocation();
    return (
        <div>
            {/* <AnotherList />
            <div>end of first</div>
            <TodoList />
            <div>end of second</div> */}

            {isLoading ? (
                <p>Loading tasks...</p>
            ) : (
                <div>
                    {console.log(isLoading, tasks)}
                    <div className='home-section' style={{ height: '100vh' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0 200px' }}>
                            {!tasks || tasks == [] ? (
                                <p>You don't have tasks yet! Create your first tasks below!</p>
                            ) : (
                                <List tasks={tasks} />
                                
                            )}
                        </div>
                    </div>








                    <ul>
                        {tasks && tasks.map((task) => (
                            <li key={task._id}>
                                <h3>{task.name}</h3>
                                <p>{task.description}</p>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Task name"
                            value={newTask.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Task description"
                            value={newTask.description}
                            onChange={handleChange}
                        />
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            )}
        </div>
    );
}