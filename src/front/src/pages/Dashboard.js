import React from 'react'
import {withCookies} from "react-cookie";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Add, HouseRounded, Logout} from "@mui/icons-material";
import {Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import WeatherWidgetsSettings from "../components/dialog/WeatherWidgetsSettings";
import auth from '../axios';
import axios from "axios";
import WeatherWidget from "../components/widgets/WeatherWidget";
import ForecastWidgetsSettings from "../components/dialog/ForecastWidgetsSettings";
import ForecastWidget from "../components/widgets/ForecastWidget";
import NewsPopularWidgetsSettings from "../components/dialog/NewsPopularWidgetsSettings";
import MostPopularNewsWidget from "../components/widgets/MostPopularNews";
import CovidWidgetsSettings from "../components/dialog/CovidWidgetsSettings";
import CovidWidget from "../components/widgets/CovidWidget";

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
        this.logout = this.logout.bind(this);
    }

    showTime() {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'};
        let today = new Date();
        return (
            <div>
                <h3>{today.toLocaleDateString("fr-FR", options)}</h3>
            </div>
        )
    }

    showAddWidgetButton() {
        return (
            <Grid container justifyContent="flex-end">
                <IconButton onClick={this.openDialog}>
                    <Add/>
                </IconButton>
                <IconButton onClick={this.logout}>
                    <Logout />
                </IconButton>
            </Grid>
            )
    }

    componentDidMount() {
        let auth = this.cookies.get('auth');
        if (auth === undefined || auth === null || auth === 'null' || auth.length === 0)
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
        if (this.state.settings === undefined || this.state.settings.length === 0)
            return;

        return this.state.settings.map((settings, index) => {
            if (settings.widget === 'weather')
                return <WeatherWidget key={index} token={this.auth} settings={settings.data}/>
            if (settings.widget === 'forecast')
                return <ForecastWidget key={index} token={this.auth} settings={settings.data}/>
            if (settings.widget === 'newspopular')
                return <MostPopularNewsWidget key={index} token={this.auth} settings={settings.data}/>
            if (settings.widget === 'covid')
                return <CovidWidget key={index} token={this.auth} settings={settings.data}/>
            return (<div key={index}>Hello</div>)
        })
    }

    showSettingsDialog() {
        if (this.state.showSettingsDialog !== true)
            return;
        if (this.state.settingsDialog === 'weather')
            return <WeatherWidgetsSettings token={this.auth} onCreate={this.onAddWidget} onCloseSettings={this.onCloseSettingsDialog}/>;
        if (this.state.settingsDialog === 'forecast')
            return <ForecastWidgetsSettings token={this.auth} onCreate={this.onAddWidget} onCloseSettings={this.onCloseSettingsDialog}/>;
        if (this.state.settingsDialog === 'newspopular')
            return <NewsPopularWidgetsSettings token={this.auth} onCreate={this.onAddWidget} onCloseSettings={this.onCloseSettingsDialog}/>;
        if (this.state.settingsDialog === 'covid')
            return <CovidWidgetsSettings token={this.auth} onCreate={this.onAddWidget} onCloseSettings={this.onCloseSettingsDialog}/>;
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
                        <h3>Get forecast of a city <IconButton onClick={() => this.setState({showDialog: false, showSettingsDialog: true, settingsDialog: 'forecast'})}><Add/></IconButton></h3>
                        <h3>Get New York Times most popular news <IconButton onClick={() => this.setState({showDialog: false, showSettingsDialog: true, settingsDialog: 'newspopular'})}><Add/></IconButton></h3>
                        <h3>Get Covid information by country <IconButton onClick={() => this.setState({showDialog: false, showSettingsDialog: true, settingsDialog: 'covid'})}><Add/></IconButton></h3>
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
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant={"h2"}>
                        Dashboard
                    </Typography>
                    {this.showTime()}
                </Box>
                {this.showAddWidgetButton()}
                <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {this.showWidget()}
                </Grid>
            </div>
        )
    }

    logout() {
        this.cookies.set('auth', null, {path: '/'});
        this.setState({
            redirect: true,
            redirectUrl: "/login"
        })
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