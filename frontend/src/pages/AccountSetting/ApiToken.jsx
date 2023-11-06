
import "./style/AccountSetting.scss"
import { TemplateButton } from "../Organism/TemplatePanel"
import cross from "../../assets/icons/cross.svg"

const ApiToken = () => {
    return (
        <>
            <div className="api-setting">
                <div>
                    <div className="api-setting__top">
                        <div className="typography-400-regular">API-Token erstellen</div>
                    </div>
                    <div className="api-setting__bottom">
                        <div className="typography-400-regular">API-Tokens ermöglichen es Drittanbieterdiensten, sich in Ihrem Namen mit unserer Anwendung zu authentifizieren.</div>
                        <div className="label-input-pair">
                            <div className="typography-400-regular">Höhe in px *</div>
                            <div className="password-warning">
                                <input placeholder=""></input>
                                <div className="label-group"><TemplateButton content={"Speichern"} /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="api-setting__top">
                        <div className="typography-400-regular">API-Token verwalten</div>
                    </div>
                    <div className="api-setting__bottom">
                        <div className="typography-400-regular">Sie können alle vorhandenen Tokens löschen, wenn sie nicht mehr benötigt werden.</div>
                        <div className="api-token">
                            <div className="token-list">
                                <div className="typography-400-regular">postman</div>
                                <div className="typography-400-regular">
                                    <div className="typography-400-regular">last used 2 weeks ago</div>
                                    <img src={cross} alt="cross" />
                                </div>
                            </div>
                            <div className="token-list">
                                <div className="typography-400-regular">Mein API-Token Name</div>
                                <div className="typography-400-regular">
                                    <div className="typography-400-regular"></div>
                                    <img className="pointer" src={cross} alt="cross" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApiToken