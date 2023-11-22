import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authActions } from "../../store"


const Authguard = ({ component }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    const decodedJwt = parseJwt(token);
    useEffect(
        () => {
            if (!authUser || decodedJwt.exp * 1000 < Date.now()) {
                dispatch(authActions.logout())
                navigate('/')
            }
        }, []
    )
    return authUser ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>
}

export default Authguard