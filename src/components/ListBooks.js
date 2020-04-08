import React from "react";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {getAll, update} from "../BooksAPI";

class ListBooks extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  books = [];


  componentDidMount() {
    getAll().then((r) => {
      this.books = r.map(this.backendBookFormatAdapter);
      this.updateState();
    });
  }

  moveBooksBetweenShelves = (book_id, new_shelf) => {
    update({id: book_id}, new_shelf).then((_) => {
      this.books = this.books.map((book) => {
        if (book.id === book_id) {
          book.shelf = new_shelf
        }
        return book
      });
      this.updateState();
    })
  };

  updateState() {
    this.setState({
      currentlyReading: this.books.filter((v) => v.shelf === "currentlyReading"),
      wantToRead: this.books.filter((v) => v.shelf === "wantToRead"),
      read: this.books.filter((v) => v.shelf === "read")
    })
  }

  backendBookFormatAdapter(v) {
    return {
      id: v.id,
      title: v.title,
      authors: v.authors,
      backgroundImage: v.imageLinks.smallThumbnail,
      shelf: v.shelf
    };
  }

  render() {
    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" books={this.state.currentlyReading}
                     onBookMoveToAnotherShelf={this.moveBooksBetweenShelves}/>
          <BookShelf title="Want to Read" books={this.state.wantToRead}
                     onBookMoveToAnotherShelf={this.moveBooksBetweenShelves}/>
          <BookShelf title="Read" books={this.state.read}
                     onBookMoveToAnotherShelf={this.moveBooksBetweenShelves}/>
        </div>
      </div>
      <div className="open-search">
        <Link to={{pathname: "/search"}}>Add a book</Link>
      </div>
    </div>;
  }
}

ListBooks.propTypes = {
  books: PropTypes.any,
  onBookMoveToAnotherShelf: PropTypes.func,
  books1: PropTypes.any,
  books2: PropTypes.any
};

export default ListBooks