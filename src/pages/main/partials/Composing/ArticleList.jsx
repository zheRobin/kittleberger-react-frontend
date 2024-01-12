import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getArticleList } from "libs/_utils/actions";
import { composingActions } from "store/composing.slice";
import { SpinnerIcon, PlusIcon2 } from "libs/icons"

const ArticleItem = ({item}) => {
    const [loading, setLoading] = useState(false)
    return(
        <div className="product-list-panel">
            <div style={{ display: loading ? "block" : "none" }}>
                <img src={SpinnerIcon} alt="preview" style={{ width: "60px" }}></img>
            </div>
            <div style={{
                maxWidth: '70px',
                maxHeight: "70px",
                marginRight: '5px',
                display: loading ? "none" : "block"
            }} className="pointer">
                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={item.render_url} alt="article"/>
            </div>
            <div className="product-info" >
                <div className="label-info">
                    <div className="label-info__top typography-700-regular">{item.name}</div>
                    <div className="label-info__bottom typography-400-regular">{item.article_number}</div>
                </div>
                <div className="add--filled pointer">
                    <img src={PlusIcon2} alt="plus" />
                </div>
            </div>
        </div>
    )
}

const ArticleList = () => {
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation();
    const page = useSelector(state => state.composing.currentListPage)
    const productInfo = ''
    const country = null
    const  dispatch = useDispatch();
    useEffect(() => {
        if (loading) {
            const getArticlesData = async () => {
                const response = await getArticleList({page, productInfo, country});
                if (response.code === 200) {
                    dispatch(composingActions.setArticleList(response.data))
                }
            }
            getArticlesData();
        }
        setLoading(false)
    }, [dispatch, loading, page])
    const articlesData = useSelector(state => state.composing.articleList)
    return(
        <div className="product-select__l">
            <div className="product-search">
                <input placeholder={t("Produkte durchsuchen")} />
            </div>
            <div className="product-add">
                {articlesData.map((article, index) => <ArticleItem key = {index} item = {article}/>)}
            </div>
        </div>
    )
}

export default ArticleList;