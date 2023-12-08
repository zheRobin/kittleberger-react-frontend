import Checkbox from '@mui/material/Checkbox';
import "./style/composeStyle.scss"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setResetStatus } from '../../store';
import { appendCountries, removeCountries } from '../../store';
import { useTranslation } from 'react-i18next';

const CheckboxGroup = (props) => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const resetStatus = useSelector(state => state.templates.resetStatus);
    const templateTypes = useSelector(state => state.auth.templateTypes)
    const { t } = useTranslation()
    useEffect(
        () => {
            switch (props.type) {
                case "number":
                    props?.templateFilterData?.article_number?.includes(props.element.id) ? setIsChecked(true) : setIsChecked(false)
                    break;
                case "brand":
                    props?.templateFilterData?.brand?.includes(props.element.id) ? setIsChecked(true) : setIsChecked(false)
                    break;
                case "app":
                    props?.templateFilterData?.application?.includes(props.element.id) ? setIsChecked(true) : setIsChecked(false)
                    break;
                default:
                    props.setFilters({});
            }
        }, [props.templateFilterData]
    )
    useEffect(() => {
        if (resetStatus) {
            setIsChecked(false);
            props.setFilters({
                article_number: [],
                application: [],
                brand: [],
                country: []
            })
            // handleFilter(props.type, props.element.id, false)
        }
    }, [resetStatus]);
    const handleFilter = (type, id, status, resetStatus = false) => {
        !resetStatus && setIsChecked(!isChecked)
        dispatch(setResetStatus(false))
        switch (type) {
            case "number":
                let articleNumber = [...props.filters.article_number];
                if (status) {
                    // Add the id to the array if status is true
                    articleNumber.push(id);
                } else {
                    // Remove the id from the array if status is false
                    articleNumber = articleNumber.filter((num) => num !== id);
                }
                props.setFilters({
                    ...props.filters,
                    article_number: articleNumber
                });
                break;
            case "brand":
                let brand = [...props.filters.brand];
                if (status) {
                    // Add the id to the array if status is true
                    brand.push(id);
                } else {
                    // Remove the id from the array if status is false
                    brand = brand.filter((num) => num !== id);
                }
                props.setFilters({
                    ...props.filters,
                    brand: brand
                });
                break;
            case "app":
                let application = [...props.filters.application];
                if (status) {
                    // Add the id to the array if status is true
                    application.push(id);
                } else {
                    // Remove the id from the array if status is false
                    application = application.filter((num) => num !== id);
                }
                props.setFilters({
                    ...props.filters,
                    application: application
                });
                break;
            default:
                props.setFilters({});
        }
    };
    const productNumber = (type, index) => {
        switch (type) {
            case "brand":
                return templateTypes?.brand_data ? (templateTypes?.brand_data[index] >= 0 && ` (${templateTypes?.brand_data[index]})`) : ""
            case "app":
                return templateTypes?.application_data ? (templateTypes?.application_data[index] >= 0 && ` (${templateTypes?.application_data[index]})`) : ""
            default:
                return ""
        }
    }

    return (

        <>
            <div className='checkbox-group'>
                <Checkbox onChange={(e) => handleFilter(props.type, props.element.id, e.target.checked)} checked={isChecked} value={props.value} name={props.name} style={{ color: props.fillColor ? props.fillColor : "white", borderColor: 'white', padding: 0, margin: 0 }} />
                <div onClick={(e) => handleFilter(props.type, props.element.id, !isChecked)} className='typography-400-regular checkbox-group__label pointer' style={{ color: props.textColor ? props.textColor : "white" }}>{t(props.title) + productNumber(props?.type && props?.type, props?.element?.index && props?.element?.index)}</div>
            </div>
        </>

    )
}

export const SelectCountry = (props) => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const resetStatus = useSelector(state => state.templates.resetStatus);
    const { t } = useTranslation()
    useEffect(
        () => {
            props?.selectedCountry?.includes(props.country.id) ? setIsChecked(true) : setIsChecked(false)
        }, [props.selectedCountry]
    )
    useEffect(() => {
        if (resetStatus) {
            setIsChecked(false);
        }
    }, [resetStatus]);
    const handleFilter = (type, id, status) => {
        setIsChecked(!isChecked)
        !isChecked ? dispatch(appendCountries(props.country.id)) : dispatch(removeCountries(props.country.id))
    };

    return (
        <>
            <div className='checkbox-group'>
                <Checkbox onChange={(e) => handleFilter(props?.type, props.element?.id, e.target?.checked)} checked={isChecked} value={props?.value} name={props?.name} style={{ color: props.fillColor ? props.fillColor : "white", borderColor: 'white', padding: 0, margin: 0 }} />
                <div onClick={(e) => handleFilter(props?.type, props.element?.id, !isChecked)} className='typography-400-regular checkbox-group__label pointer' style={{ color: props.textColor ? props.textColor : "white" }}>{t(props.country.name)}</div>
            </div >
        </>

    )
}


export default CheckboxGroup