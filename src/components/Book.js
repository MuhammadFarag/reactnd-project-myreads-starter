import React from "react";

class Book extends React.Component {
  handleChange = (event) => {
    this.props.onBookMove(this.props.book, event.target.value);
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
        <div className="book-shelf-changer">
          <select value={shelf} onChange={this.handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>;
  }
}

export default Book;
