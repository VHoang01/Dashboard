import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import {withCookies} from "react-cookie";
import {Link, Navigate} from "react-router-dom";
import {Box, Container, Grid, Typography} from "@mui/material";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
            redirect: undefined,
            redirectUrl: undefined,
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }
    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }
    onClickLogin() {
        const { cookies } = this.props;
        axios.post('http://localhost:8080/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            cookies.set('auth', response.data.auth, {path: '/'});
            this.setState({
                redirect: true,
                redirectUrl: "/",
            })
        }).catch((err) => {
            console.log(err.response);
        });

    }
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.onUsernameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onPasswordChange}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.onClickLogin}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={"/register"}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl}/> : null}
            </Container>
        );
    }
}

export default withCookies(Login);