import React from "react";
import PropTypes from 'prop-types';
import {BookShelfChanger} from "./BookShelfChanger";

class Book extends React.Component {

  moveToShelf = (shelf) => {
    this.props.onBookMove(this.props.book, shelf);
  };

  render() {
    const {title, authors, backgroundImage, shelf} = this.props.book
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${backgroundImage})`
        }}/>
        <BookShelfChanger value={shelf} onChange={this.moveToShelf}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>;
  }
}

export default Book;

Book.propTypes = {
  book: PropTypes.any.isRequired,
  onBookMove: PropTypes.func.isRequired
}