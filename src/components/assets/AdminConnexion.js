import React, { Component } from 'react'
import { auth } from '../firebase'
import { Redirect } from 'react-router'

class UserConnexion extends Component {

  state = {
    email:'',
    password:'',
    slideshow:null,
    loading:true,
    redirect:false
  }

  // login = (event) => {
  //   localStorage.setItem("ecoslideshow_slideshow", this.state.slideshow)
  //   this.setState({ redirect:true })
  //
  //   event.preventDefault()
  // }

  componentDidMount() {

    const isAlreadyVisited = localStorage.getItem("ecoslideshow_slideshow")
    const isAlreadyVisitedLogin = localStorage.getItem("ecoslideshow_login")
    const isAlreadyVisitedPassword = localStorage.getItem("ecoslideshow_password")
    const isAlreadyVisitedToken = localStorage.getItem("ecoslideshow_admin_token")

    if (isAlreadyVisitedLogin !== null && isAlreadyVisitedPassword !== null && isAlreadyVisited !== null && isAlreadyVisitedToken !== null) {
      auth.doSignInWithEmailAndPassword(isAlreadyVisitedLogin, isAlreadyVisitedPassword)
      .then(() => {
        this.setState({ loading:false, slideshow:isAlreadyVisited, redirect:true })
      })
      .catch(error => {
        alert(error)
      })
    }else {
      this.setState({ loading:false })
    }

  }

  onSubmit = (event) => {
    const {
      email,
      password,
      slideshow
    } = this.state

    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem("ecoslideshow_login", email)
      localStorage.setItem("ecoslideshow_password", password)
      localStorage.setItem("ecoslideshow_slideshow", slideshow)
      this.setState({ redirect:true })
    })
    .catch(error => {
      alert(error)
    })

    event.preventDefault()
  }

  render() {

    if (this.state.redirect === true) {
      return (
        <Redirect to={{
          pathname: `/slideshow/${this.state.slideshow}/admin` ,
          state: { admin_token:'THIS_IS_THE_ECOSLIDESHOW_ADMIN_TOKEN' }
        }} />
      )
    }else {
      if (this.state.loading === true) {
        return (
          <div>Waiting</div>
        )
      }else {
        return (
          <div className="admin_background">
            <form className="admin_signin" onSubmit={this.onSubmit}>
              <div>
                <div value={this.state.slideshow} onChange={event => this.setState({slideshow: event.target.value})} className="group">
                  <input type="text" required />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Slideshow ID</label>
                </div>
                <br />
                <div value={this.state.email} onChange={event => this.setState({email: event.target.value})} className="group">
                  <input type="text" required />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Adresse mail</label>
                </div>
                <br />
                <div value={this.state.password} onChange={event => this.setState({password: event.target.value})} className="group">
                  <input type="text" required />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Mot de passe</label>
                </div>
                <br />
                <button type="submit">
                  Go
                </button>
              </div>
            </form>
          </div>
        )
      }
    }

  }

}

export default UserConnexion;
