import React, { Component } from "react";
import Shelf from "../components/Shelf";
import FAB from "../components/FAB";
import fire from "../config/Fire";
import Button from "react-bootstrap/Button";
import { getAll } from "../BooksAPI";

export default class Home extends Component {

    componentDidMount() {
        this.realTimeDb();
    }

    realTimeDb() {
        const db = fire.firestore();
        db.collection('books').doc(this.props.user.email).onSnapshot(async (doc) => {
            console.log('document data loaded', doc);
            if (!doc.data()) {
                await this.getDefaultBooks();
                return;
            }
            const books = doc.data();
            this.props.addBooks(books.books);
        });
    }

    getDefaultBooks = async () => {
        const books = await getAll();
        console.log('books in getDefault', books);
        this.props.addBooks(books);
        fire.firestore().collection('books').doc(this.props.user.email).set({ books });
    };

    logout = () => {
        fire.auth().signOut();
    };

    render() {
        return (
            <div className="list-books">
              <div className="list-books-title">
                <i className="fas fa-book-reader"/>
                <h1 className="list-books-title-item">iShelf</h1>
                  <div className="member-bar">
                      <h3 className="welcome-text">You are logged in as {this.props.user.email}</h3>
                      <Button className="logout-button" onClick={this.logout}>Logout</Button>
                  </div>
              </div>
              <div className="list-books-content">
                <Shelf title="Currently Reading" inHome={true} books={this.props.currentlyReading} deleteBook={this.props.deleteBook} moveBook={this.props.moveBook}/>
                <Shelf title="Want To Read" inHome={true} books={this.props.wantToRead} deleteBook={this.props.deleteBook} moveBook={this.props.moveBook} />
                <Shelf title="Read" inHome={true} books={this.props.read} deleteBook={this.props.deleteBook} moveBook={this.props.moveBook}/>
              </div>
              <FAB/>
              <footer className="footer">
                <p className="footer-text">Built with <i className="fas fa-heart"/> by Nistor Sergiu Cosmin</p>
              </footer>  
            </div>
        )
    }
}