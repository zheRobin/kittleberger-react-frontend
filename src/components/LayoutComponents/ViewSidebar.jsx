import "./style/layoutCompoStyle.scss"
import { useTranslation } from "react-i18next"

const CreateSidebar = () => {
    const { t } = useTranslation()
    return (
        <div className="nav-items">
            <div className="nav-items--active pointer">{t("Zusammenfassung")}</div>
        </div>
    )
}

export default CreateSidebar