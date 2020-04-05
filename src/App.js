import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {getAll, update} from "./BooksAPI";
import BookShelf from "./components/BookShelf";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false
  };

  books;

  constructor(props) {
    super(props);
    getAll().then((r) => {
      this.books = r.map(this.backendBookFormatAdapter);
      this.setState({
        currentlyReading: this.books.filter((v) => v.shelf === "currentlyReading"),
        wantToRead: this.books.filter((v) => v.shelf === "wantToRead"),
        read: this.books.filter((v) => v.shelf === "read")
      });
    });
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

  moveBooksBetweenShelves = (book_id, new_shelf) => {
    update({id: book_id}, new_shelf).then((_) => {
      this.books = this.books.map((book) => {
        if (book.id === book_id) {
          book.shelf = new_shelf
        }
        return book
      });

      this.setState({
        currentlyReading: this.books.filter((v) => v.shelf === "currentlyReading"),
        wantToRead: this.books.filter((v) => v.shelf === "wantToRead"),
        read: this.books.filter((v) => v.shelf === "read")
      });
    })
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"/>
            </div>
          </div>
        ) : (
          <div className="list-books">
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
              <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
