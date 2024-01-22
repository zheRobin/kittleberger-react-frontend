
import "./style/AccountSetting.scss"
import { TemplateButton } from "pages/main/CreateTemplate"
import cross from "assets/icons/cross.svg"
import pencil from "assets/icons/pencil.svg"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from "formik"
import * as Yup from 'yup';
import { useTranslation } from "react-i18next"
import { createTemplatesTypes, editTemplatesTypes, deleteTemplatesTypes } from "libs/_utils/actions"
import close from "assets/icons/cross-black.svg"
import { Loading } from "pages/main/CreateTemplate"
import { authActions } from "../../store/reducer"
import plus from "assets/icons/plus-square.svg"

const TypeList = ({ type, label }) => {
    const dispatch = useDispatch()
    const pageData = useSelector(state => state.info.pageData)
    const [templateListInfo, setTemplateListInfo] = useState([])
    const [loading, setLoading] = useState(false);
    const [modalView, setModalView] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const token = useSelector(state => state.auth.token)
    const [submitType, setSubmitType] = useState(0)
    const { t } = useTranslation()
    const schema = Yup.object({
        name: Yup.string().required("Name field is required"),
    })
    const [selectedName, setSelectedName] = useState("")
    useEffect(
        () => {
            setTemplateListInfo(pageData)
        }, [pageData]
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
                <div className="typography-400-regular">{t(token?.token?.name)}</div>
                <div className="typography-400-regular">
                    <img className="pointer" src={pencil} alt="cross" onClick={() => { setModalView(true); setSubmitType(0); setSelectedId(token?.token?.id); setSelectedName(token?.token?.name) }} />
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

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {loading ? <Loading /> : <></>}
                <div className="api-setting">
                    <div>
                        <div className="api-setting__top">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="typography-400-regular">{t(type)}</div>
                                <div className="pointer" onClick={() => { setModalView(true); setSubmitType(1) }} style={{ marginRight: "16px" }}><img src={plus} alt="plus"></img></div>
                            </div>

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
                        initialValues={{ password: submitType ? '' : selectedName }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            !submitType && handleEdit(selectedId, values.password)
                            submitType && createTemplatesTypes({ host: label, value: values.password }, token, (success) => {
                                if (success.data.code === 200 && success.data.status === "success") {
                                    dispatch(authActions.setTemplateTypes(success.data.data))
                                    setModalView(false)
                                    toast.success("Successfully Created", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                                }
                                if (success.data.code === 400 && success.data.status === "failed") {
                                    setModalView(false)
                                    toast.error(success.data.data, { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                                }
                                setLoading(false)
                            })
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal">
                                    <div className="modal-content">
                                        <div className="modal-box">
                                            <div className="label">
                                                <div className="typography-700-bold">
                                                    {submitType === 1 ? t(label[0].toUpperCase() + label.slice(1) + " " + "Name") : t("Edit" + " " + label[0].toUpperCase() + label.slice(1) + " " + "Name")}
                                                </div>                                                <img className="pointer" src={close} alt="close" onClick={() => setModalView(false)} />
                                            </div>
                                            <div className="box">
                                                <div className="label-input-pair">
                                                    <div className="typography-400-regular">{submitType == 1 ? t("Neuer Name") : t("Name")} *</div>
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