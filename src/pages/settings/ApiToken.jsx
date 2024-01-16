
import { useEffect, useState } from "react"
import { useFormik } from 'formik';
import { TemplateButton } from "pages/main/TemplatePanel"
import { CrossIcon } from "libs/icons"; 
import { tokenList, createToken, deleteToken } from "libs/_utils/actions"
import { ToastContainer, toast } from "react-toastify"
import * as Yup from 'yup';
import { useTranslation } from "react-i18next"
import "./style/AccountSetting.scss"
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMilliseconds = now - date;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diffInWeeks >= 2) {
        return rtf.format(-diffInWeeks, "week");
    } else if (diffInDays >= 2) {
        return rtf.format(-diffInDays, "day");
    } else if (diffInHours >= 2) {
        return rtf.format(-diffInHours, "hour");
    } else if (diffInMinutes >= 2) {
        return rtf.format(-diffInMinutes, "minute");
    } else {
        return "Just now";
    }
};
const ApiToken = () => {
    const [tokenLists, setTokenLists] = useState([]);
    const { t } = useTranslation()
    const schema = Yup.object({
        name: Yup.string().required("Name field is required"),
    })
    const formik = useFormik(
        {
            initialValues: {
                name: ""
            },
            validationSchema: schema,
            onSubmit: async () => {
                const data = {
                    'name': formik.values.name
                }
                const response = await createToken(data);
                if (response?.code === 200) {
                    setTokenLists(response.data);
                    toast.success("Successfully Created", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                } else {
                    toast.error(response.data.data, { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
            }

        }
    )
    const handleDelete = async (id) => {
        const response = await deleteToken(id);
        if (response?.code === 200) {
            setTokenLists(response.data);
            toast.success("Successfully Deleted", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        } else {
            toast.error("Failed to Delete", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
        }
    }
    useEffect(() => {
        const fetchTokens = async () => {
            const response = await tokenList();
            if (response?.code === 200) {
                setTokenLists(response.data);
            } else {
                toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        };
        fetchTokens();
    }, []);
    const TokenItem = (item) => {    
        return (
            <div className="token-list">
                <div className="typography-400-regular">{item?.token?.apikey}</div>
                <div className="typography-400-regular">
                    <div className="typography-400-regular">{item?.token?.name}</div>
                    <div className="typography-400-regular">{item?.token?.last_used == null ? (`Not used yet`) : `Last used ` + formatDate(item?.token?.last_used)}</div>
                    <img className="pointer" src={CrossIcon} alt="cross" onClick={() => handleDelete(item?.token?.id)} />
                </div>
            </div>
        )
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="setting-form">
                <div className="api-setting">
                    <div>
                        <div className="api-setting__top">
                            <div className="typography-400-regular">{t("API-Token erstellen")}</div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="typography-400-regular">{t("API-Tokens ermöglichen es Drittanbieterdiensten, sich in Ihrem Namen mit unserer Anwendung zu authentifizieren.")}</div>
                            <div className="label-input-pair">
                                <div className="typography-400-regular">{t("Name *")}</div>
                                <div className="password-warning">
                                    <input name="name" onChange={formik.handleChange} value={formik.values.name} />
                                    {formik.touched.name && formik.errors.name ? (
                                        <p className="validation">{t(formik.errors.name)}</p>
                                    ) : null}
                                    <div className="label-group" style={{ display: "flex", justifyContent: "flex-start" }} ><div style={{ padding: "0 0 0 0", marginTop: "0" }} onClick={formik.handleSubmit}><TemplateButton content={t("Speichern")} /></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="api-setting__top">
                            <div className="typography-400-regular">{t("API-Token verwalten")}</div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="typography-400-regular">{t("Sie können alle vorhandenen Tokens löschen, wenn sie nicht mehr benötigt werden.")}</div>
                            <div className="api-token">
                                {tokenLists.map(
                                    (el) => <TokenItem key={el.id} token={el} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    )
}

export default ApiToken