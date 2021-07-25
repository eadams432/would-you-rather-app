export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function handleAuthedUser(user){
    return {
        type: LOGIN_USER,
        authedUser: user
    }
}

export function handleUserLogout(){
    return {
        type: LOGOUT_USER
    }
}
