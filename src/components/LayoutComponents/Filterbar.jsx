import refreshIcon from "../../assets/icons/rotate.svg"
import { Typography } from "@mui/material";
import "../Composing/style/composeStyle.scss"
import plusButton from "../../assets/icons/add-2.svg"
import miusButton from "../../assets/icons/minus-white.svg"
import CheckboxGroup from "../Composing/CheckboxGroup"
import { SelectCountry } from "../Composing/CheckboxGroup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectPage, setTemplateLoadingStatus, setProductLoadingStatus, setFilterData, setResetStatus } from "../../store";
import { useTranslation } from "react-i18next";

export const ProductNumberFilter = (resetValue) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const plusProductMokeUp = [{ id: "1", name: 1 }, { id: "2", name: 2 }, { id: "3", name: 3 }, { id: "4", name: 4 }, { id: "5", name: 5 }
        , { id: "6", name: 6 }, { id: "7", name: 7 }, { id: "8", name: 8 }, { id: "9", name: 9 }]
    const [filters, setFilters] = useState({
        article_number: [],
        article_list: [],
        application: [],
        brand: [],
        country: [],
    })
    const [showNumList, setShowNumList] = useState(false)
    const [showCountryList, setShowCountryList] = useState(false)
    const [landMokeup, setLandMokeUp] = useState([])
    const templateTypes = useSelector(state => state.auth.templateTypes)
    useEffect(
        () => {
            setLandMokeUp(templateTypes?.country_list)
        }, [templateTypes]
    )
    useEffect(() => {
        const delay = 800;
        const clearStoreData = () => {
            dispatch(selectPage(1))
            dispatch(setTemplateLoadingStatus(true))
            dispatch(setProductLoadingStatus(true))
            dispatch(setFilterData(filters))
        };
        const timeoutId = setTimeout(() => {
            clearStoreData();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [dispatch, filters]);

    return (
        <>
            <div className="filter-box">
                <div className="filter-group">
                    <div className="by-number">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Anzahl Produkte')}</Typography>
                        </div>
                        <div className="check-group">
                            {showNumList ? (
                                plusProductMokeUp.map((ele, index) => {
                                    return (
                                        <CheckboxGroup
                                            key={"plusProductMokeUp" + index}
                                            type={"number"}
                                            element={ele}
                                            title={t(ele.name)}
                                            setFilters={setFilters}
                                            filters={filters}
                                        />
                                    );
                                })
                            ) : (
                                plusProductMokeUp.slice(0, 5).map((ele, index) => {
                                    return (
                                        <CheckboxGroup
                                            key={"plusProductMokeUp" + index}
                                            type={"number"}
                                            element={ele}
                                            title={t(ele.name)}
                                            setFilters={setFilters}
                                            filters={filters}
                                        />
                                    );
                                })
                            )}

                        </div>
                        <div className="product-list pointer" onClick={(e) => setShowNumList(!showNumList)}>
                            {showNumList ? (
                                <>
                                    <img src={miusButton} alt="plusButton" />
                                    <Typography fontSize="14px" lineHeight="20px">{t('Weniger anzeigen')}</Typography>
                                </>
                            ) : (
                                <>
                                    <img src={plusButton} alt="plusButton" />
                                    <Typography fontSize="14px" lineHeight="20px">{t('Mehr anzeigen')}</Typography>
                                </>

                            )}

                        </div>
                    </div>
                    <div className="by-brand">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Brand')}</Typography>
                        </div>
                        <div className="check-group">
                            {templateTypes?.brands?.map((ele, index) => {
                                return (
                                    <CheckboxGroup
                                        key={"brandMokeup" + index}
                                        type={"brand"}
                                        element={ele}
                                        title={t(ele.name)}
                                        setFilters={setFilters}
                                        filters={filters}
                                    />
                                );
                            })}
                        </div>

                    </div>
                    <div className="by-land">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Land')}</Typography>
                        </div>
                        <div className="check-group">
                            {showCountryList ? landMokeup?.map((ele, index) => {
                                return (
                                    <SelectCountry
                                        key={"landMokeup" + index}
                                        country={ele}
                                    />
                                );
                            }) :
                                landMokeup?.slice(0, 5)?.map((ele, index) => {
                                    return (
                                        <SelectCountry
                                            key={"landMokeup" + index}
                                            country={ele}
                                        />
                                    );
                                })
                            }
                        </div>
                        <div className="product-list pointer" onClick={(e) => setShowCountryList(!showCountryList)}>
                            {showCountryList ? (
                                <>
                                    <img src={miusButton} alt="plusButton" />
                                    <Typography fontSize="14px" lineHeight="20px">{t('Weniger anzeigen')}</Typography>
                                </>
                            ) : (
                                <>
                                    <img src={plusButton} alt="plusButton" />
                                    <Typography fontSize="14px" lineHeight="20px">{t('Mehr anzeigen')}</Typography>
                                </>

                            )}

                        </div>
                    </div>
                    <div className="by-Aplikationen">
                        <div className="product-list">
                            <Typography fontSize="14px" lineHeight="20px">{t('Aplikationen')}</Typography>
                        </div>
                        <div className="check-group">
                            {templateTypes?.applications?.map((ele, index) => {
                                return (
                                    <CheckboxGroup
                                        key={"aplikationenMokeup" + index}
                                        type={"app"}
                                        element={ele}
                                        title={t(ele.name)}
                                        setFilters={setFilters}
                                        filters={filters}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Filterbar = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    return (
        <>
            <div className="refresh-part pointer" onClick={(e) => { dispatch(setResetStatus(true)); }}>
                <img src={refreshIcon} alt="refresh"></img>
                <Typography fontSize="14px" lineHeight="20px" marginLeft="15px">
                    {t("Filter zurücksetzen")}
                </Typography>
            </div>
            <ProductNumberFilter />
        </>
    )
}

export default Filterbar;