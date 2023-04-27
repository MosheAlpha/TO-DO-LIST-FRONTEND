import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


//style of popup of labels to select
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




function getStyles(label, theme) {
    return {
        fontWeight: theme.typography.fontWeightMedium,
        color: label.colorHex
    };
}

export default function LabelSelect({ handleLabelsChange, labels, selectedLabels }) {
    const theme = useTheme();

    const handleChange = (event) => {
        handleLabelsChange(event.target.value)
    };



    return (
        <FormControl sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel id="demo-multiple-chip-labels">Label</InputLabel>
            <Select
                labelId="demo-multiple-chip-labels"
                id="demo-multiple-chip"
                multiple
                value={selectedLabels}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" labels="Label" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((label) => (
                            <Chip key={label} label={label} style={{ margin: 2, color: labels.find(o => o.name === label)?.colorHex }} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {labels.map((label, index) => (
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
    );
}