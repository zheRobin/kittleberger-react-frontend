import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { infoActions, composingActions } from 'store/reducer';
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
    const dispatch = useDispatch();
    const countryList = useSelector(state => state.composing.countryList);
    const isChecked = props.type in countryList && countryList[props.type].includes(props.element.id);
    const handleFilter = (type, id, checked) => {
        if(checked) {
          const updatedCountryList = {...countryList};
          if(type in updatedCountryList) {
            updatedCountryList[type].push(id);
          } else {
            updatedCountryList[type] = [id];
          }
          dispatch(composingActions.setCountryList(updatedCountryList));
        } else {
          const updatedCountryList = {...countryList};
          if(type in updatedCountryList) {
            updatedCountryList[type] = updatedCountryList[type].filter(countryId => countryId !== id);
          }
          dispatch(composingActions.setCountryList(updatedCountryList));
        }
      }
    return (
        <>
            <label className='checkbox-group'>
                <Checkbox checked={isChecked} onChange={(e) => handleFilter(props?.type, props.element.id, e.target?.checked)} value={props.value} name={props.name} style={{ color: "white", borderColor: 'white', padding: 0, margin: 0 }} />
                <div className='typography-400-regular checkbox-group__label pointer' style={{ color: "white" }}>{props.title}</div>
            </label>
        </>

    )
}