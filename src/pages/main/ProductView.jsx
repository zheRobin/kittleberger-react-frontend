import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from "@mui/material";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Loading, CopyIcon } from "libs/icons"
import { getSaveDate } from "libs/_utils/conv";
import { ToastContainer, toast } from "react-toastify"
import { updateCompose, replacePreviewImage, getImageFromUrl } from "libs/_utils/actions";
import { composingActions } from "store/composing.slice";
import { TemplateButton } from "./TemplatePanel"
import { saveAs } from "file-saver";
const ProductView = () => {
    const {id} = useParams()
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const savedComposing = useSelector(state => state.composing.savedComposing)
    const productData = useSelector(state => state.info.productData)
    const lang = useSelector(state => state.info.language)
    const role = useSelector(state => state.auth.role)
    let product = savedComposing?.id === parseInt(id) ? savedComposing : productData.find(item => item.id === parseInt(id))
    const [data, setData] = useState({})
    useEffect(() => {
        setData({
            id: product.id,        
            name: product.name,
            template_id: product.template.id,
            articles: product.articles,
        })
    }, [product])
    useEffect(() => {
        dispatch(composingActions.setSaveStatus(true))
    }, [dispatch])
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
    const handleSubmit = () => {
        const composeSubmit = async () => {
            setLoading(true)
            if (data.name?.length > 255) {
                toast.error(t("Ihr Verfassername umfasst mehr als 255 Zeichen"), { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                setLoading(false)
                return
            }
            const response = await updateCompose(data)
            if (response?.code === 200) {
                setLoading(false)
                toast.success("Successfully Updated", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                dispatch(composingActions.setSavedCompose(response.data))
            }else {
                setLoading(false)
                toast.error("Sorry but failed to update", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        }
        composeSubmit();
    }
    const updatePreviewImage = () => {
        const templateSubmit = async () => {
            setLoading(true)
            const response = await replacePreviewImage({
                template_id: data.template_id,
                preview_img: product.cdn_url
            })
            if (response?.code === 200){
                setLoading(false)
                toast.success("Successfully updated template preview image", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            } else {
                setLoading(false)
                toast.error("Sorry but failed To Update", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        }
        templateSubmit();
    }
    const handleDownload = () => {
        const getDownloadImage = async () => {
            setLoading(true)
            const response = await getImageFromUrl(product.cdn_url)
            if (response?.code === 200) {
                setLoading(false);
                const filename = product.cdn_url.split('/').pop();
                saveAs(response.data, filename)
            } else {
                toast.error("Sorry, failed to download", { theme: "colored", hideProgressBar: "true", autoClose: 2500 })
            }
        }
        getDownloadImage();
    }
    
    const downloadMetaData = () => {
        const metadata = `
            ${t('Marke')}: ${product.template.brand.map((brand, index) => brand.name).join(", ")}
            ${t('Applikation')}: ${product.template.application.map((application, index) => application.name).join(", ")}
            ${t('Technische Daten')}: ${product.template.resolution_width} x ${product.template.resolution_height} px (${product.template.resolution_dpi} dpi)
            ${t('Dateiformat')}: ${product.template.file_type} (RGB)
            ${t('Enthaltene Produkte')}: ${product.articles.map((product, index) => `${product.name} (ID: ${product.article_number}; Mediaobject-ID: ${product.mediaobject_id})`).join(", ")}
            ${t('Erstellt von ')}${product.created_by.username} ${getSaveDate(lang, product.created)}
            ${t('Zuletzt bearbeitet von ')}${product.modified_by.username} ${getSaveDate(lang, product.modified)}
        `;
        const blob = new Blob([metadata], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = product.name + ".txt";
        link.click();
        URL.revokeObjectURL(url);

    }
    return(
        <>
        {loading ? <Loading /> : (<></>)}
        <div className="summary">
            <div className="summary__image">
                <div className="summary__image__content">
                    <img src={product.cdn_url} alt="composedProduct" />
                </div>
                <div className="summary__image__desc">
                    <div className="typography-700-bold">{data.name}</div>
                    <div className="typography-400-regular desc__text">
                        <div>{t('Marke')}: {product.template.brand.map((brand, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                <span>{brand.name}</span>
                            </React.Fragment>
                        ))}</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <div>{t('Applikation')}: {product.template.application.map((application, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                <span>{application.name}</span>
                            </React.Fragment>
                        ))}</div>
                        <div>{t('Technische Daten')}:</div>
                        <div>{product.template.resolution_width} x {product.template.resolution_height} px ({product.template.resolution_dpi} dpi)</div>
                        <div>{t('Dateiformat')}: {product.template.file_type} (RGB)</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <div>{t('Enthaltene Produkte')}:</div>
                        <div style={{ textAlign: "start" }}>{product.articles.map((product, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <span>&#8226;{" " + product.name + " "}</span>
                                    <span>(ID: {product.article_number}; Mediaobject-ID: {product.mediaobject_id})</span>
                                </div>
                            </React.Fragment>
                        ))}</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <p>{t('Erstellt von ')}{product.created_by.username} {getSaveDate(lang, product.created)}</p>
                        <p>{t('Zuletzt bearbeitet von ')}{product.modified_by.username} {getSaveDate(lang, product.modified)}</p>
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
                    {role === 'admin' ? (<div onClick={(e) => updatePreviewImage()}><TemplateButton content={t('Als Vorlagenvorschaubild festlegen')} /></div>) : null}
                </div>
                <div className="deployment">
                    <div className="typography-700-regular">{t('Bereitstellung')}</div>
                    <div className="url-group">
                        <Typography style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} fontWeight={400} fontSize="14px" color="#00000080" lineHeight="20px" maxWidth="100%">
                            {product.cdn_url}
                        </Typography>
                        <CopyToClipboard text={product.cdn_url} onCopy={() => toast.success("Image link copied to clipboard.", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })}>
                            <img className="pointer" src={CopyIcon} alt=" copy" />
                        </CopyToClipboard>
                    </div>
                    <div className="download-button" onClick={() => handleDownload()}><TemplateButton content={t('Download Bilddatei')} type="transparent" /></div>
                    <div className="download-button" onClick={() => downloadMetaData()}><TemplateButton content={t('Download Metadaten')} type="transparent" /></div>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    )
}

export default ProductView