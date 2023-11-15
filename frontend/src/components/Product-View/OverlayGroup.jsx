
import ListIcon from "../../assets/icons/drag&drop.svg"
import CrossIcon from "../../assets/icons/cross-white.svg"
import SettingIcon from "../../assets/icons/controal-4.svg"
import VectorIcon from "../../assets/icons/vector.svg"
import { removeProducts, setProductAligns } from "../../store"
import { FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { setProductTransImg, setSliderScale } from "../../store"
import "./style/productViewStyle.scss"
import { Checkbox } from "@mui/material"
import { Slider } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { imageComposing } from "../../_services/Product"
import { ToastContainer, toast } from "react-toastify"
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

const OverlayGroup = ({ productInfo, index }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [sliderValue, setSliderValue] = useState(100)
    const wrapperRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.token)
    const [checked, setChecked] = useState(false)
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
            dispatch(setProductTransImg({ ...productInfo, transImg: checkStatus }))
        }
        else {
            const trans_img = ""
            dispatch(setProductTransImg({ ...productInfo, transImg: checkStatus }))
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
                                        {productInfo.name}
                                    </div>
                                    <div className="panel-top__drag">
                                        <Slider defaultValue={sliderValue} aria-label="Default" valueLabelDisplay="auto" track={false} onChange={(e) => { setSliderValue(e.target.value) }}
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
                                        product asuis
                                    </div>
                                    <div className="panel-bottom__drop">
                                        <div className="arrow-Setting">
                                            <div onClick={(e) => handleSetAlign("top-left")}>
                                                <img src={ArrowTLIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("top-center")}>
                                                <img src={ArrowTCIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("top-right")}>
                                                <img src={ArrowTRIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("middle-left")}>
                                                <img src={ArrowCLIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("middle-center")}>
                                                <img src={ArrowCCIcon} alt="arrow" />
                                            </div >
                                            <div onClick={(e) => handleSetAlign("middle-right")}>
                                                <img src={ArrowCRIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("bottom-left")}>
                                                <img src={ArrowBLIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("bottom-center")}>
                                                <img src={ArrowBCIcon} alt="arrow" />
                                            </div>
                                            <div onClick={(e) => handleSetAlign("bottom-right")}>
                                                <img src={ArrowBRIcon} alt="arrow" />
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