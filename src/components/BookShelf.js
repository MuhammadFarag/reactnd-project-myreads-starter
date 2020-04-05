import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {


  moveBookToAnotherShelf = (book_id, new_shelf) => {
    this.props.onBookMoveToAnotherShelf(book_id, new_shelf);
  };

  render() {
    const books = this.props.books;
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book id={book.id} title={book.title} authors={book.authors}
                    backgroundImage={`url(${book.backgroundImage})`} shelf={book.shelf}
                    onBookMove={this.moveBookToAnotherShelf}/>
            </li>
          ))}
        </ol>
      </div>
    </div>;
  }
}

export default BookShelf;