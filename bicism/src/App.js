import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {this.props.info}
          <button onClick={this.props.aumentar}> Aumentar </button>
          <br></br>
        </header>
      </div>
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
