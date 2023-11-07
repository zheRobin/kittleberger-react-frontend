
import ProfileIcon from "../../../components/LayoutComponents/ProfileIcon";
import ProfileLayout from "./ProfileLayoutModal";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/dashboardStyle.scss"
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { switchRole } from "../../../store";


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
                <div className="bosch-icon pointer" onClick={() => navigate("/product")}>
                    <img src={require("../../../assets/images/Header_bosch.png")} alt="bosch"></img>
                    <Typography fontSize="20px" fontWeight="400" lineHeight="26px" sx={{ display: 'inline' }}>Composing Generator</Typography>
                </div>
                <div className="profile-info-reference">
                    {/* {location.pathname === "/product" && user.is_superuser === true ? <AdminToggle /> : null} */}
                    <ProfileIcon setModalView={setAccountModal} modalView={accountModalShow} />
                    {accountModalShow === true ? <ProfileLayout handleModal={setAccountModal} /> : null}
                </div>
            </div>
        </>
    )
}

export default HeaderComponents