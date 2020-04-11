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

  componentDidMount() {
    getAll().then((r) => {
      this.setState({
        books: r.map(this.backendBookFormatAdapter)
      })
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

  moveBookToShelf = (book_id, shelf) => {
    update({id: book_id}, shelf).then((_) => {
      this.setState((previousState) => ({
        books: previousState.books.map((book) => {
          if (book.id === book_id) {
            book.shelf = shelf
          }
          return book
        })
      }))
    })
  };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search/>
        )}/>
        <Route exact path='/' render={() => (
          <Home books={this.state.books} onBookShelfChange={this.moveBookToShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
