import React from "react";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";

class Home extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  static getDerivedStateFromProps = (props, _) => ({
    currentlyReading: props.books.filter((v) => v.shelf === "currentlyReading"),
    wantToRead: props.books.filter((v) => v.shelf === "wantToRead"),
    read: props.books.filter((v) => v.shelf === "read"),
  });

  moveBooksBetweenShelves = (book, newShelf) => {
    this.props.onBookShelfChange(book, newShelf)
  };

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

export default Home