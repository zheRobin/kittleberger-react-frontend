import refreshIcon from "../../assets/icons/rotate.svg"
import { Typography } from "@mui/material";
import "../Composing/style/composeStyle.scss"
import plusButton from "../../assets/icons/add-2.svg"
import CheckboxGroup from "../Composing/CheckboxGroup"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { infiniteTemplate } from "../../_services/Template";
import { initTemplate } from "../../store";
import { useDispatch } from "react-redux";
import { selectPage, setLoadingStatus, setFilterData } from "../../store";

export const ProductNumberFilter = () => {

    const plusProductMokeUp = [{ id: "1", name: 1 }, { id: "2", name: 2 }, { id: "3", name: 3 }, { id: "4", name: 4 }, { id: "5", name: 5 }]
    const [filters, setFilters] = useState({
        article_number: [],
        application: [],
        brand: []
    })
    const token = useSelector(state => state.auth.token)
    const footerMokeup = ['Weitere Filterattribute 1', 'Weitere Filterattribute 2', 'Weitere Filterattribute 3']
    const templateTypes = useSelector(state => state.auth.templateTypes)
    const dispatch = useDispatch()
    useEffect(() => {
        const delay = 1000;

        const timeoutId = setTimeout(() => {
            clearStoreData();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [filters]);

    const clearStoreData = () => {

        console.log('Delayed function called');
        dispatch(selectPage(1))
        dispatch(setLoadingStatus(true))
        dispatch(setFilterData(filters))
    };

    return (
        <>
            <div className="filter-group">
                <div className="by-number">
                    <div className="product-list">
                        <Typography fontSize="14px" lineHeight="20px">Anzahl Produkte</Typography>
                    </div>
                    <div className="check-group">
                        {plusProductMokeUp.map((ele, index) => {
                            return (<CheckboxGroup key={"plusProductMokeUp" + index} type={"number"} element={ele} title={ele.name} setFilters={setFilters} filters={filters} />)
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
                        {templateTypes.brands.map((ele, index) => {
                            return (<CheckboxGroup key={"brandMokeup" + index} type={"brand"} element={ele} title={ele.name} setFilters={setFilters} filters={filters} />)
                        })}
                    </div>
                </div>
                <div className="by-Aplikationen">
                    <div className="product-list">
                        <Typography fontSize="14px" lineHeight="20px">Aplikationen</Typography>
                    </div>
                    <div className="check-group">
                        {templateTypes.applications.map((ele, index) => {
                            return (<CheckboxGroup key={"aplikationenMokeup" + index} type={"app"} element={ele} title={ele.name} setFilters={setFilters} filters={filters} />)
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