import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { ProductPanel, TemplatePanel } from "./partials/Home/HomePanels";
import { getPageData } from 'libs/_utils/actions';
import { infoActions } from "store/info.slice";
import './style/organismStyle.scss'
const theme = createTheme({
    components: {
        MuiTabPanel: {
            styleOverrides: {
                root: {
                    padding: '0px',
                },
            },
        },
    },
});
const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const role = useSelector(state => state.auth.role)
    const currentTab = useSelector(state => state.info.currentTab)
    const styles = {
        tab: {
            color: '#4b4b4b',
        },
        tabItemContainer: {
            background: 'none'
        }
    }
    useEffect(() => {
        const fetchPageData = async() => {
            const response = await getPageData();
            if (response?.code === 200) {
                dispatch(infoActions.setPageData(response.data))
            } else {
                //
            }
        }
        fetchPageData();
    }, [dispatch])
    return(
        <div className="organism-tabs">
                {
                    role === 'admin' ? <div className='typography-400-regular template-button pointer'
                        onClick={() => navigate("/template")}
                    >
                        {t("Neues Template anlegen")}
                    </div> : null
                }
        <ThemeProvider theme={theme}>
            <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: '#E0E2E5' }}>
                    <TabList onChange={(e, newValue) => dispatch(infoActions.setCurrentTab(newValue))}  aria-label="lab API tabs example" TabIndicatorProps={{
                        style: {
                            backgroundColor: "#8F7300",
                        },
                    }}
                        sx={{
                            ".Mui-selected": {
                                color: "#000000",
                            },
                            ".MuiButtonBase-root": {
                                padding: "8px 0px 8px 0px",
                                margin: "0px 30px 0px 0px",
                            },
                        }}
                    >
                        <Tab label={1 + t(" Vorlagen")} value="template" style={styles.tab} />
                        <Tab label={2 + t(" erstellte Kompositionen")} value="product" style={styles.tab} />
                    </TabList>
                    <>
                        <TabPanel value="template"><TemplatePanel /></TabPanel>
                        <TabPanel value="product"><ProductPanel /></TabPanel>
                    </>

                </Box>
            </TabContext>
        </ThemeProvider>
        </div>
    )
}

export default Home