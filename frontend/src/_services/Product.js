import { setAuthToken } from "./Template";
import axios from "axios";

export async function getProductsbyFilter(token, filterArgs = {} ) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/v1/compose/templates/filter/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + token,
        },
    });
    const reader = response.body.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            // Do something with last chunk of data then exit reader
            return;
        }
        const decoder = new TextDecoder("utf-8");
        let decodedChunk = decoder.decode(value);
        const parseData = JSON.parse(decodedChunk)
    }
}

export async function imageComposing(token, productInfo, success) {
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/core/remove-background/`, {
        document_id: productInfo.document_id,
        image_url: "https://raw.githubusercontent.com/danielgatis/rembg/master/examples/girl-3.jpg"
    })
        .then(res => {
            success(res)
        })
        .catch(error => {
            console.error("Error:", error);
        })
}