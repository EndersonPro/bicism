import React from 'react';
import RutesSummary from './RutesSummary'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const RutesList = ({ rutes, auth }) => {
    if (!auth.uid) return <Redirect to="/iniciarSesion" />
    return (
        <div className="rutes-list section">
            {rutes && rutes.map(rute => {
                return (<RutesSummary rute={rute} key={rute.id} />)
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(RutesList);