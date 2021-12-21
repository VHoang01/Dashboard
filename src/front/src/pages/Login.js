import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined
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
        console.log(this.state.password);
        console.log(this.state.username);

        axios.post('http://localhost:8080/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then((response) =>  {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.response);
        });

    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <TextField id="outlined-basic" label="username" variant="outlined" onChange={this.onUsernameChange}/>
                <TextField id="filled-basic" label="password" variant="outlined" onChange={this.onPasswordChange}/>
                <Button onClick={this.onClickLogin}>Login</Button>
            </div>
        );
    }
}