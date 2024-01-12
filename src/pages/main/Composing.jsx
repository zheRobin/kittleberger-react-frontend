import React, { Suspense, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ArticleList from "./partials/Composing/ArticleList";
import ProductView from "./partials/Composing/ProductView";
import { Loading } from "libs/icons"
import "./style/organismStyle.scss"
const ComposingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const templateItem = useSelector(state => state.info.templateData.find(item => item.id === parseInt(id)));
    useEffect(() => {
        if(!templateItem) navigate('/')
    }, [navigate, templateItem])
    return (
        <Suspense fallback={<Loading />}>
            <div className="product-select">
                <ArticleList />
            </div>
            <div className="product-select__r">
                <ProductView />
            </div>
        </Suspense>
    )
}

export default ComposingEdit