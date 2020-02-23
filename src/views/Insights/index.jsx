import React, { Component } from 'react'
import { getFromApi } from '../../utilities';
import config from '../../config';

export default class Insights extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingTopRanked: true,
            loadingRankedGraph: true,
            loadingTopTrending: true,
            topRanked: null,
            rankedGraph: null,
            topTrending: null,
        };
    }

    componentWillMount(){
        let component = this;
        getFromApi(config.paths.topOverview)
        .then(entities => {
            component.setState({topRanked: entities, loadingTopRanked:false});
            console.log(component.state);
        });

        getFromApi(config.paths.graphRankedTrends)
        .then(entities => {
            component.setState({rankedGraph: entities, loadingRankedGraph:false});
            console.log(component.state);
        });

        getFromApi(config.paths.graphHourlyTrends)
        .then(entities => {
            component.setState({topTrending: entities, loadingTopTrending: false});
            console.log(component.state);
        });
    }

    render() {
        return (
            <div>
                <h3>Test</h3>
            </div>
        )
    }
}
