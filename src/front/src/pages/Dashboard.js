import React from 'react'
import {withCookies} from "react-cookie";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Add, HouseRounded} from "@mui/icons-material";
import {Box, Dialog, DialogContent, DialogTitle, Grid, IconButton} from "@mui/material";
import WeatherWidgetsSettings from "../components/dialog/WeatherWidgetsSettings";
import auth from '../axios';
import axios from "axios";
import WeatherWidget from "../components/widgets/WeatherWidget";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: undefined,
            redirectUrl: undefined,
            showDialog: false,
            showSettingsDialog: false,
            settingsDialog: undefined,
            settings: undefined,
        }
        const { cookies } = this.props;
        this.cookies = cookies;
        this.openDialog = this.openDialog.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onAddWidget = this.onAddWidget.bind(this);
        this.onCloseSettingsDialog = this.onCloseSettingsDialog.bind(this);
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
        this.auth = auth;
        this.loadWidget();
    }

    onAddWidget() {
        this.setState({
            showSettingsDialog: false,
            showDialog: false,
        });
        this.loadWidget();
    }

    loadWidget() {
        axios.get('http://localhost:8080/widgets/', auth(this.auth)).then((response) => {
            this.setState({settings: response.data.data});
        }).catch((err) => {
            console.log(err.response);
        })
    }

    showWidget() {
        if (this.state.settings === undefined)
            return;
        return this.state.settings.map((settings, index) => {
            if (settings.widget === 'weather') {
                return <WeatherWidget key={index} token={this.auth} settings={settings.data}/>
            }
            return (<div key={index}>Hello</div>)
        })
    }

    showSettingsDialog() {
        if (this.state.showSettingsDialog !== true)
            return;
        if (this.state.settingsDialog === 'weather') {
            return <WeatherWidgetsSettings token={this.auth} onCreate={this.onAddWidget} onCloseSettings={this.onCloseSettingsDialog}/>;
        }
    }

    onCloseSettingsDialog() {
        this.setState({
            showSettingsDialog: false,
            settingsDialog: undefined,
            showDialog: false
        })
    }

    showDialog() {
        return (
            <Dialog onClose={this.onCloseDialog} open={this.state.showDialog}>
                <DialogTitle>
                    Widgets:
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <h3>Get weather of a city <IconButton onClick={() => this.setState({showDialog: false, showSettingsDialog: true, settingsDialog: 'weather'})}><Add/></IconButton></h3>
                        <h3>Get un autre truc jsp quoi <IconButton onClick={() => this.setState({})}><Add/></IconButton></h3>
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
                    {this.showWidget()}
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
                {this.showSettingsDialog()}
            </div>
        );
    }
}

export default withCookies(Dashboard);