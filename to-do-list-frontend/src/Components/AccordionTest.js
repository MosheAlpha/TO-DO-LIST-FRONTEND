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



export default function AccordionTest({ tasks }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            {
                tasks.map((task) => {
                    return (
                        <List sx={style} component="nav" aria-label="mailbox folders">
                            <ListItem>
                                <Checkbox {...label} icon={<FavoriteBorder />} id="task-completed" className="task-completed" checkedIcon={<Favorite />} style={{ color: priorityColors.find(o => o.name === task.priority)?.hexColor }} />
                                <ListItemText primary={task.taskName} secondary={task.dueDate} onClick={handleClick} />

                                <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClick} style={{ flexGrow: 0 }}>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>

                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <WbIncandescentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <Divider />
                        </List>
                    )
                })}
        </div>
    );
}


