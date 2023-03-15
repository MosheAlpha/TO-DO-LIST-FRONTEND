import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(label, theme) {
    return {
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: label.colorHex
    };
}

export default function LabelSelect(props) {
    const theme = useTheme();
    const [labels, setLabels] = React.useState([]);

    const handleChange = (event) => {
        debugger
        setLabels(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-labels">Label</InputLabel>
                <Select
                    labelId="demo-multiple-chip-labels"
                    id="demo-multiple-chip"
                    multiple
                    value={labels}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" labels="Label" />}
                    renderValue={(selected) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((label) => (
                                <Chip key={label} label={label} style={{ margin: 2 , color: labels.find(o => o.name === label)?.colorHex}} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.labels.map((label, index) => (
                        <MenuItem
                            key={index}
                            value={label.name}
                            style={getStyles(label, theme)}
                        >
                            {label.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}