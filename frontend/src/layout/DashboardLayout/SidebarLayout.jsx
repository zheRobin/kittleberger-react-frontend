import "./style/dashboardStyle.scss"
import { Typography } from "@mui/material"
import AlertDialog from '../../components/Dialog/NormalDialog'

const SidebarLayout = ({ children }) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-top">
                <div style={{ marginLeft: "30px", marginTop: "auto", marginBottom: "auto" }}>
                    <Typography variant="paragraph" sx={{ fontSize: "12px", lineHeight: "16px" }}>
                        Last update: 30.10.2023
                    </Typography>
                </div>
            </div>
            <div className="sidebar-bottom">
                {children}
            </div>
            <div className="sidebar-footer">
                <AlertDialog text="Datenschutz" />
                <AlertDialog text="Impressum" />
                <AlertDialog text="Rechtliche Hinweise" />
            </div>
        </div>
    )
}

export default SidebarLayout