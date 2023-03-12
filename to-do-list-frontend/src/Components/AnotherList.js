import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

function TaskList() {
    const styles = {
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: '#fff',
            margin: '0 auto',
        },
        divider: {
            margin: '8px 0',
        },
        listItemTextPrimary: {
            fontWeight: 'bold',
        },
        listItemTextSecondary: {
            color: '#666',
        },
    };

    const tasks = [
        {
            id: 1,
            category: 'Work',
            description: 'Finish the report',
            date: '2023-03-15',
            time: '10:00 AM',
        },
        {
            id: 2,
            category: 'Personal',
            description: 'Buy groceries',
            date: '2023-03-16',
            time: '2:00 PM',
        },
        {
            id: 3,
            category: 'Work',
            description: 'Attend the meeting',
            date: '2023-03-17',
            time: '9:00 AM',
        },
    ];

    return (
        <div style={styles.root}>
            {tasks.map((task, index) => (
                <React.Fragment key={task.id}>
                    {index > 0 && <Divider style={styles.divider} />}
                    <List component="nav" aria-label="tasks list">
                        <ListItem>
                            <ListItemText primary={task.category} style={styles.listItemTextPrimary} />
                            <ListItemText primary={task.description} secondary={`${task.date} ${task.time}`} style={styles.listItemTextSecondary} />
                        </ListItem>
                    </List>
                </React.Fragment>
            ))}
        </div>
    );
}

export default TaskList;
