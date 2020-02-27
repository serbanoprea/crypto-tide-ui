import React, { Component } from 'react';
import Chart from "chart.js";
import { getRandomColor } from '../../../utilities';

export default class ChartGraph extends Component {
    chartRef = React.createRef();

    componentDidMount(){
        var chartRef = this.chartRef.current.getContext("2d");
        var component = this;
        if(!this.props.data.length)
            return;

        new Chart(chartRef, {
          type: "line",          
          data: {
            labels: component.props.data[0].dates,
            datasets: component.props.data.map(t => {
                var color = getRandomColor();
                return {
                    borderColor: color,
                    pointBackgroundColor: color,
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
                position: "right",
                align: "middle",
                onClick: function(e, legendItem) {
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;
                    var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
          
                    ci.data.datasets.forEach(function(e, i) {
                      var meta = ci.getDatasetMeta(i);
          
                      if (i !== index) {
                        if (!alreadyHidden) {
                          meta.hidden = meta.hidden === null ? !meta.hidden : null;
                        } else if (meta.hidden === null) {
                          meta.hidden = true;
                        }
                      } else if (i === index) {
                        meta.hidden = null;
                      }
                    });
          
                    ci.update();
                  },
            },
            scales: {
                xAxes: [{                    
                    gridLines: {
                        offsetGridLines: true,
                        drawOnChartArea: true
                    },
                    type: 'time'
                }],
                yAxes: [{
					display: true,
                    type: 'logarithmic',
                    ticks: {
                        padding: 25
                    }
				}]
            }
        }
        });
    }

  render() {
    return (
      <div>
          <canvas className='chart' ref={this.chartRef}>
          </canvas>
      </div>
    );
  }
}
