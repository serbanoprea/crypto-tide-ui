import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import generateStore from './store';

const store = generateStore();

ReactDOM.render(    
    <Provider store={store} key="provider">
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
