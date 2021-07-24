import Login from "./Login";
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Question from './Question';
import { BrowserRouter, Route} from 'react-router-dom';
import Navbar  from './Navbar'
import CreatePoll from "./CreatePoll";
import Leaderboard from './Leaderboard';


function App(props) {

  return (
    <BrowserRouter>
      <Container fluid >
        <Navbar />
        <Container>
          <Route exact path='/' component={Dashboard} />
          <Route path='/new' component={CreatePoll}/>
          <Route path='/login' render={()=>(<Login users={props.users} />)} />
          <Route path='/question/:id' component={Question} />
          <Route path='/leaderboard' component={Leaderboard} />
        </Container>
      </Container>
    </BrowserRouter>
    
  );
}


function mapStateToProps({ authedUser, questions, users}){
  return {
    authedUser,
    questions,
    users
  }
}

const connectedApp = connect(mapStateToProps)(App)
export default connectedApp;
