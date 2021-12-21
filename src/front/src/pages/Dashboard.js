import React from 'react'
import {withCookies} from "react-cookie";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Add, HouseRounded} from "@mui/icons-material";
import {Box, Dialog, DialogContent, DialogTitle, Grid, IconButton} from "@mui/material";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: undefined,
            redirectUrl: undefined,
            showDialog: false,
        }
        const { cookies } = this.props;
        this.cookies = cookies;
        this.openDialog = this.openDialog.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onAddWidget = this.onAddWidget.bind(this);
    }

    showTime() {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today  = new Date();

        return (
            <div>
                <h3>{today.toLocaleDateString("fr-FR", options)}</h3>
            </div>
        )
    }

    showAddWidgetButton() {
        return (<Button variant="outlined" onClick={this.openDialog}>
                <Add/>
            </Button>)
    }

    componentDidMount() {
        let auth = this.cookies.get('auth');
        if (auth === undefined || auth === null || auth.length === 0)
            this.setState({
                redirect: true,
                redirectUrl: "/login"
            });
    }

    onAddWidget() {

    }

    showDialog() {
        return (
            <Dialog onClose={this.onCloseDialog} open={this.state.showDialog}>
                <DialogTitle>
                        Widgets:
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <h3>
                            Get weather of a city <IconButton onAdd={this.onAddWidget}><Add/></IconButton>
                        </h3>
                    </Box>
                </DialogContent>
            </Dialog>)
    }

    openDialog() {
        this.setState({
            showDialog: true
        })
    }

    onCloseDialog() {
        this.setState({
            showDialog: false
        })
    }

    showApp() {
        return (
            <div>
                {this.showTime()}
                {this.showUserButton()}
                {this.showAddWidgetButton()}
                <Grid>

                </Grid>
            </div>
        )
    }

    showUserButton() {
        return (<div>
            <IconButton>
                <HouseRounded />
            </IconButton>
        </div>)
    }

    render() {
        return (
            <div>
                {this.state.redirect !== undefined ? <Navigate to={this.state.redirectUrl}/> : this.showApp()}
                {this.showDialog()}
            </div>
        );
    }
}

export default withCookies(Dashboard);