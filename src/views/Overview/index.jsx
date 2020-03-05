import React, { Component } from 'react';
import { getFromApi } from '../../utilities';
import config from '../../config';
import NavBar from '../../components/NavBar';
import GraphParallax from './components/GraphParallax';
import BestPerformingStats from '../../components/BestPerformingStats';


export default class Overview extends Component {

    constructor(props){
        super(props);
        this.state = {
            loadingBtcGraph: true,
            loadingTopPerforming: true,
            loadingTopTrending: true,
            btcGraph: [],
            topPerforming: [],
            trend24h: {},
        };
    }

    componentDidMount(){
        let component = this;
        getFromApi(config.paths.graphHourlyByCoin('btc'))
        .then(entity => {
            component.setState({btcGraph: [entity], loadingBtcGraph:false});
        });

        getFromApi(config.paths.topDayPerforming)
        .then(entities => {
            component.setState({topPerforming: entities, loadingTopPerforming:false});
        });

        getFromApi(config.paths.graphHourlyTrends)
        .then(entities => {
            component.setState({topTrending: entities, loadingTopTrending: false});
        });
    }

  render() {
    return (
        <>
            <NavBar />
            <div className="row">
            <GraphParallax data={this.state.btcGraph} loading={this.state.loadingBtcGraph} title='Bitcoin to USD'/>
                <div className="row" id="tiles-row">
                    <div className="show-on-medium-and-up col l3 m6">
                        <BestPerformingStats data={this.state.topPerforming} loading={this.state.loadingTopPerforming} title='Best Performing 24h'/>
                    </div>
                    <div className="show-on-medium-and-up col l3 m6">
                        <BestPerformingStats data={this.state.topPerforming} loading={this.state.loadingTopPerforming} title='Best Performing 24h'/>
                    </div>
                    <div className="show-on-medium-and-up col l3 m6">
                        <BestPerformingStats data={this.state.topPerforming} loading={this.state.loadingTopPerforming} title='Best Performing 24h'/>
                    </div>
                    <div className="show-on-medium-and-up col l3 m6">
                        <BestPerformingStats data={this.state.topPerforming} loading={this.state.loadingTopPerforming} title='Best Performing 24h'/>
                    </div>
                </div>
            </div>
        </>
    );
  }
}
