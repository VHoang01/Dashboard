import React from "react";
import axios from "axios";
import auth from "../../axios";
import {Button, Card, CardContent, Grid} from "@mui/material";
import {Link} from "react-router-dom";

export default class CovidWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: this.props.settings,
            covid: undefined,
        }
    }

    componentDidMount() {
        axios.post('http://localhost:8080/widgets/covid', {country: this.state.settings.country}, auth(this.props.token)).then((response) => {
            this.setState({covid: response.data});
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    render() {
        if (this.state.covid === undefined)
            return (<div/>)
        return (
            <Grid item xs={3} sm={3} md={3} alignItems="center" justify="center" textAlign={"center"}>
                <Card sx={{ minWidth: 275, height: 200}}>
                    <h3>
                        Covid data for {this.state.settings.country}
                    </h3>
                    <CardContent>
                        <h3>Total confirmed: {this.state.covid.TotalConfirmed}</h3>
                        <h3>Total deaths: {this.state.covid.TotalDeaths}</h3>
                    </CardContent>
                </Card>
            </Grid>

        );
    }


}