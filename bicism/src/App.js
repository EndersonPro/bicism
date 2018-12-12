import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import RutesDetails from './components/rutes/RuteDetails'

import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/ruta/:id" component={RutesDetails}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.count
  }
}

/* const mapsDispatchToProps = {
  aumentar: () => { return { type: 'AUM' } },
  disminuir: () => { return { type: 'DIS' } },
} */

const mapsDispatchToProps = dispatch => {
  return {
    aumentar: () => {
      dispatch({ type: 'AUM' })
    }
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(App);
