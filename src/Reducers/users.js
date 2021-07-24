import { RECEIVE_USERS, USER_VOTE } from "../Actions/users";


export default function users(state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case USER_VOTE:
            return {
                ...state,
                [action.user.id] : {
                    ...action.user,
                    [action.user.answers]:{
                        ...action.user.answers,
                        [action.user.question] : action.user.answer
                    }
                }
            }
        default:
            return state;
    }
}