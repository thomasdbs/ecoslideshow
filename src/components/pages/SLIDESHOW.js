import React, { Component } from 'react'
import Slideshow from '../assets/Slideshow'
import { Redirect } from 'react-router'
import Loader from '../assets/Loader'

class SLIDESHOW extends Component {

  state = {
    loading:true,
    redirectToHome:false,
    redirectToAdmin:false,
    admin:false
  }

  // componentWillMount() {
  //   localStorage.removeItem("ecoslideshow_token")
  //   localStorage.removeItem("ecoslideshow_admin_token")
  // }

  componentDidMount() {

    if (this.props.match.path.includes('admin')) {

      const isAlreadyVisitedAdmin = localStorage.getItem("ecoslideshow_admin_token")

      if (isAlreadyVisitedAdmin !== null && isAlreadyVisitedAdmin === 'THIS_IS_THE_ECOSLIDESHOW_ADMIN_TOKEN') {
        this.setState({ loading:false, admin:true })
        // alert('1')
      }else {
        if (this.props.location.state && this.props.location.state.admin_token === 'THIS_IS_THE_ECOSLIDESHOW_ADMIN_TOKEN') {
          localStorage.setItem("ecoslideshow_admin_token",this.props.location.state.admin_token)
          this.setState({ loading:false , admin:true})
          // alert('2')
        }else {
          this.setState({ loading:false, redirectToAdmin:true })
          // alert('3')
        }
      }

    }else {

      const isAlreadyVisited = localStorage.getItem("ecoslideshow_token")

      if (isAlreadyVisited !== null && isAlreadyVisited === 'THIS_IS_THE_ECOSLIDESHOW_TOKEN') {
        this.setState({ loading:false })
        // alert('4')
      }else {
        if (this.props.location.state && this.props.location.state.token === 'THIS_IS_THE_ECOSLIDESHOW_TOKEN') {
          localStorage.setItem("ecoslideshow_token",this.props.location.state.token)
          this.setState({ loading:false })
          // alert('5')
        }else {
          this.setState({ loading:false, redirectToHome:true })
          // alert('6')
        }
      }

    }

  }

  render() {

    if (this.state.redirectToHome === true) {
      return <Redirect to="/" />
    }else if (this.state.redirectToAdmin === true) {
      return <Redirect to="/admin" />
    }else if (this.state.loading === true) {
      return <Loader />
    }else {
      return <Slideshow admin={this.state.admin} slideshow={this.props.match.params.id} />
    }
  }

}

export default SLIDESHOW;
