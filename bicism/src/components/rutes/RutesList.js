import React from 'react';
import RutesSummary from './RutesSummary'

const RutesList = ({ rutes }) => {
    return (
        <div className="rutes-list section">
            {rutes && rutes.map(rute => {
                return (<RutesSummary rute={rute} key={rute.nombre}/>)
            })}
        </div>
    )
}

export default RutesList;