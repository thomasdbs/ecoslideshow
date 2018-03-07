import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import USER_CONNEXION from './components/pages/USER_CONNEXION'
import SLIDESHOW from './components/pages/SLIDESHOW'
import ADMIN_CONNEXION from './components/pages/ADMIN_CONNEXION'

const Root = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={USER_CONNEXION} />
        <Route exact path="/slideshow/:id" component={SLIDESHOW} />
        <Route exact path="/slideshow/:id/admin" component={SLIDESHOW} />
        <Route exact path="/admin/" component={ADMIN_CONNEXION} />
      </Switch>
    </HashRouter>
  )
}

export default Root;
