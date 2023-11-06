import "../Organism/style/organismStyle.scss"
import { TemplateButton } from "./TemplatePanel"
import copy from "../../assets/icons/copy.svg"
import { Typography } from "@mui/material"

const Summary = () => {
    return (
        <>
            <div className="summary">
                <div className="summary-l">
                    <img src={require("../../assets/images/sub-back.png")} alt="top-images" style={{ width: "100%" }} />
                    <div className="typography-700-bold">Hero Keyvisual</div>
                    <div className="typography-400-regular">
                        Land: Deutschland, Österreich<br></br>
                        Marke: BUDERUS<br></br>
                        Applikation: Website<br></br>
                        <br></br>
                        Technische Daten:<br></br>
                        1200 x 480 px (72 dpi)<br></br>
                        Dateiformat: JPG (RGB)<br></br>
                        <br></br>
                        Enthaltene Produkte:<br></br>
                        Condens 9800i W (7738101018)<br></br>
                        Condens 5300i WM (7738101018)<br></br>
                        <br></br>
                        Erstellt von Benutzer X am 29.10.2023 um 14:34 Uhr<br></br>
                        Zuletzt bearbeitet von Benutzer Y am 30.10.2023 um 11:02 Uhr<br></br>
                    </div>
                </div>
                <div className="summary-r">
                    <div className="typography-400-regular">
                        Zum Veröffentlichen dieses Composings, bitte einen Namen vergeben und speichern.
                        <p></p>
                        Bitte beachten Sie, dass jede Änderung an diesem Composing auf bereits geteilte Composing-URLs Einfluss hat.
                    </div>

                    <div className="composing-name">
                        <div className="typography-700-regular">Composing Name</div>
                        <input value="Hero Keyvisual | BUDERUS | Condens X324, Heizung TZ5213 | 8723q4" />
                        <div><TemplateButton content={"Speichern"} /></div>
                    </div>

                    <div className="deployment">
                        <div className="typography-700-regular">Bereitstellung</div>
                        <div className="url-group"><Typography fontWeight={400} fontSize="14px" color="#00000080" lineHeight="20px">https://cg.bosch-homecomfort.com/8723q4</Typography>
                            <img src={copy} alt=" copy" />
                        </div>
                        <div className="download-button"><TemplateButton content={"Download Bilddatei"} type="transparent" /></div>
                        <div className="download-button"><TemplateButton content={"Download Metadaten"} type="transparent" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary