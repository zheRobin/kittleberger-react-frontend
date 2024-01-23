import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getArticleList } from "libs/_utils/actions";
import { convArticle, getIndex } from "libs/_utils/conv";
import { composingActions } from "store/composing.slice";
import { SpinnerIcon, PlusIcon2 } from "libs/icons"

const ArticleItem = ({ item, template }) => {
    const usedArticle = useSelector(state => state.composing.composingElements);
    const [loading, setLoading] = useState(true)
    const [popupImage, setPopupImage] = useState(false)
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
        if (template?.article_placements?.length === usedArticle.length) {
            setVisbleIcon(false)
        } else {
            setVisbleIcon(true)
        }
    }, [template, usedArticle])

    const openImagePopUp = () => {
        setPopupImage(true)
    }

    const closeImagePopUp = () => {
        setPopupImage(false)
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeImagePopUp();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
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
                    onLoad={() => setLoading(false)} 
                    onClick={openImagePopUp}/>
            </div>
            {popupImage && 
                <div onClick={closeImagePopUp} style={{position: "fixed", top:0, left:0, right:0, bottom:0,backgroundColor: "rgba(0,0,0,0.6)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:5 }}>
                    <img style={{ width: "50%", height: "50%", objectFit: "contain" }} src={item.render_url} alt="article"/>
                </div>
            }
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
    const productInfo = useSelector(state => state.composing.articleFilter)
    const countryListFromState = useSelector(state => state.info.countryList);
    const country = useMemo(() => 
        Array.isArray(countryListFromState.country_list) ? countryListFromState.country_list : []
    , [countryListFromState]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getArticlesData = async () => {
            setNoMoreArticles(false)
            setLoading(true)
            const response = await getArticleList({ 
                page, 
                productInfo, 
                country: country.length === 0 ? "" : country.join(',') 
            });
            if (response?.code === 200) {
                dispatch(composingActions.setArticleList(response.data))
                if(response.data.products.length < 30 ){ 
                    setNoMoreArticles(true)
                }
            }
            setLoading(false)
        }
        getArticlesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productInfo, country])
  
    const handleLoadMore = async () => {
        setLoading(true)
        const response = await getArticleList({ 
            page: page + 1, 
            productInfo, 
            country: country.length === 0 ? "" : country.join(',') 
        });
        if (response?.code === 200) {
            dispatch(composingActions.setArticleList(response.data))
            if(response.data.products.length < 30){ 
                setNoMoreArticles(true)
            }
        }
        setLoading(false)
    }
    const articlesData = useSelector(state => state.composing.articleList)
    const handleChange = (event) => {
        setTimeout(()=>{
            dispatch(composingActions.setFilterData(event.target.value));
        }, 500)
      };
    return (
        <div className="product-select__l">
            <div className="product-search">
                <input placeholder={t("Produkte durchsuchen")} onChange={handleChange} defaultValue={productInfo}/>
            </div>
            <div className="product-add">
                {articlesData.map((article, index) => <ArticleItem key={index} item={article} template={template} />)}
            </div>
            {loading ? 
            <div className="" style={{ display: "flex", paddingTop: "10px", justifyContent: "center", height: "50px" }}>
                <img src={SpinnerIcon} alt="productSpinner" ></img>
            </div> : 
            noMoreArticles ? 
            <div style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>{t("Keine weiteren Ergebnisse")}</div> : 
            <div className="typography-400-bold pointer" onClick={handleLoadMore} style={{ textAlign: "center", marginTop: "10px", color: "#8F7300", fontWeight: "bold" }}>{t("Mehr laden")}</div>}
        </div>
    )
}

export default ArticleList;