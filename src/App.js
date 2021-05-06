import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {Provider} from 'react-redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

<Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App/>
      </ReactReduxFirebaseProvider>
    </Provider>

export default App;
