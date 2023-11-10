import dragIcon from "../../assets/icons/drag&drop.svg"
import cancel from "../../assets/icons/cross.svg"
import { useState } from "react"

const ImageSettingGroup = () => {

    const [view, setView] = useState(true)

    return (
        <>
            {view ? (<div className="image-settings">
                <div className="image-settings__common"><div className="typography-700-regular" style={{ width: "60px" }}>Image 1</div></div>
                <div className="image-settings__common"><img src={dragIcon} alt="drag"></img></div>
                <div className="image-settings__panel">
                    <div className="input-groups">
                        <div>
                            <div className="typography-400-regular">top</div>
                            <div className="input-group__bottom"><input /></div>
                        </div>
                        <div>
                            <div className="typography-400-regular">left</div>
                            <div className="input-group__bottom"><input /></div>
                        </div>
                        <div>
                            <div className="typography-400-regular">width</div>
                            <div className="input-group__bottom"><input /></div>
                        </div>
                        <div>
                            <div className="typography-400-regular">height</div>
                            <div className="input-group__bottom"><input /></div>
                        </div>
                        <div>
                            <div className="typography-400-regular">z-index</div>
                            <div className="input-group__bottom"><input /></div>
                        </div>
                    </div>
                </div>
                <div className="image-settings__common" onClick={(e) => { setView(false) }}><img src={cancel} alt="cancel"></img></div>
            </div>) : null}

        </>
    )
}

export default ImageSettingGroup