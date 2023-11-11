
import ListIcon from "../../assets/icons/drag&drop.svg"
import CrossIcon from "../../assets/icons/cross-white.svg"
import SettingIcon from "../../assets/icons/controal-4.svg"
import { removeProducts } from "../../store"
import { FormControlLabel } from '@mui/material';
import { useDispatch } from "react-redux"
import "./style/productViewStyle.scss"
import { Checkbox } from "@mui/material"
import { Slider } from "@mui/material"


import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';


const OverlayGroup = ({ productInfo }) => {
    const dispatch = useDispatch()
    return (
        <div className="overlay">
            <div className="overlay__list">
                <img src={ListIcon} alt="ListIcon"></img>
            </div>
            <div className="overlay__product">
                <div className="typography-400-regular" style={{ color: "white", overflow: "hidden", lineHeight: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{productInfo.name}</div>
                <div>
                    <img src={CrossIcon} alt="CrossIcon" onClick={(e) => { dispatch(removeProducts(productInfo)) }}></img>
                </div>
            </div>
            <div className="overlay__setting">
                <img src={SettingIcon} alt="SettingIcon"></img>
                <div className="overlay__setting__panel">
                    <div className="panel-top">
                        <div className="panel-top__title">
                            Condens 9800i W skalieren
                        </div>
                        <div className="panel-top__drag">
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                            <div className="percent">
                                <input max={100} type="number" className="percent-amount" />
                                <div className="percent-mark"><p>%</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-center">
                        <div className="panel-center__title">
                            Produkt freistellen
                        </div>
                        <div className="panel-center__check-box">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="SomeName"
                                        value="SomeValue"
                                    />
                                }
                                label="MyLabel" />
                        </div>
                    </div>
                    <div className="panel-bottom">
                        <div className="panel-bottom__title">
                            product asuis
                        </div>
                        <div className="panel-bottom__drop">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverlayGroup