import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash'
import { getAuthorsQuery, addBooksMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
    this.addBook = this.addBook.bind(this)
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery
    if (data.loading) {
      return <option disabled>loading authors...</option>
    } else {
      return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
    }
  }

  addBook(event) {
    event.preventDefault()
    // console.log(this.state)
    this.props.addBooksMutation({
      variables: {
        name: this.state.name, 
        genre: this.state.genre, 
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    // console.log(this.props.data)
    return (
      <form id='add-book' onSubmit= {this.addBook}>
        <div className="field">
          <label>Book Name: </label>
          <input type="text" onChange={event => this.setState({ name: event.target.value})}/>
        </div>
        
        <div className="field">
          <label>Genre: </label>
          <input type="text" onChange={event => this.setState({ genre: event.target.value})}/>
        </div>

        <div className="field">
          <label>Author: </label>
          <select onChange={event => this.setState({ authorId: event.target.value})}>
            <option>-- Select Author --</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery'}),
  graphql(addBooksMutation, { name: 'addBooksMutation'}),
)(AddBook)