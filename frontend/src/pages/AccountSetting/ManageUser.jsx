import "./style/AccountSetting.scss"
import pencil from "../../assets/icons/pencil.svg"
import { TemplateButton } from "../Organism/TemplatePanel"
import close from "../../assets/icons/cross-black.svg"
import { useEffect, useState } from "react"
import { userCreate, userEdit } from "../../_services/User"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userList } from "../../_services/User"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"

const UserList = ({ name, email, handlemodal, setMode, setUserinfo, userInfo }) => {

  return (
    <div className="user-list">
      <div className="user-list__label">{name}</div>
      <div className="user-list__user">
        <div className="user-list__user-email">{email}</div>
        <div className="edit pointer" onClick={() => { handlemodal(true); setMode(true); setUserinfo(userInfo) }}>
          <img src={pencil} alt="pencil" />
        </div>
      </div>
    </div>
  )
}


const ManageUser = () => {

  const [modalView, setModalView] = useState(false);
  const [userlists, setUserLists] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserinfo] = useState({});
  const [loading, setloading] = useState(false);
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    userList(token, (success) => {
      if (success.data.code === 200 && success.data.status === "success") {
        setUserLists(success.data.data)
      }
      if (success.data.code === 400 && success.data.status === "failed") {
        toast.error("Something Went Wrong")
      }
    })
  }, [])

  useEffect(() => {
    userList(token, (success) => {
      if (success.data.code === 200 && success.data.status === "success") {
        setUserLists(success.data.data)
      }
      if (success.data.code === 400 && success.data.status === "failed") {
        toast.error("Something Went Wrong")
      }
    })
  }, [loading])

  return (
    <>
      <div className="create-user pointer" onClick={() => { setModalView(true); setEditMode(false) }}><TemplateButton content={"Neuen Benutzer anlegen"} /></div>
      <div className="setting-panel-user">
        <div className="setting-panel-user__top">
          <div className="typography-400-regular">Passwort ändern</div>
        </div>
        <div className="setting-panel-user__bottom">
          <div className="user-group">
            {userlists?.map((userli) => {
              return (
                <UserList key={userli.id} name={userli.username} email={userli.email} handlemodal={setModalView} setMode={setEditMode} userInfo={userli} setUserinfo={setUserinfo} />
              )
            })}

          </div>
        </div>
        {modalView ? (
          <Formik
            initialValues={editMode ? { name: userInfo.username, password: '', email: userInfo.email } : { name: '', password: '', email: '' }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              password: Yup.string()
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
              email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setModalView(false)
              setloading(true)
              editMode ? (userEdit(userInfo.id, values, token, (success) => {
                if (success.data.code === 200 && success.data.status === "success") {
                  toast.success("User Updated Successfully", "success")
                  setloading(false)
                }
                if (success.data.code === 400 && success.data.status === "failed") {
                  toast.error("Something Went Wrong")
                }
              })) : (userCreate(values, token, (success) => {
                if (success.data.code === 200 && success.data.status === "success") {
                  toast.success("User Created Successfully", "success")
                }
                if (success.data.code === 400 && success.data.status === "failed") {
                  toast.error("Something Went Wrong")
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
                        <div className="typography-700-bold">Neuen Benutzer anlegen</div>
                        <img className="pointer" src={close} alt="close" onClick={() => setModalView(false)} />
                      </div>
                      <div className="box">
                        <div className="label-input-pair">
                          <div className="typography-400-regular">Name *</div>
                          <div>
                            <input {...formik.getFieldProps('name')} required />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="validation">{formik.errors.name}</div>
                            ) : null}
                          </div>

                        </div>
                        <div className="label-input-pair">
                          <div className="typography-400-regular">E-Mail-Adresse *</div>
                          <div>
                            <input {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="validation">{formik.errors.email}</div>
                            ) : null}
                          </div>

                        </div>
                        <div className="label-input-pair">
                          <div className="typography-400-regular">Passwort *</div>
                          <div>
                            <input type="password"  {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                              <div className="validation">{formik.errors.password}</div>
                            ) : null}
                          </div>

                        </div>
                      </div>
                      <div className="button-group pointer">
                        <div onClick={() => setModalView(false)}><TemplateButton content={"Abbrechen"} type={"transparent"} /></div>
                        <div onClick={formik.handleSubmit}><TemplateButton content={"Bestätigen"} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        ) : null}

      </div >
      <ToastContainer />
    </>
  )
}

export default ManageUser