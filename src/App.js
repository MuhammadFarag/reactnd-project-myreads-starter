import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {getAll, update} from "./BooksAPI";
import {Route} from "react-router-dom";
import Search from "./components/Search";
import ListBooks from "./components/ListBooks";

class BooksApp extends React.Component {
  /**
   * TODO:
   * deconstruct props when appropriate: const {x, y} = this.Props
   * Use prototypes (type annotations for props)
   */

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
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
          <ListBooks books={this.state.currentlyReading} onBookMoveToAnotherShelf={this.moveBooksBetweenShelves}
                     books1={this.state.wantToRead} books2={this.state.read}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
