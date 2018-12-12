import React, { Component } from 'react'
import RutesList from '../rutes/RutesList'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
            <div className="col s12 m12">
                <RutesList/>
            </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
