import React from 'react'
import './App.css'
import {Route} from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search/>
        )}/>
        <Route exact path='/' render={() => (
          <Home/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
