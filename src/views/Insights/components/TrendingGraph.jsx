import React, { Component } from 'react'
import Plot from 'react-plotly.js';

export default class TrendingGraph extends Component {
    getData(){
        return this.props.data.map(el => {
            return {
                name: el.name,
                x: el.dates,
                y: el.prices,
                type: "scatter"
            }
        });
    }

    getLayout(){
       return {
            autosize: false,
            title: this.props.title,
            showlegend: true,
            width: 1000,
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
                title: 'Date'
            },
            yaxis: {
                title: 'Price',
                type: 'log',
                autorange: true
            },
            font: {
                color: '#ffcc7a'
            }
        }
    }

    getConfig(){
        return {
            displaylogo: false,
            responsive: true
        }
    }

    render() {
        return (
            <div className="container">
                <Plot 
                data={this.getData()}
                layout={this.getLayout()}
                config={this.getConfig()}>

                </Plot>
            </div>
        )
    }
}
