import React, { Component } from 'react'
import { connect } from 'react-redux';
import UserCard from './UserCard';
import { Redirect } from 'react-router-dom';

class Leaderboard extends Component {
    render() {

        if (!this.props.authedUser) {
            return <Redirect to='/login' />
        }

        const usersArray = Object.entries(this.props.users).map(([key,user])=>{
            const updatedUser = {...user};
            console.log(updatedUser);
            updatedUser.numberAnswered = Object.keys(user.answers).length;
            updatedUser.numberCreated = user.questions.length;
            updatedUser.totalScore = updatedUser.numberAnswered + updatedUser.numberCreated;
            return updatedUser;
        });
        usersArray.sort((a,b)=>{return b.totalScore - a.totalScore});
        return (
            <div>
                <h3>Leaderboard</h3>
                {usersArray.map((user)=>{
                    return <UserCard key={user.id} user={user} />
                })}
            </div>
        );
    }
}

function mapStateToProps(state, props){
    return {
        users: state.users,
        authedUser: state.authedUser
    }
}
export default connect(mapStateToProps)(Leaderboard);