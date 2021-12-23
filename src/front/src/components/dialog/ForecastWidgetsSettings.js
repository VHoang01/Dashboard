import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import auth from '../../axios';
import axios from "axios";

export default class ForecastWidgetsSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: undefined,
        }
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onCloseDialog() {
        this.props.onCloseSettings();
    }

    onChangeInput(event) {
        this.setState({
            city: event.target.value
        })
    }

    onClickCreate() {
        axios.post('http://localhost:8080/widgets/', {
            widget: 'forecast',
            data: {
                city: this.state.city
            }
        }, auth(this.props.token)).then((response) => {
            if (response.status === 200)
                this.props.onCreate();
        }).catch((err) => {
            console.log(err.response)
        });
    }

    render() {
        return (
            <Dialog onClose={this.onCloseDialog} open={true}>
                <DialogTitle>
                    Forecast Widgets
                </DialogTitle>
                <DialogContent>
                    <TextField type={"text"} label={"city"} onChange={this.onChangeInput}/>
                    <Button variant={"outlined"} onClick={this.onClickCreate}>Create</Button>
                </DialogContent>
            </Dialog>
        );
    }
}