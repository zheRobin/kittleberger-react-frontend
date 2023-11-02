import { Route, Routes } from "react-router-dom";
import HeaderLayoutCompo1 from "./HeaderLayoutCompo1";
import HeaderLayoutCompo2 from "./HeaderLayoutCompo2";
import logo from "../../../assets/icons/user.svg"
import ProfileIcon from "../../../components/Composing/ProfileIcon";
import ProfileLayout from "./ProfileLayoutModal";
import { useState } from "react";
import { Typography } from "@mui/material";
import "../style/dashboardStyle.scss"
const HeaderComponents = () => {
    const [accountModalShow, setAccountModal] = useState(false)

    return (
        <>
            <div className="header-top-layout">
                <div className="bosch-icon">
                    <img src={require("../../../assets/images/Header_bosch.png")} alt="bosch"></img>
                    <Typography fontSize="20px" fontWeight="400" lineHeight="26px" sx={{ display: 'inline' }}>Composing Generator</Typography>
                </div>
                <div className="profile-info-reference">
                    <ProfileIcon setModalView={setAccountModal} modalView={accountModalShow} />
                    {accountModalShow === true ? <ProfileLayout /> : null}
                </div>
            </div>
        </>)

}

export default HeaderComponents