import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const alertTypes = ["error", "warning", "info", "success"];

export default function AlertPopup({ id, snackbar }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (snackbar) setOpen(true)
        else setOpen(false)
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={() => handleClose(id)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}