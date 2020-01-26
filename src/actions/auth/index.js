import * as constants from '../../constants/authentication';
import configuration from '../../config';
import jwtDecode from 'jwt-decode';
import * as utils from '../../utilities';


const saveCredentials = (token, decoded, role) => {
    utils.saveToLocalStorage([
        {
            data: decoded.given_name,
            key: 'email'
        },
        {
            data: decoded.exp,
            key: 'expiresAt'
        },
        {
            data: token,
            key: 'token'
        },
        {
            data: role,
            key: 'role'
        }
    ]);
}

export const login = (credentials, red) => dispatch => {
    const {email, password} = credentials;

    const data = {
        email: email,
        password: password
    }

    dispatch({type: constants.LOGIN_ATTEMPT});

    fetch(`${configuration.apiEndpoint}/users/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        try{
            const decodedToken = jwtDecode(result.token)
            saveCredentials(result.token, decodedToken, result.role);

            dispatch({
                type: constants.LOGIN_SUCCESS,
                payload: {
                    token: result.token,
                    role: result.role,
                    email: result.email,
                    expiresAt: decodedToken.exp
                }
            });
        } catch(e) {
            dispatch({type: constants.LOGIN_FAILURE});
        }
    }).catch(
        e => {dispatch({type: constants.LOGIN_FAILURE}); console.log(e);}
    );
}
