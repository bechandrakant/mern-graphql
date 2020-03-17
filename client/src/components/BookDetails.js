import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {

  getBookDetails() {
    const { book } = this.props.data
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <h3>{book.author.name}</h3>
          <p>Other books by this author...</p>
          <ul className='other-books'>
            {book.author.books.map(
              book => <li key={book.id}>{book.name}</li>
            )}
          </ul>
        </div>
      )
    } else {
      return <p>No Book Selected</p>
    }
  }

  render() {
    return (
      <div id="book-details">
        {this.getBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return ({
      variables: {
        id: props.bookId
      }
    })
  }
})(BookDetails)