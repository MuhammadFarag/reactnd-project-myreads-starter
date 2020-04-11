import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {


  moveBookToAnotherShelf = (book, newShelf) => {
    this.props.onBookMoveToAnotherShelf(book, newShelf);
  };

  render() {
    const books = this.props.books;
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onBookMove={this.moveBookToAnotherShelf}/>
            </li>
          ))}
        </ol>
      </div>
    </div>;
  }
}

export default BookShelf;