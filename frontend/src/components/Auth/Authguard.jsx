import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Authguard = ({ component }) => {
    const navigate = useNavigate()
    const authUser = useSelector(state => state.auth.user)

    useEffect(
        () => {
            if (!authUser) {
                navigate('/')
            }
        }, []
    )
    return authUser ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>
}

export default Authguard