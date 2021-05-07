import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute'
import { Provider } from 'react-redux'
import {
  ReactReduxFirebaseProvider
} from 'react-redux-firebase'
import firebase from './firebase'
import store from './redux/store'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

const Root = () => {

  const history = useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // login olmuş ise bizi bu sayfaya yönlendir
        history.push("/")
      } else {
        // login olmamış veya log out olmuş bizi bu sayfaya yönlendirir
        history.push("/login")
      }
    })
  },[])

  return (
    <Switch>
      <PrivateRoute exact path="/" >
        <App/>
      </PrivateRoute>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>
  )
}




ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

