import { useState } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import { EditIcon, CrossIcon, PlusIcon, CloseIcon, Loading } from "libs/icons"
import { TemplateButton } from "pages/main/EditTemplate"
import { createTemplatesTypes, deleteTemplatesTypes, editTemplatesTypes } from "libs/_utils/actions"
import { infoActions } from "store/reducer"
import './style/AccountSetting.scss'
import 'react-toastify/dist/ReactToastify.css';

const ModalBoxComponent = ({ label, children, setOpen }) => {
    const { t } = useTranslation()

    return <div className="modal-box">
        <div className="label">
            <div className="typography-700-bold">
                {t(label)}
            </div>
            <img className="pointer" src={CloseIcon} alt="close" onClick={() => setOpen(false)} />
        </div>
        {children}
    </div>
}

const Item = ({ item, label, type, setLoading }) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleDelete = async () => {
        setLoading(true)
        const data = {
            host: type,
            pk: item.id
        }
        const response = await deleteTemplatesTypes(data)
        if (response.code === 200) {
            dispatch(infoActions.setPageData(response.data))
            toast.success("Successfully Deleted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        } else {
            toast.error("Failed to Delete", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        }
        setLoading(false)
    }
    const handleChange = async () => {
        setLoading(true);
        const data = {
            host: type,
            pk: item.id,
            value: value
        }
        const response = await editTemplatesTypes(data)
        if (response.code === 200) {
            setOpen(false)
            dispatch(infoActions.setPageData(response.data))
            toast.success("Successfully Edited", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        } else {
            toast.error("Failed to Edit", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        }
        setLoading(false);
    }
    return (
        <>
            <div className="setting-list">
                <div className="typography-400-regular">{t(item?.name)}</div>
                <div className="typography-400-regular">
                    <img className="pointer" src={EditIcon} onClick={() => setOpen(true)} alt="Edit item" />
                    <img className="pointer" src={CrossIcon} onClick={handleDelete} alt="Delete item" />
                </div>
            </div>
            {open &&
                <div className="modal">
                    <div className="modal-content">
                        <ModalBoxComponent label={`Edit ${label} Name`} setOpen={setOpen}>
                            <div className="box">
                                <div className="label-input-pair">
                                    <div className="typography-400-regular">{t("Name")} *</div>
                                    <div>
                                        <input type="text" defaultValue={t(item?.name)} onChange={(e) => setValue(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="button-group pointer">
                                <div onClick={() => setOpen(false)}><TemplateButton content={t("Abbrechen")} type={"transparent"} /></div>
                                <div onClick={handleChange}><TemplateButton content={t("Bestätigen")} /></div>
                            </div>
                        </ModalBoxComponent>
                    </div>
                </div>
            }
        </>
    )
}

const TypeListComponent = ({ items, type, label }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const { t } = useTranslation()
    const handleCreate = async () => {
        setLoading(true);
        const data = {
            host: type,
            value: value
        }
        const response = await createTemplatesTypes(data)
        if (response.code === 200) {
            setOpen(false)
            dispatch(infoActions.setPageData(response.data))
            toast.success("Successfully Created", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        } else {
            toast.error("Failed to Create", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        }
        setLoading(false);
    }
    return (
        <>
            {loading ? <Loading /> :
                <div className="api-setting">
                    <div>
                        <div className="api-setting__top">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="typography-400-regular">{t(label)}</div>
                                <img className="pointer" style={{ marginRight: "16px" }} onClick={() => setOpen(true)} src={PlusIcon} alt="Create Item" />
                            </div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="api-token">
                                {items.map(item => <Item key={item.id} item={item} label={label} type={type} setLoading={setLoading} />)}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {open &&
                <div className="modal">
                    <div className="modal-content">
                        <ModalBoxComponent label={`${label} Name`}>
                            <div className="box">
                                <div className="label-input-pair">
                                    <div className="typography-400-regular">{t("Neuer Name")} *</div>
                                    <div>
                                        <input type="text" onChange={(e) => setValue(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="button-group pointer">
                                <div onClick={() => setOpen(false)}><TemplateButton content={t("Abbrechen")} type={"transparent"} /></div>
                                <div onClick={handleCreate}><TemplateButton content={t("Bestätigen")} /></div>
                            </div>
                        </ModalBoxComponent>
                    </div>
                </div>
            }
        </>
    )
}

const TypeList = ({ type, label, items }) =>
    <form>
        <TypeListComponent key={type} type={type} label={label} items={items} />
        <ToastContainer />
    </form>

export default TypeList