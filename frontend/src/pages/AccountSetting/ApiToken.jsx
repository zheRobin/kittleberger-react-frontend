
import "./style/AccountSetting.scss"
import { TemplateButton } from "../Organism/TemplatePanel"
import cross from "../../assets/icons/cross.svg"
import { tokenList } from "../../_services/ApiToken"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useFormik } from 'formik';
import { createToken } from "../../_services/ApiToken"
import { deleteToken } from "../../_services/ApiToken"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

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
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token)

    const schema = Yup.object({
        name: Yup.string().required("Name field is required"),
    })



    const handleDelete = (id) => {
        setLoading(true)
        deleteToken(id, token, (success) => {
            if (success.data.code === 200 && success.data.status === "success") {
                toast.success("Successfully Deleted")
            }
            if (success.data.code === 400 && success.data.status === "failed") {
                toast.error("Something Went Wrong")
            }
            setLoading(false)
        })
    }

    const ApiViewList = (token) => {
        return (
            <div className="token-list">
                <div className="typography-400-regular">{token?.token?.name}</div>
                <div className="typography-400-regular">
                    <div className="typography-400-regular">{formatDate(token?.token?.last_used)}</div>
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
                createToken(formik.values.name, token, (success) => {
                    if (success.data.code === 200 && success.data.status === "success") {
                        toast.success("Successfully Created")
                    }
                    if (success.data.code === 400 && success.data.status === "failed") {
                        toast.error("Something Went Wrong")
                    }
                    setLoading(false)
                })
            }

        }
    )

    useEffect(
        () => {
            tokenList(token, (success) => {
                if (success.data.code === 200 && success.data.status === "success") {
                    setTokenLists(success.data.data)
                }
                if (success.data.code === 400 && success.data.status === "failed") {
                    toast.error("Something Went Wrong")
                }
            })
        }, []
    )

    useEffect(
        () => {
            tokenList(token, (success) => {
                if (success.data.code === 200 && success.data.status === "success") {
                    setTokenLists(success.data.data)
                }
                if (success.data.code === 400 && success.data.status === "failed") {
                    toast.error("Something Went Wrong")
                }
            })
        }, [loading]
    )

    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <div className="api-setting">
                    <div>
                        <div className="api-setting__top">
                            <div className="typography-400-regular">API-Token erstellen</div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="typography-400-regular">API-Tokens ermöglichen es Drittanbieterdiensten, sich in Ihrem Namen mit unserer Anwendung zu authentifizieren.</div>
                            <div className="label-input-pair">
                                <div className="typography-400-regular">Name *</div>
                                <div className="password-warning">
                                    <input name="name" onChange={formik.handleChange} value={formik.values.name} />
                                    {formik.touched.name && formik.errors.name ? (
                                        <p className="validation">{formik.errors.name}</p>
                                    ) : null}
                                    <div className="label-group" onClick={formik.handleSubmit}><TemplateButton content={"Speichern"} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="api-setting__top">
                            <div className="typography-400-regular">API-Token verwalten</div>
                        </div>
                        <div className="api-setting__bottom">
                            <div className="typography-400-regular">Sie können alle vorhandenen Tokens löschen, wenn sie nicht mehr benötigt werden.</div>
                            <div className="api-token">
                                {tokenLists.map(
                                    (tokenlist) => {
                                        return (<ApiViewList key={tokenlist.id} token={tokenlist} />)
                                    }
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