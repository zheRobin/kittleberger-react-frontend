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
    useEffect(()=>{
        setLoading(true)
        const fetchProducts = async () => {
            const response = await getProducts(page, filter);
            if(response?.code ===200){
                if(page === 1) dispatch(infoActions.initProductData())
                if(response.data.products.length>0) dispatch(infoActions.setProductData(response.data))
            }
        }
        fetchProducts();
        setLoading(false)
    },[dispatch, loading, page, filter])
    const handeNext = () => {
        setLoading(true)
        setTimeout(() => {
            dispatch(infoActions.setProductPage(page+1))
        }, 1500); 
        setLoading(false)
    }
    return(
        <>
            <ProductSearch />
            {loading ? <Loading /> : 
                (products.length === 0 ? 
                <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>
                    {t(`No matching composings found`)}
                </div> : 
                <DataTable items={products} index = "product" page={page} next={handeNext}/> )
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
    useEffect(()=>{
        setLoading(true)
        const fetchTemplates = async () => {
            const response = await getTemplates(page, filter);
            if(response?.code ===200){
                if(page === 1) dispatch(infoActions.initTemplatetData())
                if(response.data.templates.length>0) dispatch(infoActions.setTemplateData(response.data))
            }
        }
        fetchTemplates();
        setLoading(false)
    },[dispatch, loading, page, filter])
    const handeNext = () => {
        setLoading(true)
        setTimeout(() => {
            dispatch(infoActions.setTemplatePage(page+1))
        }, 1500); 
        setLoading(false)
    }
    return(
        <>
            {loading ? <Loading /> : 
                (templates.length === 0 ? 
                <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>
                    {t(`No matching templates found`)}
                </div> : 
                <DataTable items={templates} page={page} index = "template" next={handeNext}/> )
            }
        </>
    )
}