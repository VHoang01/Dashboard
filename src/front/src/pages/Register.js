import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {Box, Container, Grid, Typography} from "@mui/material";

export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
            redirectLogin: undefined,
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
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
    onClickRegister() {
        axios.post('http://localhost:8080/auth/register', {
            username: this.state.username,
            password: this.state.password
        }).then((response) =>  {
            if (response.status === 200)
                this.setState({redirectLogin: true});
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
                        Register
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
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.onClickRegister}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={"/login"}>
                                    {"You already have a account ? sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {this.state.redirectLogin !== undefined ? <Navigate to="/login"/> : null}
            </Container>
        );
    }
}