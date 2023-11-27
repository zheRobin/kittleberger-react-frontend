import "../Organism/style/organismStyle.scss"
import { TemplateButton } from "./TemplatePanel"
import copy from "../../assets/icons/copy.svg"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { getOnlineInfo, updateOnlineInfo } from "../../_services/Product"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Loading } from "./ProductSelect"
import { useLocation } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useRef } from "react"

const Summary = () => {
    const { t } = useTranslation();
    const { state } = useLocation()
    const selectedTemplate = useSelector(state => state.products.selectedTemplate)
    const selectedProducts = useSelector(state => state.products.selectedProducts)
    const composedProduct = useSelector(state => state.products.composedProduct)
    const [editableName, setEditableName] = useState('')
    const cardInfo = useSelector(state => state.products.cardInfo)
    const [loading, setLoading] = useState(false)
    const [deploymentName, setdeploymentName] = useState({
        value: '',
        copied: false,
    })
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
            setdeploymentName({ value: state ?? composedProduct, copied: false });
        }
    }, [composedProduct]);
    const composeName = `${selectedTemplate?.name} | ${selectedTemplate?.application.map((product, index) => { return product.name })} | ${selectedProducts?.map((product, index) => { return product.name })}`
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
    const textAreaRef = useRef(null);

    useAutosizeTextArea(textAreaRef.current, editableName);

    const handleChange = (evt) => {
        const val = evt.target?.value;
        setEditableName(val);
    };
    const saveInfo = () => {
        if (!composedProduct.startsWith("data:")) {
            toast.warning("Please update composing products", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            return
        }
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
                if (success.data.code === 201 | success.data.status === "success") {
                    setdeploymentName({ ...deploymentName, value: success.data.data })
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
    let date_created = new Date(selectedTemplate.created);
    let formattedDate_created = `am ${date_created.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })} um ${date_created.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    })} Uhr`;
    let date_modified = new Date(selectedTemplate.modified);
    let formattedDate_modified = `am ${date_modified.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })} um ${date_modified.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    })} Uhr`;
    const metadata = `
    ${t('Land')}: Deutschland, Österreich
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
                            <div>{t('Land')}: Deutschland, Österreich</div>
                            <div>{t('Marke')}: {selectedTemplate.brand.map((brand, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && ", "}
                                    <span>{brand.name}</span>
                                </React.Fragment>
                            ))}</div>
                            <br></br>
                            <div>{t('Applikation')}: {selectedTemplate.application.map((application, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && ", "}
                                    <span>{application.name}</span>
                                </React.Fragment>
                            ))}</div>
                            <div>{t('Technische Daten')}:</div>
                            <div>{selectedTemplate.resolution_width} x {selectedTemplate.resolution_height} px ({selectedTemplate.resolution_dpi} dpi)</div>
                            <div>{t('Dateiformat')}: {selectedTemplate.file_type} (RGB)</div>
                            <br></br>
                            <div>{t('Enthaltene Produkte')}:</div>
                            <div style={{ textAlign: "start" }}>{selectedProducts.map((product, index) => (
                                <React.Fragment key={index}>
                                    <div>
                                        <span>&#8226;{" " + product.name + " "}</span>
                                        <span>({product.article_number})</span>
                                    </div>
                                </React.Fragment>
                            ))}</div>
                            <br></br>
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
            </div>
        </>
    );
};

export default Summary;
