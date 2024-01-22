import logo from "assets/icons/user.svg"

const ProfileIcon = ({ setModalView, modalView }) => {
    return (
        <>
            <div className="profile-icon pointer" onClick={(e) => setModalView(!modalView)}><img src={logo} alt="bosch" style={{ fill: "black" }}></img></div>
        </>
    )
}

export default ProfileIcon