import "./style/dashboardStyle.scss"

const RightSection = ({ children }) => {
    return (
        <div className="right-section">
            {children}
        </div>
    )
}

export const BodyLayout = ({ children }) => {
    return (
        <div className="body-background">{children}</div>
    )
}

export default RightSection;