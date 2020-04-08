import React from "react";
import {Link} from "react-router-dom";
import {search, update} from "../BooksAPI";
import Book from "./Book";

class Search extends React.Component {

  state = {
    value: '',
    books: []
  };

  /*
  * TODO: Put books on the correct shelves
  *  Load search results
  *  Load all books (or pass from App)
  *  If a book in the search result exists in the all books list, set the book shelf
  *
  * TODO: On update shelf
  *  On update call success change the books state without making another API Call
  * */

  // TODO: Update state on handling shelf change
  handleChange = (event) => {
    let value = event.target.value;
    this.setState({value: value});
    search(value).then((r) => {
      if (r !== undefined && r["error"] === undefined) {  // error is defined when the result is empty, r is undefined when search term is empty
        this.setState({
          books: r.map(this.backendBookFormatAdapter)
        })
      } else {
        this.setState({books: []})
      }
    });
  }

  backendBookFormatAdapter(v) {   // TODO: Copied from App.js DRY?
    return {
      id: v.id,
      title: v.title,
      authors: v.authors,
      backgroundImage: v.imageLinks.smallThumbnail,
      shelf: v.shelf
    };
  }

  moveBookToAnotherShelf = (book_id, new_shelf) => {
    update({id: book_id}, new_shelf).then((_) => {
      this.setState((previousState) => ({
        books: previousState.books.map((book) => {

          if (book.id === book_id) {
            book.shelf = new_shelf
          }
          return book
        })
      }))
    })
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


export default Search