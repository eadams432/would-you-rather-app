export const LOGIN_USER = 'LOGIN_USER';

export function handleAuthedUser(user){
    return {
        type: LOGIN_USER,
        authedUser: user
    }
}
