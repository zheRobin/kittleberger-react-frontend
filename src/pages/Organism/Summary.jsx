import "../Organism/style/organismStyle.scss"
import "../../components/Dialog/_dialog_style.scss"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from "@mui/material"
import { TemplateButton } from "./TemplatePanel"
import copy from "../../assets/icons/copy.svg"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { getOnlineInfo, updateOnlineInfo, refreshCompose } from "../../_services/Product"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Loading } from "./ProductSelect"
import { useLocation } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useRef } from "react"
import { calcPosition } from "../../_services/Product";

const Summary = () => {
    const { t } = useTranslation();
    const { state } = useLocation()
    const selectedTemplate = useSelector(state => state.products.selectedTemplate)
    const selectedProducts = useSelector(state => state.products.selectedProducts)
    const composedProduct = useSelector(state => state.products.composedProduct)
    const langInfo = useSelector(state => state.info.language)
    const [langType, setLangType] = useState('')
    const [open, setOpen] = React.useState(false);
    const [editableName, setEditableName] = useState('')
    const cardInfo = useSelector(state => state.products.cardInfo)
    const [loading, setLoading] = useState(false)
    const [deploymentName, setdeploymentName] = useState({
        value: '',
        copied: false,
    })
    const [previewImage, setPreviewImage] = useState("")
    useEffect(
        () => {
            setLangType(langInfo)
        }, [langInfo]
    )
    const useAutosizeTextArea = (
        textAreaRef,
        value
    ) => {
        useEffect(() => {
            if (textAreaRef) {
                // We need to reset the height momentarily to get the correct scrollHeight for the textarea
                textAreaRef.style.height = "0px";
                const scrollHeight = textAreaRef.scrollHeight;

                // We then set the height directly, outside of the render loop
                // Trying to set this with state or a ref will product an incorrect value.
                textAreaRef.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, value]);
    };
    const userInfo = useSelector(state => state.auth.user)
    useEffect(() => {
        if (!composedProduct.startsWith("data:")) {
            setdeploymentName({ value: state.cdn ?? composedProduct, copied: false });
        }
    }, [composedProduct]);
    const composeName = state?.name ? state?.name : `${selectedTemplate?.name} | ${selectedTemplate?.application.map((product, index) => { return product.name })} | ${selectedProducts?.map((product, index) => { return product.name })}`
    useEffect(
        () => {
            setEditableName(composeName)
        }, [composeName]
    )
    function handleDownload() {
        const imageUrl = deploymentName.value;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.png';
        link.click();
    }

    const token = useSelector(state => state.auth.token)
    const submitArticleInfo = {
        articles: [...selectedProducts.map((product, index) => {
            return {
                id: product.id,
                name: product.name,
                article_number: product.article_number,
                mediaobject_id: product.mediaobject_id,
                render_url: product.render_url ? product.render_url : product.render_url,
                pos_index: product?.pos_index,
                is_transparent: product?.is_transparent ? product?.is_transparent : false,
                scaling: product?.sliderScale === undefined ? 1 : product?.sliderScale,
                alignment: product?.align === undefined ? "top-left" : product?.align,
                height: selectedTemplate?.article_placements[index]?.height,
                width: selectedTemplate?.article_placements[index]?.width,
                z_index: selectedTemplate?.article_placements[index]?.z_index
            };
        })]
    }
    const article = selectedProducts.map((product) => {
        const positionStyle = selectedTemplate?.article_placements;
        const selectedStyle = positionStyle.filter((article_placement) => article_placement.pos_index == product?.pos_index);
        const sliderScale = product?.sliderScale === undefined ? 1 : product?.sliderScale;
        const position = calcPosition(
            product?.align === undefined ? 'middle-center' : product?.align,
            selectedStyle[0]?.position_x,
            selectedStyle[0]?.position_y,
            selectedStyle[0]?.width,
            selectedStyle[0]?.height,
            sliderScale
        );
        const is_transparent = product?.is_transparent === true ? true : false;
        const positionX = position ? position[0] : selectedStyle[0].position_x;
        const positionY = position ? position[1] : selectedStyle[0].position_y;

        if (positionStyle !== undefined) {
            return {
                render_url: product?.render_url ? product?.render_url : product?.render_url,
                is_transparent: is_transparent,
                top: positionY,
                left: positionX,
                width: selectedStyle[0]?.width * sliderScale,
                height: selectedStyle[0]?.height * sliderScale,
                z_index: selectedStyle[0]?.z_index
            };
        }
    });
    const composingInfo = {
        template_id: selectedTemplate.id,
        articles: article.filter(Boolean),
    };
    const submitInfo = {
        name: editableName,
        template_id: selectedTemplate.id,
        base64_img: composedProduct,
        ...submitArticleInfo
    }
    const updateInfo = {
        id: cardInfo?.id,
        name: editableName,
        template_id: selectedTemplate.id,
        base64_img: composedProduct,
        ...submitArticleInfo
    }
    const submitPreviewInfo = {
        name: editableName,
        template_id: selectedTemplate.id,
        base64_img: previewImage,
        ...submitArticleInfo
    }
    const updatePreviewInfo = {
        id: cardInfo?.id,
        name: editableName,
        template_id: selectedTemplate.id,
        base64_img: previewImage,
        ...submitArticleInfo
    }
    const textAreaRef = useRef(null);

    useAutosizeTextArea(textAreaRef.current, editableName);

    const handleChange = (evt) => {
        const val = evt.target?.value;
        setEditableName(val);
    };
    let date_created = new Date(selectedTemplate.created);
    const formattedDate_created = `${t("am")} ${date_created.toLocaleDateString(langType === 'en' ? "en-US" : "de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })} ${t("um")} ${date_created.toLocaleTimeString(langType === 'en' ? "en-US" : "de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    })} ${t("Uhr")}`;
    let date_modified = new Date(selectedTemplate.modified);
    const formattedDate_modified = `${t("am")} ${date_modified.toLocaleDateString(langType === 'en' ? "en-US" : "de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })} ${t("um")} ${date_modified.toLocaleTimeString(langType === 'en' ? "en-US" : "de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    })} ${t("Uhr")}`;
    const metadata = `
    ${t('Marke')}: ${selectedTemplate.brand.map((brand, index) => brand.name).join(", ")}
    ${t('Applikation')}: ${selectedTemplate.application.map((application, index) => application.name).join(", ")}
    ${t('Technische Daten')}: ${selectedTemplate.resolution_width} x ${selectedTemplate.resolution_height} px (${selectedTemplate.resolution_dpi} dpi)
    ${t('Dateiformat')}: ${selectedTemplate.file_type} (RGB)
    ${t('Enthaltene Produkte')}: ${selectedProducts.map((product, index) => `${product.name} (${product.article_number})`).join(", ")}
    ${t('Erstellt von ')}${userInfo.username} ${formattedDate_created}
    ${t('Zuletzt bearbeitet von ')}${userInfo.username} ${formattedDate_modified}
  `;
    const fileName = "metadata"
    const downloadMetaData = () => {
        const blob = new Blob([metadata], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const refresh = () => {
        setLoading(true)
        console.log(composingInfo)
        refreshCompose(token, composingInfo, (success) => {

            if (success.data.code === 200 || success.data.status === "success") {
                handleClickOpen()
                setLoading(false)
                setPreviewImage(success.data.data)
            }
            if (success.data.status === "failed") {
                handleClose()
                setLoading(false)
                toast.error("Sorry, failed to refresh", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        })
    }
    const createPreviewInfo = () => {
        setLoading(true)
        getOnlineInfo(token, submitPreviewInfo, (success) => {
            if (success.data.code === 201) {
                setdeploymentName({ ...deploymentName, value: success.data.data })
                setLoading(false)
                toast.success("Successfully Submitted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
            if (success.data.status === "failed") {
                setLoading(false)
                toast.error("Sorry but failed To Submit", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        })
    }
    const replacePreviewInfo = () => {
        setLoading(true)
        updateOnlineInfo(token, updatePreviewInfo, (success) => {

            if (success.data.code === 201 || success.data.status === "success") {
                setdeploymentName({ ...deploymentName, value: success.data.data.cdn_url })
                setLoading(false)
                setOpen(false)
                toast.success("Successfully Updated", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
            if (success.data.status === "failed") {
                setLoading(false)
                setOpen(false)
                toast.error("Sorry but failed to update", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        })
    }
    const saveInfo = () => {
        setLoading(true)
        if (cardInfo?.created_by === undefined) {
            getOnlineInfo(token, submitInfo, (success) => {
                if (success.data.code === 201) {
                    setdeploymentName({ ...deploymentName, value: success.data.data })
                    setLoading(false)
                    toast.success("Successfully Submitted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
                if (success.data.status === "failed") {
                    setLoading(false)
                    toast.error("Sorry but failed To Submit", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
            })
        }
        else {
            updateOnlineInfo(token, updateInfo, (success) => {

                if (success.data.code === 201 || success.data.status === "success") {
                    setdeploymentName({ ...deploymentName, value: success.data.data.cdn_url })
                    setLoading(false)
                    toast.success("Successfully Updated", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
                if (success.data.status === "failed") {
                    setLoading(false)
                    toast.error("Sorry but failed to update", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
            })
        }

    }
    return (
        <>
            {loading ? <Loading /> : (<></>)}
            <div className="summary">
                <div className="summary__image">
                    <div className="summary__image__content">
                        <img src={composedProduct} alt="composedProduct" />
                    </div>
                    <div className="summary__image__desc">
                        <div className="typography-700-bold">{selectedTemplate.name}</div>
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
                                        <span>({product.article_number})</span>
                                    </div>
                                </React.Fragment>
                            ))}</div>
                            <div style={{ marginTop: "14px" }}></div>
                            <p>{t('Erstellt von ')}{userInfo.username} {formattedDate_created}</p>
                            <p>{t('Zuletzt bearbeitet von ')}{userInfo.username} {formattedDate_modified}</p>
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
                        <div className="typography-700-regular">{t('Composing Name')}</div>
                        <textarea
                            id="review-text"
                            onChange={handleChange}
                            ref={textAreaRef}
                            rows={1}
                            defaultValue={composeName}
                            value={editableName}
                            style={{ fontSize: "14px" }}
                        />
                        <div onClick={(e) => saveInfo()}><TemplateButton content={t('Speichern')} /></div>
                        {cardInfo?.created_by !== undefined && <div onClick={(e) => refresh()}><TemplateButton content={t('Aktualisierung')} /></div>}
                    </div>
                    {deploymentName.value !== '' ? (<div className="deployment">
                        <div className="typography-700-regular">{t('Bereitstellung')}</div>
                        <div className="url-group">
                            <Typography style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} fontWeight={400} fontSize="14px" color="#00000080" lineHeight="20px" maxWidth="100%">
                                {deploymentName.value}
                            </Typography>
                            <CopyToClipboard text={deploymentName.value} onCopy={() => setdeploymentName({ ...deploymentName, copied: true })}>
                                <img className="pointer" src={copy} alt=" copy" />
                            </CopyToClipboard>
                        </div>
                        <div className="download-button" onClick={() => handleDownload()}><TemplateButton content={t('Download Bilddatei')} type="transparent" /></div>
                        <div className="download-button" onClick={() => downloadMetaData()}><TemplateButton content={t('Download Metadaten')} type="transparent" /></div>
                    </div>) : null}

                </div>
                <ToastContainer />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className='custom-dialog'
                >
                    <div className='custom-dialog__header'>
                        <DialogTitle id="alert-dialog-title">
                            {"Preview Image"}
                        </DialogTitle>
                        <p className='pointer' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.2301 2.64645C21.2765 2.69288 21.3133 2.74799 21.3385 2.80866C21.3636 2.86932 21.3765 2.93434 21.3765 3C21.3765 3.06566 21.3636 3.13068 21.3385 3.19134C21.3133 3.25201 21.2765 3.30713 21.2301 3.35356L12.584 12L21.2301 20.6464C21.2765 20.6929 21.3133 20.748 21.3385 20.8087C21.3636 20.8693 21.3765 20.9343 21.3765 21C21.3765 21.0657 21.3636 21.1307 21.3385 21.1913C21.3133 21.252 21.2765 21.3071 21.2301 21.3536C21.1837 21.4 21.1285 21.4368 21.0679 21.4619C21.0072 21.4871 20.9422 21.5 20.8765 21.5C20.8109 21.5 20.7458 21.4871 20.6852 21.4619C20.6245 21.4368 20.5694 21.4 20.523 21.3536L11.8765 12.7075L3.47703 21.1066C3.38315 21.1998 3.25615 21.252 3.12384 21.2518C2.99153 21.2516 2.86471 21.1989 2.77115 21.1054C2.6776 21.0118 2.62494 20.885 2.62471 20.7527C2.62448 20.6204 2.6767 20.4934 2.76992 20.3995L11.169 12L2.76992 3.6005C2.72332 3.55411 2.68633 3.49898 2.66106 3.43827C2.6358 3.37757 2.62275 3.31247 2.62268 3.24671C2.62261 3.18096 2.63551 3.11584 2.66063 3.05507C2.68576 2.99431 2.72263 2.9391 2.76913 2.8926C2.81563 2.84611 2.87084 2.80924 2.9316 2.78411C2.99237 2.75898 3.05749 2.74608 3.12325 2.74616C3.189 2.74623 3.2541 2.75928 3.3148 2.78454C3.37551 2.80981 3.43064 2.8468 3.47703 2.8934L11.8765 11.2925L20.523 2.64645C20.6167 2.55268 20.7439 2.5 20.8765 2.5C21.0091 2.5 21.1363 2.55268 21.2301 2.64645Z" fill="black" />
                            </svg>
                        </p>
                    </div>
                    <DialogContent className='custom-dialog__content'>
                        <img src={previewImage} alt="composedProduct" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </DialogContent>
                    <DialogActions>
                        <div onClick={createPreviewInfo}><TemplateButton content={t('Akzeptieren')} /></div>
                        <div onClick={replacePreviewInfo}><TemplateButton content={t('Überschreiben')} /></div>
                        <div onClick={handleClose}><TemplateButton content={t('stornieren')} /></div>
                    </DialogActions>
                </Dialog>
            </div>

        </>
    );
};

export default Summary;
