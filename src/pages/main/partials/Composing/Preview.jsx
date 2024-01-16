import React, {useState} from "react";
import { SpinnerIcon } from "libs/icons"
const ProductView = ({compose}) => {
    const [loading, setLoading] = useState(true)
    return(
        <div className="image-backgroud">
            <div style={{
            width: "100%", 
            height: "800px", 
            display: loading ? "flex" : "none", 
            justifyContent: "center", 
            alignItems: "center"
            }}>
                <img src={SpinnerIcon} alt="preview" style={{ width: "200px" }} />
            </div>          
            <div className="saved-images" style={{ width: "100%", height: "800px", display: loading ? "none" : "block"}}>
                <img src={compose} alt="background" style={{ height: '100%', width: "100%", objectFit: 'contain' }} onLoad={() => setLoading(false)}/>
            </div>           
        </div>
    )
}

export default ProductView