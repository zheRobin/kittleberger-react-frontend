import React, { useEffect } from 'react';
import { Formik, Form, Field, FieldArray, useField, useFormikContext, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { createTheme } from "@mui/material/styles";
import { Typography, ThemeProvider, Checkbox, TextField, Select, MenuItem } from "@mui/material"
import ImageUploading from 'react-images-uploading';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { createTemplate } from "libs/_utils/actions";
import PlusIcon from "assets/icons/add.svg"
import DeleteIcon from "assets/icons/cross.svg"
import DragIcon from "assets/icons/drag&drop.svg"
import ImageTemplate from "components/Composing/ImageTempate"
import { useRef, useLayoutEffect } from 'react';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import spinner from "assets/icons/tube-spinner.svg"
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import "components/Composing/style/composeStyle.scss"

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

							<Checkbox defaultChecked={false} name={value.name} style={{ color: 'black', borderColor: 'white', padding: 0, margin: 0 }} onChange={(e) => {
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
	const { t } = useTranslation();
	const [articleGroup, setArticleGroup] = useState(values);
	const [draggedItem, setDraggedItem] = useState({})
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
		let draggedOverItem = articleGroup[index];
		let tempDraggedItem = draggedItem
		if (tempDraggedItem === draggedOverItem) {
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
										<div className="typography-400-regular">{t("top")}</div>
										<div className="input-group__bottom"><Field as={TextField} inputProps={{ type: "number", style: { textAlign: 'center' } }} value={value.position_y || '0'} name={`article_placements.${index}.position_y`} /></div>
									</div>
									<div>
										<div className="typography-400-regular">{t("left")}</div>
										<div className="input-group__bottom"><Field as={TextField} inputProps={{ type: "number", style: { textAlign: 'center' } }} value={value.position_x || '0'} name={`article_placements.${index}.position_x`} /></div>
									</div>
									<div>
										<div className="typography-400-regular">{t("width")}</div>
										<div className="input-group__bottom"><Field as={TextField} inputProps={{ type: "number", style: { textAlign: 'center' } }} value={value.width || '0'} name={`article_placements.${index}.width`} /></div>
									</div>
									<div>
										<div className="typography-400-regular">{t("height")}</div>
										<div className="input-group__bottom"><Field as={TextField} inputProps={{ type: "number", style: { textAlign: 'center' } }} value={value.height || '0'} name={`article_placements.${index}.height`} /></div>
									</div>
									<div>
										<div className="typography-400-regular">{t("z-index")}</div>
										<div className="input-group__bottom"><Field as={TextField} inputProps={{ type: "number", style: { textAlign: 'center' } }} value={value.z_index || '0'} name={`article_placements.${index}.z_index`} /></div>
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
				<div className="right-b__bottom" onClick={() => { values.length < 9 && arrayHelpers.push({ position_x: '0', position_y: '0', width: '0', height: '0', z_index: '0' }) }}>
					{values.length >= 9 ? null : (
						<>
							<img className='pointer' src={PlusIcon} alt="plus" style={{ color: "black" }}></img>
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
const TemplatePanel = () => {
	const navigate = useNavigate()
	const { t } = useTranslation();
	const [backView, setBackView] = useState(false);
	const [preView, setPreView] = useState(false);
	const [images, setImages] = useState([{ data_url: "" }]);
	const [tempImages, setTempImages] = useState({ width: 1, height: 1 });
	const [backLoading, setBackLoading] = useState(false)
	const [previewLoading, setPreviewLoading] = useState(false)
	const [width, setWidth] = useState(500);
	const [height, setHeight] = useState(500);
	const [loading, setLoading] = useState(false);
	const elementRef = useRef(null);
	let backgroundHeight = (tempImages.height / tempImages.width * width) * 100 / height
	let backgroundWidth = (tempImages.width / tempImages.height * height) * 100 / width
	const [previewImages, setPreviewImages] = useState([]);
	const maxNumber = 69;
	const pageData = useSelector(state => state.info.pageData)
	const brands = pageData.brands.map(brand => ({ ...brand, value: false }));
	const applications = pageData.applications.map(app => ({ ...app, value: false }));
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
			.required(t('This field is required')),
		resolution_width: Yup.string().required(t('This field is required')),
		resolution_height: Yup.string().required(t('This field is required'))
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
	return (
		<>
			<ThemeProvider theme={theme}>

				<Formik
					initialValues={{
						preview_image: '',
						background_image: '',
						brands: brands,
						applications: applications,
						article_placements: [{ position_x: '0', position_y: '0', width: '0', height: '0', z_index: '0' }],
						name: "",
						is_shadow: false,
						resolution_width: "",
						resolution_height: "",
						type: "",
					}}
					validationSchema={validationSchema}
					onSubmit={async (values) => {
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
						try {
							setLoading(true)
							const response = await createTemplate(formData);
							if (response?.code === 201) {
								setLoading(false);
								toast.success("Successfully Created", { theme: "colored", hideProgressBar: true, autoClose: 1500 });
								setTimeout(() => {
									navigate("/");
								}, 1500); 
							} else {
								setLoading(false);
								toast.error(response?.data?.data, { theme: "colored", hideProgressBar: true, autoClose: 2000 });
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
								<div
									className="top-template-button"
									onClick={handleSubmit}
								>
									<TemplateButton content={t("Template speichern")} />
									{loading ? <Loading /> : null}
								</div>
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
															>
																<MenuItem value="" disabled>
																	<em>{t("Dateityp wählen")}</em>
																</MenuItem>
																<MenuItem value="JPEG">.jpg</MenuItem>
																<MenuItem value="PNG">.png</MenuItem>
																<MenuItem value="TIFF">.tiff</MenuItem>
															</Field>
															<p className="typography-400-regular select-subtitle">
																{t(".jpg und .png sind in 72 dpi; .tiff ist in 300 dpi")}
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
																<div className='typography-400-regular checkbox-group__label' style={{ color: 'black' }}>
																	{t("Produktschatten aktivieren")}
																</div>
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
															if (fileSizeInBytes > 3 * Math.pow(10, 7)) {

																toast.error("your file size is greater than 10Mpx", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
																return
															}
														}

														if (imageList.length > 0 && imageList[0].data_url && imageList[0]['data_url'].split(',')[0] === "data:image/tiff;base64") {
															const url = `${process.env.REACT_APP_API_URL}api/v1/core/tiff/`;
															const fetchImage = async (para) => {
																setBackLoading(true)
																setBackView(true)

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
																					<img src={DeleteIcon} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
																				</div>
																			</div>
																		</div>
																		<div className="product-image pointer">
																			{imageList.map((image, index) => (
																				<div key={index} className="image-item"
																					style={{ width: "100%", height: "100%" }}>

																					<img src={backLoading ? spinner : imageList[0].data_url} alt="background"
																						style={{ width: "100%", height: "100%", objectFit: "contain" }} />
																				</div>
																			))}
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
																// setImgSrc(data.data);data
																setPreviewLoading(false)
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
															<div className="image-position__left" onClick={() => { onImageUpload(); }}>
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
																				<div className="product-icon pointer" onClick={(e) => { onImageRemoveAll(); setPreView(false) }}>
																					<img src={DeleteIcon} style={{ backgroundColor: "white", border: "none" }} alt="cancelIcon"></img>
																				</div>
																			</div>
																		</div>
																		<div className="product-image pointer">
																			{imageList.map((image, index) => (
																				<div key={index} className="image-item" style={{ width: "100%", height: "100%" }}>
																					<img src={previewLoading ? spinner : image['data_url']} alt="backimage"
																						style={{ width: "100%", height: "100%", objectFit: "contain" }} />
																				</div>
																			))}
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
									{values.resolution_width && values.resolution_height &&
										backView ? (
										<div className="product-setting-panel image-setting">
											<div className="image-setting-panel">
											</div>
											<div className="product-setting-panel__top">
												<div className="typography-400-regular top-typo">{t("Platzhalterbild")}</div>
											</div>
											<div className="product-setting-panel__bottom">
												<div className="image-setting-panel">
													<div className="left-b-image" ref={elementRef} >
														<div className="image-backgroud select-part" style={{ height: backgroundWidth >= backgroundHeight ? `${backgroundHeight}%` : "100%", width: backgroundWidth >= backgroundHeight ? "100%" : `${backgroundWidth}%`, backgroundImage: `url(${images[0]?.data_url})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}>
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

			</ThemeProvider >
		</>
	)
}

export default TemplatePanel;