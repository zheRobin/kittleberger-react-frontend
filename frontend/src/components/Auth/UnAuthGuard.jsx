import React, { useEffect } from "react"

const UnAuthguard = ({ component }) => {
    useEffect(
        () => {
            console.log("UnAuthgurd")
        }, [component]
    )

    return <React.Fragment>{component}</React.Fragment>
}

export default UnAuthguard