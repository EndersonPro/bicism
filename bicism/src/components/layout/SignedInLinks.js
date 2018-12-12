import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <div>
            <li><NavLink to='/'>Quienes Somos</NavLink></li>
            <li><NavLink to='/'>Cerrar Sesion</NavLink></li>
            {/* <li><NavLink to='/' className="btn btn-floating pink lighten-1">Contacto</NavLink></li> */}
        </div>
    )
}

export default SignedInLinks;