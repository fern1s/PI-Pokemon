import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import FirstPage from "./components/FirstPage";
import Home from "./components/Home";

import reportWebVitals from './reportWebVitals';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "./store"

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const Root = ( //probando esto
<Provider store={store}>

  <Router>
    <Switch>
      <Route exact path="/">
        <FirstPage />
      </Route>
      <Route exact path="/about">
        <h2>About</h2>
      </Route>
      <Route exact path="/Home">
        <Home />
      </Route>
      <Route path="/">
        <h2>Default if no match</h2>
      </Route>
    </Switch>
  </Router>
  
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
