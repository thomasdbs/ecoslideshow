import React, { Component } from 'react'
import { auth } from '../firebase'
import Slideshow from '../assets/Slideshow'

class Admin extends Component {

  state = {
    email: '',
    password: '',
    error: null,
    authenticate:false,
    loading:true
  }

  componentWillMount() {
    setTimeout( () => {
      const login = localStorage.getItem("ecoslideshow_login")
      if (login === null) {
        this.setState({ loading:false })
      }else {
        this.setState({ authenticate:true, loading:false })
      }
    }, 1000);
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state

    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ authenticate:true })
      localStorage.setItem("ecoslideshow_login", email)
    })
    .catch(error => {
      alert(error)
    })

    event.preventDefault()
  }

  // componentWillMount() {
  //   this.setState({ authenticate:true })
  // }

  render() {

    if (this.state.authenticate === false && this.state.loading === false) {
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
    }else if(this.state.authenticate === true && this.state.loading === false) {
      return (
        <Slideshow admin={true} />
      )
    }else {
      return (
        <div>Waiting</div>
      )
    }

  }

}

export default Admin;
