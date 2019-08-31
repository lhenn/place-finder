import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/landing/Landing'
import PlaceList from './components/places/PlaceList'
import PlaceDetails from './components/places/PlaceDetails'




function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/places' component={PlaceList} />
          <Route path='/place:id' component={PlaceDetails} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
