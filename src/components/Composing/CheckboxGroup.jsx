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
    const { t } = useTranslation()
    useEffect(() => {
        if (resetStatus) {
            setIsChecked(false);
        }
    }, [resetStatus]);
    console.log(props.title)
    const handleFilter = (type, id, status) => {
        setIsChecked(!isChecked)
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

    return (

        <>
            <div className='checkbox-group'>
                <Checkbox onChange={(e) => handleFilter(props.type, props.element.id, e.target.checked)} checked={isChecked} value={props.value} name={props.name} style={{ color: props.fillColor ? props.fillColor : "white", borderColor: 'white', padding: 0, margin: 0 }} />
                <div className='typography-400-regular checkbox-group__label' style={{ color: props.textColor ? props.textColor : "white" }}>{t(props.title)}</div>
            </div >
        </>

    )
}

export const SelectCountry = (props) => {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const resetStatus = useSelector(state => state.templates.resetStatus);
    const { t } = useTranslation()
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
                <div className='typography-400-regular checkbox-group__label' style={{ color: props.textColor ? props.textColor : "white" }}>{t(props.country.name)}</div>
            </div >
        </>

    )
}


export default CheckboxGroup