import "./style/AccountSetting.scss"
import { TemplateButton } from "../Organism/TemplatePanel"

const PasswordChange = () => {
    return (
        <div className="setting-panel-user">
            <div className="setting-panel-user__top">
                <div className="typography-400-regular">Passwort ändern</div>
            </div>
            <div className="setting-panel-user__bottom">
                <div className="label-input-pair">
                    <div className="typography-400-regular">Breite in px *</div>
                    <input placeholder=""></input>
                </div>
                <div className="label-input-pair">
                    <div className="typography-400-regular">Höhe in px *</div>
                    <div className="password-warning">
                        <input placeholder=""></input>
                        <div className="typography-400-regular label-group"><li>Password must consist of at least 8 characters</li></div>
                        <div className="typography-400-regular label-group"><li>Password must contain upper and lower case letters</li></div>
                        <div className="typography-400-regular label-group"><li>Password must contain at least one number</li></div>
                        <div className="typography-400-regular label-group"><li>Password must contain at least one special character</li></div>
                        <div className="label-group"><TemplateButton content={"Speichern"} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordChange