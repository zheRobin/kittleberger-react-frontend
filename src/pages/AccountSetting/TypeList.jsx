
import "./style/AccountSetting.scss"
import { TemplateButton } from "../Organism/TemplatePanel"
import cross from "../../assets/icons/cross.svg"
import pencil from "../../assets/icons/pencil.svg"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from "formik"
import * as Yup from 'yup';
import { useTranslation } from "react-i18next"
import { createTemplatesTypes, editTemplatesTypes, deleteTemplatesTypes } from "../../_services/Template"
import close from "../../assets/icons/cross-black.svg"
import { Loading } from "../Organism/TemplatePanel"
import { authActions } from "../../store"
const TypeList = ({ type, label }) => {
    const dispatch = useDispatch()
    const templateTypes = useSelector(state => state.auth.templateTypes)
    const [templateListInfo, setTemplateListInfo] = useState([])
    const [loading, setLoading] = useState(false);
    const [modalView, setModalView] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const token = useSelector(state => state.auth.token)
    const { t } = useTranslation()
    const schema = Yup.object({
        name: Yup.string().required("Name field is required"),
    })
    useEffect(
        () => {
            setTemplateListInfo(templateTypes)
        }, [templateTypes]
    )
    const handleDelete = (id) => {
        setLoading(true)
        const updateInfo = {
            host: label,
            pk: id
        }
        deleteTemplatesTypes(updateInfo, token, (success) => {
            if (success.data.code === 200 && success.data.status === "success") {
                dispatch(authActions.setTemplateTypes(success.data.data))
                toast.success("Successfully Deleted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
            if (success.data.code === 400 && success.data.status === "failed") {
                toast.error("Failed to Delete", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
            setLoading(false)
        })
    }
    const handleEdit = (id, newName) => {
        setLoading(true)
        const updateInfo = {
            host: label,
            pk: id,
            value: newName
        }
        setModalView(false)
        editTemplatesTypes(updateInfo, token, (success) => {
            if (success.data.code === 200 && success.data.status === "success") {
                dispatch(authActions.setTemplateTypes(success.data.data))
                toast.success("Successfully Edited", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
            if (success.data.code === 400 && success.data.status === "failed") {
                toast.error("Failed to Edit", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
            setLoading(false)
        })
    }
    const ApiViewList = (token) => {
        return (
            <div className="setting-list">
                <div className="typography-400-regular">{token?.token?.name}</div>
                <div className="typography-400-regular">
                    <img className="pointer" src={pencil} alt="cross" onClick={() => { setModalView(true); setSelectedId(token?.token?.id) }} />
                    <img className="pointer" src={cross} alt="cross" onClick={() => handleDelete(token?.token?.id)} />
                </div>
            </div>
        )
    }

    const formik = useFormik(
        {
            initialValues: {
                name: ""
            },
            validationSchema: schema,
            onSubmit: () => {
                setLoading(true)
                createTemplatesTypes({ host: label, value: formik.values.name }, token, (success) => {
                    if (success.data.code === 200 && success.data.status === "success") {
                        dispatch(authActions.setTemplateTypes(success.data.data))
                        toast.success("Successfully Created", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                    }
                    if (success.data.code === 400 && success.data.status === "failed") {
                        toast.error(success.data.data, { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                    }
                    setLoading(false)
                })
            }

        }
    )

    // useEffect(
    //     () => {
    //         tokenList(token, (success) => {
    //             if (success.data.code === 200 && success.data.status === "success") {
    //                 setTokenLists(success.data.data, { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
    //             }
    //             if (success.data.code === 400 && success.data.status === "failed") {
    //                 toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
    //             }
    //         })
    //     }, []
    // )

    // useEffect(
    //     () => {
    //         tokenList(token, (success) => {
    //             if (success.data.code === 200 && success.data.status === "success") {
    //                 setTokenLists(success.data.data)
    //             }
    //             if (success.data.code === 400 && success.data.status === "failed") {
    //                 toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
    //             }
    //         })
    //     }, [loading]
    // )

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {loading ? <Loading /> : <></>}
                <div className="api-setting">
                    <div>
                        <div className="api-setting__top">
                            <div className="typography-400-regular">{t(label[0].toUpperCase() + label.slice(1) + ' Create')}</div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="label-input-pair">
                                <div className="typography-400-regular">{t(type)} *</div>
                                <div className="password-warning">
                                    <input name="name" onChange={formik.handleChange} value={formik.values.name} />
                                    {formik.touched.name && formik.errors.name ? (
                                        <p className="validation">{t(formik.errors.name)}</p>
                                    ) : null}
                                    <div className="label-group" onClick={formik.handleSubmit}><TemplateButton content={t("Speichern")} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="api-setting__top">
                            <div className="typography-400-regular">{t(type)}</div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="api-token">
                                {
                                    label === "brand" && templateListInfo?.brands?.map(
                                        (tokenlist) => {
                                            return (<ApiViewList key={tokenlist.id} token={tokenlist} />)
                                        }
                                    )
                                }
                                {
                                    label === "country" && templateListInfo?.country_list?.map(
                                        (tokenlist) => {
                                            return (<ApiViewList key={tokenlist.id} token={tokenlist} />)
                                        }
                                    )
                                }
                                {
                                    label === "application" && templateListInfo?.applications?.map(
                                        (tokenlist) => {
                                            return (<ApiViewList key={tokenlist.id} token={tokenlist} />)
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {modalView ? (
                    <Formik
                        initialValues={{ password: '' }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            handleEdit(selectedId, values.password)
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal">
                                    <div className="modal-content">
                                        <div className="modal-box">
                                            <div className="label">
                                                <div className="typography-700-bold">{t("Neues Element erstellen")}</div>
                                                <img className="pointer" src={close} alt="close" onClick={() => setModalView(false)} />
                                            </div>
                                            <div className="box">
                                                <div className="label-input-pair">
                                                    <div className="typography-400-regular">{t("Neuer Name")} *</div>
                                                    <div>
                                                        <input type="text"  {...formik.getFieldProps('password')} />
                                                        {formik.touched.password && formik.errors.password ? (
                                                            <div className="validation">{formik.errors.password}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="button-group pointer">
                                                <div onClick={() => setModalView(false)}><TemplateButton content={t("Abbrechen")} type={"transparent"} /></div>
                                                <div onClick={formik.handleSubmit}><TemplateButton content={t("Bestätigen")} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                ) : null}
                <ToastContainer />
            </form>
        </>
    )
}

export default TypeList