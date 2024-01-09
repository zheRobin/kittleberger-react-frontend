import "./style/AccountSetting.scss"
import { TemplateButton } from "../Organism/TemplatePanel"
import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { changePassword } from "../../_services/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PasswordChange = () => {
    const token = useSelector(state => state.auth.token)
    const { t } = useTranslation()
    const schema = yup.object().shape({
        oldpass: yup.string().required("This field is required"),
        newpass: yup.string()
            .min(8, "Password must consist of at least 8 characters")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
                /[^a-zA-Z0-9]/,
                "Password must contain at least one special character"
            )
            .required("This field is required"),
    });

    const formik = useFormik({
        initialValues: {
            oldpass: "",
            newpass: ""
        },
        validationSchema: schema,
        onSubmit: () => {
            changePassword(formik.values, token, (success) => {
                if (success.data.code === 200 && success.data.status === "success") {
                    toast.success("Successfully Changed", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
                }
                else {
                    toast.error("Something went wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
                }
            });
        },
    });




    const setInputValue = useCallback(
        (key, value) => formik.setValues(
            {
                ...formik.values,
                [key]: value
            }
        ), [formik]
    )



    return (
        <form onSubmit={formik.handleSubmit} className="setting-form">
            <div className="setting-panel-user">
                <div className="setting-panel-user__top">
                    <div className="typography-400-regular">{t("Passwort ändern")}</div>
                </div>
                <div className="setting-panel-user__bottom">
                    <div className="label-input-pair">
                        <div className="typography-400-regular">{t("Altes Passwort *")}</div>
                        <div className="password-warning" style={{ width: "470px" }}>
                            <input type="password" value={formik.values.oldpass} onChange={(e) => setInputValue('oldpass', e.target.value)}></input>
                            {formik.touched.oldpass && formik.errors.oldpass ? (
                                <p className="validation">{t(formik.errors.oldpass)}</p>
                            ) : null}
                        </div>

                    </div>
                    <div className="label-input-pair">
                        <div className="typography-400-regular">{t("Neues Passwort *")}</div>
                        <div className="password-warning">
                            <input type="password" value={formik.values.newpass} onChange={(e) => setInputValue('newpass', e.target.value)}></input>
                            {formik.touched.newpass && formik.errors.newpass ? (
                                <p className="validation">{t(formik.errors.newpass)}</p>
                            ) : null}
                            <div className="typography-400-regular label-group"><li>{t("Das Passwort muss aus mindestens 8 Zeichen bestehen")}</li></div>
                            <div className="typography-400-regular label-group"><li>{t("Das Passwort muss Groß- und Kleinbuchstaben enthalten")}</li></div>
                            <div className="typography-400-regular label-group"><li>{t("Das Passwort muss mindestens eine Ziffer enthalten")}</li></div>
                            <div className="typography-400-regular label-group"><li>{t("Das Passwort muss mindestens ein Sonderzeichen enthalten")}</li></div>
                            <div className="label-group" style={{ display: "flex", justifyContent: "flex-start" }} type="submit" ><div style={{ padding: "0 0 0 0", marginTop: "0" }} onClick={formik.handleSubmit}>
                                <TemplateButton content={t("Speichern")} /></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </form >
    )
}

export default PasswordChange