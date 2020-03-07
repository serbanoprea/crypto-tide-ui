import React, { Component } from 'react';
import { getFromApi } from '../../utilities';
import config from '../../config';
import NavBar from '../../components/NavBar';
import GraphParallax from './components/GraphParallax';
import BestPerformingStats from '../../components/BestPerformingStats';
import Table from '../../components/Table';


export default class Overview extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingBtcGraph: true,
            loadingTopPerforming: true,
            loadingTopTrending: true,
            loadingWeeklyTopPerforming: true,
            loadingMonthlyTopPerforming: true,
            loadingRankedTopPerforming: true,
            loadingTableData: true,
            btcGraph: [],
            topPerforming: [],
            weeklyTopPerforming: [],
            monthlyTopPerforming: [],
            rankedTopPerforming: [],
            tableData: []
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

        getFromApi(config.paths.topWeekPerforming)
        .then(entities => {
            component.setState({weeklyTopPerforming: entities, loadingWeeklyTopPerforming:false});
        });

        getFromApi(config.paths.topMonthPerforming)
        .then(entities => {
            component.setState({monthlyTopPerforming: entities, loadingMonthlyTopPerforming:false});
        });

        getFromApi(config.paths.topRankedPerforming)
        .then(entities => {
            component.setState({rankedTopPerforming: entities, loadingRankedTopPerforming:false});
        });

        getFromApi(config.paths.pagedRanked(1, 1000))
        .then(entities => {
            component.setState({tableData:entities, loadingTableData:false});
        });
    }

  render() {
    return (
        <>
            <NavBar />
            <div className="row">
            <GraphParallax data={this.state.btcGraph} loading={this.state.loadingBtcGraph} title='Bitcoin to USD'/>
                <div className="row" id="tiles-row">
                    <div className={`show-on-medium-and-up col l3 m6${this.state.loadingTopPerforming ? ' card-loading': ''}`}>
                        <BestPerformingStats data={this.state.topPerforming} loading={this.state.loadingTopPerforming} title='Best Performing 24h' accessor='dayChange'/>
                    </div>
                    <div className={`show-on-medium-and-up col l3 m6${this.state.loadingWeeklyTopPerforming ? ' card-loading': ''}`}>
                        <BestPerformingStats data={this.state.weeklyTopPerforming} loading={this.state.loadingWeeklyTopPerforming} title='Best Performing 1w' accessor='weekChange'/>
                    </div>
                    <div className={`show-on-medium-and-up col l3 m6${this.state.loadingMonthlyTopPerforming ? ' card-loading': ''}`}>
                        <BestPerformingStats data={this.state.monthlyTopPerforming} loading={this.state.loadingMonthlyTopPerforming} title='Best Performing 30d' accessor='monthChange'/>
                    </div>
                    <div className={`show-on-medium-and-up col l3 m6${this.state.loadingRankedTopPerforming ? ' card-loading': ''}`}>
                        <BestPerformingStats data={this.state.rankedTopPerforming} loading={this.state.loadingRankedTopPerforming} title='Top Ranked Weekly' accessor='weekChange'/>
                    </div>
                </div>
            </div>
            <div className="container row table-container">
                <Table data={this.state.tableData} loading={this.state.loadingTableData}/>
            </div>
        </>
    );
  }
}
