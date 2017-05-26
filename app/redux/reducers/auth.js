const initialState = { isLoggedIn: false, user: null };

function auth(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
            return state;
        case 'SIGN_IN_FAILURE':
            return { ...state, isLoggedIn: false, user: null };
        case 'LOGIN':
            return { ...state, isLoggedIn: true, user: action.payload };
        case 'LOGOUT_SUCCESS':
            return { ...state, isLoggedIn: false, user: null };
        case 'LOGOUT_FAILURE':
            return { ...state };
        default:
            return state;
    }
}

export default auth;
