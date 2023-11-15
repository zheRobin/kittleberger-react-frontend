import { setAuthToken } from "./Template";
import axios from "axios";

export async function getProductsbyFilter(token, filterArgs = {},success ) {
    
    setAuthToken(token)
    axios.get(`${process.env.REACT_APP_API_URL}api/v1/core/filter?page=${filterArgs.page}&product=${filterArgs.productInfo}&country=${filterArgs.country}`)
        .then(res => {
            success(res)
        })
        .catch(error => {
            console.error("Error:", error);
        })
}

export async function composeByInfo(token, composeInfo,success ) {
    
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/core/compose/`,composeInfo)
        .then(res => {
            success(res)
        })
        .catch(error => {
            console.error("Error:", error);
        })
}

export async function imageComposing(token, productInfo, success) {
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/core/remove-background/`, {
        document_id: productInfo.document_id,
        // image_url: productInfo?.cdn_urls[0]
        image_url: "https://jdffrqoludeprmyyavwe.supabase.co/storage/v1/object/public/lenderprism/Image/1.png"
    })
        .then(res => {
            success(res)
        })
        .catch(error => {
            console.error("Error:", error);
        })
}

export async function getOnlineInfo(token, templateInfo, success) {
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/compose/product/`, templateInfo)
        .then(res => {
            success(res)
        })
        .catch(error => {
            console.error("Error:", error);
        })
}

export function calcPosition(type = 'top-left', posX, posY, templateWidth, templateHeight, sliderScale) {
    switch (type) {
        case "top-left":
            return [posX, posY];
        case "top-center":
            return [(posX + templateWidth * (1 - sliderScale) / 2), posY];
        case "top-right":
            return [(posX + templateWidth * (1 - sliderScale)), posY];
        case "middle-left":
            return [posX, (posY + templateHeight * (1 - sliderScale) / 2)];
        case "middle-center":
            return [(posX + templateWidth * (1 - sliderScale) / 2), (posY + templateHeight * (1 - sliderScale) / 2)];
        case "middle-right":
            return [(posX + templateWidth * (1 - sliderScale)), (posY + templateHeight * (1 - sliderScale) / 2)];
        case "bottom-left":
            return [posX, (posY + templateHeight * (1 - sliderScale))];
        case "bottom-center":
            return [(posX + templateWidth * (1 - sliderScale) / 2), (posY + templateHeight * (1 - sliderScale))];
        case "bottom-right":
            return [(posX + templateWidth * (1 - sliderScale)), (posY + templateHeight * (1 - sliderScale))];
        default:
            return [posX, posY];
    }
}