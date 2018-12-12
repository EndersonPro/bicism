import React from 'react';

const RutesSummary = () => {
    return (
        <div className="card z-depth-0 routes-summary">
            <div className="card-image">
                <img src="http://lorempixel.com/400/200/" />
                <span className="card-title">
                    Rute Title
                    </span>
            </div>
            <div className="card-content grey-text text-darken-3">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem maxime esse nisi. Sequi ad obcaecati maiores architecto excepturi, quibusdam optio illum porro enim. Harum </p>
            </div>
            <div className="card-action">
                <a className="waves-effect waves-light btn"><i className="material-icons right">remove_red_eye</i>Ver Ruta</a>
            </div>
        </div>
    )
}

export default RutesSummary;