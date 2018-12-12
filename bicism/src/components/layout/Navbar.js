import React from 'react';
import { Link } from 'react-router-dom';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';


const Navbar = () => {
    return (
        <ul id="slide-out" className="sidenav">
            <SignedInLinks />
            <SignedOutLinks />
        </ul>
    )
}

export default Navbar;
