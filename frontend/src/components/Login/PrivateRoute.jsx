import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { user: authUser } = useSelector(x => x.auth);
    console.log(authUser)
    if (authUser) {
        return <Navigate to="/organism" />
    }

    return children
}

export default PrivateRoute