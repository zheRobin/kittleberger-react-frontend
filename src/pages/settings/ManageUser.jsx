import { useEffect, useState } from "react"
import { userCreate, userEdit, userDelete, userList } from "libs/_services/User"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { TemplateButton } from "pages/main/TemplatePanel"
import { CloseIcon, CrossIcon, EditIcon } from "libs/icons";
import 'react-toastify/dist/ReactToastify.css';
import "./style/AccountSetting.scss"

const UserItem = ({ name, email, is_staff, handlemodal, setMode, setUserinfo, userInfo, setDeleteModal }) => {
  return (
    <div className="user-list">
      <div className="user-list__label">{name}</div>
      <div className="user-list__label">{is_staff && 'admin'}</div>
      <div className="user-list__user">
        <div className="user-list__user-email">{email}</div>
        <div className="edit pointer" >
          <img src={EditIcon} alt="pencil" style={{ marginRight: "15px" }} onClick={() => { handlemodal(true); setMode(true); setUserinfo(userInfo) }} />
          <img src={CrossIcon} alt="cross" onClick={() => { setDeleteModal(true); setUserinfo(userInfo) }} />
        </div>
      </div>
    </div>
  )
}


const ManageUser = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [userlists, setUserLists] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserinfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const getUserLists = async () => {
    try {
      const users = await userList();
      if(Array.isArray(users.data)){
        setUserLists(users.data);
      } else {
        setUserLists([]);
      }
    } catch (error) {
      toast.error("Failed to fetch user list", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
    }
  };

  useEffect(() => {
    getUserLists();
  }, [loading]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setModalView(false);
    setLoading(true);
    try {
      if (editMode) {
        await userEdit(userInfo.id, values);
      } else {
        await userCreate(values);
      }
      setLoading(false);
      setSubmitting(false);
      toast.success("User operation successful", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
      getUserLists();
    } catch (error) {
      toast.error("User operation failed", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
      setLoading(false);
      setSubmitting(false);
    }
  };
  // Deleting User
  const handleUserDelete = async()=>{
    try{
      setLoading(true);
      await userDelete(userInfo.id);
      toast.success("User deleted successfully", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
      setLoading(false);
      setDeleteModal(false);
      getUserLists();
    }
    catch(error){
      setLoading(false);
      setDeleteModal(false);
      toast.error("Failed to delete user", { theme: "colored", hideProgressBar: "true", autoClose: 1500 });
    }
  }
  return (
    <div className="user-manage-form">
      <div className="create-user">
        <div className="pointer" onClick={() => { setModalView(true); setEditMode(false) }}>
          <TemplateButton content={t("Neuen Benutzer anlegen")} />
        </div>
      </div>
    
      <div className="setting-panel-user">
        <div className="setting-panel-user__top">
          <div className="typography-400-regular">{t("Benutzer verwalten")}</div>
        </div>

        <div className="setting-panel-user__bottom">
          <div className="user-group">
            {userlists.map((userli) => (
                <UserItem key={userli.id} is_staff={userli.is_staff} name={userli.username} email={userli.email} 
                          handlemodal={setModalView} setDeleteModal={setDeleteModal} setMode={setEditMode} 
                          userInfo={userli} setUserinfo={setUserinfo} />
            ))}
          </div>
        </div>

        {modalView ? (
        <Formik
          initialValues={editMode ? { 
              name: userInfo.username, 
              password: '', email: userInfo.email, 
              is_admin: userInfo.is_staff 
            } : { 
              name: '', 
              password: '', 
              email: '', 
              is_admin: false 
            }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(60, 'Must be 60 characters or less')
              .required('Required'),
            password: Yup.string()
              .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
            email: Yup.string().email('Invalid email address').required('Required'),
          })}
          onSubmit={handleSubmit}>
          {formik => (
              <form onSubmit={formik.handleSubmit}>
                <div className="modal">
                  <div className="modal-content">
                    <div className="modal-box">
                      <div className="label">
                        <div className="typography-700-bold">{editMode ? t("Benutzer bearbeiten") : t("Neuen Benutzer anlegen")}</div>
                        <img className="pointer" src={CloseIcon} alt="close" onClick={() => setModalView(false)} />
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
                      <img className="pointer" src={CloseIcon} alt="close" onClick={() => setDeleteModal(false)} />
                    </div>
                    <div className="box">
                      {t("Werden Sie dieses Konto löschen")}?
                    </div>
                    <div className="button-group pointer">
                      <div onClick={() => setDeleteModal(false)}><TemplateButton content={t("Abbrechen")} type={"transparent"} /></div>
                      <div onClick={handleUserDelete}><TemplateButton content={t("Bestätigen")} /></div>
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