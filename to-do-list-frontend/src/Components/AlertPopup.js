import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const alertTypes = ["error", "warning", "info", "success"];

export default function AlertPopup({ type }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (type) setOpen(true)
        else setOpen(false)
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={type.status} sx={{ width: '100%' }}>
                {type.text}
            </Alert>
        </Snackbar>
    );
}