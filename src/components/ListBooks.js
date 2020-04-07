import React from "react";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

class ListBooks extends React.Component {
  render() {
    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" books={this.props.books}
                     onBookMoveToAnotherShelf={this.props.onBookMoveToAnotherShelf}/>
          <BookShelf title="Want to Read" books={this.props.books1}
                     onBookMoveToAnotherShelf={this.props.onBookMoveToAnotherShelf}/>
          <BookShelf title="Read" books={this.props.books2}
                     onBookMoveToAnotherShelf={this.props.onBookMoveToAnotherShelf}/>
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