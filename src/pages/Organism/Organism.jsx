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
import { appendTemplate, setUsedArticles, selectPage, setUpdatedDate, setTemplateLoadingStatus, initTemplate, setProductLoadingStatus, initProductsOnTemplates, appendProductsOnTemplate, authActions } from '../../store';
import { infiniteTemplate } from '../../_services/Template';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Loading } from './ProductSelect';
import { emptyStore } from '../../store';
import { getTemplatesTypes } from '../../_services/Template';

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
    const [productCount, setProductCount] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState([])
    const token = useSelector(state => state.auth.token)
    const templates = useSelector(state => state.templates.templateData)
    const products = useSelector(state => state.templates.productsOnTemplates)
    const loadingTemplateStatus = useSelector(state => state.templates.loadingTemplateStatus)
    const loadingProductStatus = useSelector(state => state.templates.loadingProductStatus)
    const usedArticles = useSelector(state => state.products.usedArticles)
    const adminMethod = useSelector(state => state.info.adminMethod)
    let page = useSelector(state => state.templates.page)
    let filters = useSelector(state => state.templates.filterData)
    const dateConvert = (originDate) => {
        const date = new Date(originDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    }
    useEffect(
        () => {
            dispatch(emptyStore())
            getTemplatesTypes(token, (success) => {
                localStorage.setItem('templateTypes', JSON.stringify(success.data.data))
                dispatch(authActions.setTemplateTypes(success.data.data))
            })
        }, []
    )
    useEffect(
        () => {
            setFilterData(products)
        }, [products]
    )
    useEffect(() => {
        setLoading(true)
        infiniteTemplate(token, 1, filters, (success) => {
            if (success.status === 200) {
                if (success.data.results?.products?.length < 5) {
                    dispatch(setProductLoadingStatus(false));
                }
                if (success.data.results?.templates.length < 5) {
                    dispatch(setTemplateLoadingStatus(false));
                }
                dispatch(setUpdatedDate(dateConvert(success.data.results.document_last_update)))
                dispatch(setUsedArticles(success.data.results.articles))
                dispatch(selectPage(page + 1))
                dispatch(initTemplate(success.data.results.templates))
                dispatch(initProductsOnTemplates(success.data.results.products))
                setCount(success.data.results.template_count)
                setProductCount(success.data.results.product_count)
                setLoading(false)
            }
        })
    }, [filters]);

    const fetchMoreData = (type) => {
        infiniteTemplate(token, page, filters, (success) => {
            if (success.status === 200) {
                dispatch(setUsedArticles(success.data.results.articles))
                if (loadingTemplateStatus === true) {
                    setTimeout(() => {
                        if (type === "template" && success.data.results?.templates.length === 15) {
                            dispatch(selectPage(page + 1))
                            dispatch(appendTemplate(success.data.results.templates))
                            dispatch(appendProductsOnTemplate(success.data.results.products))
                        }
                        if (type === "template" && success.data.results?.templates.length < 15) {
                            dispatch(setTemplateLoadingStatus(false));
                            dispatch(appendTemplate(success.data.results.templates))
                            dispatch(appendProductsOnTemplate(success.data.results.products))
                        }
                    }, 500);
                }
                if (loadingProductStatus === true) {
                    setTimeout(() => {
                        if (type === "product" && success.data.results?.products?.length === 15) {
                            dispatch(selectPage(page + 1))
                            dispatch(appendTemplate(success.data.results.templates))
                            dispatch(appendProductsOnTemplate(success.data.results.products))
                        }
                        if (type === "product" && success.data.results?.products?.length < 15) {
                            dispatch(setProductLoadingStatus(false));
                            dispatch(appendTemplate(success.data.results.templates))
                            dispatch(appendProductsOnTemplate(success.data.results.products))
                        }
                    }, 500);
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
                {
                    adminMethod ? <div className='typography-400-regular template-button pointer'
                        onClick={() => navigate("/product/template")}
                    >
                        {t("Neues Template anlegen")}
                    </div> : null
                }

                {loading ? <Loading /> : (<div></div>)}
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
                                <Tab label={count + t(" Vorlagen")} value="1" style={styles.tab} />
                                <Tab label={productCount + t(" erstellte Kompositionen")} value="2" style={styles.tab} />
                            </TabList>
                        </Box>

                        <>
                            <TabPanel value="1"
                            >
                                {templates.length === 0 ? (
                                    <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>{t("No matching templates found")}</div>) : (
                                    <div className='template-tab-1'>
                                        <div id="scrollableDiv" className='product-container' style={{
                                            overflow: 'scroll',
                                            overflowX: 'hidden'
                                        }}>
                                            <InfiniteScroll
                                                dataLength={templates.length}
                                                next={(e) => fetchMoreData("template")}
                                                hasMore={true}
                                                loader={loadingTemplateStatus === true ? <div className="loading">Loading&#8230;</div> : null}
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
                                                {templates?.map((templateEle, key) => {
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
                                <ProductSearch usedArticles={usedArticles} filterData={products} setFilterData={setFilterData} />

                                {products?.length === 0 ? (<div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>{t("No matching composings found")}</div>) : (
                                    <div className='template-tab-2'>
                                        <div id="scrollableDiv" className='product-container' style={{
                                            overflow: 'scroll',
                                            overflowX: 'hidden',
                                            marginBottom: "60px"
                                        }}>
                                            <InfiniteScroll
                                                dataLength={products.length}
                                                next={(e) => fetchMoreData("product")}
                                                hasMore={true}
                                                loader={loadingProductStatus === true ? <div className="loading">Loading&#8230;</div> : null}
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
                                                {filterData.length > 0 && filterData?.map((productEle, key) => {
                                                    return (
                                                        < ProductCard key={key} cardInfo={productEle} type={2} />
                                                    )
                                                }
                                                )}
                                            </InfiniteScroll>
                                        </div>
                                    </div>
                                )}
                            </TabPanel>
                        </>

                    </TabContext>
                    <ToastContainer />
                </ThemeProvider>
            </div >
        </>
    )
}

export default Organism