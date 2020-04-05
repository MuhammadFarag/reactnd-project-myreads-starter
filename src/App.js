import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {getAll, update} from "./BooksAPI";

class Book extends React.Component {
  handleChange = (event) => {
    this.props.onBookMove(this.props.id, event.target.value);
  };

  render() {
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: this.props.backgroundImage
        }}/>
        <div className="book-shelf-changer">
          <select value={this.props.shelf} onChange={this.handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.title}</div>
      <div className="book-authors">{this.props.authors}</div>
    </div>;
  }
}

class BookShelf extends React.Component {


  moveBookToAnotherShelf = (book_id, new_shelf) => {
    this.props.onBookMoveToAnotherShelf(book_id, this.props.shelf, new_shelf);
  };

  render() {
    const books = this.props.books;
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.title}</h2>
      <div className="bookshelf-books">
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

  moveBooksBetweenShelves = (book_id, old_shelf, new_shelf) => {
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
                <BookShelf shelf="currentlyReading" title="Currently Reading" books={this.state.currentlyReading}
                           onBookMoveToAnotherShelf={this.moveBooksBetweenShelves}/>
                <BookShelf shelf="wantToRead" title="Want to Read" books={this.state.wantToRead}
                           onBookMoveToAnotherShelf={this.moveBooksBetweenShelves}/>
                <BookShelf shelf="read" title="Read" books={this.state.read}
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
