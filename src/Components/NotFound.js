import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function NotFound(props){

    if(!props.authedUser){
        return <Redirect to='/login'/>
    }

    return(
        <p>Sorry, no page found with that URL</p>
    );
}

function mapStateToProps(state, props){
    return {
        authedUser: state.authedUser
    }
}

export default connect()(NotFound);

