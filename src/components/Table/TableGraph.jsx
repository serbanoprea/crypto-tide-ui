import React, { Component } from 'react'
import Chart from "chart.js";

export default class TableGraph extends Component {
    chartRef = React.createRef();

    render() {
        var graph = (
            <canvas className='chart' ref={this.chartRef}></canvas>
        )

        var chartRef = this.chartRef.current.getContext("2d");
        var component = this;

        new Chart(chartRef, {
          type: "line",
          data: {
            labels: component.props.data.dates,
            datasets: component.props.data.map(t => {
                return {
                    borderColor: 'rgb(255, 165, 0)',
                    pointBackgroundColor: 'rgb(255, 165, 0)',
                    borderWidth: 1,
                    pointRadius: 0,
                    label: this.props.data.name,
                    data: t.prices.map(price => price.toFixed(5))
                }
            }),
          },
          options: {
            responsive: true,
            title:{
                display:false
              },
              tooltips: {
                mode: 'index',
                intersect: false,
              },
             hover: {
                mode: 'nearest',
                intersect: true
              },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
					display: false,
                    type: 'linear',
                    ticks: {
                        padding: 25
                    }
				}]
            }
        }
        });

        return graph;
    }
}
