import React, { Component } from 'react'
import { database } from '../firebase'
import { Redirect } from 'react-router'

class Home extends Component {

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
          <div>Waiting</div>
        )
      }else {
        return (
            <div className="home_background">
                <div className="open_slideshow">
                    <input type="text" placeholder="Entrez l'ID de votre slideshow pour y accéder" />
                </div>
                <div className="best_slideshow">
                    <div className="title">Vos meilleures créations du moment</div>
                    <div className="content">
                        <div className="slideshow"></div>
                        <div className="slideshow"></div>
                        <div className="slideshow"></div>
                        <div className="slideshow"></div>
                    </div>
                </div>
            </div>
        )
      }
    }

  }

}

export default Home;
