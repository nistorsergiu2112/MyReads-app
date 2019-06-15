import React, {Component} from "react";
import Book from "./Book";

export default class Shelf extends Component {
	render() {
		return(              
			    <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books && this.props.books.map(book => <Book  inHome={true} key={book.id} {...book} deleteBook={this.props.deleteBook} moveBook={this.props.moveBook} />)}
                    </ol>
                  </div>
                </div>
                )
	}
}