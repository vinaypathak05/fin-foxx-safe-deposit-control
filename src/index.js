import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { errorBarMiddleware } from './components/Common/errorbar';
import reducers from './reducer';
import {loadState, saveState } from './reducer/localStorage';


import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "./assets/css/custom.css";
import "./assets/css/rich-text-editor.css";
import "./assets/css/react-confirm-alert.css";

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";


var persistedState = loadState();
// console.log('persistedState :- ', persistedState)
var createStoreWithMiddleware = applyMiddleware(thunk, loadingBarMiddleware(), errorBarMiddleware())(createStore);
export var store = createStoreWithMiddleware(reducers,persistedState);
store.subscribe(()=>{
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        {/* <Redirect from="/" to="/admin/index" /> */}
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
