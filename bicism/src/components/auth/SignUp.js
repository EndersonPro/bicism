import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'

export class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

    render() {
        const { auth } = this.props;
        if (auth.uid) return <Redirect to="/" />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Formulario de Registro</h5>
                    <div className="input-field">
                        <label htmlFor="name">Nombre/s y apellido/s</label>
                        <input type="text" id="name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Correo</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn z-depth-0">Registrarse</button>
                    </div>
                </form>

                <span>¿Ya tienes cuenta?,
                    <Link to="/iniciarSesion"> Inicia Sesion</Link>
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: newUser => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)