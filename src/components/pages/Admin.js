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

  render() {

    if (this.state.authenticate === false) {
      return (
        <div className="admin_background">
          <form className="admin_signin" onSubmit={this.onSubmit}>
            <div>
              <div value={this.state.email} onChange={event => this.setState({email: event.target.value})} class="group">      
                <input type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Email Address</label>
              </div>
              <div class="group">      
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} type="password" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Password</label>
              </div><br />
              <button type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>       
      )
    }else {
      return (
        <Slideshow />
      )
    }

  }

}

export default Admin;
