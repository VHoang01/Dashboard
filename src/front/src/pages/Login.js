import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import {withCookies} from "react-cookie";
import {Navigate} from "react-router-dom";

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
            <div>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl}/> : null}
                <h1>Login</h1>
                <TextField id="outlined-basic" label="username" variant="outlined" onChange={this.onUsernameChange}/>
                <TextField id="filled-basic" label="password" variant="outlined" onChange={this.onPasswordChange}/>
                <Button onClick={this.onClickLogin}>Login</Button>
            </div>
        );
    }
}

export default withCookies(Login);