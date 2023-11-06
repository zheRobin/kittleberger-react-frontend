import React, { useEffect } from "react"

const UnAuthguard = ({ component }) => {
    useEffect(
        () => {
        }, [component]
    )

    return <React.Fragment>{component}</React.Fragment>
}

export default UnAuthguard