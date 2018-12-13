import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    return (
        <div>
            <li><NavLink to='/'>Quienes Somos</NavLink></li>
            <li><a onClick={props.signOut}>Cerrar Sesion</a></li>
            {/* <li><NavLink to='/' className="btn btn-floating pink lighten-1">Contacto</NavLink></li> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);