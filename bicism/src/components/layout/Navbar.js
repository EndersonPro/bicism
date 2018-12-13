import React from 'react';
import { Link } from 'react-router-dom';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

import { connect } from 'react-redux';


const Navbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
    return (
        <ul id="slide-out" className="sidenav">
            <Link to="/" className="brand-logo">Home</Link>
            {links}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps)(Navbar);
