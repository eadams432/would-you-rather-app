
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_VOTE = 'USER_VOTE';
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION';

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function userVote(user, question, answer){
    return {
        type: USER_VOTE,
        user,
        question,
        answer
    }
}

export function handleUserVote(user, question, answer){
    return (dispatch) => {
        dispatch(userVote(user, question, answer));
    }
}

export function userAddQuestion(user, question){
    return {
        type: USER_ADD_QUESTION,
        user,
        question
    }
}


