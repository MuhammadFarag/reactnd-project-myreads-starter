import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {getAll, update} from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import {Link, Route} from "react-router-dom";
import Search from "./components/Search";

class BooksApp extends React.Component {
  /**
   * TODO:
   * deconstruct props when appropriate: const {x, y} = this.Props
   * Use prototypes (type annotations for props)
   */

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
  };

  books = [];

  componentDidMount() {
    getAll().then((r) => {
      this.books = r.map(this.backendBookFormatAdapter);
      this.updateState();
    });
  }

  moveBooksBetweenShelves = (book_id, new_shelf) => {
    update({id: book_id}, new_shelf).then((_) => {
      this.books = this.books.map((book) => {
        if (book.id === book_id) {
          book.shelf = new_shelf
        }
        return book
      });
      this.updateState();
    })
  };

  updateState() {
    this.setState({
      currentlyReading: this.books.filter((v) => v.shelf === "currentlyReading"),
      wantToRead: this.books.filter((v) => v.shelf === "wantToRead"),
      read: this.books.filter((v) => v.shelf === "read")
    })
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

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search/>
        )}/>
        <Route exact path='/' render={() => (
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
              <Link to={{pathname: '/search'}}>Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
