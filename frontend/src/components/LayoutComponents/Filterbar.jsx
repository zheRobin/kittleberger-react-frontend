import refreshIcon from "../../assets/icons/rotate.svg"
import { Typography } from "@mui/material";
import "../Composing/style/composeStyle.scss"
import plusButton from "../../assets/icons/add-2.svg"
import CheckboxGroup from "../Composing/CheckboxGroup"

export const ProductNumberFilter = () => {

    const plusProductMokeUp = [1, 2, 3, 4, 5]
    const brandMokeup = ['Buderus (54)', 'Bosch (83)']
    const landMokeup = ['Deutschland', 'Österreich', 'Belgien', 'Schweiz', 'Frankreich']
    const aplikationenMokeup = ['website(34)', 'eshop(34)', 'Print(2)']
    const footerMokeup = ['Weitere Filterattribute 1', 'Weitere Filterattribute 2', 'Weitere Filterattribute 3']

    return (
        <>
            <div className="filter-group">
                <div className="by-number">
                    <div className="product-list">
                        <Typography fontSize="14px" lineHeight="20px">Anzahl Produkte</Typography>
                    </div>
                    <div className="check-group">
                        {plusProductMokeUp.map((ele, index) => {
                            return (<CheckboxGroup key={"plusProductMokeUp" + index} title={ele} />)
                        })}
                    </div>
                    <div className="product-list">
                        <img src={plusButton} alt="plusButton" /><Typography fontSize="14px" lineHeight="20px">Mehr anzeigen</Typography>
                    </div>
                </div>
                <div className="by-brand">
                    <div className="product-list">
                        <Typography fontSize="14px" lineHeight="20px">Brand</Typography>
                    </div>
                    <div className="check-group">
                        {brandMokeup.map((ele, index) => {
                            return (<CheckboxGroup key={"brandMokeup" + index} title={ele} />)
                        })}
                    </div>
                </div>
                <div className="by-land">
                    <div className="product-list">
                        <Typography fontSize="14px" lineHeight="20px">Land</Typography>
                    </div>
                    <div className="check-group">
                        {landMokeup.map((ele, index) => {
                            return (<CheckboxGroup key={"landMokeup" + index} title={ele} />)
                        })}
                    </div>
                    <div className="product-list">
                        <img src={plusButton} alt="plusButton" /><Typography fontSize="14px" lineHeight="20px">Mehr anzeigen</Typography>
                    </div>
                </div>
                <div className="by-Aplikationen">
                    <div className="product-list">
                        <Typography fontSize="14px" lineHeight="20px">Brand</Typography>
                    </div>
                    <div className="check-group">
                        {aplikationenMokeup.map((ele, index) => {
                            return (<CheckboxGroup key={"aplikationenMokeup" + index} title={ele} />)
                        })}
                    </div>
                </div>
            </div>
            <div className="filter-bottom">
                {footerMokeup.map((ele, index) => {
                    return (<div className="product-list" key={"footerMokeup" + index}>
                        <img src={plusButton} alt="plusButton" /><Typography fontSize="14px" lineHeight="20px">{ele}</Typography>
                    </div>)
                })}

            </div>

        </>
    )
}



const Filterbar = () => {
    return (
        <>
            <div className="refresh-part pointer">
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