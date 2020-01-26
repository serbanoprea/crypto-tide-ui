import React from 'react';
import { connect } from 'react-redux';
import HomePage from './views/HomePage';
import './App.css';

function App() {
  return (
      <div className="App container">
        <HomePage />
      </div>
  );
}

export default connect()(App);
