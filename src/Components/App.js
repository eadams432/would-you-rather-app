import Login from "./Login";
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Question from './Question';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation  from './Navigation'
import CreatePoll from "./CreatePoll";
import Leaderboard from './Leaderboard';
import NotFound from "./NotFound";
import '../App.css';


function App(props) {

  return (
    <BrowserRouter>
      <Container fluid >
        <Navigation />
        <Container>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/add' component={CreatePoll}/>
            <Route path='/login' component={Login} />
            <Route path='/question/:id' component={Question} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='*' component={NotFound} />
          </Switch>
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

