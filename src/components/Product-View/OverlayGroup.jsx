
import ListIcon from "../../assets/icons/drag&drop.svg"
import CrossIcon from "../../assets/icons/cross-white.svg"
import SettingIcon from "../../assets/icons/controal-4.svg"
import VectorIcon from "../../assets/icons/vector.svg"
import { removeProducts, setProductAligns } from "../../store"
import { FormControlLabel } from '@mui/material';
import { useDispatch } from "react-redux"
import { setProductTransImg, setSliderScale } from "../../store"
import "./style/productViewStyle.scss"
import { Checkbox } from "@mui/material"
import { Slider } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ArrowTLIcon from "../../assets/icons/arrowTL.svg"
import ArrowTCIcon from "../../assets/icons/arrowTC.svg"
import ArrowTRIcon from "../../assets/icons/arrowTR.svg"
import ArrowCLIcon from "../../assets/icons/arrowCL.svg"
import ArrowCCIcon from "../../assets/icons/arrowCC.svg"
import ArrowCRIcon from "../../assets/icons/arrowCR.svg"
import ArrowBLIcon from "../../assets/icons/arrowBL.svg"
import ArrowBCIcon from "../../assets/icons/arrowBC.svg"
import ArrowBRIcon from "../../assets/icons/arrowBR.svg"
import ArrowTLActiveIcon from "../../assets/icons/arrowTL-active.svg"
import ArrowTCActiveIcon from "../../assets/icons/arrowTC-active.svg"
import ArrowTRActiveIcon from "../../assets/icons/arrowTR-active.svg"
import ArrowCLActiveIcon from "../../assets/icons/arrowCL-active.svg"
import ArrowCCActiveIcon from "../../assets/icons/arrowCC-active.svg"
import ArrowCRActiveIcon from "../../assets/icons/arrowCR-active.svg"
import ArrowBLActiveIcon from "../../assets/icons/arrowBL-active.svg"
import ArrowBCActiveIcon from "../../assets/icons/arrowBC-active.svg"
import ArrowBRActiveIcon from "../../assets/icons/arrowBR-active.svg"

const OverlayGroup = ({ productInfo, index }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [sliderValue, setSliderValue] = useState(100)
    const wrapperRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(productInfo?.is_transparent !== undefined ? productInfo?.is_transparent : false)
    const align = productInfo?.align === undefined ? "middle-center" : productInfo?.align
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

    useEffect(
        () => {
            const sliderSetValue = productInfo?.sliderScale
            setSliderValue(sliderSetValue !== undefined ? sliderSetValue * 100 : 100)
        }, []
    )
    const handleComposing = (checkStatus) => {
        setChecked(!checked)
        if (checkStatus) {
            dispatch(setProductTransImg({ ...productInfo, is_transparent: checkStatus }))
        }
        else {
            const trans_img = ""
            dispatch(setProductTransImg({ ...productInfo, is_transparent: checkStatus }))
        }
    }

    const handleSetAlign = (align) => {
        dispatch(setProductAligns({ ...productInfo, align }))
    }

    useEffect(() => {
        const delay = 1000;

        const timeoutId = setTimeout(() => {
            updateSliderValue();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [sliderValue]);


    const updateSliderValue = () => {
        dispatch(setSliderScale({ ...productInfo, sliderScale: sliderValue / 100 }))
    };

    return (
        <>
            {loading ? <div className="loading"></div> : (
                <div className="overlay">
                    <div className="overlay__list drag">
                        <img src={ListIcon} alt="ListIcon"></img>
                    </div>
                    <div className="overlay__product">
                        <div className="typography-400-regular" style={{ color: "white", overflow: "hidden", lineHeight: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{`${productInfo.name} (${productInfo.article_number})`}</div>
                        <div>
                            <img src={CrossIcon} alt="CrossIcon" onClick={(e) => { dispatch(removeProducts(productInfo)) }}></img>
                        </div>
                    </div>
                    <div className="overlay__setting">
                        <img src={SettingIcon} alt="SettingIcon" onClick={(e) => setShowModal(true)}></img>
                        {showModal ? (
                            <div className="overlay__setting__panel" ref={wrapperRef}>
                                <div className="panel-top">
                                    <div className="vector">
                                        <img src={VectorIcon} alt="VectorIcon"></img>
                                    </div>
                                    <div className="panel-top__title">
                                        {productInfo.name}
                                    </div>
                                    <div className="panel-top__title" style={{ fontWeight: "400" }}>
                                        {productInfo.article_number}
                                    </div>
                                    <div className="panel-top__drag">
                                        <Slider value={sliderValue} valueLabelDisplay="auto" track={false} onChange={(e) => { setSliderValue(e.target.value) }}
                                            sx={{
                                                "& .MuiSlider-thumb": {
                                                    color: "#8F7300"
                                                },
                                                "& .MuiSlider-track": {
                                                    color: "#8F7300"
                                                },
                                                "& .MuiSlider-root": {
                                                    color: "#000000"
                                                },
                                                "& .MuiSlider-rail": {
                                                    color: "black"
                                                }
                                            }}
                                        />
                                        <div className="percent">
                                            <input max={100} type="number" className="percent-amount" value={sliderValue} readOnly />
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
                                                    onClick={(e) => handleComposing(e.target.checked)}
                                                    checked={checked}
                                                />
                                            }
                                            label="Transparent" />
                                    </div>
                                </div>
                                <div className="panel-bottom">
                                    <div className="panel-bottom__title">
                                        Ausrichtung
                                    </div>
                                    <div className="panel-bottom__drop">
                                        <div className="arrow-Setting">
                                            <div onClick={(e) => handleSetAlign("top-left")}>
                                                <img src={align === "top-left" ? ArrowTLActiveIcon : ArrowTLIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("top-center")}>
                                                <img src={align === "top-center" ? ArrowTCActiveIcon : ArrowTCIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("top-right")}>
                                                <img src={align === "top-right" ? ArrowTRActiveIcon : ArrowTRIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("middle-left")}>
                                                <img src={align === "middle-left" ? ArrowCLActiveIcon : ArrowCLIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("middle-center")}>
                                                <img src={align === "middle-center" ? ArrowCCActiveIcon : ArrowCCIcon} alt="arrow" />
                                            </div >
                                            <div onClick={(e) => handleSetAlign("middle-right")}>
                                                <img src={align === "middle-right" ? ArrowCRActiveIcon : ArrowCRIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("bottom-left")}>
                                                <img src={align === "bottom-left" ? ArrowBLActiveIcon : ArrowBLIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("bottom-center")}>
                                                <img src={align === "bottom-center" ? ArrowBCActiveIcon : ArrowBCIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("bottom-right")}>
                                                <img src={align === "bottom-right" ? ArrowBRActiveIcon : ArrowBRIcon} alt="arrow" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : null}

                    </div>
                    <ToastContainer />
                </div>
            )}

        </>

    )
}

export default OverlayGroup