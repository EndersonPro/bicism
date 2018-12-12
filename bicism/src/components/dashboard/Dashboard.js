import React, { Component } from 'react'
import RutesList from '../rutes/RutesList'

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
  render() {
    //console.log(this.props)
    const { rutes } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12">
            <RutesList rutes={rutes} />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  console.log(state)
  return {
    rutes: state.rutes.rutes
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "rutas" }
  ])
)(Dashboard);
