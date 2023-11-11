
import ListIcon from "../../assets/icons/drag&drop.svg"
import CrossIcon from "../../assets/icons/cross-white.svg"
import SettingIcon from "../../assets/icons/controal-4.svg"
import VectorIcon from "../../assets/icons/vector.svg"
import { removeProducts } from "../../store"
import { FormControlLabel } from '@mui/material';
import { useDispatch } from "react-redux"
import "./style/productViewStyle.scss"
import { Checkbox } from "@mui/material"
import { Slider } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import ArrowTLIcon from "../../assets/icons/arrowTL.svg"
import ArrowTCIcon from "../../assets/icons/arrowTC.svg"
import ArrowTRIcon from "../../assets/icons/arrowTR.svg"
import ArrowCLIcon from "../../assets/icons/arrowCL.svg"
import ArrowCCIcon from "../../assets/icons/arrowCC.svg"
import ArrowCRIcon from "../../assets/icons/arrowCR.svg"
import ArrowBLIcon from "../../assets/icons/arrowBL.svg"
import ArrowBCIcon from "../../assets/icons/arrowBC.svg"
import ArrowBRIcon from "../../assets/icons/arrowBR.svg"


const OverlayGroup = ({ productInfo }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [location, setlocation] = useState(null)
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleOutsideClick(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [showModal, setShowModal]);
    return (
        <div className="overlay">
            <div className="overlay__list">
                <img src={ListIcon} alt="ListIcon"></img>
            </div>
            <div className="overlay__product">
                <div className="typography-400-regular" style={{ color: "white", overflow: "hidden", lineHeight: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{productInfo.name}</div>
                <div>
                    <img src={CrossIcon} alt="CrossIcon" onClick={(e) => { dispatch(removeProducts(productInfo)) }}></img>
                </div>
            </div>
            <div className="overlay__setting">
                <div><img src={SettingIcon} alt="SettingIcon" onClick={(e) => setShowModal(true)}></img></div>
                {showModal ? (
                    <div className="overlay__setting__panel" ref={wrapperRef}>
                        <div className="panel-top">
                            <div className="vector">
                                <img src={VectorIcon} alt="VectorIcon"></img>
                            </div>
                            <div className="panel-top__title">
                                Condens 9800i W skalieren
                            </div>
                            <div className="panel-top__drag">
                                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                                <div className="percent">
                                    <input max={100} type="number" className="percent-amount" />
                                    <div className="percent-mark"><p>%</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-center">
                            <div className="panel-center__title">
                                Produkt freistellen
                            </div>
                            <div className="panel-center__check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="transparent"
                                        />
                                    }
                                    label="Transparent" />
                            </div>
                        </div>
                        <div className="panel-bottom">
                            <div className="panel-bottom__title">
                                product asuis
                            </div>
                            <div className="panel-bottom__drop">
                                <div className="arrow-Setting">
                                    <div>
                                        <img src={ArrowTLIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowTCIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowTRIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowCLIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowCCIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowCRIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowBLIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowBCIcon} alt="arrow" />
                                    </div>
                                    <div>
                                        <img src={ArrowBRIcon} alt="arrow" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : null}

            </div>
        </div>
    )
}

export default OverlayGroup