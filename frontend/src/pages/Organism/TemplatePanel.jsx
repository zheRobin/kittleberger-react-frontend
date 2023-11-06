import { Typography, ThemeProvider } from "@mui/material"
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from '@mui/material/Select';
import "./style/organismStyle.scss"
import { createTheme } from "@mui/material/styles";
import CheckboxGroup from "../../components/Composing/CheckboxGroup";
import ProductCard from "../../components/Product-View/ProductCard";
import ImageTemplate from "../../components/Composing/ImageTempate";
import ImageSettingGroup from "../../components/Composing/ImageSettingGroup";
import plus from "../../assets/icons/add.svg"


export const TemplateButton = ({ content, type = "brown" }) => {
    return (
        <div className='template-button--filled' style={type !== "brown" ? { backgroundColor: "transparent", border: "solid 1px #8F7300" } : {}}>
            <Typography fontWeight={400} fontSize="14px" lineHeight="20px" color={type !== "brown" ? "#8F7300" : "#FFFFFF"} >
                {content}
            </Typography>
        </div >
    )
}


const TemplatePanel = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const theme = createTheme({
        palette: {
            ochre: {
                main: '#E3D026',
                light: '#E9DB5D',
                dark: '#A29415',
                contrastText: '#242105',
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="template-panel">
                    <div className="top-template-button">
                        <TemplateButton content={"Template speichern"} />
                    </div>

                    <div className="panel-group">
                        <div className="product-setting-panel">
                            <div className="product-setting-panel__top">
                                <div className="typography-400-regular top-typo">Allgemein</div>
                            </div>
                            <div className="product-setting-panel__bottom">
                                <div className="input-group">
                                    <div className="label-input-pair">
                                        <div className="typography-400-regular">Name*</div>
                                        <input placeholder=""></input>
                                    </div>
                                    <div className="label-select-pair">
                                        <div className="typography-400-regular">Dateityp *</div>
                                        <div className="select-group">
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={age}
                                                onChange={handleChange}
                                                label="Age"
                                                IconComponent={ExpandMoreIcon}
                                                sx={{ width: "472px", height: "40px", padding: "0px 10px 10px 10px" }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            <div className="typography-400-regular select-subtitle">.jpg und .png sind in 72 dpi; .tiff ist in 300 dpi</div>
                                        </div>
                                    </div>
                                    <div className="label-input-pair">
                                        <div className="typography-400-regular">Breite in px *</div>
                                        <input placeholder=""></input>
                                    </div>
                                    <div className="label-input-pair">
                                        <div className="typography-400-regular">Höhe in px *</div>
                                        <input placeholder=""></input>
                                    </div>
                                    <div className="label-check-pair">
                                        <div className="label-check-pair__label"><div className="typography-400-regular">Schatten</div></div>
                                        <div className="label-check-pair__checkbox-group">
                                            <CheckboxGroup fillColor="black" title={"Produktschatten aktivieren"} textColor={"black"} />
                                        </div>
                                    </div>
                                    <div className="label-check-pair">
                                        <div className="label-check-pair__label"><div className="typography-400-regular">Marke *</div></div>
                                        <div className="label-check-pair__checkbox-group">
                                            <CheckboxGroup fillColor="black" title={"Bosch"} textColor={"black"} />
                                            <CheckboxGroup fillColor="black" title={"Buderus"} textColor={"black"} />
                                        </div>
                                    </div>
                                    <div className="label-check-pair">
                                        <div className="label-check-pair__label"><div className="typography-400-regular">Anwendung *</div></div>
                                        <div className="label-check-pair__checkbox-group">
                                            <CheckboxGroup fillColor="black" title={"Website"} textColor={"black"} />
                                            <CheckboxGroup fillColor="black" title={"eShop"} textColor={"black"} />
                                            <CheckboxGroup fillColor="black" title={"Print"} textColor={"black"} />
                                        </div>
                                    </div>
                                </div>
                                <div className="check-group">

                                </div>
                            </div>
                        </div>
                        <div className="product-setting-panel background-upload-panel">
                            <div className="product-setting-panel__top">
                                <div className="typography-400-regular top-typo">Hintergrund</div>
                            </div>
                            <div className="product-setting-panel__bottom">
                                <div className="image-position__left"><TemplateButton content={"Template speichern"} /></div>
                                <div className="image-position__left"><ProductCard title={"Background ABC"} imageInfo={"1600x640 px | 72 dpi | JPG"} cardtype="cancel" /></div>
                            </div>
                        </div>
                        <div className="product-setting-panel thumbnail-panel">
                            <div className="product-setting-panel__top typography-400-regular">
                                <div className="typography-400-regular top-typo">Vorschaubild</div>
                            </div>
                            <div className="product-setting-panel__bottom">
                                <div className="image-position__left"><TemplateButton content={"Vorschaubild hinzufügen"} /></div>
                            </div>
                        </div>
                        <div className="product-setting-panel image-setting">
                            <div className="product-setting-panel__top typography-400-regular">
                                <div className="typography-400-regular top-typo">Platzhalterbild</div>
                            </div>
                            <div className="product-setting-panel__bottom">
                                <div className="image-setting-panel">
                                    <div className="left-b-image">
                                        <div className="image-backgroud">
                                            <div className="image-compare">
                                                <ImageTemplate title="Image 1" />
                                                <ImageTemplate title="Image 2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-b">
                                        <div className="right-b__top">
                                            <ImageSettingGroup />
                                            <ImageSettingGroup />
                                        </div>
                                        <div className="right-b__bottom">
                                            <img src={plus} alt="plus" style={{ color: "black" }}></img>
                                            <div className="typo-700-regular">Ein weiteres Platzhalterbild hinzufügen</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-template-button'>
                            <TemplateButton content={"Template speichern"} />
                        </div>
                    </div>
                </div >
            </ThemeProvider >
        </>
    )
}

export default TemplatePanel