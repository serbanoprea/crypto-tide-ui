const config = {
    apiEndpoint: 'https://cryptotideapi.azurewebsites.net',
    paths: {
        topOverview: '/api/Overview/TopOverview',
        overviewByCoin: coin => '/api/Overview/CoinOverview/' + coin,
        graphRankedTrends: '/api/Trending/GraphTopRanked',
        graphHourlyTrends: '/api/Trending/GraphHourlyTrends',
        graphHourlyByCoin: coin => '/api/Trending/GraphHourlyTrends/' + coin,
        topDayPerforming: '/api/PopulationStats/TopDailyCoinAggregates',
        topWeekPerforming: '/api/PopulationStats/TopWeeklyCoinAggregates',
        topMonthPerforming: '/api/PopulationStats/TopMonthlyCoinAggregates'
    }
}

export { config };