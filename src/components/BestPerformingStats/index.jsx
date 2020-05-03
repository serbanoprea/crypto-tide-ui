import React, { Component } from 'react'
import Loading from '../../components/Loading';
import Chart from "chart.js";
import StatImage from './StatImage';

export default class BestPerformingStats extends Component {
    chartRef = React.createRef();

    getCollection(){
        var items = this.props.data.map(entity => {            
            return (
                <li className="collection-item avatar" key={entity.symbol}>
                    <StatImage entity={entity} />
                    <span className="title">{entity.name}</span>
                    <div>Price: ${entity.price.toFixed(5)}<br /><span className='green-text text-darken-4'>+{entity[this.props.accessor].toFixed(5)}%</span></div>
                    <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
                </li>
            )
        });

        return (
            <>
            <ul className="collection">
                {items}
            </ul>
            </>
        )
    }

    generateGraph(){
        if(!this.props.data.length)
            return;
            
        var chartRef = this.chartRef.current.getContext("2d");
        var colorSub = 0;

        new Chart(chartRef, {
          label: this.props.title,
          type: "bar",
          labels: this.props.data.map(t => t.name),
          data: {
            datasets: this.props.data.map(t => {
                colorSub += 30;
                var color = `rgb(255, ${195 - colorSub}, 0)`
                var borderColor = color.replace(', 0)', ', 0, 0.5)')
                return {
                    backgroundColor: color,
                    borderColor: borderColor,
                    label: t.name,
                    data: [t.price.toFixed(5)]
                }
            }),
          },
          options: {
            responsive: true,
              tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function() {}
                }
              },
             hover: {
                mode: 'nearest',
                intersect: true
              },
            legend: {
                display: true,
                position: 'bottom'
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
					display: false,
                    type: 'logarithmic'
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
                    <span className="card-title activator">{this.props.title}<i className="material-icons right">more_vert</i></span>
                </div>
                
                <div className="card-reveal">
                    <span className="card-title">{this.props.title}<i className="material-icons right">close</i></span>
                    {(this.props.loading ? <Loading /> : <div>{this.getCollection()}</div>)}
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
