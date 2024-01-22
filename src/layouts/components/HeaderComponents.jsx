
import ProfileIcon from "components/LayoutComponents/ProfileIcon";
import ProfileLayout from "./ProfileLayoutModal";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/dashboardStyle.scss"
import { LogoIcon } from "libs/icons";

const HeaderComponents = () => {
    const [accountModalShow, setAccountModal] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <div className="header-top-layout">
                <div className="bosch-icon pointer" onClick={() => navigate("/")}>
                    <img src={LogoIcon} alt="bosch" style={{ height: "55px" }}></img>
                    <Typography fontSize="20px" fontWeight="400" lineHeight="26px" sx={{ display: 'inline' }}>Composing Generator</Typography>
                </div>
                <div className="profile-info-reference">
                    <ProfileIcon setModalView={setAccountModal} modalView={accountModalShow} />
                    {accountModalShow === true ? <ProfileLayout handleModal={setAccountModal} /> : null}
                </div>
            </div>
        </>
    )
}

export default HeaderComponents