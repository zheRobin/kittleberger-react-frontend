import "./style/AccountSetting.scss"
import pencil from "assets/icons/pencil.svg"
import { TemplateButton } from "pages/main/TemplatePanel"
import close from "assets/icons/cross-black.svg"
import cross from "assets/icons/cross.svg"
import { useEffect, useState } from "react"
import { userCreate, userEdit, userDelete, userList } from "libs/_services/User"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

const UserList = ({ name, email, is_staff, handlemodal, setMode, setUserinfo, userInfo, setDeleteModal }) => {
  return (
    <div className="user-list">
      <div className="user-list__label">{name}</div>
      <div className="user-list__label">{is_staff && 'admin'}</div>
      <div className="user-list__user">
        <div className="user-list__user-email">{email}</div>
        <div className="edit pointer" >
          <img src={pencil} alt="pencil" style={{ marginRight: "15px" }} onClick={() => { handlemodal(true); setMode(true); setUserinfo(userInfo) }} />
          <img src={cross} alt="cross" onClick={() => { setDeleteModal(true); setUserinfo(userInfo) }} />
        </div>
      </div>
    </div>
  )
}


const ManageUser = () => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [modalView, setModalView] = useState(false);
  const [userlists, setUserLists] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserinfo] = useState({});
  const [loading, setloading] = useState(false);
  const token = useSelector(state => state.auth.token)
  const { t } = useTranslation()
  useEffect(() => {
    userList(token, (success) => {
      if (success.data.code === 200 && success.data.status === "success") {
        setUserLists(success.data.data)
      }
      if (success.data.code === 400 && success.data.status === "failed") {
        toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
      }
    })
  }, [])
  useEffect(() => {
    userList(token, (success) => {
      if (success.data.code === 200 && success.data.status === "success") {
        setUserLists(success.data.data)
      }
      if (success.data.code === 400 && success.data.status === "failed") {
        toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
      }
    })
  }, [loading])

  return (
    <div className="user-manage-form">
      <div className="create-user" ><div className="pointer" onClick={() => { setModalView(true); setEditMode(false) }}><TemplateButton content={t("Neuen Benutzer anlegen")} /></div></div>
      <div className="setting-panel-user">
        <div className="setting-panel-user__top">
          <div className="typography-400-regular">{t("Benutzer verwalten")}</div>
        </div>
        <div className="setting-panel-user__bottom">
          <div className="user-group">
            {userlists?.sort((a, b) => a.username.localeCompare(b.username)).map((userli) => {
              return (
                <UserList key={userli.id} is_staff={userli.is_staff} name={userli.username} email={userli.email} handlemodal={setModalView} setDeleteModal={setDeleteModal} setMode={setEditMode} userInfo={userli} setUserinfo={setUserinfo} />
              );
            })}

          </div>
        </div>
        {modalView ? (
          <Formik
            initialValues={editMode ? { name: userInfo.username, password: '', email: userInfo.email, is_admin: userInfo.is_staff } : { name: '', password: '', email: '', is_admin: false }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(60, 'Must be 60 characters or less')
                .required('Required'),
              password: Yup.string()
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
              email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setModalView(false)
              setloading(true)
              editMode ? (userEdit(userInfo.id, values, token, (success) => {
                if (success.data.code === 200 || success.data.status === "success") {
                  toast.success("User Updated Successfully", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                  setloading(false)
                }
                if (success.data.code === 400 || success.data.status === "failed") {
                  toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
              })) : (userCreate(values, token, (success) => {
                if (success.data.code === 201 || success.data.status === "success") {
                  toast.success("User Created Successfully", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                  setloading(false)
                }
                if (success.data.code === 400 || success.data.status === "failed") {
                  toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                }
              }))
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <div className="modal">
                  <div className="modal-content">
                    <div className="modal-box">
                      <div className="label">
                        <div className="typography-700-bold">{editMode ? t("Benutzer bearbeiten") : t("Neuen Benutzer anlegen")}</div>
                        <img className="pointer" src={close} alt="close" onClick={() => setModalView(false)} />
                      </div>
                      <div className="box">
                        <div className="label-input-pair">
                          <div className="typography-400-regular">{t("Name *")}</div>
                          <div>
                            <input {...formik.getFieldProps('name')} required />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="validation">{t(formik.errors.name)}</div>
                            ) : null}
                          </div>

                        </div>
                        <div className="label-input-pair">
                          <div className="typography-400-regular">{t("E-Mail-Adresse")} *</div>
                          <div>
                            <input {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="validation">{t(formik.errors.email)}</div>
                            ) : null}
                          </div>

                        </div>
                        <div className="label-input-pair">
                          <div className="typography-400-regular">{t("Passwort")} *</div>
                          <div>
                            <input type="password"  {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                              <div className="validation">{formik.errors.password}</div>
                            ) : null}
                          </div>

                        </div>
                        <div className="label-input-pair">
                          <div className="typography-400-regular">{t("Administratorin")}</div>
                          <div style={{ display: "flex", justifyContent: "flex-start" }}>
                            <input
                              type="checkbox"
                              {...formik.getFieldProps('is_admin')}
                              checked={formik.values.is_admin} // Use checked attribute to reflect the value in formik
                              style={{ height: "15px", width: "15px", margin: "0" }}
                            />
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
        {
          deleteModal ? (
            <form>
              <div className="modal">
                <div className="modal-content">
                  <div className="modal-box">
                    <div className="label">
                      <div className="typography-700-bold">{t("Benutzer löschen")}</div>
                      <img className="pointer" src={close} alt="close" onClick={() => setDeleteModal(false)} />
                    </div>
                    <div className="box">
                      {t("Werden Sie dieses Konto löschen")}?
                    </div>
                    <div className="button-group pointer">
                      <div onClick={() => setDeleteModal(false)}><TemplateButton content={t("Abbrechen")} type={"transparent"} /></div>
                      <div onClick={() => {
                        setloading(true)
                        userDelete(userInfo.id, token, (success) => {
                          if (success.data.code === 200 || success.data.status === "success") {
                            toast.success("User deleted successfully", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                            setDeleteModal(false)
                            setloading(false)
                          }
                          if (success.data.code === 400 || success.data.status === "failed") {
                            toast.error("Failed to delete user", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
                            setDeleteModal(false)
                          }
                        })
                      }}><TemplateButton content={t("Bestätigen")} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (null)
        }
      </div >
      <ToastContainer />
    </div>
  )
}

export default ManageUser