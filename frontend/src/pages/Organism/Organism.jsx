import LayOutDashboard from "../../layout/LayOutDashboard"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import './style/organismStyle.scss'
import ProductCard from "../../components/Product-View/ProductCard";

const Organism = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <LayOutDashboard>
                <div className="organism-tabs">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#8F7300",
                                }
                            }}
                                sx={{
                                    ".Mui-selected": {
                                        color: "#000000",
                                    },
                                }}
                            >
                                <Tab label="213 templates" value="1" />
                                <Tab label="23 erstellte Composings" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <ProductCard />
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                    </TabContext>
                </div>
            </LayOutDashboard>
        </>
    )
}

export default Organism