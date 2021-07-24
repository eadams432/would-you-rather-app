import { RECEIVE_USERS, USER_VOTE, USER_ADD_QUESTION } from "../Actions/users";


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
                [action.user] : {
                    ...state[action.user],
                   answers:{
                        ...state[action.user].answers,
                        [action.question] : action.answer
                    }
                }
            }
        case USER_ADD_QUESTION:
            return {
                ...state,
                [action.user]:{
                    ...state[action.user],
                    questions: [...state[action.user].questions, action.question]
                }
            }
        default:
            return state;
    }
}