import "./style/dashboardStyle.scss"
import { Typography } from "@mui/material"
import AlertDialog from 'components/Dialog/NormalDialog'
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

const SidebarLayout = ({ children }) => {
    const pageData = useSelector(state => state.info.pageData)
    const date = new Date(pageData.document_last_update)
    const { t } = useTranslation()
    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };
    const langType = useSelector(state => state.info.language)
    return (
        <div className="sidebar-container">
            <div className="sidebar-top">
                <div style={{ marginLeft: "30px", marginTop: "auto", marginBottom: "auto" }}>
                    <Typography variant="paragraph" sx={{ fontSize: "12px", lineHeight: "16px" }}>
                        {t("Letztes Update")}: {date.toLocaleDateString('de-DE',{day: "2-digit",  month: "2-digit", year: "numeric"})}
                    </Typography>
                </div>
            </div>
            <div className="sidebar-bottom">
                {children}
            </div>
            <div className="sidebar-footer">
                <div onClick={() => openInNewTab(langType === 'en' ? "https://www.bosch-homecomfortgroup.com/en/impressum/" : "https://www.bosch-homecomfortgroup.com/de/impressum/")}>
                    <Typography className="side-footer pointer" textAlign="left" color="#8F7300" fontWeight={400} fontSize="12px" lineHeight="16px">
                        {t("Impressum")}
                    </Typography>
                </div>

                <AlertDialog text={t("Datenschutz")} />
                <div onClick={() => openInNewTab(langType === 'en' ? "https://www.bosch-homecomfortgroup.com/en/legal-notes/" : "https://www.bosch-homecomfortgroup.com/de/rechtshinweise/")}>
                    <Typography className="side-footer pointer" textAlign="left" color="#8F7300" fontWeight={400} fontSize="12px" lineHeight="16px">
                        {t("Rechtliche Hinweise")}
                    </Typography>
                </div>

            </div>
        </div>
    )
}

export default SidebarLayout