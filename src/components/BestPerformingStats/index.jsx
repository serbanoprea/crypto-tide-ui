import React, { Component } from 'react'
import Loading from '../../components/Loading';
import Chart from "chart.js";
import { getRandomColor } from '../../utilities';

export default class BestPerformingStats extends Component {
    chartRef = React.createRef();

    generateGraph(){
        if(!this.props.data.length)
            return;
            
        var chartRef = this.chartRef.current.getContext("2d");
        var colorSub = 0;

        new Chart(chartRef, {
          type: "bar",
          labels: this.props.data.map(t => t.name),
          data: {
            datasets: this.props.data.map(t => {
                colorSub += 30;
                return {
                    borderColor: 'rgb(255, 165, 0)',
                    backgroundColor: `rgb(255, ${195 - colorSub}, 0)`,
                    borderWidth: 1,
                    pointRadius: 0,
                    label: t.name,
                    data: [t.price.toFixed(5)]
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
                    type: 'logarithmic',
                    ticks: {
                        padding: 25
                    }
				}]
            }
        }
        });
    }

    getCards(){
        return (
            <div className={`card${this.props.loading ? ' card-loading' : ''}`}>
                <div className="card-image waves-effect waves-block waves-light">
                    { this.props.loading && <Loading /> }
                    <canvas className='chart activator' ref={this.chartRef}></canvas>
                </div>

                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{this.props.title}<i className="material-icons right">more_vert</i></span>
                </div>
                
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Best Performing 24h<i className="material-icons right">close</i></span>
                    {(this.props.loading ? <Loading /> : <p>Here is some more information about this product that is only revealed once clicked on.</p>)}
                </div>
          </div>
        )
    }

    render() {
        this.generateGraph();
        return (
            <>
                {(
                    this.getCards()
                )}
            </>
        )
    }
}
