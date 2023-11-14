import "./style/AccountSetting.scss"
import { TemplateButton } from "../Organism/TemplatePanel"
import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { changePassword } from "../../_services/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const PasswordChange = () => {
    const token = useSelector(state => state.auth.token)
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
                    toast.success("Successfully Changed");
                }
                else {
                    toast.error("Something went wrong");
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
                    <div className="typography-400-regular">Passwort ändern</div>
                </div>
                <div className="setting-panel-user__bottom">
                    <div className="label-input-pair">
                        <div className="typography-400-regular">Altes Passwort *</div>
                            <input type="password" value={formik.values.oldpass} onChange={(e) => setInputValue('oldpass', e.target.value)}></input>
                            {formik.touched.oldpass && formik.errors.oldpass ? (
                                <p className="validation">{formik.errors.oldpass}</p>
                            ) : null}
                    </div>
                    <div className="label-input-pair">
                        <div className="typography-400-regular">Neues Passwort *</div>
                        <div className="password-warning">
                            <input type="password" value={formik.values.newpass} onChange={(e) => setInputValue('newpass', e.target.value)}></input>
                            {formik.touched.newpass && formik.errors.newpass ? (
                                <p className="validation">{formik.errors.newpass}</p>
                            ) : null}
                            <div className="typography-400-regular label-group"><li>Password must consist of at least 8 characters</li></div>
                            <div className="typography-400-regular label-group"><li>Password must contain upper and lower case letters</li></div>
                            <div className="typography-400-regular label-group"><li>Password must contain at least one number</li></div>
                            <div className="typography-400-regular label-group"><li>Password must contain at least one special character</li></div>
                            <div className="label-group" type="submit" onClick={formik.handleSubmit}><TemplateButton content={"Speichern"} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </form >
    )
}

export default PasswordChange