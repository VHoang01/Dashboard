import React from "react";
import axios from "axios";
import auth from "../../axios";
import {Button, Card, CardContent, Grid} from "@mui/material";
import {Link} from "react-router-dom";

export default class MostPopularNewsWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: this.props.settings,
            news: undefined,
        }
    }

    componentDidMount() {
        axios.post('http://localhost:8080/widgets/newspopular', {days: this.state.settings.days}, auth(this.props.token)).then((response) => {
            this.setState({news: response.data});
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    render() {
        if (this.state.news === undefined)
            return (<div/>)
        return (
            <Grid item xs={3} sm={3} md={3} alignItems="center" justify="center" textAlign={"center"}>
                <Card sx={{ minWidth: 275, height: 200}}>
                    <h3>
                        News
                    </h3>
                    <CardContent>
                        <h3>{this.state.news.results[0].title}</h3>
                        <Button><a href={this.state.news.results[0].url}>Read this article</a></Button>
                    </CardContent>
                </Card>
            </Grid>

        );
    }


}