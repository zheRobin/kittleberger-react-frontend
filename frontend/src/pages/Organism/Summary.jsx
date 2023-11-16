import "../Organism/style/organismStyle.scss"
import { TemplateButton } from "./TemplatePanel"
import copy from "../../assets/icons/copy.svg"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import { getOnlineInfo } from "../../_services/Product"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Loading } from "./ProductSelect"

const Summary = () => {
    const selectedTemplate = useSelector(state => state.products.selectedTemplate)
    const selectedProducts = useSelector(state => state.products.selectedProducts)
    const composedProduct = useSelector(state => state.products.composedProduct)
    const [loading, setLoading] = useState(false)
    const [deploymentName, setdeploymentName] = useState({
        value: '',
        copied: false,
    })
    function handleDownload() {
        const imageUrl = deploymentName.value;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.png';
        link.click();
    }
    const token = useSelector(state => state.auth.token)
    const composeName = `${selectedTemplate?.name} | ${selectedTemplate?.application.map((product, index) => { return product.name })} | ${selectedProducts?.map((product, index) => { return product.name })}`
    const submitArticleInfo = {
        articles: [...selectedProducts.map((product, index) => {
            return {
                name: product.name,
                number: product.article_number,
                cdn_url: "https://jdffrqoludeprmyyavwe.supabase.co/storage/v1/object/public/lenderprism/Image/3.png",
                transparent_cdn_url: product?.transImg === undefined ? "" : product?.transImg,
                pos_index: product?.posIndex,
                scaling: product?.sliderScale === undefined ? 1 : product?.sliderScale,
                alignment: product?.align === undefined ? "top-left" : product?.align,
                height: selectedTemplate?.article_placements[index].height,
                width: selectedTemplate?.article_placements[index].width,
                z_index: selectedTemplate?.article_placements[index].z_index,
                prod_left: product?.position ? product?.position[0] : selectedTemplate?.article_placements[index].position_x,
                prod_top: product?.position ? product?.position[1] : selectedTemplate?.article_placements[index].position_y
            };
        })]
    }
    const submitInfo = {
        name: composeName,
        template_id: selectedTemplate.id,
        ...submitArticleInfo
    }
    const saveInfo = () => {
        setLoading(true)
        getOnlineInfo(token, submitInfo, (success) => {
            if (success.data.code === 201) {
                setdeploymentName({ ...deploymentName, value: success.data.data })
                setLoading(false)
                toast.success("Successfully Sumitted")
            }
            if (success.data.status === "failed") {
                setLoading(false)
                toast.error("Something Went Wrong")
            }
        })
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

    return (
        <>
            {loading ? <Loading /> : (
                <div className="summary">
                    <div className="summary-l">
                        <div className="summary-compose-image">
                            <img src={composedProduct} alt="composedProduct" />
                        </div>
                        <div className="typography-700-bold">{selectedTemplate.name}</div>
                        <div className="typography-400-regular">
                            Land: Deutschland, Österreich<br></br>
                            Marke: {selectedTemplate.brand.map((brand, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && ", "}
                                    <span>{brand.name}</span>
                                </React.Fragment>
                            ))}<br></br>
                            Applikation: {selectedTemplate.application.map((application, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && ", "}
                                    <span>{application.name}</span>
                                </React.Fragment>
                            ))}<br></br>
                            <br></br>
                            Technische Daten:<br></br>
                            {selectedTemplate.resolution_width} x {selectedTemplate.resolution_height} px (72 dpi)<br></br>
                            Dateiformat: {selectedTemplate.file_type} (RGB)<br></br>
                            <br></br>
                            Enthaltene Produkte:<br></br>
                            {selectedProducts.map((product, index) => (
                                <React.Fragment key={index}>
                                    <div>
                                        <span>{product.name}</span>
                                        <span>({product.article_number})</span>
                                    </div>

                                </React.Fragment>
                            ))}<br></br>
                            <br></br>
                            Erstellt von Benutzer X {formattedDate_created}<br></br>
                            Zuletzt bearbeitet von Benutzer Y {formattedDate_modified}<br></br>
                        </div>
                    </div>
                    <div className="summary-r">
                        <div className="typography-400-regular">
                            Zum Veröffentlichen dieses Composings, bitte einen Namen vergeben und speichern.
                            <p></p>
                            Bitte beachten Sie, dass jede Änderung an diesem Composing auf bereits geteilte Composing-URLs Einfluss hat.
                        </div>

                        <div className="composing-name">
                            <div className="typography-700-regular">Composing Name</div>
                            <input value={composeName} readOnly />
                            <div onClick={(e) => saveInfo()}><TemplateButton content={"Speichern"} /></div>
                        </div>

                        <div className="deployment">
                            <div className="typography-700-regular">Bereitstellung</div>
                            <div className="url-group"><Typography style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} fontWeight={400} fontSize="14px" color="#00000080" lineHeight="20px" maxWidth="280px">{deploymentName.value}</Typography>
                                <CopyToClipboard text={deploymentName.value}
                                    onCopy={() => setdeploymentName({ ...deploymentName, copied: true })}>
                                    <img className="pointer" src={copy} alt=" copy" />
                                </CopyToClipboard>
                            </div>
                            <div className="download-button" onClick={() => handleDownload()}><TemplateButton content={"Download Bilddatei"} type="transparent" /></div>
                            <div className="download-button"><TemplateButton content={"Download Metadaten"} type="transparent" /></div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    )
}

export default Summary