import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import RutesDetails from './components/rutes/RuteDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'


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
            <Route path="/iniciarSesion" component={SignIn}/>
            <Route path="/registrarse" component={SignUp}/>
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
