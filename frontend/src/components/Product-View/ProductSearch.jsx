
import search from "../../assets/icons/search2.svg"
import "./style/productViewStyle.scss"

const ProductSearch = () => {
    return (
        <div className="search-bar">
            <input placeholder="Nach Produkten suchen"></input>
            <img src={search} alt="search" />
        </div>
    )
}


export default ProductSearch