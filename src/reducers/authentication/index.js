import * as constants from '../../constants/authentication';
import { getFromLocalStorage, generateReducer } from '../../utilities';


const initialState = {
    token: getFromLocalStorage('token') || null,
    role: getFromLocalStorage('role') || '0',
    email: getFromLocalStorage('email') || '',
    userAuthenticating: false,
    userAuthenticated: getFromLocalStorage('token') || false,
    expiresAt: getFromLocalStorage('expiresAt') || '',
    failedLogin: false
};

export default generateReducer(initialState, {
    [constants.LOGIN_ATTEMPT]: state => 
        Object.assign({}, state, {
            token: null,
            role: '0',
            email: '',
            userAuthenticating: true,
            userAuthenticated: false,
            expiresAt: '',
            failedLogin: false
        }),
    [constants.LOGIN_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            token: payload.token,
            role: payload.role,
            email: payload.email,
            userAuthenticating: false,
            userAuthenticated: true,
            expiresAt: payload.expiresAt
        })
});