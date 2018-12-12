import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <div>
            <li><NavLink to='/registrarse'>Registrarse</NavLink></li>
            <li><NavLink to='/iniciarSesion'>Iniciar Sesion</NavLink></li>
        </div>
    )
}

export default SignedOutLinks;