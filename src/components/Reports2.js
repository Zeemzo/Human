// / /Step 1 - Including react
import React from 'react';
import { ClipLoader } from "react-spinners";

import axios from 'axios'
import * as routes from '../constants/routes'
import { Grid, Col, Row } from 'react-bootstrap'
// Step 2 - Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Including the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import Column2D from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const chartConfigs1 = {
    type: 'column3d',// The chart type
    width: '300', // Width of the chart
    height: '300', // Height of the chart
    dataFormat: 'json', // Data type
    // dataSource: require('./ReportData.json')
};

const chartConfigs2 = {
    type: 'pie3d',// The chart type
    width: '300', // Width of the chart
    height: '300', // Height of the chart
    dataFormat: 'json', // Data type
    // dataSource: require('./ReportData.json')
};

// Step 8 - Creating the DOM element to pass the react-fusioncharts component 
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: null,
            loading1: true,
            loading2: true,
            config: { ...chartConfigs1 },
            config1: { ...chartConfigs2 }
        }
    }


    componentDidMount() {
        if (navigator.onLine) {

            const token = localStorage.getItem('token')
            // console.log(this.state);

            axios.get(routes.HUMANBACKEND + '/api/reports/leaderboard', {
                headers: {
                    'Authorization': "bearer " + token,
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "application/json",
                }
            }
            ).then((res) => {
                this.setState({ loading1: false })
                const sample = {
                    chart: {
                        caption: "Requests Made Per User",
                        subCaption: "per user",
                        xAxisName: "username",
                        yAxisName: "request",
                        // numberSuffix: "request",
                        theme: "fusion"
                    },
                    data: res.data
                }

                const chartConfigs = {
                    type: 'column3d',// The chart type
                    width: '300', // Width of the chart
                    height: '300', // Height of the chart
                    dataFormat: 'json', // Data type
                    dataSource: sample
                };
                this.setState({ config: chartConfigs })
                localStorage.setItem("chart1", JSON.stringify(chartConfigs))
            })


            axios.get(routes.HUMANBACKEND + '/api/reports/lol', {
                headers: {
                    'Authorization': "bearer " + token,
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "application/json",
                }
            }
            ).then((res) => {
                this.setState({ loading2: false })

                const sample1 = {
                    chart: {
                        caption: "Request Tally for the Day",
                        subCaption: "needs vs provisions",
                        xAxisName: "username",
                        yAxisName: "request",
                        // numberSuffix: "request",
                        theme: "fusion"
                    },
                    data: res.data
                }

                const chartConfigs3 = {
                    type: 'pie3d',// The chart type
                    width: '300', // Width of the chart
                    height: '300', // Height of the chart
                    dataFormat: 'json', // Data type
                    dataSource: sample1
                };
                this.setState({ config1: chartConfigs3 })
                localStorage.setItem("chart2", JSON.stringify(chartConfigs3))

            })
        } else {
            this.setState({ loading1: false })

            if (localStorage.getItem("chart1") != null) {
                this.setState({ config: JSON.parse(localStorage.getItem("chart1")) })

            }


            this.setState({ loading2: false })
            if (localStorage.getItem("chart2") != null) {

            this.setState({ config1: JSON.parse(localStorage.getItem("chart2")) })
            }

        }

    }
    render() {
        return (
            <Grid><Row> <Col xs={12} sm={6} md={6} lg={6} >{this.state.loading1 ?
                <Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
                    // style={override}
                    sizeUnit={"px"}
                    size={100}
                    color={"green"}
                    loading={this.state.loading1}
                // style="text-align:center"
                /></p></Col> :
                <Col xs={12} sm={6} md={6} lg={6} >
                    <ReactFC
                        {...this.state.config} />
                </Col>
            }   </Col>
                 <Col xs={12} sm={6} md={6} lg={6} >{
                    this.state.loading2 ?
                        <Col xs={12} sm={12} md={12} lg={12}> <p><ClipLoader
                            // style={override}
                            sizeUnit={"px"}
                            size={100}
                            color={"green"}
                            loading={this.state.loading2}
                        // style="text-align:center"
                        /></p></Col> :
                        <Col xs={12} sm={6} md={6} lg={6} >
                            <ReactFC
                                {...this.state.config1} />

                        </Col>
                }</Col>

            </Row>
            </Grid>
        );
    }
}

export default App
