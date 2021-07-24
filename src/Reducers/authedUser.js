import { LOGIN_USER } from "../Actions/authedUser";

export default function authedUser(state=null, action){
    switch(action.type){
        case LOGIN_USER:
            return action.authedUser
        default:
            return state
    }
}

