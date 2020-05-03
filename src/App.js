import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoginForm from './components/Auth'
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Insights from './views/Insights';
import Overview from './views/Overview';

function App() {
  return (
      <div className="App">
            <div>
                <Switch>
                    <Route path='/login' component={LoginForm} />
                    <Route path='/insights' component={Insights} />
                    <Route path='/overview' component={Overview} />
                </Switch>
            </div>
      </div>
  );
}

export default connect()(App);
