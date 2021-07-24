import { _getQuestions, _getUsers} from '../Utils/_DATA'
import { receiveUsers } from './users';
import { receiveQuestions }from './questions' 


export function handleInitialData(){
    return (dispatch) => {
        return Promise.all([_getQuestions(), _getUsers()])
        .then((values)=>{
            const questions = values[0];
            const users = values[1];
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        }).catch((err)=>{
            alert('Unable to retrieve data, please try again');
        })
        ;
    }
}