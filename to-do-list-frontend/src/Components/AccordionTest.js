import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';



import '../styles/tasksList.css';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};

const priorityColors = [
    {
        "name": "Low",
        "colorName": "LightGrey",
        "hexColor": "#D3D3D3"
    },
    {
        "name": "Medium",
        "colorName": "SkyBlue",
        "hexColor": "#87CEEB"
    },
    {
        "name": "High",
        "colorName": "FireBrick",
        "hexColor": "#B22222"
    }
];

const ListItemStyle = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));



export default function AccordionTest({ tasks, labels }) {
    const [isOpenCollapse, setIsOpenCollapse] = React.useState(Array(tasks.length).fill(false));

    const handleOpen = (index) => {
        setIsOpenCollapse(Object.assign(Array.from(isOpenCollapse), { [index]: !isOpenCollapse[index] }));
    };

    return (
        <div>
            {
                tasks.map((task, index) => {
                    return (
                        <Paper key={task._id} style={{ marginBottom: '4px' }}
                            component="div"
                        >
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <Checkbox {...label} icon={<FavoriteBorder />} id="task-completed" className="task-completed" checkedIcon={<Favorite />} style={{ color: priorityColors.find(o => o.name === task.priority)?.hexColor }} />
                                    <ListItemText primary={task.taskName} secondary={task.dueDate} onClick={() => handleOpen(index)} sx={{ ':hover': { cursor: 'pointer' } }} />

                                    <IconButton color="primary" aria-label="open-collapse" component="label" onClick={() => handleOpen(index)} style={{ flexGrow: 0 }}>
                                        {isOpenCollapse[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>

                                </ListItem>
                                <Collapse in={isOpenCollapse[index]} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
                                    <List component="div" disablePadding >
                                        <ListItem>
                                            <ListItemIcon>
                                                <WbIncandescentIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={task.description} />
                                            <Stack direction="row" spacing={1}>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon color='#ed5959' />
                                                </IconButton>
                                                <IconButton color="secondary" aria-label="add an alarm">
                                                    <EditIcon color='#8b8b86' />
                                                </IconButton>
                                            </Stack>
                                        </ListItem>
                                    </List>
                                    <Grid item xs={8} style={{
                                        display: 'flex',
                                        padding: '10px',
                                        gap: '10px',
                                        flexWrap: ' wrap'
                                    }}>
                                        {task.labels && task.labels.map((label, index2) => {

                                            return (
                                                <div key={index2}>
                                                    <Chip
                                                        label={label}
                                                        style={{ color: labels.find(o => o.name === label)?.colorHex }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Grid>
                                </Collapse>
                            </List>
                        </Paper>
                    )
                })}
        </div >
    );
}


