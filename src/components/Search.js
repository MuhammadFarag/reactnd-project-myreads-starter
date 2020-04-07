import React from "react";
import {Link} from "react-router-dom";
import {search} from "../BooksAPI";
import Book from "./Book";

class Search extends React.Component {

  state = {
    value: '',
    books: []
  };

  books = [];

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({value: value});
    search(value).then((r) => {
      console.log(value)
      console.log(JSON.stringify(r));
      if (r !== undefined && r["error"] === undefined) {  // error is defined when the result is empty, r is undefined when search term is empty
        this.books = r.map(this.backendBookFormatAdapter);
        this.setState({books: r.map(this.backendBookFormatAdapter)})
      } else {
        this.setState({books: []})

        this.books = []
      }

    });
  }

  backendBookFormatAdapter(v) {   // TODO: Copied from App.js DRY
    return {
      id: v.id,
      title: v.title,
      authors: v.authors,
      backgroundImage: v.imageLinks.smallThumbnail,
      shelf: v.shelf
    };
  }

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