import Checkbox from '@mui/material/Checkbox';
import "./style/composeStyle.scss"

const CheckboxGroup = ({ title, fillColor = "white", textColor = "white" }) => {
    return (

        <>
            <div className='checkbox-group'>
                <Checkbox style={{ color: fillColor, borderColor: 'white', padding: 0, margin: 0 }} />
                <div className='typography-400-regular checkbox-group__label' style={{ color: textColor }}>{title}</div>
            </div >

        </>

    )
}

export default CheckboxGroup