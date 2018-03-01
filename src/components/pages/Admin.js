import React, { Component } from 'react'
import { auth } from '../firebase'
import Slideshow from '../assets/Slideshow'

class Admin extends Component {

  state = {
    email: '',
    password: '',
    error: null,
    authenticate:false
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state

    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ authenticate:true })
    })
    .catch(error => {
      alert(error)
    })

    event.preventDefault()
  }

  componentWillMount() {
    this.setState({ authenticate:true })
  }

  render() {

    if (this.state.authenticate === false) {
      return (
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.email}
            onChange={event => this.setState({email: event.target.value})}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={this.state.password}
            onChange={event => this.setState({password: event.target.value})}
            type="password"
            placeholder="Password"
          />
          <button type="submit">
            Sign In
          </button>
        </form>
      )
    }else {
      return (
        <Slideshow admin={true} />
      )
    }

  }

}

export default Admin;
