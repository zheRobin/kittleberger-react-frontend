import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify"
import { updateCompose, replacePreviewImage, getImageFromUrl, refreshCompose, createCompose, deleteCompose } from "libs/_utils/actions";
import { getSaveDate } from "libs/_utils/conv";
import { composingActions } from "store/composing.slice";
import { TemplateButton } from "./CreateTemplate"
import { Loading, CopyIcon, SpinnerIcon } from "libs/icons"
import "../../components/Dialog/_dialog_style.scss"
const ProductView = () => {
    const {id} = useParams()
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [rendering, setRendering] = useState(true)
    const [open, setOpen] = useState(false);
    const [confirm, setConfirmOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("")
    const savedComposing = useSelector(state => state.composing.savedComposing)
    const productData = useSelector(state => state.info.productData)
    const lang = useSelector(state => state.info.language)
    const role = useSelector(state => state.auth.role)
    let product = savedComposing?.id === parseInt(id) ? savedComposing : productData.find(item => item.id === parseInt(id))
    const [data, setData] = useState({})
    useEffect(() => {
        setData({
            id: product?.id,        
            name: product?.name,
            template_id: product?.template.id,
            articles: product?.articles,
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
                preview_img: product?.cdn_url
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
            const response = await getImageFromUrl(product?.cdn_url)
            if (response?.code === 200) {
                setLoading(false);
                const filename = product?.cdn_url.split('/').pop();
                saveAs(response.data, filename)
            } else {
                toast.error("Sorry, failed to download", { theme: "colored", hideProgressBar: "true", autoClose: 2500 })
            }
        }
        getDownloadImage();
    }
    
    const downloadMetaData = () => {
        const metadata = `
            ${t('Marke')}: ${product?.template.brand.map((brand, index) => brand.name).join(", ")}
            ${t('Applikation')}: ${product?.template.application.map((application, index) => application.name).join(", ")}
            ${t('Technische Daten')}: ${product?.template.resolution_width} x ${product?.template.resolution_height} px (${product?.template.resolution_dpi} dpi)
            ${t('Dateiformat')}: ${product?.template.file_type} (RGB)
            ${t('Enthaltene Produkte')}: ${product?.articles.map((product, index) => `${product?.name} (ID: ${product?.article_number}; Mediaobject-ID: ${product?.mediaobject_id})`).join(", ")}
            ${t('Erstellt von ')}${product?.created_by.username} ${getSaveDate(lang, product?.created)}
            ${t('Zuletzt bearbeitet von ')}${product?.modified_by.username} ${getSaveDate(lang, product?.modified)}
        `;
        const blob = new Blob([metadata], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = product?.name + ".txt";
        link.click();
        URL.revokeObjectURL(url);

    }
    const deleteComposing = () => {
        setLoading(true);
        const handleDelete = async () => {
            const response = await deleteCompose(product?.id)
            if (response?.code === 200) {
                toast.success("Composing has been deleted successfully", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                setTimeout(() => {
                    navigate("/");
                }, 1500); 
            }else {
                setLoading(false)
                toast.error("Sorry but failed To delete", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        }
        handleDelete();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirmOpen = () => {
        setConfirmOpen(true)
    }
    const handleConfirmClose = () => {
        setConfirmOpen(false)
    }
    const refresh = () => {
        setLoading(true)
        const composingInfo = {
            template_id: product?.template.id,
            articles: product?.articles,
        };
        const refreshComposing = async () => {
            const response = await refreshCompose(composingInfo)

            if (response.code === 200) {
                handleClickOpen()
                setLoading(false)
                setPreviewImage(response.data)
            }else {
                handleClose()
                setLoading(false)
                toast.error("Sorry, failed to refresh", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        }
        refreshComposing()   
    }
    const createPreviewInfo = () => {
        setLoading(true)
        const submitPreviewInfo = {
            name: product?.name,
            template_id: product?.template.id,
            base64_img: previewImage,
            articles: product?.articles
        }
        const composeSubmit = async () => {
            const response = await createCompose(submitPreviewInfo)
            if (response?.code === 201) {
                setOpen(false);
                toast.success("Successfully Submitted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                setLoading(false)
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
    const replacePreviewInfo = () => {
        setLoading(true)
        const updatePreviewInfo = {
            id: product?.id,
            name: product?.name,
            template_id: product?.template.id,
            base64_img: previewImage,
            articles: product?.articles
        }
        const composeSubmit = async () => {
            setLoading(true)
            const response = await updateCompose(updatePreviewInfo)
            if (response?.code === 200) {
                setLoading(false)
                handleClose()
                toast.success("Successfully Updated", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                dispatch(composingActions.setSavedCompose(response.data))
            }else {
                setLoading(false)
                toast.error("Sorry but failed to update", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
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
                <div className="summary__image__content"  style={{display: rendering ? "none" : "block"}}>
                    <img src={product?.png_result !== '' ? product?.png_result : product?.cdn_url} alt="composedProduct" onLoad={() => setRendering(false)}/>
                </div>
                <div className="summary__image__desc">
                    <div className="typography-700-bold">{data.name}</div>
                    <div className="typography-400-regular desc__text">
                        <div>{t('Marke')}: {product?.template.brand.map((brand, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                <span>{brand.name}</span>
                            </React.Fragment>
                        ))}</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <div>{t('Applikation')}: {product?.template.application.map((application, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ", "}
                                <span>{application.name}</span>
                            </React.Fragment>
                        ))}</div>
                        <div>{t('Technische Daten')}:</div>
                        <div>{product?.template.resolution_width} x {product?.template.resolution_height} px ({product?.template.resolution_dpi} dpi)</div>
                        <div>{t('Dateiformat')}: {product?.template.file_type} (RGB)</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <div>{t('Enthaltene Produkte')}:</div>
                        <div style={{ textAlign: "start" }}>{product?.articles.map((product, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <span>&#8226;{" " + product?.name + " "}</span>
                                    <span>(ID: {product?.article_number}; Mediaobject-ID: {product?.mediaobject_id})</span>
                                </div>
                            </React.Fragment>
                        ))}</div>
                        <div style={{ marginTop: "14px" }}></div>
                        <p>{t('Erstellt von ')}{product?.created_by.username} {getSaveDate(lang, product?.created)}</p>
                        <p>{t('Zuletzt bearbeitet von ')}{product?.modified_by.username} {getSaveDate(lang, product?.modified)}</p>
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
                    <div onClick={(e) => refresh()}><TemplateButton content={t('Aktualisierung')} /></div>

                </div>
                <div className="deployment">
                    <div className="typography-700-regular">{t('Bereitstellung')}</div>
                    <div className="url-group">
                        <Typography style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} fontWeight={400} fontSize="14px" color="#00000080" lineHeight="20px" maxWidth="100%">
                            {product?.cdn_url}
                        </Typography>
                        <CopyToClipboard text={product?.cdn_url} onCopy={() => toast.success("Image link copied to clipboard.", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })}>
                            <img className="pointer" src={CopyIcon} alt=" copy" />
                        </CopyToClipboard>
                    </div>
                    <div className="download-button" onClick={() => handleDownload()}><TemplateButton content={t('Download Bilddatei')} type="transparent" /></div>
                    <div className="download-button" onClick={() => downloadMetaData()}><TemplateButton content={t('Download Metadaten')} type="transparent" /></div>
                    {role === 'admin' ? (<div className="download-button" onClick={handleConfirmOpen}><TemplateButton content={t('Komponieren löschen')} type="transparent" /></div>) : null}
                </div>
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
                            {t("Preview Image")}
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
                        <div onClick={handleClose}><TemplateButton content={t('Stornieren')} /></div>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={confirm}
                    onClose={handleConfirmClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className='custom-dialog'
                >
                    <div className='custom-dialog__header'>
                        <DialogTitle id="alert-dialog-title">
                            {t("Preview Image")}
                        </DialogTitle>
                        <p className='pointer' onClick={handleConfirmClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.2301 2.64645C21.2765 2.69288 21.3133 2.74799 21.3385 2.80866C21.3636 2.86932 21.3765 2.93434 21.3765 3C21.3765 3.06566 21.3636 3.13068 21.3385 3.19134C21.3133 3.25201 21.2765 3.30713 21.2301 3.35356L12.584 12L21.2301 20.6464C21.2765 20.6929 21.3133 20.748 21.3385 20.8087C21.3636 20.8693 21.3765 20.9343 21.3765 21C21.3765 21.0657 21.3636 21.1307 21.3385 21.1913C21.3133 21.252 21.2765 21.3071 21.2301 21.3536C21.1837 21.4 21.1285 21.4368 21.0679 21.4619C21.0072 21.4871 20.9422 21.5 20.8765 21.5C20.8109 21.5 20.7458 21.4871 20.6852 21.4619C20.6245 21.4368 20.5694 21.4 20.523 21.3536L11.8765 12.7075L3.47703 21.1066C3.38315 21.1998 3.25615 21.252 3.12384 21.2518C2.99153 21.2516 2.86471 21.1989 2.77115 21.1054C2.6776 21.0118 2.62494 20.885 2.62471 20.7527C2.62448 20.6204 2.6767 20.4934 2.76992 20.3995L11.169 12L2.76992 3.6005C2.72332 3.55411 2.68633 3.49898 2.66106 3.43827C2.6358 3.37757 2.62275 3.31247 2.62268 3.24671C2.62261 3.18096 2.63551 3.11584 2.66063 3.05507C2.68576 2.99431 2.72263 2.9391 2.76913 2.8926C2.81563 2.84611 2.87084 2.80924 2.9316 2.78411C2.99237 2.75898 3.05749 2.74608 3.12325 2.74616C3.189 2.74623 3.2541 2.75928 3.3148 2.78454C3.37551 2.80981 3.43064 2.8468 3.47703 2.8934L11.8765 11.2925L20.523 2.64645C20.6167 2.55268 20.7439 2.5 20.8765 2.5C21.0091 2.5 21.1363 2.55268 21.2301 2.64645Z" fill="black" />
                            </svg>
                        </p>
                    </div>
                    <DialogContent className='custom-dialog__content'>
                        <div>Are you sure you want to delete this composing? This will also remove the url to this composing which might be in use.</div>
                    </DialogContent>
                    <DialogActions>
                        <div onClick={deleteComposing}><TemplateButton content={t('Ja')} /></div>
                        <div onClick={handleConfirmClose}><TemplateButton content={t('Stornieren')} /></div>
                    </DialogActions>
                </Dialog>
        </div>
        </>
    )
}

export default ProductView