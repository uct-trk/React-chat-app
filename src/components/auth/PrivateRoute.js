import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import { useSelector} from 'react-redux'
import FallBack from '../FallBack'



// privateRoutenın childrenı App dir
// ... rest privateRoutenın içerisindeki exact path yani hepsi demek
const PrivateRoute = ({ children, ...rest}) => {
    const auth = useSelector((state) => state.firebase.auth)
    console.log("children",children)
    return (
        <Route {...rest} 
        render={() => 
            isLoaded(auth) && !isEmpty(auth) ? children : <FallBack/> }
        // yuklu ve boş değilse children componentini render edecek değilse Fallback render edilecek
        />
    )
    
}
export default PrivateRoute


