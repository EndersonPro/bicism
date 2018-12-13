import React from 'react';
import { Link } from 'react-router-dom';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

import { connect } from 'react-redux';

const Navbar = () => {
    return (
        <ul id="slide-out" className="sidenav">
            <Link to="/" className="brand-logo">Home</Link>
            <SignedInLinks />
            <SignedOutLinks />
        </ul>
    )
}

const mapStateToProps = state => {
    return {

    }
}


export default connect(mapStateToProps)(Navbar);
