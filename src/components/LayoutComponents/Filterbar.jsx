import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import {DetailCheckbox, CountryCheckbox} from "components/Composing/CheckboxGroup";
import { RefreshIcon, MinusIcon, PlusIcon2 } from "libs/icons";
import { infoActions } from "store/reducer";
import "../Composing/style/composeStyle.scss"
export const numbers = [
    { id: "1", name: 1 }, 
    { id: "2", name: 2 }, 
    { id: "3", name: 3 }, 
    { id: "4", name: 4 }, 
    { id: "5", name: 5 }, 
    { id: "6", name: 6 }, 
    { id: "7", name: 7 }, 
    { id: "8", name: 8 }, 
    { id: "9", name: 9 }
]
const Filterbar = () => {
    const dispatch = useDispatch()
    const countryList = useSelector(state => state.info.countryList);
    const filterData = useSelector(state => state.info.filterData);
    const currentTab = useSelector(state => state.info.currentTab);
    const article_list = (filterData && Array.isArray(filterData.article_list) && currentTab === 'product') ? filterData.article_list : [];
    const selectedNumbers = (filterData && Array.isArray(filterData.article_number)) ? filterData.article_number : [];
    const selectedNumberIndices = selectedNumbers.map(selectedNumber => 
        numbers.findIndex(number => number.id === selectedNumber)
    );
    const maxSelectedNumberIndex = Math.max(...selectedNumberIndices);
    const initialNlimit = maxSelectedNumberIndex > 5 ? -1 : 5;

    const data = useSelector(state => state.info.pageData)
    const selectedCountries = countryList && Array.isArray(countryList.country_list) ? countryList.country_list : [];
    const selectedCountryIndices = selectedCountries.map(selectedCountry => 
        data?.country_list?.findIndex(country => country.id === selectedCountry)
    );
    const maxSelectedCountryIndex = Math.max(...selectedCountryIndices);
    const initialClimit = maxSelectedCountryIndex > 5 ? -1 : 5;
    const [nlimit, setNLimit] = useState(initialNlimit)
    const [climit, setCLimit] = useState(initialClimit)
    const { t } = useTranslation()
    const resetFilter = () => {
        dispatch(infoActions.setFilterData({article_list}));
        dispatch(infoActions.setCountryList({}));
    }
    return (
        <>
            <div className="refresh-part pointer"  onClick={resetFilter}>
                <img src={RefreshIcon} alt="refresh"></img>
                <Typography fontSize="14px" lineHeight="20px" marginLeft="15px">
                    {t("Filter zurücksetzen")}
                </Typography>
            </div>
            <div className="filter-box">
                <div className="filter-group">
                    <div className="by-number">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Anzahl Produkte')}</Typography>
                        </div>

                        <div className="check-group">
                            {numbers.slice(0, nlimit).map((el, index) => <DetailCheckbox key={index} type="article_number" element={el} title={t(el.name)} />)}
                        </div>
                        {nlimit !== 5 ? (<div className="product-list pointer" onClick={(e) => setNLimit(5)}>
                            <img style={{ marginLeft: "3px" }} src={MinusIcon} alt="plusButton" />
                            <Typography fontSize="14px" lineHeight="20px">{t('Weniger anzeigen')}</Typography>
                        </div>) : (<div className="product-list pointer" onClick={(e) => setNLimit()}>
                            <img style={{ marginLeft: "3px" }} src={PlusIcon2} alt="plusButton" />
                            <Typography fontSize="14px" lineHeight="20px">{t('Mehr anzeigen')}</Typography>
                        </div>)}
                    </div>
                    <div className="by-brand">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Brand')}</Typography>
                        </div>

                        <div className="check-group">
                            {data?.brands?.map((el, index) => <DetailCheckbox key={index} type="brand" element={el} title={`${el.name} (${data.brand_data[el.index]})`} />)}
                        </div>
                    </div>
                    <div className="by-land">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Land')}</Typography>
                        </div>

                        <div className="check-group">
                            {data?.country_list?.slice(0, climit).map((el, index) => <CountryCheckbox key={index} type="country_list" element={el} title={t(el.name)} />)}
                        </div>
                        {climit !== 5 ? (<div className="product-list pointer" onClick={(e) => setCLimit(5)}>
                            <img style={{ marginLeft: "3px" }} src={MinusIcon} alt="plusButton" />
                            <Typography fontSize="14px" lineHeight="20px">{t('Weniger anzeigen')}</Typography>
                        </div>) : (<div className="product-list pointer" onClick={(e) => setCLimit()}>
                            <img style={{ marginLeft: "3px" }} src={PlusIcon2} alt="plusButton" />
                            <Typography fontSize="14px" lineHeight="20px">{t('Mehr anzeigen')}</Typography>
                        </div>)}
                    </div>
                    <div className="by-application">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Aplikationen')}</Typography>
                        </div>

                        <div className="check-group">
                            {data?.applications?.map((el, index) => <DetailCheckbox key={index} type="application" element={el} title={`${el.name} (${data.application_data[el.index]})`} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filterbar;