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
        books: r.map(BooksApp.backendBookFormatAdapter)
      })
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

  moveBookToShelf = (book_id, shelf) => {
    update({id: book_id}, shelf).then((_) => {
      getAll().then((allBooks) => {
        this.setState((_) => ({
          books: allBooks.map(BooksApp.backendBookFormatAdapter).map((book) => {
            if (book.id === book_id) {
              book.shelf = shelf
            }
            return book
          })
        }))
      });
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
