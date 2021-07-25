import React, { Component } from 'react'
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class QuestionPreview extends Component {
    render() {
        const id = this.props.id;
        const buttonText = this.props.isAnswered ? 'View' : 'Vote';
        return (
            <div>
                <Row>
                    {this.props.text}
                </Row>
                <Row>
                    <Button 
                        className='vote-button'
                        as={Link} 
                        to={`/question/${id}`}>
                        {buttonText}
                    </Button>
                </Row>
            </div>
        );
    }
}
export default QuestionPreview;