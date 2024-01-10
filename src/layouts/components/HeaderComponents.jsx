
import ProfileIcon from "components/LayoutComponents/ProfileIcon";
import ProfileLayout from "./ProfileLayoutModal";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/dashboardStyle.scss"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { switchRole } from "store/reducer";
import bosch from "assets/images/Header_bosch.svg"

const HeaderComponents = () => {
    const [accountModalShow, setAccountModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        user.is_staff === true ? dispatch(switchRole(true)) : dispatch(switchRole(false))
    }, [])
    return (
        <>
            <div className="header-top-layout">
                <div className="bosch-icon pointer" onClick={() => navigate("/")}>
                    <img src={bosch} alt="bosch" style={{ height: "55px" }}></img>
                    <Typography fontSize="20px" fontWeight="400" lineHeight="26px" sx={{ display: 'inline' }}>Composing Generator</Typography>
                </div>
                <div className="profile-info-reference">
                    {/* {location.pathname === "/" && user.is_superuser === true ? <AdminToggle /> : null} */}
                    <ProfileIcon setModalView={setAccountModal} modalView={accountModalShow} />
                    {accountModalShow === true ? <ProfileLayout handleModal={setAccountModal} /> : null}
                </div>
            </div>
        </>
    )
}

export default HeaderComponents