import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getArticleList } from "libs/_utils/actions";
import { convArticle, getIndex } from "libs/_utils/conv";
import { composingActions } from "store/composing.slice";
import { SpinnerIcon, PlusIcon2 } from "libs/icons"

const ArticleItem = ({ item, template }) => {
    const usedArticle = useSelector(state => state.composing.composingElements);
    const [loading, setLoading] = useState(true)
    const [visibleIcon, setVisbleIcon] = useState(true)
    const dispatch = useDispatch();
    const params = {
        scaling: 1,
        alignment: 'top-left',
        is_transparent: false
    }
    const handleItemSelection = (item) => {
        const index = getIndex(usedArticle, template);
        const article = convArticle(item, template.article_placements.find(i => i.pos_index === index), params)
        dispatch(composingActions.setComposingArticle(article))
        dispatch(composingActions.setSaveStatus(false))
    }
    useEffect(() => {
        if (template.article_placements.length === usedArticle.length) {
            setVisbleIcon(false)
        } else {
            setVisbleIcon(true)
        }
    }, [template, usedArticle])
    return (
        <div className="product-list-panel">
            <div style={{ display: loading ? "block" : "none" }}>
                <img src={SpinnerIcon} alt="preview" style={{ width: "60px" }}/>
            </div>
            <div style={{
                maxWidth: '70px',
                maxHeight: "70px",
                marginRight: '5px',
                display: loading ? "none" : "block"
            }} className="pointer">
                <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    src={item.render_url}
                    alt="article"
                    onLoad={() => setLoading(false)} />
            </div>
            <div className="product-info" >
                <div className="label-info">
                    <div className="label-info__top typography-700-regular">{item.name}</div>
                    <div className="label-info__bottom typography-400-regular">{item.article_number}</div>
                </div>
                {
                    visibleIcon
                        ? <div className="add--filled pointer" onClick={(e) => handleItemSelection(item)}>
                            <img src={PlusIcon2} alt="plus" />
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

const ArticleList = ({ template }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true)
    const [noMoreArticles, setNoMoreArticles] = useState(false)
    const page = useSelector(state => state.composing.currentListPage)
    const productInfo = ''
    const country = null
    const dispatch = useDispatch();
    useEffect(() => {
        const getArticlesData = async () => {
            setLoading(true)
            const response = await getArticleList({ page, productInfo, country });
            if (response?.code === 200) {
                dispatch(composingActions.setArticleList(response.data))
                if(response.data.length === 0 ){ 
                    setNoMoreArticles(true)
                }
            }
            setLoading(false)
        }
        getArticlesData();
      }, [dispatch, page])
  
      const handleLoadMore = () => {
          dispatch(composingActions.setListPage(page + 1))
      }
    const articlesData = useSelector(state => state.composing.articleList)
    return (
        <div className="product-select__l">
            <div className="product-search">
                <input placeholder={t("Produkte durchsuchen")} />
            </div>
            <div className="product-add">
                {articlesData.map((article, index) => <ArticleItem key={index} item={article} template={template} />)}
            </div>
            {loading ? 
            <div className="" style={{ display: "flex", paddingTop: "10px", justifyContent: "center", height: "50px" }}>
                <img src={SpinnerIcon} alt="productSpinner" ></img>
            </div> : 
            noMoreArticles ? <div>{t("Keine Ergebnisse")}</div> : 
            <div className="typography-400-bold pointer" onClick={handleLoadMore} style={{ textAlign: "center", marginTop: "10px", color: "#8F7300", fontWeight: "bold" }}>{t("Mehr laden")}</div>}
        </div>
    )
}

export default ArticleList;