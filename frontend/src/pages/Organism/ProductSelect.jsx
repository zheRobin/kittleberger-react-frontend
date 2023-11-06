import "./style/organismStyle.scss"
import plus from "../../assets/icons/add-2.svg"

export const ProductList = () => {
    return (
        <div className="product-list-panel">
            <img src={require("../../assets/images/product-image.png")} alt="product" />
            <div className="product-info">
                <div className="label-info">
                    <div className="label-info__top typography-700-regular">Condens 7000 F</div>
                    <div className="label-info__bottom typography-400-regular">7736602797</div>
                </div>
                <div className="add--filled">
                    <img src={plus} alt="plus" />
                </div>
            </div>
        </div>
    )
}



const ProductSelect = () => {
    return (
        <>
            <div className="product-select">
                <div className="product-select__l">
                    <div className="product-search">
                        <input placeholder="Produkte durchsuchen" />
                    </div>
                    <div className="product-add">
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                        <ProductList />
                    </div>
                </div>
                <div className="product-select__r">
                    <div className="image-backgroud">
                        <img src={require("../../assets/images/sub-back.png")} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSelect