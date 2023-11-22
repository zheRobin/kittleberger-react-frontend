import "./style/organismStyle.scss"
import plus from "../../assets/icons/add-2.svg"
import { useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { appendProducts, setComposedProduct } from "../../store"
import { useDispatch } from "react-redux"
import { getProductsbyFilter } from "../../_services/Product"
import { Suspense } from "react"
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoSlider } from 'react-photo-view';
import { composeByInfo } from "../../_services/Product"
import { calcPosition } from "../../_services/Product"

export const ProductView = () => {
    const dispatch = useDispatch()
    const selectedTemplate = useSelector(state => state.products.selectedTemplate);
    const selectedProducts = useSelector(state => state.products.selectedProducts);
    const token = useSelector(state => state.auth.token)
    const imgRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [composeImage, setComposeImage] = useState('')

    useEffect(() => {
        if (imgRef.current) {
            setLoading(true);
            const article = selectedProducts?.map((product) => {
                const positionStyle = selectedTemplate?.article_placements;
                const selectedStyle = positionStyle.filter((article_placement) => article_placement.pos_index == product?.pos_index)
                const sliderScale = product?.sliderScale === undefined ? 1 : product?.sliderScale;
                const position = calcPosition(product?.alignment === undefined ? 'middle-center' : product?.alignment, selectedStyle[0]?.position_x, selectedStyle[0]?.position_y, selectedStyle[0]?.width, selectedStyle[0]?.height, sliderScale)
                const is_transparent = product?.is_transparent === true ? true : false;
                const positionX = position ? position[0] : selectedStyle[0].position_x;
                const positionY = position ? position[1] : selectedStyle[0].position_y;
                if (positionStyle !== undefined) {
                    return {
                        article_link: product?.cdn_urls ? product?.cdn_urls[0] : product?.cdn_url,
                        is_transparent: is_transparent,
                        top: positionY,
                        left: positionX,
                        width: selectedStyle[0]?.width * sliderScale,
                        height: selectedStyle[0]?.height * sliderScale,
                        z_index: selectedStyle[0]?.z_index
                    };
                }
            });
            const composingInfo = {
                template_id: selectedTemplate.id,
                articles: article.filter(Boolean),
            };
            composeByInfo(token, composingInfo, (success) => {
                setComposeImage(success.data.data);
                dispatch(setComposedProduct(success.data.data))
                setLoading(false);
            });

        }
    }, [selectedProducts]);
    return (
        <div className="image-backgroud">
            {loading ? (
                <Loading />
            ) : (
                <div className="saved-images" style={{ width: "100%", height: "800px" }}>
                    <img ref={imgRef} src={composeImage} alt="background" style={{ height: '100%', width: "100%", objectFit: 'contain' }} />
                </div>
            )}


        </div>
    );
}


export const ProductList = ({ productItem, possiblePos, setPreview, setVisible }) => {
    const dispatch = useDispatch()
    const productCount = useSelector(state => state.products.selectedProducts)

    return (
        <div className="product-list-panel">
            <div style={{
                maxWidth: '70px',
                maxHeight: "70px",
                marginRight: '5px'
            }} className="pointer" onClick={() => { setPreview([productItem?.cdn_urls[0]]); setVisible(true) }}>
                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={productItem?.cdn_urls[0] ? productItem?.cdn_urls[0] : require("../../assets/images/product-image.png")} alt="product" />
            </div>
            <div className="product-info" >
                <div className="label-info">
                    <div className="label-info__top typography-700-regular">{productItem.name}</div>
                    <div className="label-info__bottom typography-400-regular">{productItem.article_number}</div>
                </div>
                <div className="add--filled pointer" onClick={(e) => { dispatch(appendProducts(productItem)) }} style={(possiblePos - 1) >= productCount.length ? {} : { display: "none" }}>
                    <img src={plus} alt="plus" />
                </div>
            </div>
        </div>
    )
}

export const Loading = () => {
    return (
        <div className="cover-spin" style={{ margin: "0px 0px 0px 0px" }}>
            <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible" fill="#8F7300" stroke="none">
                <defs>
                    <circle id="loader" r="4" cx="50" cy="50" transform="translate(0 -30)" />
                </defs>
                <g className="loader" transform="rotate(51 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(103 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(154 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(206 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(257 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(309 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(360 50 50)"><use xlinkHref="#loader" /></g>
            </svg>
        </div>
    )
}

const ProductSelect = () => {
    const selectedCountryGroup = useSelector(state => state.products.selectedCountry)
    const selectedTemplate = useSelector(state => state.products.selectedTemplate);
    const productPosNumbers = selectedTemplate.article_placements ? selectedTemplate?.article_placements?.length : 1;
    const token = useSelector(state => state.auth.token);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [posNum, setPosNum] = useState(0);
    const [searchString, setSearchString] = useState("");
    const [pageInfo, setPageInfo] = useState(
        {}
    )
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const clearStoreData = () => {
        setProductList([]);
        setPage(1);
        const productInfo = searchString;
        try {
            getProductInfo(page, productInfo, selectedCountryGroup.length === 0 ? "germany" : selectedCountryGroup[0]);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Handle the error appropriately
        }
    };

    useEffect(() => {
        const delay = 200;

        const timeoutId = setTimeout(() => {
            clearStoreData();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchString]);

    function getProductInfo(page, productInfo = "", country = "germany") {
        getProductsbyFilter(token, { page, productInfo, country }, (success) => {
            if (success.data.code === 200 && success.data.status === "success") {
                setProductList((prevProductList) => {
                    const newList = prevProductList.length === 0 ? success.data.data.products : [...prevProductList, ...success.data.data.products];
                    return newList;
                });
                setPageInfo({
                    currentPage: success.data.data.current_page,
                    count: success.data.data.count
                })
            }
            else {
            }

        })
    }

    useEffect(() => {
        try {
            getProductInfo(page)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [page]);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="product-select">
                    <div className="product-select__l">
                        <div className="product-search">
                            <input placeholder="Produkte durchsuchen" onChange={(e) => { setSearchString(e.target.value) }} />
                        </div>
                        <div className="product-add">
                            {productList?.map((productItem, index) => {
                                return <ProductList key={index} productItem={productItem} setPosNum={setPosNum} posNum={posNum} possiblePos={productPosNumbers} setPreview={setImages} setVisible={setVisible} />
                            }
                            )}
                        </div>
                        {30 === pageInfo?.count ? (<div className="typography-400-bold pointer" onClick={(e) => setPage(page + 1)} style={{ textAlign: "end", marginTop: "10px", color: "#8F7300", fontWeight: "bold" }}>Load More</div>) : null}
                    </div>
                    <PhotoSlider
                        images={images.map((item) => ({ src: item, key: item }))}
                        visible={visible}
                        speed={() => 120}
                        maskOpacity={0.5}
                        onClose={() => setVisible(false)}
                        index={index}
                        onIndexChange={setIndex}
                    />

                    <div className="product-select__r">
                        <ProductView />
                    </div>
                </div>
            </Suspense>
        </>
    )
}




export default ProductSelect