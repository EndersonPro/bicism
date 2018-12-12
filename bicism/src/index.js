import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/* const reducer = (state, action) => {
    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'AUM':
            newState.count = state.count + 1;
            return newState;
        default:
            return state;
    }

}

const state = {
    count: 2
} */

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
