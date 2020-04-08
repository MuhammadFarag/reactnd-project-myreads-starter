import React from 'react'
import './App.css'
import {Route} from "react-router-dom";
import Search from "./components/Search";
import ListBooks from "./components/ListBooks";

class BooksApp extends React.Component {
  /**
   * TODO:
   * deconstruct props when appropriate: const {x, y} = this.Props
   * Use prototypes (type annotations for props)
   */

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search/>
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
