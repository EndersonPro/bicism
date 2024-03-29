const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login failed');
            return {
                ...state,
                authError: 'Fallo en el inicio de sesion'
            };
        case 'LOGIN_SUCCESS':
            console.log('Login Success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('Cerrar Sesion Satisfatorio');
            return state;
        case 'SIGNUP_SUCCES':
            console.log('Registro completo');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('Error en el registrp');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer