import React, { Component } from 'react';
import fire from '../config/Fire';
import { getAll } from '../BooksAPI';
import Loading from '../components/Loading';

export const MyContext = React.createContext(undefined);

export default class index extends Component {

    constructor() {
        super();
        this.state = {
            user: undefined,
            books: [],
            currentlyReading: [],
            wantToRead: [],
            read: [],
            addBooks: books => {
                const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
                const read = books.filter(book => book.shelf === 'read');
                const wantToRead = books.filter(book => book.shelf === 'wantToRead');
                this.setState({ books, currentlyReading, read, wantToRead });
            },
            moveBook: (book, newShelf, allShelfs) => {
                const newBooks = this.state.books.map(allBooks => {
                    const foundID = allShelfs[newShelf].find(
                        bookID => bookID === allBooks.id,
                    );
                    if (foundID) {
                        allBooks.shelf = newShelf;
                    }
                    return allBooks;
                });
                this.state.addBooks(newBooks);
                this.state.sendBooksToDatabase(newBooks);
            },
            getBooksAndAddToDatabase: async () => {
                const books = await getAll();
                this.state.addBooks(books);
                this.state.sendBooksToDatabase(books);
            },
            sendBooksToDatabase: books => {
                fire.firestore().collection('books').doc(this.state.user.email).set({ books });
            },
            deleteBook: async bookId => {
                const bookRef = fire.firestore().collection('books').doc(this.state.user.email);
                const boo = await bookRef.get().then(async (doc) => {
                    if (doc.exists) {
                        return doc.data();
                    }
                });
                const newBooks = boo.books.filter((obj) => {
                    return obj.id !== bookId;
                });
                this.state.sendBooksToDatabase(newBooks);
            },
        };
    }

    authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user,
                });
                localStorage.setItem('user', user.uid);
            } else {
                localStorage.removeItem('user');
                this.setState({ user: null });
            }
        });
    };

    componentDidMount() {
        this.authListener();
    }

    render() {
        if (localStorage.getItem('user') && !this.state.user) {
            return <Loading />;
        }
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
