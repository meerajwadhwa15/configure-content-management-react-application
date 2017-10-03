import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import App from './app';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { reducers } from './reducers/';
import { Provider } from 'react-redux';

let userDetail = localStorage.getItem('userDetail');
if(userDetail) {
    userDetail = JSON.parse(userDetail);
}

const store = createStore(reducers, {UserDetailReducer: userDetail});

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);