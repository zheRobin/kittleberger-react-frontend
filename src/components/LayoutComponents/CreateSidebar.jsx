import "./style/layoutCompoStyle.scss"
import { useNavigate } from "react-router-dom"
import OverlaySide from "../Product-View/OverlaySide"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

const CreateSidebar = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const selectedProducts = useSelector(state => state.composing.composingElements)
    const currentTemplate = useSelector(state => state.composing.currentTemplate)
    const handleSelect = () => {
        navigate(`/composing/edit/${currentTemplate.id}`);
    }
    return (
        <div className="nav-items">
            <div className="nav-items--inactive pointer" onClick={() => handleSelect()}>{t("Produkte auswählen")}</div>
            {selectedProducts
                ?.slice()
                .sort((a, b) => a.pos_index - b.pos_index)
                .map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="nav-items--inactive"
                        >
                            <OverlaySide productInfo={item} />
                        </div>
                    );
                })}
            <div className="nav-items--active pointer">{t("Zusammenfassung")}</div>
        </div>
    )
}

export default CreateSidebar