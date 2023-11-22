import React from 'react';
import "./style/dashboardStyle.scss"
const HeaderLayout = ({ children }) => {
    return (
        <div style={{
            width: "100%", height: "80px"
        }}>
            {children}
        </div>
    )
}

export default HeaderLayout