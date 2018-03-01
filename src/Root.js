import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/pages/Home'
import Admin from './components/pages/Admin'

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin/" component={Admin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Root;
