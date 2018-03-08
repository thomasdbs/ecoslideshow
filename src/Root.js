import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import HOME from './components/pages/HOME'
import SLIDESHOW from './components/pages/SLIDESHOW'
import ADMIN_CONNEXION from './components/pages/ADMIN_CONNEXION'

const Root = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HOME} />
        <Route exact path="/slideshow/:id" component={SLIDESHOW} />
        <Route exact path="/slideshow/:id/admin" component={SLIDESHOW} />
        <Route exact path="/admin/" component={ADMIN_CONNEXION} />
      </Switch>
    </HashRouter>
  )
}

export default Root;
