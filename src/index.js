import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/auth/PrivateRoute'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from './firebase'
import store from './redux/store'
import App from './App'



const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
  },
  dispatch: store.dispatch
}

const Root = () => {

  const history = useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // login olmuş ise bizi bu sayfaya yönlendir
        history.push("/")
      } else {
        // login olmamış veya log out olmuş bizi bu sayfaya yönlendirir
        history.push("/login")
      }
    })
  }, [])

  return (
    <Switch>
      <PrivateRoute exact path="/" >
        <App />
      </PrivateRoute>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  )
}

console.log('App', App);
console.log('provider', Provider)
console.log('Route', Route);
console.log("Router", Router)
console.log('Switch', Switch);
console.log("firebase", firebase)
console.log("PrivateRoute", PrivateRoute)
console.log("ReactReduxFirebaseProvider", ReactReduxFirebaseProvider)
console.log("store", store)
console.log("useHistory", useHistory)
console.log("SignUp", SignUp)
console.log("Login", Login)
console.log("ReactDOM", ReactDOM)




ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

console.log("root", Root)