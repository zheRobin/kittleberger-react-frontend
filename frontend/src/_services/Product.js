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