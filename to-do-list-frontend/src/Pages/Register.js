import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/MosheAlpha/">
                Moshe Shlomi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [error, setError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const serverBaseUrl = "http://localhost:5000/";
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setFirstNameError('');
        setLastNameError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        const formData = new FormData(e.currentTarget);
        let firstNameInput = formData.get('firstName')
        let lastNameInput = formData.get('lastName')
        let usernameInput = formData.get('username')
        let emailInput = formData.get('email')
        let passwordInput = formData.get('password')

        let isValid = true;

        if (!firstNameInput) {
            setFirstNameError('First name is required');
            isValid = false;
        }

        if (!lastNameInput) {
            setLastNameError('Last name is required');
            isValid = false;
        }
        if (!usernameInput) {
            setUsernameError('Username is required');
            isValid = false;
        }

        if (!emailInput) {
            setEmailError('Email is a required field');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailInput)) {
            setEmailError('Invalid email address');
            isValid = false;
        }

        if (!passwordInput) {
            setPasswordError('Password is a required field');
            isValid = false;
        }

        // if (passwordInput.length < 8) {
        //     setPasswordError('Password must be at least 8 characters long');
        //     isValid = false;
        // }

        if (!isValid) {
            return;
        }

        try {
            axios.post(serverBaseUrl + 'auth/register', {
                firstName: firstNameInput,
                lastName: lastNameInput,
                username: usernameInput,
                email: emailInput.replace(/\s+/g, ''),
                password: passwordInput.replace(/\s+/g, '')
            }).then((response) => {
                const { data } = response;
                console.log(data);
                navigate('/login');
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data.message);
                    setError("Error with creating new user at server!");
                }
            });
        } catch (err) {
            console.log(err)
            setError('Incorrect username or password');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={firstNameError ? true : false}
                                    helperText={firstNameError ? firstNameError : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    error={lastNameError ? true : false}
                                    helperText={lastNameError ? lastNameError : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    error={usernameError ? true : false}
                                    helperText={usernameError ? usernameError : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError ? true : false}
                                    helperText={emailError ? emailError : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={passwordError ? true : false}
                                    helperText={passwordError ? passwordError : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        {error && <p className="error">* {error}</p>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}



