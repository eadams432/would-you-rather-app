import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap';


class UserCard extends Component {
    render() {
        return (
            <Card>
                <Card.Title>{this.props.user.name}</Card.Title>
                <Card.Body>
                    <Row>
                        <Col xs={3}><img src={this.props.user.avatarURL} alt='avatar_image'/></Col>
                        <Col>
                            <p>Answered Questions: {this.props.user.numberAnswered}</p>
                            <p>Created Questions: {this.props.user.numberCreated}</p>
                        </Col>
                        <Col>
                            Total Score: { this.props.user.totalScore }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default UserCard;