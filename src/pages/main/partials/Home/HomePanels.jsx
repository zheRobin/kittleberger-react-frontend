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
    useEffect(()=>{
        if (loading){
            const fetchProducts = async () => {
                const response = await getProducts(page);
                if(response.code ===200){
                    dispatch(infoActions.setProductData(response.data))
                }
            }
            fetchProducts();
        }
        setLoading(false)
    },[dispatch, loading, page])
    return(
        <>
            <ProductSearch filters={[]} filterData={products} />
            {loading ? <Loading /> : 
                (products.length === 0 ? 
                <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>
                    {t(`No matching composings found`)}
                </div> : 
                <DataTable items={products} index = "product" page={page} next={infoActions.setProductPage}/> )
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
    useEffect(()=>{
        if (loading){
            const fetchTemplates = async () => {
                const response = await getTemplates(page);
                if(response.code ===200){
                    dispatch(infoActions.setTemplateData(response.data))
                }
            }
            fetchTemplates();
        }
        setLoading(false)
    },[dispatch, loading, page])
    return(
        <>
            {loading ? <Loading /> : 
                (templates.length === 0 ? 
                <div className='typography-400-regular' style={{ textAlign: "start", marginTop: "20px" }}>
                    {t(`No matching templates found`)}
                </div> : 
                <DataTable items={templates} page={page} index = "template" next={infoActions.setTemplatePage}/> )
            }
        </>
    )
}