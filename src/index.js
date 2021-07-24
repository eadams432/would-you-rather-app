import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { createStore } from 'redux';
import middleware from './Middleware';
import { Provider } from 'react-redux';
import reducer from './Reducers';
import { handleInitialData } from './Actions/shared';
import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore(reducer, middleware);

store.dispatch(handleInitialData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);