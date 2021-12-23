import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import auth from '../../axios';
import axios from "axios";

class NewsPopularSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            days: 1,
        }
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onCloseDialog() {
        this.props.onCloseSettings();
    }

    onChangeInput(event) {
        console.log(event.target.value);
        this.setState({
            days: event.target.value
        })
    }

    onClickCreate() {
        axios.post('http://localhost:8080/widgets/', {
            widget: 'newspopular',
            data: {
                days: this.state.days
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
                    Most popular news widget
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            value={this.state.days}
                            label="Days"
                            onChange={this.onChangeInput}>
                            <MenuItem value={1}>One day</MenuItem>
                            <MenuItem value={7}>Seven days</MenuItem>
                            <MenuItem value={30}>One month</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant={"outlined"} onClick={this.onClickCreate}>Create</Button>
                </DialogContent>
            </Dialog>
        );
    }
}

export default NewsPopularSettings;