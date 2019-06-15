import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import fire from "../config/Fire";

export default class Login extends Component {
    state = {
        currentEmail: "",
        currentPassword: "",
        loginMessage: "",
    };

    setEmail = event => {
        this.setState({ currentEmail: event.target.value });
    };
    setPassword = event => {
        this.setState({ currentPassword: event.target.value });
    };

    login = e => {
        const { currentEmail, currentPassword } = this.state;
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(currentEmail, currentPassword).then(() => {
            fire.firestore().collection('books').doc(this.state.currentEmail).get().then( async (doc) => {
                if (doc.exists) {
                    const books = doc.data();
                    this.props.addBooks(books.books);
                } else {
                    console.log("No such document!");
                    this.props.getBooksAndAddToDatabase();
                }
            })
        }).catch((error) => {
            this.setState({
                loginMessage: error.message,
            });
        })
    };

    signup = async e => {
        const { currentEmail, currentPassword } = this.state;
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(currentEmail, currentPassword).then(async () => {
            this.props.getBooksAndAddToDatabase();
        }).catch((error) => {
            this.setState({
                loginMessage: error.message,
            })
        })
    };

    render() {
        return (
            <div className="form-login">
                <div className="text-center mb-4">
                    <h1>Welcome to iShelf</h1>
                </div>
                <Form onSubmit={this.login}>
                    <Col>
                        <Form.Control
                            className="form-label-group"
                            type="text"
                            name="Email"
                            value={this.state.currentEmail}
                            onChange={this.setEmail}
                            placeholder="Email"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            className="form-label-group"
                            type="password"
                            name="password"
                            value={this.state.currentPassword}
                            onChange={this.setPassword}
                            placeholder="password"
                        />
                    </Col>
                    <div className="btn-container">
                        <Button variant="primary" type="submit"
                                className="btn-login">
                            Login
                        </Button>
                        <Button variant="success"
                                className="btn-login"
                                onClick={this.signup}>
                            Sign up
                        </Button>
                    </div>
                </Form>
                <div className="login-message"><h1>{this.state.loginMessage}</h1></div>
            </div>
        );
    }
}