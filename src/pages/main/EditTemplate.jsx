import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray, useField, useFormikContext, ErrorMessage } from 'formik';
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup'
import { createTheme } from "@mui/material/styles";
import { Typography, ThemeProvider, Checkbox, TextField, Select, MenuItem } from "@mui/material"
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PlusIcon1, CrossIcon, DragIcon, SpinnerIcon } from 'libs/icons';
import ImageTemplate from "components/Composing/ImageTempate"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import 'react-toastify/dist/ReactToastify.css';
import "components/Composing/style/composeStyle.scss"

import { updateTemplate, deleteTemplateRequest, deleteTemplate } from 'libs/_utils/actions';


export const TemplateButton = ({ content, type = "brown" }) => {
    return (
        <div className='template-button--filled pointer' style={type !== "brown" ? { backgroundColor: "transparent", border: "solid 1px #8F7300" } : {}}>
            <Typography fontWeight={400} fontSize="14px" lineHeight="20px" color={type !== "brown" ? "#8F7300" : "#FFFFFF"} >
                {content}
            </Typography>
        </div >
    )
}

export const CheckboxGroupComponent = ({ label, values, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <div className="label-check-pair">
            <div className="label-check-pair__label">
                <div className="typography-400-regular">{label}</div>
            </div>
            <div className='label__right' >
                <div className="label-check-pair__checkbox-group">
                    {values.map((value, index) => (

                        < div key={index} className='checkbox-group' >

                            <Checkbox defaultChecked={value.value === false ? false : true} name={value.name} style={{ color: 'black', borderColor: 'white', padding: 0, margin: 0 }} onChange={(e) => {
                                var newData = [...field.value];
                                newData[index].value = e.target.checked;
                                setFieldValue(props.name, newData);
                            }} {...props} />

                            <div className='typography-400-regular checkbox-group__label' style={{ color: 'black' }}>{value.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
};
export const ArticlePlacementsComponent = ({ values, arrayHelpers, setFieldValue }) => {
    const [articleGroup, setArticleGroup] = useState(values);
    const [draggedItem, setDraggedItem] = useState({})
    const { t } = useTranslation();
    useEffect(
        () => {
            setArticleGroup(values)
        }, [values]
    )
    const onDragStart = (e, index) => {
        const draggedItems = articleGroup[index];
        setDraggedItem(draggedItems)
        setDraggedItem(state => { return state })
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    function onDragOver(index) {
        const draggedOverItem = articleGroup[index];
        let tempDraggedItem = draggedItem
        if (draggedItem === draggedOverItem) {
            return;
        }
        else {
            let updatedDraggedItem = { ...draggedOverItem };
            const updatedDraggedOverItem = { ...tempDraggedItem };
            let itemGroups = articleGroup.map((item, i) => (i === index ? updatedDraggedOverItem : item));
            itemGroups = itemGroups.map((item) => (item === draggedItem ? updatedDraggedItem : item));
            setArticleGroup(itemGroups);
            setDraggedItem(itemGroups[index])
        }
    }
    const onDragEnd = () => {
        setFieldValue("article_placements", articleGroup);
    };

    return (
        <>
            <div>
                {articleGroup.map((value, index) => (
                    <div className="image-settings" key={index} onDragOver={() => onDragOver(index)} draggable
                        onDragStart={e => onDragStart(e, index)} onDragEnd={e => onDragEnd()}>
                        <div className="image-settings__left-section">
                            <div className="image-settings__common"><div className="typography-700-regular" style={{ width: "60px" }}>Image {index + 1}</div></div>
                        </div>
                        <div className="image-settings__right-section">
                            <div className="image-settings__common" style={{ cursor: "move" }}><img src={DragIcon} alt="DragIcon"></img></div>
                            <div className="image-settings__panel">
                                <div className="input-groups">
                                    <div>
                                        <div className="typography-400-regular">top</div>
                                        <div className="input-group__bottom"><Field inputProps={{ type: "number", style: { textAlign: 'center' } }} as={TextField} value={value.position_y || '0'} name={`article_placements.${index}.position_y`} /></div>
                                    </div>
                                    <div>
                                        <div className="typography-400-regular">left</div>
                                        <div className="input-group__bottom"><Field inputProps={{ type: "number", style: { textAlign: 'center' } }} as={TextField} value={value.position_x || '0'} name={`article_placements.${index}.position_x`} /></div>
                                    </div>
                                    <div>
                                        <div className="typography-400-regular">width</div>
                                        <div className="input-group__bottom"><Field inputProps={{ type: "number", style: { textAlign: 'center' } }} as={TextField} value={value.width || '0'} name={`article_placements.${index}.width`} /></div>
                                    </div>
                                    <div>
                                        <div className="typography-400-regular">height</div>
                                        <div className="input-group__bottom"><Field inputProps={{ type: "number", style: { textAlign: 'center' } }} as={TextField} value={value.height || '0'} name={`article_placements.${index}.height`} /></div>
                                    </div>
                                    <div>
                                        <div className="typography-400-regular">z-index</div>
                                        <div className="input-group__bottom"><Field inputProps={{ type: "number", style: { textAlign: 'center' } }} as={TextField} value={value.z_index || '0'} name={`article_placements.${index}.z_index`} /></div>
                                    </div>
                                    <div className="image-settings__common pointer" onClick={() => {
                                        arrayHelpers.remove(index)
                                    }}><img src={CrossIcon} alt="Delete Article"></img></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )}
                <div className="right-b__bottom" onClick={() => { values.length < 9 && arrayHelpers.push({ position_x: '0', position_y: '0', width: '0', height: '0', z_index: '0' }) }}>
                    {values.length >= 9 ? null : (
                        <>
                            <img className='pointer' src={PlusIcon1} alt="plus" style={{ color: "black" }}></img>
                            <div className="typo-700-regular pointer" >
                                {t("Ein weiteres Platzhalterbild hinzufügen")}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    )
};
export const Loading = () => {
    return (
        <div className="cover-spin">
            <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible" fill="#8F7300" stroke="none">
                <defs>
                    <circle id="loader" r="4" cx="50" cy="50" transform="translate(0 -30)" />
                </defs>
                <g className="loader" transform="rotate(51 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(103 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(154 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(206 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(257 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(309 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(360 50 50)"><use xlinkHref="#loader" /></g>
            </svg>
        </div>
    )
}
const TemplateEditPanel = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const {id} = useParams()
    const productInfo = useSelector(state => state.info.templateData.find(item => item.id === parseInt(id)))
    const [backView, setBackView] = useState(productInfo?.bg_image_cdn_url ? true : false);
    const [preView, setPreView] = useState(productInfo?.preview_image_cdn_url ? true : false);
    const [images, setImages] = useState([]);
    const [tempImages, setTempImages] = useState({ width: 1, height: 1 });
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [confirm, setConfirm] = useState(false)
    const [deleteSign, setDeleteSign] = useState(false);
    const elementRef = useRef(null);
    let backgroundHeight = (tempImages.height / tempImages.width * width) * 100 / height
    let backgroundWidth = (tempImages.width / tempImages.height * height) * 100 / width
    const [previewImages, setPreviewImages] = useState([]);
    const maxNumber = 69;
    const pageData = useSelector(state => state.info.pageData)
    const brands = pageData.brands.map(brand => ({ ...brand, value: false }));
    const applications = pageData.applications.map(app => ({ ...app, value: false }));
    const [backLoading, setBackLoading] = useState(false)
    const [previewLoading, setPreviewLoading] = useState(false)
    const backColor = ["#4747ff", "#329bdd", "#dd3246", "#c3dd32", "#0ce425", "#e4710c", "#15dfdf", "#ee08db", "#363c54"]
    const theme = createTheme({
        palette: {
            ochre: {
                main: '#E3D026',
                light: '#E9DB5D',
                dark: '#A29415',
                contrastText: '#242105',
            },
        },
    });
    useEffect(
        () => {
            setImages([{ data_url: productInfo?.bg_image_cdn_url }]);
            setPreviewImages([{ data_url: productInfo?.preview_image_cdn_url }]);
        }, [productInfo?.bg_image_cdn_url, productInfo?.preview_image_cdn_url]
    )
    useLayoutEffect(() => {
        const handleResize = () => {
            setWidth(elementRef?.current?.offsetWidth);
            setHeight(elementRef?.current?.offsetHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [tempImages]);

    let validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
        resolution_width: Yup.string().required("This field is required"),
        resolution_height: Yup.string().required("This field is required")
    })
    function dataURLToBlob(dataURL) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1].split(';')[0];
        const byteString = atob(parts[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: contentType });
    }
    const handleOpenModal = () => {
        setOpen(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
    }
    const handleRequest = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const deleteRequest = async () => {
            setLoading(true)
            const response = await deleteTemplateRequest(parseInt(id))
            setLoading(false)
            if(response?.code === 404){
                setMessage(`Are you sure you want to delete this template?`)
                setConfirm(true)
                handleOpenModal()
            }
            if(response?.code === 200){
                setMessage(`There are existing Composings based on this template. Please delete those Composings first before you can delete this template. The following IDs will help you find the Composings which are based on this template: ${response.data}`)
                setConfirm(false)
                handleOpenModal()
            }
        }
        deleteRequest();
    }
    const deleteTemplateItem = async () => {
        setLoading(true)
        const response = await deleteTemplate(parseInt(id))
        setLoading(false)
        if (response?.code === 204){
            toast.success("Template was deleted successfully", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            setTimeout(() => {
                navigate("/");
            }, 1500); 
        } else {
            toast.error("An error occurred", { theme: "colored", hideProgressBar: true, autoClose: 2000 });
        }
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <Formik
                    initialValues={{
                        preview_image: productInfo?.preview_image_cdn_url,
                        background_image: productInfo?.bg_image_cdn_url,
                        brands: [...productInfo?.brand, ...brands.filter(brand => !productInfo?.brand.some(productBrand => productBrand.name === brand.name))],
                        applications: [...productInfo?.application, ...applications.filter(application => !productInfo?.application.some(productBrand => productBrand.name === application.name))],
                        article_placements: productInfo?.article_placements?.length === 0 ? [{ position_x: '0', position_y: '0', width: '0', height: '0', z_index: '0' }] : productInfo?.article_placements,
                        name: productInfo?.name,
                        is_shadow: productInfo?.is_shadow,
                        resolution_width: productInfo?.resolution_width,
                        resolution_height: productInfo?.resolution_height,
                        type: productInfo?.file_type,

                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        let formData = new FormData();
                        
                        formData.append("preview_image", values?.preview_image?.file);
                        formData.append("background_image", values?.background_image?.file);
                        formData.append("brands", values.brands
                            .filter(brand => brand.value !== false)
                            .map(brand => brand.id).join(","));
                        formData.append(
                            "applications",
                            values.applications
                                .filter(application => application.value !== false)
                                .map(application => application.id)
                                .join(",")
                        );
                        formData.append("is_deleted", deleteSign)
                        formData.append("article_placements", JSON.stringify(values.article_placements));
                        formData.append("name", values.name);
                        formData.append("is_shadow", values.is_shadow);
                        formData.append("resolution_width", values.resolution_width);
                        formData.append("resolution_height", values.resolution_height);
                        formData.append("type", values.type);
                        try {
                            setLoading(true)
                            const response = await updateTemplate(formData, productInfo?.id)
                            if(response?.code === 200) {
                                setLoading(false)
                                toast.success("Successfully updated", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                                setTimeout(() => {
                                    navigate("/");
                                }, 1500); 
                            } else {
                                setLoading(false)
                                toast.error(response.data, { theme: "colored", hideProgressBar: "true", autoClose: 2000 })
                            }
                        
                        } catch (e) {
                            setLoading(false);
                            toast.error("An error occurred", { theme: "colored", hideProgressBar: true, autoClose: 2000 });
                        }
                    }}
                >
                    {({ values, setFieldValue, handleSubmit }) => (

                        <Form className='template-form'>
                            <div className='template-panel'>
                                <canvas src="assets/images/bali.tif" />
                                <div className="top-delete-button"
                                    onClick={(e) => handleRequest(e, values)}
                                >
                                    <TemplateButton content={t("Vorlage löschen")} type="transparent"/>
                                </div>
                                <div
                                    className="top-template-button"
                                    onClick={handleSubmit}
                                >
                                    <TemplateButton content={t("Template speichern")} />
                                </div>
                                {loading ? <Loading /> : null}
                                <div className="panel-group">
                                    <div className="product-setting-panel">
                                        <div className="product-setting-panel__top">
                                            <div className="typography-400-regular top-typo">{t("Allgemein")}</div>
                                        </div>
                                        <div className="product-setting-panel__bottom">
                                            <div className="input-group">
                                                <div className="label-input-pair">
                                                    <div className="label__left">
                                                        <p className="typography-400-regular">{t("Name")}*</p>
                                                    </div>
                                                    <div className='label__right' style={{ flexDirection: "column", alignItems: "center" }}>
                                                        <Field as={TextField} name='name' />
                                                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                            <ErrorMessage name="name" component="p" className="validation" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="label-select-pair">
                                                    <div className="label__left">
                                                        <p className="typography-400-regular">{t("Dateityp")}*</p>
                                                    </div>
                                                    <div className="label__right">
                                                        <div className="select-group">
                                                            <Field
                                                                as={Select}
                                                                labelId="demo-customized-select-label"
                                                                id="demo-customized-select"
                                                                name="type"
                                                                displayEmpty
                                                                IconComponent={ExpandMoreIcon}
                                                                sx={{
                                                                    width: "472px",
                                                                    height: "40px",
                                                                    padding: "0px 10px 10px 10px",
                                                                    "& .MuiOutlinedInput-input": {
                                                                        textAlign: "start",
                                                                        marginLeft: "9px"
                                                                    }
                                                                }}
                                                                disabled  // Add the disabled attribute here
                                                            >
                                                                <MenuItem value="">
                                                                    <em>{t("Dateityp wählen")}</em>
                                                                </MenuItem>
                                                                <MenuItem value="JPEG">.jpg</MenuItem>
                                                                <MenuItem value="PNG">.png</MenuItem>
                                                                <MenuItem value="TIFF">.tiff</MenuItem>
                                                            </Field>
                                                            <p className="typography-400-regular select-subtitle">
                                                                .jpg {t("und")} .png {t("sind in 72 dpi;")} .tiff {t("ist in 300 dpi")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="label-input-pair">
                                                    <div className="label__left">
                                                        <div className="typography-400-regular">{t("Breite")}*</div>
                                                    </div>
                                                    <div className="label__right" style={{ flexDirection: "column", alignItems: "center" }}>
                                                        <Field as={TextField} type="number" name="resolution_width" />
                                                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                            <ErrorMessage name="resolution_width" component="p" className="validation" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="label-input-pair" >
                                                    <div className="label__left">
                                                        <div className="typography-400-regular">{t("Höhe")}*</div>
                                                    </div>
                                                    <div className="label__right" style={{ flexDirection: "column", alignItems: "center" }}>
                                                        <Field as={TextField} type="number" name="resolution_height" />
                                                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                            <ErrorMessage name="resolution_height" component="p" className="validation" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="check-group">
                                                    <div className="label-check-pair">
                                                        <div className="label-check-pair__label">
                                                            <div className="typography-400-regular">{t("Schatten")}</div>
                                                        </div>
                                                        <div className='label__right'>
                                                            <div className='label-check-pair__checkbox'>
                                                                <Field
                                                                    as={Checkbox}
                                                                    checked={values.is_shadow}
                                                                    onChange={(e) => setFieldValue('is_shadow', e.target.checked)}
                                                                    style={{ color: 'black', borderColor: 'white', padding: 0, margin: 0 }}
                                                                    name="is_shadow"
                                                                />
                                                                <div className='typography-400-regular checkbox-group__label' style={{ color: 'black' }}>{t("Produktschatten aktivieren")}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="check-group">
                                                    <CheckboxGroupComponent label={t("Marke *")} values={values.brands} name="brands" />
                                                </div>
                                                <div className="check-group">
                                                    <CheckboxGroupComponent label={t("Anwendung *")} values={values.applications} name="applications" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {values.resolution_width && values.resolution_height ? (
                                        <div className="product-setting-panel background-upload-panel">
                                            <div className="product-setting-panel__top">
                                                <div className="typography-400-regular top-typo">{t("Hintergrund")}</div>
                                            </div>
                                            <div className="product-setting-panel__bottom">
                                                <ImageUploading
                                                    value={images}
                                                    onChange={(imageList) => {
                                                        setBackView(false)
                                                        if (imageList.length > 0) {
                                                            const dataUrl = imageList[0]['data_url']
                                                            const blob = dataURLToBlob(dataUrl);
                                                            const fileSizeInBytes = blob.size;
                                                            if (fileSizeInBytes > 3 * Math.pow(10, 6)) {
                                                                toast.error("your file size is greater than 10Mpx", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })

                                                                return
                                                            }
                                                        }

                                                        if (imageList.length > 0 && imageList[0].data_url && imageList[0]['data_url'].split(',')[0] === "data:image/tiff;base64") {
                                                            const url = `${process.env.REACT_APP_API_URL}api/v1/core/tiff/`;
                                                            setBackLoading(true)
                                                            setBackView(true)
                                                            const fetchImage = async (para) => {

                                                                const response = await fetch(url, {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json", // Set the content type to application/json
                                                                    },
                                                                    body: JSON.stringify({
                                                                        tiff_image: para,
                                                                    }),
                                                                });
                                                                const data = await response.json();
                                                                const dataUrl = data.data
                                                                const blob = dataURLToBlob(dataUrl);
                                                                const fileSizeInBytes = blob.size;
                                                                if (fileSizeInBytes > 3 * Math.pow(10, 7)) {
                                                                    toast.error("your file size is greater than 10Mpx", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                                                                    return
                                                                }
                                                                setImages([{ data_url: data.data }]);
                                                                setFieldValue("background_image", imageList[0])
                                                                setBackLoading(false)
                                                            }
                                                            fetchImage(imageList[0]['data_url'])
                                                        }
                                                        else {
                                                            setImages(imageList);
                                                            setFieldValue("background_image", imageList[0])
                                                            setBackView(true)
                                                        }
                                                    }}
                                                    maxNumber={maxNumber}
                                                    dataURLKey="data_url"
                                                >
                                                    {({
                                                        imageList,
                                                        onImageUpload,
                                                        onImageRemoveAll,
                                                        onImageUpdate,
                                                        onImageRemove,
                                                        isDragging,
                                                        dragProps,
                                                    }) => (
                                                        // write your building UI
                                                        <div className="upload__image-wrapper">
                                                            <div className="image-position__left" onClick={() => { onImageUpload(); }}>
                                                                <TemplateButton content={t("Einen anderen Hintergrund hinzufügen")} />
                                                                <ErrorMessage name="background_image" component="p" className="validation" />
                                                            </div>
                                                            <div className="image-position__left">
                                                                {backView ? (
                                                                    <div className="product-card">
                                                                        <div className="product-panel">
                                                                            <div className="product-info-group">
                                                                                <div className="product-info">
                                                                                    <div className="product-name"></div>
                                                                                    <div className="product-image-info"></div>
                                                                                </div>
                                                                                <div className="product-icon pointer" onClick={(e) => { onImageRemoveAll(); setBackView(false) }}>
                                                                                    <img src={CrossIcon} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-image pointer">
                                                                            {imageList.map((image, index) => (
                                                                                <div key={index} className="image-item"
                                                                                    style={{ width: "100%", height: "100%" }}>
                                                                                    <img src={backLoading ? SpinnerIcon : image['data_url']} alt="background"
                                                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                                                </div>
                                                                            ))}
                                                                            {images.length === 0 ? (
                                                                                <div className="image-item" style={{ width: "100%", height: "100%" }}>
                                                                                    <img src={productInfo?.bg_image_cdn_url} alt="backviewimage"
                                                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                                                </div>
                                                                            ) : null}

                                                                        </div>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    )}
                                                </ImageUploading>

                                            </div>
                                        </div>
                                    ) : null}

                                    {values.resolution_width && values.resolution_height ? (
                                        <div className="product-setting-panel thumbnail-panel">
                                            <div className="product-setting-panel__top">
                                                <div className="typography-400-regular top-typo">{t("Vorschaubild")}</div>
                                            </div>
                                            <div className="product-setting-panel__bottom">
                                                <ImageUploading
                                                    value={previewImages}
                                                    onChange={(imageList) => {
                                                        setPreView(false)
                                                        if (imageList.length > 0) {
                                                            const dataUrl = imageList[0]['data_url']
                                                            const blob = dataURLToBlob(dataUrl);
                                                            const fileSizeInBytes = blob.size;
                                                            if (fileSizeInBytes > 3 * Math.pow(10, 7)) {
                                                                toast.error("your file size is greater than 10Mpx", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                                                                return
                                                            }
                                                        }

                                                        if (imageList.length > 0 && imageList[0].data_url && imageList[0]['data_url'].split(',')[0] === "data:image/tiff;base64") {
                                                            const url = `${process.env.REACT_APP_API_URL}api/v1/core/tiff/`;
                                                            setPreviewLoading(true)
                                                            setPreView(true)
                                                            const fetchImage = async (para) => {

                                                                const response = await fetch(url, {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json", // Set the content type to application/json
                                                                    },
                                                                    body: JSON.stringify({
                                                                        tiff_image: para,
                                                                    }),
                                                                });
                                                                const data = await response.json();
                                                                const dataUrl = data.data
                                                                const blob = dataURLToBlob(dataUrl);
                                                                const fileSizeInBytes = blob.size;
                                                                if (fileSizeInBytes > 3 * Math.pow(10, 7)) {
                                                                    toast.error("your file size is greater than 10Mpx", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                                                                    return
                                                                }
                                                                setPreviewImages([{ data_url: data.data }]);
                                                                setFieldValue("preview_image", imageList[0])
                                                                setPreviewLoading(false)
                                                                // setImgSrc(data.data);data
                                                            }
                                                            fetchImage(imageList[0]['data_url'])
                                                        }
                                                        else {
                                                            setPreviewImages(imageList);
                                                            setFieldValue("preview_image", imageList[0])
                                                            setPreView(true)
                                                        }

                                                    }}
                                                    maxNumber={maxNumber}
                                                    dataURLKey="data_url"
                                                >
                                                    {({
                                                        imageList,
                                                        onImageUpload,
                                                        onImageRemoveAll,
                                                        onImageUpdate,
                                                        onImageRemove,
                                                        isDragging,
                                                        dragProps,
                                                    }) => (
                                                        // write your building UI
                                                        <div className="upload__image-wrapper">
                                                            <div className="image-position__left" onClick={() => { onImageUpload(); setDeleteSign(false) }}>
                                                                <TemplateButton content={t("Fügen Sie eine andere Vorschau hinzu")} />
                                                            </div>
                                                            <div className="image-position__left">
                                                                {preView ? (
                                                                    <div className="product-card">
                                                                        <div className="product-panel">
                                                                            <div className="product-info-group">
                                                                                <div className="product-info">
                                                                                    <div className="product-name"></div>
                                                                                    <div className="product-image-info"></div>
                                                                                </div>
                                                                                <div className="product-icon pointer" onClick={(e) => { if (previewImages.length !== 0 && previewImages[0]?.data_url !== undefined) { onImageRemoveAll() } setPreView(false); setDeleteSign(true) }}>
                                                                                    <img src={CrossIcon} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-image pointer">

                                                                            {imageList.map((image, index) => (
                                                                                <div key={index} className="image-item" style={{ width: "100%", height: "100%" }}>
                                                                                    <img src={previewLoading ? SpinnerIcon : image['data_url']} alt="backimage"
                                                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                                                </div>
                                                                            ))}
                                                                            {previewImages.length === 0 ? (
                                                                                <div className="image-item" style={{ width: "100%", height: "100%" }}>
                                                                                    <img src={productInfo?.preview_image_cdn_url} alt="previewimage"
                                                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                                                </div>) : null}
                                                                        </div>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    )}
                                                </ImageUploading>
                                            </div>
                                        </div>
                                    ) : null}

                                    {values.resolution_width && values.resolution_height && backView ? (
                                        <div className="product-setting-panel image-setting">
                                            <div className="image-setting-panel">
                                            </div>
                                            <div className="product-setting-panel__top">
                                                <div className="typography-400-regular top-typo">{t("Platzhalterbild")}</div>
                                            </div>
                                            <div className="product-setting-panel__bottom">
                                                <div className="image-setting-panel">
                                                    <div className="left-b-image" ref={elementRef} >
                                                        <div className="image-backgroud select-part" style={{ height: backgroundWidth >= backgroundHeight ? `${backgroundHeight}%` : "100%", width: backgroundWidth >= backgroundHeight ? "100%" : `${backgroundWidth}%`, backgroundImage: `url(${images.length === 0 ? productInfo?.bg_image_cdn_url : images[0]?.data_url})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", }}>
                                                            <div className="image-compare">
                                                                {values.resolution_width && values.resolution_height &&
                                                                    values.article_placements.map((value, index) => (
                                                                        <ImageTemplate
                                                                            key={index}
                                                                            title={`Image ${index + 1}`}
                                                                            width={value.width}
                                                                            height={value.height}
                                                                            position_x={value.position_x}
                                                                            position_y={value.position_y}
                                                                            z_index={value.z_index}
                                                                            bg_width={values.resolution_width}
                                                                            bg_height={values.resolution_height}
                                                                            setTempImages={setTempImages}
                                                                            backgroundWidth={
                                                                                backgroundWidth
                                                                            }
                                                                            backgroundHeight={
                                                                                backgroundHeight
                                                                            }
                                                                            backColor={backColor[index]}
                                                                        />
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right-b">
                                                        <div className="right-b__top">
                                                            <FieldArray name="article_placements">
                                                                {(arrayHelpers) => <ArticlePlacementsComponent values={values.article_placements} arrayHelpers={arrayHelpers} setFieldValue={setFieldValue} />}
                                                            </FieldArray>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                    {values.resolution_width && values.resolution_height && backView ? (
                                        <div
                                            className="bottom-template-button"
                                            onClick={handleSubmit}
                                        >
                                            <TemplateButton content={t("Template speichern")} />
                                        </div>
                                    ) : null}

                                </div>
                            </div>
                            <ToastContainer />
                        </Form>
                    )}
                </Formik>
                <Dialog
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className='custom-dialog'
                >
                    <div className='custom-dialog__header'>
                        <DialogTitle id="alert-dialog-title">
                            {t("Preview Image")}
                        </DialogTitle>
                        <p className='pointer' onClick={handleCloseModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.2301 2.64645C21.2765 2.69288 21.3133 2.74799 21.3385 2.80866C21.3636 2.86932 21.3765 2.93434 21.3765 3C21.3765 3.06566 21.3636 3.13068 21.3385 3.19134C21.3133 3.25201 21.2765 3.30713 21.2301 3.35356L12.584 12L21.2301 20.6464C21.2765 20.6929 21.3133 20.748 21.3385 20.8087C21.3636 20.8693 21.3765 20.9343 21.3765 21C21.3765 21.0657 21.3636 21.1307 21.3385 21.1913C21.3133 21.252 21.2765 21.3071 21.2301 21.3536C21.1837 21.4 21.1285 21.4368 21.0679 21.4619C21.0072 21.4871 20.9422 21.5 20.8765 21.5C20.8109 21.5 20.7458 21.4871 20.6852 21.4619C20.6245 21.4368 20.5694 21.4 20.523 21.3536L11.8765 12.7075L3.47703 21.1066C3.38315 21.1998 3.25615 21.252 3.12384 21.2518C2.99153 21.2516 2.86471 21.1989 2.77115 21.1054C2.6776 21.0118 2.62494 20.885 2.62471 20.7527C2.62448 20.6204 2.6767 20.4934 2.76992 20.3995L11.169 12L2.76992 3.6005C2.72332 3.55411 2.68633 3.49898 2.66106 3.43827C2.6358 3.37757 2.62275 3.31247 2.62268 3.24671C2.62261 3.18096 2.63551 3.11584 2.66063 3.05507C2.68576 2.99431 2.72263 2.9391 2.76913 2.8926C2.81563 2.84611 2.87084 2.80924 2.9316 2.78411C2.99237 2.75898 3.05749 2.74608 3.12325 2.74616C3.189 2.74623 3.2541 2.75928 3.3148 2.78454C3.37551 2.80981 3.43064 2.8468 3.47703 2.8934L11.8765 11.2925L20.523 2.64645C20.6167 2.55268 20.7439 2.5 20.8765 2.5C21.0091 2.5 21.1363 2.55268 21.2301 2.64645Z" fill="black" />
                            </svg>
                        </p>
                    </div>
                    <DialogContent className='custom-dialog__content'>
                        <div>{message}</div>
                    </DialogContent>
                    <DialogActions>
                        {
                            confirm?<><div onClick={deleteTemplateItem}><TemplateButton content={t('Ja')} /></div>
                            <div onClick={handleCloseModal}><TemplateButton content={t('Stornieren')} /></div></>:<div onClick={handleCloseModal}><TemplateButton content={t('Ok')} /></div>
                        }
                    </DialogActions>
                </Dialog>
            </ThemeProvider >
        </>
    )
}

export default TemplateEditPanel;