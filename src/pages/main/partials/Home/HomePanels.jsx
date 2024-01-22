import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { getTemplates, getProducts } from "libs/_utils/actions"
import { infoActions } from "store/info.slice"
import { Loading } from "libs/icons"
import ProductSearch from 'components/Product-View/ProductSearch';
import DataTable from "./DataTable"
export const ProductPanel = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const products = useSelector(state => state.info.productData)
    const page = useSelector(state => state.info.currentProductPage)
    const filter = useSelector(state => state.info.filterData)
    const nomore = useSelector(state => state.info.nomoreProductData)
    console.log(nomore)
    useEffect(()=>{
        const fetchProducts = async () => {
            setLoading(true)
            const response = await getProducts(1, filter);
            if(response?.code ===200){
                dispatch(infoActions.initProductData())
                dispatch(infoActions.setProductData(response.data))
            }
            setTimeout(()=>{
                setLoading(false)
            }, 1000)
        }
        fetchProducts();
    },[dispatch, filter])
    const handleNext = async () => {
        if (!nomore) {
            setTimeout(async () => {
                const response = await getProducts(page, filter);     
                if(response?.code ===200){
                    dispatch(infoActions.setProductData(response.data));
                }
            }, 1500);
        }
    }
    return(
        <>
            <ProductSearch />
            {loading ? <Loading /> : 
                (products.length === 0 ? 
                <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>
                    {t(`No matching composings found`)}
                </div> : 
                <DataTable items={products} index = "product" page={page-1} next={handleNext}/> )
            }
        </>
    )
}

export const TemplatePanel = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const templates = useSelector(state => state.info.templateData)
    const page = useSelector(state => state.info.currentTemplatePage)
    const filter = useSelector(state => state.info.filterData)
    const nomore = useSelector(state => state.info.nomoreTemplateData)
    useEffect(()=>{
        const fetchTemplates = async () => {
            setLoading(true);            
            const response = await getTemplates(1, filter);    
            if(response?.code ===200){
                dispatch(infoActions.initTemplatetData());
                dispatch(infoActions.setTemplateData(response.data));
            }            
            setLoading(false);
        }    
        fetchTemplates();    
    },[dispatch, filter]);
    const handleNext = async () => {
        if (!nomore) {
            setTimeout(async () => {
                const response = await getTemplates(page, filter);     
                if(response?.code ===200){
                    dispatch(infoActions.setTemplateData(response.data));
                }
            }, 1500);
        }
    }
    return(
        <>
            {loading ? <Loading /> : 
                (templates.length === 0 ? 
                <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>
                    {t(`No matching templates found`)}
                </div> : 
                <DataTable items={templates} page={page-1} index = "template" next={handleNext}/> )
            }
        </>
    )
}