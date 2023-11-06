import "./style/AccountSetting.scss"
import pencil from "../../assets/icons/pencil.svg"
import { TemplateButton } from "../Organism/TemplatePanel"
import close from "../../assets/icons/cross-black.svg"
import { useState } from "react"

const UserList = ({ name, email, handlemodal }) => {
  return (
    <div className="user-list">
      <div className="user-list__label">{name}</div>
      <div className="user-list__user">
        <div className="user-list__user-email">{email}</div>
        <div className="edit pointer" onClick={() => handlemodal(true)}>
          <img src={pencil} alt="pencil" />
        </div>
      </div>
    </div>
  )
}


const ManageUser = () => {

  const [modalView, setModalView] = useState(false);
  const userListMoke = [{ name: "maxim", email: "maxim@email.com" }, { name: "maxim", email: "maxim@email.com" }, { name: "maxim", email: "maxim@email.com" }]
  return (
    <>
      <div className="create-user pointer" onClick={() => setModalView(true)}><TemplateButton content={"Neuen Benutzer anlegen"} /></div>
      <div className="setting-panel-user">
        <div className="setting-panel-user__top">
          <div className="typography-400-regular">Passwort ändern</div>
        </div>
        <div className="setting-panel-user__bottom">
          <div className="user-group">
            {userListMoke.map((userlist, index) => {
              return (
                <UserList key={index} name={userlist.name} email={userlist.email} handlemodal={setModalView} />
              )
            })}

          </div>
        </div>
        {modalView ? (
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
                    <input />
                  </div>
                  <div className="label-input-pair">
                    <div className="typography-400-regular">E-Mail-Adresse *</div>
                    <input />
                  </div>
                  <div className="label-input-pair">
                    <div className="typography-400-regular">Passwort *</div>
                    <input />
                  </div>
                </div>
                <div className="button-group pointer">
                  <div onClick={() => setModalView(false)}><TemplateButton content={"Abbrechen"} type={"transparent"} /></div>
                  <div><TemplateButton content={"Bestätigen"} /></div>
                </div>
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </>
  )
}

export default ManageUser