import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import generateStore from './store';
import { BrowserRouter } from 'react-router-dom'


const store = generateStore();

ReactDOM.render(    
    <BrowserRouter>
        <Provider store={store} key="provider">
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
