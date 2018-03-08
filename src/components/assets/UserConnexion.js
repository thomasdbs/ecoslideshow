import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Loader from './Loader'

class UserConnexion extends Component {

  state = {
    slideshow:null,
    loading:true,
    redirect:false
  }

  login = (event) => {
    localStorage.setItem("ecoslideshow_slideshow", this.state.slideshow)
    this.setState({ redirect:true })

    event.preventDefault()
  }

  componentDidMount() {
    const isAlreadyVisited = localStorage.getItem("ecoslideshow_slideshow")
    const isAlreadyVisitedToken = localStorage.getItem("ecoslideshow_token")
    if (isAlreadyVisited !== null && isAlreadyVisitedToken !== null) {
      this.setState({ loading:false, slideshow:isAlreadyVisited, redirect:true })
    }else {
      this.setState({ loading:false })
    }
  }

  render() {

    if (this.state.redirect === true) {
      return (
        <Redirect to={{
          pathname: `/slideshow/${this.state.slideshow}` ,
          state: { token:'THIS_IS_THE_ECOSLIDESHOW_TOKEN' }
        }} />
      )
    }else {
      if (this.state.loading === true) {
        return (
          <Loader />
        )
      }else {
        return (
          <div className="admin_background">
            <form className="admin_signin" onSubmit={this.login}>
              <div>
                <div value={this.state.slideshow} onChange={event => this.setState({slideshow: event.target.value})} className="group">
                  <input type="text" required />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Slideshow ID</label>
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
