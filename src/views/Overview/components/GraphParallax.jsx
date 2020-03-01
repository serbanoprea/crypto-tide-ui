import React, { Component } from 'react'
import Chart from "chart.js";
import Loading from "../../../components/Loading";


export default class GraphParallax extends Component {    
    chartRef = React.createRef();

    generateGraph(){
        if(!this.props.data.length)
            return;
            
        var chartRef = this.chartRef.current.getContext("2d");
        var component = this;

        new Chart(chartRef, {
          type: "line",          
          data: {
            labels: component.props.data[0].dates,
            datasets: component.props.data.map(t => {
                return {
                    borderColor: 'rgb(255, 165, 0)',
                    pointBackgroundColor: 'rgb(255, 165, 0)',
                    borderWidth: 1,
                    pointRadius: 0,
                    label: t.name,
                    data: t.prices.map(price => price.toFixed(5))
                }
            }),
          },
          options: {
            responsive: true,
            title:{
                display:true,
                text: this.props.title
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
    }

    render() {
        if(!this.props.loading)
            this.generateGraph();

        return (
            <div className="parallax-container">
                <div className="parallax">
                    <div className="overview-container">
                        {(
                            this.props.loading &&
                            <Loading />
                        )}
                        <canvas className='chart' ref={this.chartRef}></canvas>
                    </div>
                </div>
            </div>
        )
    }
}
