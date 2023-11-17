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
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { appendTemplate, selectPage, setLoadingStatus, initTemplate, initProductsOnTemplates, appendProductsOnTemplate } from '../../store';
import { infiniteTemplate } from '../../_services/Template';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Loading } from './ProductSelect';

const theme = createTheme({
    components: {
        // Name of the component
        MuiTabPanel: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    padding: '0px',
                },
            },
        },
    },
});




const Organism = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [value, setValue] = useState('1');
    const [count, setCount] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState([])
    const token = useSelector(state => state.auth.token)
    const templates = useSelector(state => state.templates.templateData)
    const products = useSelector(state => state.templates.productsOnTemplates)
    console.log("filterData:", filterData)
    const loadingStatus = useSelector(state => state.templates.loadingStatus)
    let page = useSelector(state => state.templates.page)
    let filters = useSelector(state => state.templates.filterData)
    useEffect(
        () => {
            setFilterData(products)
        }, [products]
    )
    useEffect(() => {
        infiniteTemplate(token, 1, filters, (success) => {
            setLoading(true)
            if (success.data.next == null) {
                dispatch(setLoadingStatus(false))
                setLoading(false)
            }
            if (success.status === 200) {
                dispatch(selectPage(page + 1))
                dispatch(initTemplate(success.data.results.templates))
                dispatch(initProductsOnTemplates(success.data.results.products))
                setCount(success.data.count)
                setLoading(false)
            }
        })
    }, [filters]);

    const fetchMoreData = () => {
        infiniteTemplate(token, page, filters, (success) => {
            if (success.status === 200) {
                if (success.data.next == null) {
                    dispatch(setLoadingStatus(false))
                }
                if (loadingStatus === true) {
                    setTimeout(() => {
                        dispatch(selectPage(page + 1))
                        dispatch(appendTemplate(success.data.results.templates))
                        dispatch(appendProductsOnTemplate(success.data.results.products))
                    }, 1000);
                }
            }
            if (success.data.code === 400 && success.data.status === "failed") {
                toast.error("Something Went Wrong", { theme: "colored", hideProgressBar: "true", autoClose: 1500 })
            }
        })
    };

    const styles = {
        tab: {
            color: '#4b4b4b',
        },
        tabItemContainer: {
            background: 'none'
        }
    }

    return (
        <>
            <div className="organism-tabs">
                <div className='typography-400-regular template-button pointer'
                    onClick={() => navigate("/product/template")}
                >
                    {t("Neues Template anlegen")}
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
                                    ".MuiButtonBase-root": {
                                        padding: "8px 0px 8px 0px",
                                        margin: "0px 30px 0px 0px",
                                    },
                                }}
                            >
                                <Tab label={count + " templates"} value="1" style={styles.tab} />
                                <Tab label={products.length + " erstellte Composings"} value="2" style={styles.tab} />
                            </TabList>
                        </Box>
                        {loading ? <Loading /> : (
                            <>
                                <TabPanel value="1"
                                >
                                    {templates.length === 0 ? (
                                        <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>No Templates</div>) : (
                                        <div className='template-tab-1'>
                                            <div id="scrollableDiv" className='product-container'>
                                                <InfiniteScroll
                                                    dataLength={templates.length}
                                                    next={fetchMoreData}
                                                    hasMore={true}
                                                    loader={loadingStatus === true ? <div className="loading">Loading&#8230;</div> : null}
                                                    className='infinite-scroll-component'
                                                    endMessage={
                                                        <p style={{ textAlign: 'center' }}>
                                                            <b>Yay! You have seen it all</b>
                                                        </p>
                                                    }
                                                    style={{ overflowX: "hidden" }}
                                                    scrollableTarget="scrollableDiv"
                                                    id='scrollable'
                                                >
                                                    {templates.map((templateEle, key) => {
                                                        return (
                                                            < ProductCard key={key} cardInfo={templateEle} />
                                                        )
                                                    }
                                                    )}
                                                </InfiniteScroll>
                                            </div>
                                        </div>
                                    )}
                                </TabPanel>

                                <TabPanel value="2">
                                    <ProductSearch filterData={products} setFilterData={setFilterData} />
                                    {products.length === 0 ? (<div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>No Products</div>) : (
                                        <div className='template-tab-2'>
                                            <div id="scrollableDiv" className='multi-product-container'>
                                                {filterData.map((productEle, key) => {
                                                    return (
                                                        < ProductCard key={key} cardInfo={productEle} type={2} />
                                                    )
                                                }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </TabPanel>
                            </>
                        )}

                    </TabContext>
                    <ToastContainer />
                </ThemeProvider>
            </div >
        </>
    )
}

export default Organism