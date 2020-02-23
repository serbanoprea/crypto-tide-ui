import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoginForm from './components/Auth'
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Insights from './views/Insights';

function App() {
  return (
      <div className="App container">
        return (
            <div>
                <Switch>
                    <Route path='/login' component={LoginForm} />
                    <Route path='/insights' component={Insights} />
                </Switch>
            </div>
        )
      </div>
  );
}

export default connect()(App);
