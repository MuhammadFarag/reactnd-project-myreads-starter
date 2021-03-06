import React from "react";
import {Link} from "react-router-dom";
import {search} from "../BooksAPI";
import Book from "./Book";
import PropTypes from 'prop-types';

class Search extends React.Component {

  state = {
    value: '',
    books: []
  };

  static getDerivedStateFromProps = (props, previousState) => {
    const previousBooks = previousState.books
    const booksOnShelves = props.books
    return {
      books: Search.putBooksOnShelves(previousBooks, booksOnShelves)
    }
  }

  static putBooksOnShelves(searchResults, booksOnShelves) {
    return searchResults
      .map((searchResult) => {
        let commonBook = booksOnShelves.find((onShelf) => onShelf.id === searchResult.id)
        if (commonBook !== undefined) {
          searchResult.shelf = commonBook.shelf
        } else {
          searchResult.shelf = "none"
        }
        return searchResult
      });
  }

  static backendBookFormatAdapter(v) {
    return {
      id: v.id,
      title: v.title,
      authors: v.authors,
      backgroundImage: v.imageLinks.smallThumbnail,
      shelf: v.shelf
    };
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({value: value});
    search(value).then((searchResults) => {
      if (this.searchTermIsNotEmpty(searchResults) && this.searchResultIsNotEmpty(searchResults)) {
        let adaptedSearchResults = searchResults
          .filter(Search.bookHasThumbnail())
          .map(Search.backendBookFormatAdapter);
        let booksOnShelves = this.props.books;

        this.setState({
          books: Search.putBooksOnShelves(adaptedSearchResults, booksOnShelves)
        })
      } else {
        this.setState({books: []})
      }
    });
  }

  static bookHasThumbnail() {
    return (result) => result.imageLinks !== undefined && result.imageLinks.smallThumbnail !== undefined;
  }

  searchTermIsNotEmpty(searchResults) {
    return searchResults !== undefined;
  }

  searchResultIsNotEmpty(searchResults) {
    return searchResults["error"] === undefined;
  }

  moveBookToAnotherShelf = (book, newShelf) => {
    this.props.onBookShelfChange(book, newShelf)
  };

  render() {
    const books = this.state.books;
    return <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={{pathname: '/'}}>Close </Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input type="text" placeholder="Search by title or author" value={this.state.value}
                 onChange={this.handleChange}/>

        </div>
      </div>
      <div className="search-books-results">
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


export default Search

Search.propTypes = {
  books: PropTypes.any.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}