import "./style/organismStyle.scss"
import plus from "../../assets/icons/add-2.svg"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { appendProducts } from "../../store"
import { useDispatch } from "react-redux"

export const ProductList = ({ productItem, flag, setPosNum, posNum, possiblePos }) => {
    const dispatch = useDispatch()
    const productCount = useSelector(state => state.products.selectedProducts)
    return (
        <div className="product-list-panel">
            <img src={require("../../assets/images/product-image.png")} alt="product" />
            <div className="product-info">
                <div className="label-info">
                    <div className="label-info__top typography-700-regular">{productItem.name}</div>
                    <div className="label-info__bottom typography-400-regular">{productItem.article_number}</div>
                </div>
                <div className="add--filled pointer" onClick={(e) => { dispatch(appendProducts(productItem)) }} style={1 >= productCount.length ? {} : { display: "none" }}>
                    <img src={plus} alt="plus" />
                </div>
            </div>
        </div >
    )
}



const ProductSelect = () => {

    const selectedTemplate = useSelector(state => state.products.selectedTemplate);
    const productPosNumbers = selectedTemplate?.article_placements?.length;
    const token = useSelector(state => state.auth.token);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [posNum, setPosNum] = useState(0);
    const [searchString, setSearchString] = useState("");

    const parseSearch = (input) => {
        const regex1 = /\b(\d+)\b/;
        const regex2 = /\b([a-zA-Z]+)\b/;
        const productArray = input.match(regex1);
        const countryArray = input.match(regex2);
        const countryName = countryArray ? countryArray[0] : "";
        const productNumber = productArray ? productArray[0] : "";
        const queryString = (countryName === "" && productNumber === "") ? "" : `&country=${countryName}&product=${productNumber}`;
        return queryString;
    };

    const handleSearch = async (e) => {
        if (e.key === "Enter") {
            setProductList([]);
            setPage(1);
            const additionalQuery = parseSearch(searchString);
            try {
                await getProductsbyFilter(page, additionalQuery);
            } catch (error) {
                console.error("Error fetching products:", error);
                // Handle the error appropriately
            }
        }
    };

    async function getProductsbyFilter(pages, additionalQuery = "") {
        const filterString = additionalQuery ? `${process.env.REACT_APP_API_URL}api/v1/core/filter?page=${pages}${additionalQuery}` : `${process.env.REACT_APP_API_URL}api/v1/core/filter?page=${pages}`;
        try {
            const response = await fetch(filterString, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token,
                },
            });
            const reader = response.body.getReader();
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    // Process the last chunk of data if any
                    if (buffer.length > 0) {
                        const lastChunk = buffer.trim();
                        console.log(lastChunk);
                        // Process the last chunk of data as needed
                    }
                    return;
                }
                const decoder = new TextDecoder("utf-8");
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                // Split the buffer by \n\n to separate the streams
                while (buffer.includes("\n\n")) {
                    const newlineIndex = buffer.indexOf("\n\n");
                    const stream = buffer.slice(0, newlineIndex);
                    buffer = buffer.slice(newlineIndex + 2);
                    const parsedData = JSON.parse(stream);
                    setProductList((prevProductList) => {
                        const newList = prevProductList.length === 0 ? parsedData : [...prevProductList, ...parsedData];
                        return newList;
                    });
                    // Process each stream individually
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error; // Re-throw the error to handle it outside
        }
    }

    useEffect(() => {
        const additionalQuery = parseSearch(searchString);
        console.log(additionalQuery);
        try {
            getProductsbyFilter(page, additionalQuery);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Handle the error appropriately
        }
    }, [page]);

    return (
        <>
            <div className="product-select">
                <div className="product-select__l">
                    <div className="product-search">
                        <input placeholder="Produkte durchsuchen" onChange={(e) => { setSearchString(e.target.value) }} onKeyDown={handleSearch} />
                    </div>
                    <div className="product-add">
                        {productList?.map((productItem, index) => {
                            return <ProductList key={index} productItem={productItem} setPosNum={setPosNum} posNum={posNum} possiblePos={productPosNumbers} />
                        }
                        )}
                    </div>
                    <div className="typography-400-bold pointer" onClick={(e) => setPage(page + 1)} style={{ textAlign: "end", marginTop: "10px", color: "#8F7300", fontWeight: "bold" }}>Load More</div>
                </div>
                <div className="product-select__r">
                    <div className="image-backgroud">
                        <img src={require("../../assets/images/sub-back.png")} alt="background" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSelect