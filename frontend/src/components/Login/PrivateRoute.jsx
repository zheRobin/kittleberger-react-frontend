import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user: authUser } = useSelector(x => x.auth);
    if (authUser) {
        return <Navigate to="/organism" />
    }

    return children
}

export default PrivateRoute

export const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Link to='/' />
    )} />
)