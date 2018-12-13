import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import GoogleMaps from '../googleMaps/GoogleMaps'

const RuteDetails = (props) => {
    const { rute, auth } = props;
    if (!auth.uid) return <Redirect to="/iniciarSesion" />
    if (rute) {
        return (
            <div>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px'
                }} className="container">
                    <GoogleMaps 
                        direccion={rute.direccion}
                        title={rute.nombre}
                         />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col s12 m12 section rutes-details">
                            <div className="card z-depth-0">
                                <div className="card-content">
                                    <div className="card-title">
                                        {rute.nombre}
                                    </div>
                                    <ul className="collection">
                                        <li className="collection-item"><strong>Descripcion: </strong>{rute.descripcion}</li>
                                        <li className="collection-item"><strong>Terreno: </strong><span>{rute.terreno}</span></li>
                                        <li className="collection-item"><strong>Altura: </strong><span>{rute.altura}</span></li>
                                        <li className="collection-item"><strong>Tiempo: </strong><span>{rute.tiempo}</span></li>
                                    </ul>
                                </div>
                                <div className="card-action grey lighten-4 grey-text">
                                    Hola</div>
                            </div>
                        </div>
                        <div className="col s12 m12">
                            <Link to="/" className="waves-effect waves-light btn right">Atras</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <p>Cargando Ruta....</p>
            </div>
        )
    }
}

const mapStateToProps = (state, owProps) => {
    const id = owProps.match.params.id;
    const rutes = state.firestore.data.rutas;
    const rute = rutes ? rutes[id] : null;
    return {
        rute,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'rutas' }
    ])
)(RuteDetails)

