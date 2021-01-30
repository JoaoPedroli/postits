import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

// pages
import Home from './pages/Home'

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}