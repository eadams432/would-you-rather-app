import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QuestionList from './QuestionList';

class Dashboard extends Component{

    state = {
        key: 'unanswered'
    }

    setKey = (key) => {
        this.setState({
            key: key
        })
    }

    render(){
        return(
            <Tabs
                id="question-type-tabs"
                activeKey={this.state.key}
                onSelect={(key) => this.setKey(key)}
             >
            <Tab eventKey="unanswered" title="Unanswered Questions">
              <QuestionList answered={false}/>
            </Tab>
            <Tab eventKey="answered" title="Answered Questions">
              <QuestionList answered={true}/>
            </Tab>
          </Tabs>
        );
    }
}

export default Dashboard;