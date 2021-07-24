
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_VOTE = 'USER_VOTE'

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function userVote(user, question){
    return {
        type: USER_VOTE,
        user,
        question
    }
}

export function handleUserVote(user, question, answer){
    return (dispatch) => {
        dispatch(userVote(user, question, answer));
        //todo: update db
    }
}



