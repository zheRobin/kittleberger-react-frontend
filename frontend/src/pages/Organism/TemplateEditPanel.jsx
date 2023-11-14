import React from 'react';
import { Formik, Form, Field, FieldArray, useField, useFormikContext } from 'formik';
// import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { createTheme } from "@mui/material/styles";
import { Typography, ThemeProvider, Checkbox, TextField, Select, MenuItem } from "@mui/material"
import ImageUploading from 'react-images-uploading';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { updateTemplate } from "../../_services/Template";
import PlusIcon from "../../assets/icons/add.svg"
import DeleteIcon from "../../assets/icons/cross.svg"
import DragIcon from "../../assets/icons/drag&drop.svg"
import 'react-toastify/dist/ReactToastify.css';
import "./style/organismStyle.scss"
import "../../components/Composing/style/composeStyle.scss"
import ImageTemplate from "../../components/Composing/ImageTempate"
import { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
// let validationSchema = Yup.object().shape({
//     name: Yup.string()
//         .required('Required'),
//     preview_image: Yup.mixed()
//         .required('Required'),
//     background_image: Yup.mixed()
//         .required('Required'),
//     brands: Yup.array(),
//     applications: Yup.array(),
//     article_placements: Yup.array(),
//     is_shadow: Yup.bool(),
//     resolution_width: Yup.string(),
//     resolution_height: Yup.string(),
//     type: Yup.string()
// })
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
            <div className='label__right'>
                <div className="label-check-pair__checkbox-group">
                    {values.map((value, index) => (

                        < div key={index} className='checkbox-group' >

                            <Checkbox defaultChecked={false} name={value.name} style={{ color: 'black', borderColor: 'white', padding: 0, margin: 0 }} onChange={() => {
                                var newData = [...field.value];
                                newData[index].value = !newData[index].value;
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
export const ArticlePlacementsComponent = ({ values, arrayHelpers }) => (
    <div>
        {values.map((value, index) => (
            <div className="image-settings" key={index}>
                <div className="image-settings__left-section">
                    <div className="image-settings__common"><div className="typography-700-regular" style={{ width: "60px" }}>Image {index + 1}</div></div>
                </div>
                <div className="image-settings__right-section">
                    <div className="image-settings__common"><img src={DragIcon} alt="DragIcon"></img></div>
                    <div className="image-settings__panel">
                        <div className="input-groups">
                            <div>
                                <div className="typography-400-regular">top</div>
                                <div className="input-group__bottom"><Field as={TextField} value={value.position_y || ''} name={`article_placements.${index}.position_y`} /></div>
                            </div>
                            <div>
                                <div className="typography-400-regular">left</div>
                                <div className="input-group__bottom"><Field as={TextField} value={value.position_x || ''} name={`article_placements.${index}.position_x`} /></div>
                            </div>
                            <div>
                                <div className="typography-400-regular">width</div>
                                <div className="input-group__bottom"><Field as={TextField} value={value.width || ''} name={`article_placements.${index}.width`} /></div>
                            </div>
                            <div>
                                <div className="typography-400-regular">height</div>
                                <div className="input-group__bottom"><Field as={TextField} value={value.height || ''} name={`article_placements.${index}.height`} /></div>
                            </div>
                            <div>
                                <div className="typography-400-regular">z-index</div>
                                <div className="input-group__bottom"><Field as={TextField} value={value.z_index || ''} name={`article_placements.${index}.z_index`} /></div>
                            </div>
                            <div className="image-settings__common pointer" onClick={() => {
                                arrayHelpers.remove(index)
                            }}><img src={DeleteIcon} alt="Delete Article"></img></div>
                        </div>
                    </div>
                </div>

            </div>
        )
        )}
        <div className="right-b__bottom">
            <img src={PlusIcon} alt="plus" style={{ color: "black" }}></img>
            <div className="typo-700-regular pointer" onClick={() => arrayHelpers.push({ position_x: '', position_y: '', width: '', height: '', z_index: '', })}>
                Ein weiteres Platzhalterbild hinzufügen
            </div>
        </div>
    </div>
);

export default function TemplateEditPanel() {
    const { state } = useLocation();
    const productInfo = state ? state : {}
    const [backView, setBackView] = useState(productInfo?.bg_image_cdn_url ? true : false);
    const [preView, setPreView] = useState(productInfo?.preview_image_cdn_url ? true : false);
    const [images, setImages] = useState([]);
    const [tempImages, setTempImages] = useState({ width: 2, height: 1 });
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(600);
    const elementRef = useRef(null);
    let backgroundHeight = (tempImages.height / tempImages.width * width) * 100 / height
    const [previewImages, setPreviewImages] = useState([]);
    const maxNumber = 69;
    const token = useSelector(state => state.auth.token)
    const templateTypes = useSelector(state => state.auth.templateTypes)
    const brands = templateTypes.brands.map(brand => ({ ...brand, value: false }));
    const applications = templateTypes.applications.map(app => ({ ...app, value: false }));
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
    useLayoutEffect(() => {
        const handleResize = () => {
            setWidth(elementRef.current.offsetWidth);
            setHeight(elementRef.current.offsetHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    return (
        <>
            <ThemeProvider theme={theme}>
                <Formik
                    initialValues={{
                        preview_image: productInfo?.preview_image_cdn_url,
                        background_image: productInfo?.bg_image_cdn_url,
                        brands: brands,
                        applications: applications,
                        article_placements: productInfo?.article_placements,
                        name: productInfo?.name,
                        is_shadow: productInfo?.is_shadow,
                        resolution_width: productInfo?.resolution_width,
                        resolution_height: productInfo?.resolution_height,
                        type: productInfo?.file_type,
                    }}
                    onSubmit={values => {
                        let formData = new FormData();
                        formData.append("preview_image", values.preview_image.file);
                        formData.append("background_image", values.background_image.file);
                        formData.append("brands", values.brands
                            .filter(brand => brand.value)
                            .map(brand => brand.id));
                        formData.append("applications", values.applications
                            .filter(applications => applications.value)
                            .map(applications => applications.id));
                        formData.append("article_placements", JSON.stringify(values.article_placements));
                        formData.append("name", values.name);
                        formData.append("is_shadow", values.is_shadow);
                        formData.append("resolution_width", values.resolution_width);
                        formData.append("resolution_height", values.resolution_height);
                        formData.append("type", values.type);
                        updateTemplate(formData, token, productInfo?.id, (success) => {
                            if (success.data.code === 201 && success.data.status === "success") {
                                toast.success("Successfully Created")
                            }
                            if (success.data.code === 400 && success.data.status === "failed") {
                                toast.error("Something Went Wrong")
                            }
                        })
                    }}
                >
                    {({ values, setFieldValue, handleSubmit }) => (
                        <Form className='template-form'>
                            <div className='template-panel'>
                                <div
                                    className="top-template-button"
                                    onClick={handleSubmit}
                                >

                                    <TemplateButton content={"Template speichern"} />
                                </div>
                                <div className="panel-group">
                                    <div className="product-setting-panel">
                                        <div className="product-setting-panel__top">
                                            <div className="typography-400-regular top-typo">Allgemein</div>
                                        </div>
                                        <div className="product-setting-panel__bottom">
                                            <div className="input-group">
                                            <div className="label-input-pair">
                                                    <div className="label__left">
                                                        <p className="typography-400-regular">Name*</p>
                                                    </div>
                                                    <div className='label__right'>
                                                        <Field as={TextField} name='name' />
                                                    </div>
                                                </div>
                                                <div className="label-select-pair">
                                                <div className="label__left">
                                                        <p className="typography-400-regular">Dateityp*</p>
                                                    </div>
                                                    <div className="label__right">
                                                        <div className="select-group">
                                                            <Field as={Select}
                                                                labelId="demo-customized-select-label"
                                                                id="demo-customized-select"
                                                                name="type"
                                                                displayEmpty
                                                                IconComponent={ExpandMoreIcon}
                                                                sx={{
                                                                    width: "472px", height: "40px", padding: "0px 10px 10px 10px",
                                                                    "& .MuiOutlinedInput-input": {
                                                                        textAlign: "start",
                                                                        marginLeft: "9px"
                                                                    }
                                                                }}
                                                            >   <MenuItem value="" disabled>
                                                                    <em>select the value</em>
                                                                </MenuItem>
                                                                <MenuItem value="JPEG">.jpg</MenuItem>
                                                                <MenuItem value="PNG">.png</MenuItem>
                                                                <MenuItem value="TIFF">.tiff</MenuItem>
                                                                <MenuItem value="IST">.ist</MenuItem>
                                                            </Field>
                                                            <p className="typography-400-regular select-subtitle">
                                                                .jpg und .png sind in 72 dpi; .tiff ist in 300 dpi
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="label-input-pair">
                                                    <div className="label__left">
                                                        <div className="typography-400-regular">Width*</div>
                                                    </div>
                                                    <div className="label__right">
                                                            <Field as={TextField} name="resolution_width" />
                                                    </div>
                                                </div>
                                                <div className="label-input-pair">
                                                    <div className="label__left">
                                                        <div className="typography-400-regular">Height*</div>
                                                    </div>
                                                    <div className="label__right">
                                                        <Field as={TextField} name="resolution_height" />
                                                    </div>
                                                </div>
                                                <div className="check-group">
                                                    <div className="label-check-pair">
                                                        <div className="label-check-pair__label">
                                                            <div className="typography-400-regular">Schatten</div>
                                                        </div>
                                                        <div className='label__right'>
                                                            <div className='label-check-pair__checkbox'>
                                                                <Field as={Checkbox} defaultChecked={values.is_shadow} style={{ color: 'black', borderColor: 'white', padding: 0, margin: 0 }} name="is_shadow"/>
                                                                <div className='typography-400-regular checkbox-group__label' style={{ color: 'black' }}>Produktschatten aktivieren</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="check-group">
                                                    <CheckboxGroupComponent label="Marke *" values={values.brands} name="brands" /></div>
                                                <div className="check-group"><CheckboxGroupComponent label="Anwendung *" values={values.applications} name="applications" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-setting-panel background-upload-panel">
                                        <div className="product-setting-panel__top">
                                            <div className="typography-400-regular top-typo">Hintergrund</div>
                                        </div>
                                        <div className="product-setting-panel__bottom">
                                            <ImageUploading
                                                value={images}
                                                onChange={(imageList) => {
                                                    setImages(imageList);
                                                    setFieldValue("background_image", imageList[0])
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
                                                        <div className="image-position__left" onClick={() => { onImageUpload(); setBackView(true) }}>
                                                            <TemplateButton content={"Einen anderen Hintergrund hinzufügen"} />
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
                                                                                <img src={DeleteIcon} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-image pointer">
                                                                        {imageList.map((image, index) => (
                                                                            <div key={index} className="image-item"
                                                                                style={{ width: "100%", height: "100%" }}>
                                                                                <img src={image['data_url']} alt="background"
                                                                                    style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                                            </div>
                                                                        ))}
                                                                        {images.length === 0 ? (
                                                                            <div className="image-item" style={{ width: "100%", height: "100%" }}>
                                                                                <img src={productInfo?.bg_image_cdn_url} alt="backimage"
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
                                    <div className="product-setting-panel thumbnail-panel">
                                        <div className="product-setting-panel__top">
                                            <div className="typography-400-regular top-typo">Vorschaubild</div>
                                        </div>
                                        <div className="product-setting-panel__bottom">
                                            <ImageUploading
                                                value={previewImages}
                                                onChange={(imageList) => {
                                                    setPreviewImages(imageList);
                                                    setFieldValue("preview_image", imageList[0])
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
                                                        <div className="image-position__left" onClick={() => { onImageUpload(); setPreView(true) }}>
                                                            <TemplateButton content={"Einen anderen Hintergrund hinzufügen"} />
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
                                                                            <div className="product-icon pointer" onClick={(e) => { onImageRemoveAll(); setPreView(false) }}>
                                                                                <img src={DeleteIcon} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-image pointer">
                                                                        {imageList.map((image, index) => (
                                                                            <div key={index} className="image-item" style={{ width: "100%", height: "100%" }}>
                                                                                <img src={image['data_url']} alt="backimage"
                                                                                    style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                                            </div>
                                                                        ))}
                                                                        {previewImages.length === 0 ? (
                                                                            <div className="image-item" style={{ width: "100%", height: "100%" }}>
                                                                                <img src={productInfo?.preview_image_cdn_url} alt="backimage"
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
                                    <div className="product-setting-panel image-setting">
                                        <div className="image-setting-panel">


                                        </div>
                                        <div className="product-setting-panel__top">
                                            <div className="typography-400-regular top-typo">Platzhalterbild</div>
                                        </div>
                                        <div className="product-setting-panel__bottom">
                                            <div className="image-setting-panel">
                                                <div className="left-b-image" ref={elementRef} >
                                                    <div className="image-backgroud" style={{ height: `${backgroundHeight}%` }}>
                                                        <div className="image-compare">
                                                            {values.article_placements.map((value, index) => (
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
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right-b">
                                                    <div className="right-b__top">
                                                        <FieldArray name="article_placements">
                                                            {(arrayHelpers) => <ArticlePlacementsComponent values={values.article_placements} arrayHelpers={arrayHelpers} />}
                                                        </FieldArray>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='bottom-template-button' onClick={onSubmit}> */}
                                    {/* <button type="submit">Submit</button> */}
                                    {/* <TemplateButton content={"Template speichern"} /> */}
                                    {/* </div> */}
                                </div>
                            </div>
                            <ToastContainer />
                        </Form>
                    )}
                </Formik>
            </ThemeProvider>
        </>
    )
}