import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import './style/organismStyle.scss'
import ProductCard from "../../components/Product-View/ProductCard";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import ProductSearch from '../../components/Product-View/ProductSearch';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    components: {
        // Name of the component
        MuiTabPanel: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    padding: '0px',
                    marginRight: "30px"
                },
            },
        },
    },
});




const Organism = () => {
    const navigate = useNavigate()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const styles = {
        tab: {
            color: '#4b4b4b',
        },
        tabItemContainer: {
            background: 'none'
        }
    }

    const productMokeUp = [
        { title: "Hero Keyvisual (2 Products)", imageInfo: "1600x640 px | 72 dpi | JPG" },
        { title: "Hero Keyvisual (2 Products)", imageInfo: "1600x640 px | 72 dpi | JPG" },
        { title: "Hero Keyvisual (2 Products)", imageInfo: "1600x640 px | 72 dpi | JPG" },
        { title: "Hero Keyvisual (2 Products)", imageInfo: "1600x640 px | 72 dpi | JPG" },
        { title: "Hero Keyvisual (2 Products)", imageInfo: "1600x640 px | 72 dpi | JPG" }
    ]

    return (
        <>
            <div className="organism-tabs">
                <div className='typography-400-regular template-button pointer' style={{ color: "#8F7300" }}
                    onClick={() => navigate("/product/template")}
                >
                    Neues Template anlegen
                </div>

                <ThemeProvider theme={theme}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: '#E0E2E5' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#8F7300",
                                },
                            }}
                                sx={{
                                    ".Mui-selected": {
                                        color: "#000000",
                                    },
                                }}
                            >
                                <Tab label="213 templates" value="1" style={styles.tab} />
                                <Tab label="23 erstellte Composings" value="2" style={styles.tab} />
                            </TabList>
                        </Box>

                        <TabPanel value="1"
                        >
                            <div className='product-container'>
                                {productMokeUp.map((productEle, key) => {
                                    return (
                                        < ProductCard key={key} title={productEle.title} imageInfo={productEle.imageInfo} />
                                    )
                                }
                                )}
                            </div>
                        </TabPanel>

                        <TabPanel value="2">
                            <ProductSearch />
                            <div className='product-container'>
                                {productMokeUp.map((productEle, key) => {
                                    return (
                                        < ProductCard key={key} title={productEle.title} imageInfo={productEle.imageInfo} />
                                    )
                                }
                                )}
                            </div>
                        </TabPanel>
                    </TabContext>
                </ThemeProvider>
            </div >
        </>
    )
}

export default Organism