import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-component">
                <div className="loading-content">
                    <span className="loading-text">Please wait</span>
                    <Spinner animation="border" variant="primary"/>
                </div>
            </div>
        );
    }
}