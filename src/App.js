import React from 'react'
import './App.css'
import {Route} from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
import {getAll, update} from "./BooksAPI";

class BooksApp extends React.Component {

  state = {
    books: []
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

  componentDidMount() {
    getAll().then((r) => {
      this.setState({
        books: r.map(BooksApp.backendBookFormatAdapter)
      })
    });
  }

  moveBookToShelf = (bookToMove, shelf) => {
    update({id: bookToMove.id}, shelf).then((_) => {
      this.setState((previousState) => {

        if (previousState.books.find((onShelf) => onShelf.id === bookToMove.id)) { // We already have the book in state
          return ({
            books: previousState.books.map((book) => {
              if (book.id === bookToMove.id) {
                book.shelf = shelf
              }
              return book
            })
          });

        } else {
          bookToMove.shelf = shelf
          return {
            books: previousState.books.concat(bookToMove)
          }
        }

      })
    })
  };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search books={this.state.books} onBookShelfChange={this.moveBookToShelf}/>
        )}/>
        <Route exact path='/' render={() => (
          <Home books={this.state.books} onBookShelfChange={this.moveBookToShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
