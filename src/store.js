import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default function generateStore(){
    const middleware = [thunk];

    const store = createStore(
        reducer,
        applyMiddleware(...middleware)
    );

    return store;
}