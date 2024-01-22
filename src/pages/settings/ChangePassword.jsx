import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { changePassword } from "libs/_utils/actions";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { TemplateButton } from "pages/main/CreateTemplate"
import 'react-toastify/dist/ReactToastify.css';
import "./style/AccountSetting.scss"

const PasswordChange = () => {
    const { t } = useTranslation()
    const schema = yup.object().shape({
        old_password: yup.string().required("This field is required"),
        new_password: yup.string()
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
            old_password: "",
            new_password: ""
        },
        validationSchema: schema,
        onSubmit: async () => {
            const response = await changePassword(formik.values)
            if (response?.code === 200) {
                toast.success("Successfully Changed", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
            }
            else {
                toast.error("Something went wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
            }
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
                            <input type="password" value={formik.values.old_password} onChange={(e) => setInputValue('old_password', e.target.value)}></input>
                            {formik.touched.old_password && formik.errors.old_password ? (
                                <p className="validation">{t(formik.errors.old_password)}</p>
                            ) : null}
                        </div>

                    </div>
                    <div className="label-input-pair">
                        <div className="typography-400-regular">{t("Neues Passwort *")}</div>
                        <div className="password-warning">
                            <input type="password" value={formik.values.new_password} onChange={(e) => setInputValue('new_password', e.target.value)}></input>
                            {formik.touched.new_password && formik.errors.new_password ? (
                                <p className="validation">{t(formik.errors.new_password)}</p>
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