import React from "react";
import PropTypes from "prop-types";

export class BookShelfChanger extends React.Component {


  render() {
    return <div className="book-shelf-changer">
      <select value={this.props.value} onChange={this.handleChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>;
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };
}

BookShelfChanger.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};