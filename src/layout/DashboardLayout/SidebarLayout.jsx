import "./style/dashboardStyle.scss"
import { Typography } from "@mui/material"
import AlertDialog from '../../components/Dialog/NormalDialog'
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

const SidebarLayout = ({ children }) => {
    const date = useSelector(state => state.info.updatedDate)
    const { t } = useTranslation()
    return (
        <div className="sidebar-container">
            <div className="sidebar-top">
                <div style={{ marginLeft: "30px", marginTop: "auto", marginBottom: "auto" }}>
                    <Typography variant="paragraph" sx={{ fontSize: "12px", lineHeight: "16px" }}>
                        {t("Letztes Update")}: {date}
                    </Typography>
                </div>
            </div>
            <div className="sidebar-bottom">
                {children}
            </div>
            <div className="sidebar-footer">
                <AlertDialog text={t("Datenschutz")} />
                <AlertDialog text={t("Impressum")} />
                <AlertDialog text={t("Rechtliche Hinweise")} />
            </div>
        </div>
    )
}

export default SidebarLayout