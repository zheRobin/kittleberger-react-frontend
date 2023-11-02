import refreshIcon from "../../assets/icons/rotate.svg"
import { Typography } from "@mui/material";
import "./style/composeStyle.scss"
import { useState } from "react";
export const ProductNumberFilter = () => {
    const hours = [...Array(5).keys()]
    const [filterNum, setFilterNum] = useState();

    return (
        <>
            <div className="product-label">
                <Typography fontSize="14px" lineHeight="20px" />
            </div>
            <div className="plus-product">

            </div>
        </>
    )
}



const Filterbar = () => {
    return (
        <>
            <div className="refresh-part">
                <img src={refreshIcon} alt="refresh"></img>
                <Typography fontSize="14px" lineHeight="20px" marginLeft="15px">
                    Filter zurücksetzen
                </Typography>
            </div>
            <ProductNumberFilter />
        </>
    )
}

export default Filterbar;