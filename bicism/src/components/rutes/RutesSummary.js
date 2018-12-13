import React from 'react';
import { Link } from 'react-router-dom'

const RutesSummary = ({ rute }) => {
    return (
        <div className="card z-depth-0 routes-summary">
            <div className="card-image">
                <img src={rute.imagen} />
                <span className="card-title">
                    {rute.nombre}
                </span>
            </div>
            <div className="card-content grey-text text-darken-3">
                <p>{rute.descripcion}</p>
            </div>
            <div className="card-action">
                <Link to={'/ruta/' + rute.id} className="waves-effect waves-light btn"><i className="material-icons right">remove_red_eye</i>Ver Ruta</Link>
            </div>
        </div>
    )
}

export default RutesSummary;