import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import AccordionTest from './AccordionTest';

export default function CheckboxList(props) {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Tasks</h2>
            <AccordionTest tasks={props.tasks}/>
        </>
    );
}

// completed

// createdAt
// : 
// "2023-03-23T12:06:12.653Z"
// description
// : 
// "first desc"
// dueDate
// : 
// "2023-03-20T00:00:00.000Z"
// labels
// : 
// ['Education']
// priority
// : 
// null
// taskName
// : 
// "first task"
// updatedAt
// : 
// "2023-03-23T12:06:12.653Z"
// userId
// : 
// "64108a11c31d99217b5e98e0"