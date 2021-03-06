import React from "react";
import axios from "axios";
import auth from "../../axios";
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";

export default class WeatherWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: this.props.settings,
            weather: undefined,
        }
    }

    componentDidMount() {
        axios.post('http://localhost:8080/widgets/weather', {city: this.state.settings.city}, auth(this.props.token)).then((response) => {
            this.setState({weather: response.data});
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    render() {
        if (this.state.weather === undefined)
            return (<div/>)
        return (
            <Grid item xs={3} sm={3} md={3} alignItems="center" justify="center" textAlign={"center"}>
                <Card sx={{ minWidth: 275, height: 200}}>
                    <h3>
                        Current Weather
                    </h3>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {this.state.weather.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {this.state.weather.main.temp}°
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            humidity: {this.state.weather.main.humidity} %
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        );
    }


}