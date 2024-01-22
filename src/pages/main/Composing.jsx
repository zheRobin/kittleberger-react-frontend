import React, { Suspense, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ArticleList from "./partials/Composing/ArticleList";
import ProductView from "./partials/Composing/Preview";
import { composeByInfo } from "libs/_utils/actions";
import { Loading } from "libs/icons"
import { composingActions } from "store/composing.slice";
import "./style/organismStyle.scss"
const ComposingEdit = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const templateItem = useSelector(state => state.info.templateData.find(item => item.id === parseInt(id)));
    const articleItems = useSelector(state => state.composing.composingElements);
    
    useEffect(() => {
            if(!templateItem) {
                navigate('/')
            } else {
                dispatch(composingActions.setTemplate(templateItem))
                const composeRender = async () => {
                    const request = {
                        template_id: id,
                        articles: articleItems
                    }
                    setLoading(true)
                    const response = await composeByInfo(request);
                    setLoading(false)
                    if (response?.code === 200) {
                        dispatch(composingActions.setRenderedCompose(response.data))
                    }
                }
                composeRender();                
            }        
    }, [articleItems, dispatch, id, navigate, templateItem])
    const renderedCompose = useSelector(state => state.composing.renderedCompose);
    return (
        <Suspense fallback={<Loading />}>
            <div className="product-select">
                <ArticleList template = {templateItem}/>
            {loading ? (
                <Loading />
            ) : (
            <div className="product-select__r">
                <ProductView compose = {renderedCompose}/>
            </div>
             )}
            </div>
        </Suspense>
    )
}

export default ComposingEdit