import React, { Component } from 'react'
import Loading from '../../components/Loading';
import Chart from "chart.js";

export default class BestPerformingStats extends Component {
    chartRef = React.createRef();

    getCollection(){
        var items = this.props.data.map(entity => {
            var errored = false;
            return (
                <li className="collection-item grey darken-1 avatar" key={entity.symbol}>
                    <img
                    src={!errored ? `https://cryptologos.cc/logos/${entity.name.toLowerCase().replace(' ', '-')}-${entity.symbol}-logo.svg?v=001` : "https://cryptologos.cc/logos/startcoin-start-logo.svg?v=001"}
                    onError = {() => {errored = true}}
                    className="circle" />
                    <span className="title amber-text text-lighten-1">{entity.name}</span>
                    <p><span className="amber-text text-lighten-1">Price: ${entity.price.toFixed(5)}</span><br /><span className='green-text text-lighten-4'>+{entity[this.props.accessor].toFixed(5)}%</span></p>
                    <a href="#!" class="secondary-content"><i class="material-icons amber-text text-lighten-1">send</i></a>
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
            <div className={`card${this.props.loading ? ' card-loading' : ''} grey darken-3`}>
                <div className="card-image waves-effect waves-block waves-light">
                    { this.props.loading && <Loading /> }
                    <canvas className='chart activator' ref={this.chartRef}></canvas>
                </div>

                <div className="card-content">
                    <span className="card-title activator amber-text text-lighten-2">{this.props.title}<i className="material-icons right">more_vert</i></span>
                </div>
                
                <div className="card-reveal grey darken-2">
                    <span className="card-title amber-text text-lighten-2">{this.props.title}<i className="material-icons right">close</i></span>
                    {(this.props.loading ? <Loading /> : <p>{this.getCollection()}</p>)}
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
