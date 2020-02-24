import React, { Component } from 'react'
import { getFromApi } from '../../utilities';
import config from '../../config';
import NavBar from '../../components/NavBar';
import Ticker from './components/Ticker';
import TrendingGraph from './components/TrendingGraph';

export default class Insights extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingTopRanked: true,
            loadingRankedGraph: true,
            loadingTopTrending: true,
            topRanked: [],
            rankedGraph: [],
            topTrending: [],
        };
    }

    componentDidMount(){
        let component = this;
        getFromApi(config.paths.topOverview)
        .then(entities => {
            component.setState({topRanked: entities, loadingTopRanked:false});
        });

        getFromApi(config.paths.graphRankedTrends)
        .then(entities => {
            component.setState({rankedGraph: entities, loadingRankedGraph:false});
        });

        getFromApi(config.paths.graphHourlyTrends)
        .then(entities => {
            component.setState({topTrending: entities, loadingTopTrending: false});
        });
    }

    componentWillUnmount(){
        this.setState({
            loadingTopRanked: true,
            loadingRankedGraph: true,
            loadingTopTrending: true,
            topRanked: [],
            rankedGraph: [],
            topTrending: [],
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Ticker data={this.state.topRanked} loading={this.state.loadingTopRanked}/>
                <TrendingGraph data={this.state.rankedGraph} loading={this.state.loadingRanked}/>
                <h3>Test</h3>
            </div>
        )
    }
}
