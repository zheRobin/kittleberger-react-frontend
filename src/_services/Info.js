import { setAuthToken } from "./Template";
import axios from "axios";

export async function getDynamicContent(token,langType,success ) {
    
    setAuthToken(token)
    axios.get(`${process.env.REACT_APP_API_URL}api/v1/core/privacy/${langType}`)
    .then(res => {
            success(res)
        })
        .catch(error => {
            console.error("Error:", error);
        })
}