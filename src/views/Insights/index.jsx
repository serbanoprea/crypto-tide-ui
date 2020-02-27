import React, { Component } from 'react'
import { getFromApi } from '../../utilities';
import config from '../../config';
import NavBar from '../../components/NavBar';
import Ticker from './components/Ticker';
import TrendingGraph from './components/TrendingGraph';
import ChartGraph from './components/ChartGraph';

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

                <h2 className="white-text center">Plotly</h2>

                {/* Graphs */}
                <div className="overview-container orange-shadow">
                    <TrendingGraph data={this.state.rankedGraph} loading={this.state.loadingRanked} title="Top 20 Ranked"/>
                </div>
                <div className="overview-container orange-shadow top-spaced">
                    <TrendingGraph data={this.state.topTrending} loading={this.state.loadingTopTrending} title="Top 10 Trending"/>
                </div>
                
                <h2 className="white-text center">Chart JS</h2>
                {(
                    !this.state.loadingRankedGraph &&
                    <div className="overview-container orange-shadow top-spaced">
                        <ChartGraph data={this.state.rankedGraph} title='Top 20 Ranked'/>
                    </div>
                )}
                {(
                    !this.state.loadingTopTrending &&
                    <div className="overview-container orange-shadow top-spaced">
                        <ChartGraph data={this.state.topTrending} title='Top 10 Trending'/>
                    </div>
                )}
            </div>
        )
    }
}
