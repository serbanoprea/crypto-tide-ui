import React, { Component } from 'react'
import Plot from 'react-plotly.js';

export default class TrendingGraph extends Component {
    getData(){
        return this.props.data.map(el => {
            return {
                x: el.dates,
                y: el.prices,
                type: "scatter"
            }
        });
    }

    render() {
        return (
            <Plot data={this.getData()}></Plot>
        )
    }
}
