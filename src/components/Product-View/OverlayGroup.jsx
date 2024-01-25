import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { composingActions } from "store/reducer";
import { 
    FormControlLabel, Checkbox, Slider    
} from "@mui/material";
import { 
    ArrowBCActiveIcon, ArrowBCIcon, ArrowBLActiveIcon, ArrowBLIcon, ArrowBRActiveIcon, 
    ArrowBRIcon, ArrowCCActiveIcon, ArrowCCIcon, ArrowCLActiveIcon, ArrowCLIcon, 
    ArrowCRActiveIcon, ArrowCRIcon, ArrowTCActiveIcon, ArrowTCIcon, ArrowTLActiveIcon, 
    ArrowTLIcon, ArrowTRActiveIcon, ArrowTRIcon, CrossIcon2, ListIcon, SettingIcon, VectorIcon  
} from "libs/icons";
import { useTranslation } from 'react-i18next';
import "./style/productViewStyle.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { convArticle } from "libs/_utils/conv";

const useOutsideAlerter = (isVisible, onHide) => {
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          onHide();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isVisible, onHide]);
    
    return wrapperRef;
};

const OverlayGroup = ({ article, id }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();    
    const [showModal, setShowModal] = useState(false)
    const wrapperRef = useOutsideAlerter(showModal, () => setShowModal(false));
    const templateItem = useSelector(state => state.info.templateData.find(item => item.id === parseInt(id)));
    const [params, setParams] = useState({
        is_transparent: article?.is_transparent !== undefined ? article?.is_transparent : false,
        scaling: article?.scaling !== undefined ? article?.scaling : 1,
        alignment: article?.align === undefined ? "top-left" : article?.align
    });
    const [scale, setScale] = useState(params.scaling);
    const handleSliderChange = (event, newValue) => {
        setScale(newValue/100);
    };
    const handleMouseUp = () => {
        handleParams('scaling', scale);
      };
    const handleParams = (field, value) => {
        setParams({...params, [field]: value})
    };
    
    useEffect(() => {
        const newArticle = convArticle(article, templateItem.article_placements.find(i => i.pos_index === article.pos_index), params)
        dispatch(composingActions.updateComposingArticle(newArticle))
        dispatch(composingActions.setSaveStatus(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <>
            <div className="overlay">
                <div className="overlay__list drag">
                    <img src={ListIcon} alt="ListIcon"></img>
                </div>
                <div className="overlay__product">
                    <div className="typography-400-regular" style={{ color: "white", overflow: "hidden", lineHeight: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{`${article.name} (${article.article_number})`}</div>
                    <div className="pointer">
                        <img src={CrossIcon2} alt="CrossIcon" onClick={(e) => { dispatch(composingActions.removeComposingArticle(article)) }}></img>
                    </div>
                </div>
                <div className="overlay__setting">
                    <img className="pointer" src={SettingIcon} alt="SettingIcon" onClick={(e) => setShowModal(true)}></img>
                    {showModal ? (
                        <div className="overlay__setting__panel" ref={wrapperRef}>
                            <div className="panel-top">
                                <div className="vector">
                                    <img src={VectorIcon} alt="VectorIcon"></img>
                                </div>
                                <div className="panel-top__title">
                                    {article.name}
                                </div>
                                <div className="panel-top__title" style={{ fontWeight: "400" }}>
                                    {article.article_number}
                                </div>
                                <div className="panel-top__drag">
                                <Slider valueLabelDisplay="auto" track={false} 
                                        valueLabelFormat={value => Math.round(value)}
                                        value={scale * 100} 
                                        onChange={handleSliderChange} 
                                        onMouseUp={handleMouseUp}
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
                                        <input max={100} type="number" className="percent-amount" value={Math.round(scale * 100)} readOnly />
                                        <div className="percent-mark"><p>%</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-center">
                                <div className="panel-center__title">
                                    {t(`Produkt freistellen`)}
                                </div>
                                <div className="panel-center__check-box">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="transparent"
                                            onClick={(e) => handleParams('is_transparent', e.target.checked)}
                                            checked={params.is_transparent}
                                        />
                                    }
                                    label={t(`Transparent`)} />
                                </div>
                            </div>
                            <div className="panel-bottom">
                                <div className="panel-bottom__title">
                                    {t(`Ausrichtung`)}
                                </div>
                                <div className="panel-bottom__drop">
                                    <div className="arrow-Setting">
                                        <div onClick={(e) => handleParams('alignment',"top-left")}>
                                            <img src={params.alignment === "top-left" ? ArrowTLActiveIcon : ArrowTLIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"top-center")}>
                                            <img src={params.alignment === "top-center" ? ArrowTCActiveIcon : ArrowTCIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"top-right")}>
                                            <img src={params.alignment === "top-right" ? ArrowTRActiveIcon : ArrowTRIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"middle-left")}>
                                            <img src={params.alignment === "middle-left" ? ArrowCLActiveIcon : ArrowCLIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"middle-center")}>
                                            <img src={params.alignment === "middle-center" ? ArrowCCActiveIcon : ArrowCCIcon} alt="arrow" />
                                        </div >
                                        <div onClick={(e) => handleParams('alignment',"middle-right")}>
                                            <img src={params.alignment === "middle-right" ? ArrowCRActiveIcon : ArrowCRIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"bottom-left")}>
                                            <img src={params.alignment === "bottom-left" ? ArrowBLActiveIcon : ArrowBLIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"bottom-center")}>
                                            <img src={params.alignment === "bottom-center" ? ArrowBCActiveIcon : ArrowBCIcon} alt="arrow" />
                                        </div>
                                        <div onClick={(e) => handleParams('alignment',"bottom-right")}>
                                            <img src={params.alignment === "bottom-right" ? ArrowBRActiveIcon : ArrowBRIcon} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : null}

                </div>
                <ToastContainer />
            </div>
        </>

    )
}

export default OverlayGroup