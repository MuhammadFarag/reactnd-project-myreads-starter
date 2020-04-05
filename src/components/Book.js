import React from "react";

class Book extends React.Component {
  handleChange = (event) => {
    this.props.onBookMove(this.props.id, event.target.value);
  };

  render() {
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: this.props.backgroundImage
        }}/>
        <div className="book-shelf-changer">
          <select value={this.props.shelf} onChange={this.handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.title}</div>
      <div className="book-authors">{this.props.authors}</div>
    </div>;
  }
}

export default Book;
