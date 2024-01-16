import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next';
import { TemplateButton } from "./CreateTemplate"
import { ToastContainer, toast } from "react-toastify"
import { Loading, SpinnerIcon } from "libs/icons"
import "components/Dialog/_dialog_style.scss"
import "./style/organismStyle.scss"
import 'react-toastify/dist/ReactToastify.css';
import { createCompose } from "libs/_utils/actions";
import { getSaveDate } from "libs/_utils/conv";
import { composingActions } from "store/composing.slice";
const ComposingPreview = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [rendering, setRendering] = useState(true)
    const selectedTemplate = useSelector(state => state.composing.currentTemplate)
    const selectedProducts = useSelector(state => state.composing.composingElements)
    const renderedCompose = useSelector(state => state.composing.renderedCompose)
    const [data, setData] = useState({
        name: "",
        template_id: selectedTemplate.id,
        articles: selectedProducts,
        base64_img: renderedCompose
    })
    
    useEffect(() => {
        const newName = `${selectedTemplate?.name} | ${selectedTemplate?.application.map((product) => ` ${product.name}`)} | ${selectedProducts?.map((product) => ` ${product.name}`)}`
        setData((prevState) => ({
            ...prevState,
            name: newName
        }));
    }, [selectedTemplate, selectedProducts])
    
    const handleChange = (event) => {
        setData((prevState) => ({
            ...prevState,
            name: event.target.value
        }));
    };
    const useAutosizeTextArea = (
        textAreaRef,
        value
    ) => {
        useEffect(() => {
            if (textAreaRef) {
                textAreaRef.style.height = "0px";
                const scrollHeight = textAreaRef.scrollHeight;
                textAreaRef.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, value]);
    };
    const textAreaRef = useRef(null);
    useAutosizeTextArea(textAreaRef.current, data.name);
    const user = useSelector(state => state.auth.user)
    const lang = useSelector(state => state.info.language)
    const saveDate = getSaveDate(lang, Date.now());
    const handleSubmit = () => {
        const composeSubmit = async () => {
            setLoading(true)
            if (data.name?.length > 255) {
                toast.error(t("Ihr Verfassername umfasst mehr als 255 Zeichen"), { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                setLoading(false)
                return
            }
            const response = await createCompose(data)
            if (response?.code === 201) {
                toast.success("Successfully Submitted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                dispatch(composingActions.setSavedCompose(response.data))
                dispatch(composingActions.setSaveStatus(true))
                navigate(`/composing/view/${response.data.id}`)
            }else {
                setLoading(false)
                toast.error("Sorry but failed To Submit", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        }
        composeSubmit();
    }
    return(
        <>
        {loading ? <Loading /> : (<></>)}
        <div className="summary">
            <div className="summary__image">
                <div className="summary__image__content"  style={{display: rendering ? "block" : "none"}}>
                    <img src={SpinnerIcon} alt="composedProduct"/>
                </div>
                <div className="summary__image__content" style={{display: rendering ? "none" : "block"}}>
                    <img src={renderedCompose} alt="composedProduct" onLoad={() => setRendering(false)}/>
                </div>
                <div className="summary__image__desc">
                    <div className="typography-700-bold">{data.name}</div>
                    <div className="typography-400-regular desc__text">
                        <div>{t('Marke')}: {selectedTemplate.brand.map((brand, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                <span>{brand.name}</span>
                            </React.Fragment>
                        ))}</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <div>{t('Applikation')}: {selectedTemplate.application.map((application, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                <span>{application.name}</span>
                            </React.Fragment>
                        ))}</div>
                        <div>{t('Technische Daten')}:</div>
                        <div>{selectedTemplate.resolution_width} x {selectedTemplate.resolution_height} px ({selectedTemplate.resolution_dpi} dpi)</div>
                        <div>{t('Dateiformat')}: {selectedTemplate.file_type} (RGB)</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <div>{t('Enthaltene Produkte')}:</div>
                        <div style={{ textAlign: "start" }}>{selectedProducts.map((product, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <span>&#8226;{" " + product.name + " "}</span>
                                    <span>(ID: {product.article_number}; Mediaobject-ID: {product.mediaobject_id})</span>
                                </div>
                            </React.Fragment>
                        ))}</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <p>{t('Erstellt von ')}{user.username} {saveDate}</p>
                        <p>{t('Zuletzt bearbeitet von ')}{user.username} {saveDate}</p>
                    </div>
                </div>
            </div>
            <div className="summary__detail">
                <div className="typography-400-regular">
                    {t('Zum Veröffentlichen dieses Composings, bitte einen Namen vergeben und speichern.')}
                    <p></p>
                    {t('Bitte beachten Sie, dass jede Änderung an diesem Composing auf bereits geteilte Composing-URLs Einfluss hat.')}
                </div>
                <div className="composing-name">
                    <div className="typography-700-regular">{t('Verfassen des Namens')}</div>
                    <textarea
                        id="review-text"
                        onChange={handleChange}
                        ref={textAreaRef}
                        rows={1}
                        value={data.name}
                        style={{ fontSize: "14px" }}
                    />
                    <div onClick={(e) => handleSubmit()}><TemplateButton content={t('Speichern')} /></div>
                    {/* {role === 'admin' ? (<div onClick={(e) => updatePreviewImage()}><TemplateButton content={t('Als Vorlagenvorschaubild festlegen')} /></div>) : null} */}
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    )
}

export default ComposingPreview;