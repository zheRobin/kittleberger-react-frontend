import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { infoActions } from 'store/info.slice';
import "./style/composeStyle.scss"

export const DetailCheckbox = (props) => {
    const dispatch = useDispatch();
    const filterData = useSelector(state => state.info.filterData) || {};
    const isChecked = props.type in filterData && filterData[props.type].includes(props.element.id);

    function handleFilter(type, value, checked) {
        const newFilterData = { ...filterData };
        if (checked) {
            if (type in newFilterData) {
                newFilterData[type] = [...newFilterData[type], value];
            } else {
                newFilterData[type] = [value];
            }
        } else if (!checked && type in newFilterData) {
            newFilterData[type] = newFilterData[type].filter(item => item !== value);
        }
        dispatch(infoActions.setFilterData(newFilterData));
    }

    return (
        <>
            <label className='checkbox-group'>
                <Checkbox checked={isChecked}
                    onChange={(e) => handleFilter(props?.type, props.element.id, e.target?.checked)}
                    value={props.value}
                    name={props.name}
                    style={{ color: "white", borderColor: 'white', padding: 0, margin: 0 }}
                />
                <div className='typography-400-regular checkbox-group__label pointer' style={{ color: "white" }}>{props.title}</div>
            </label>
        </>
    )
}
export const CountryCheckbox = (props) => {

    return (
        <>
            <label className='checkbox-group'>
                <Checkbox value={props.value} name={props.name} style={{ color: "white", borderColor: 'white', padding: 0, margin: 0 }} />
                <div className='typography-400-regular checkbox-group__label pointer' style={{ color: "white" }}>{props.title}</div>
            </label>
        </>

    )
}