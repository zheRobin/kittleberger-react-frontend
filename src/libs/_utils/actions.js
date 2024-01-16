import { handleRequest, handleFormRequest } from 'libs/_utils/request';

// User action
export const userCreate = data => 
    handleRequest('post', 'api/v1/user/manage/', data)
export const userEdit = (id, data) => 
    handleRequest('put', `api/v1/user/manage/${id}/`, data)
export const userDelete = id => 
    handleRequest('delete', `api/v1/user/manage/${id}/`)
export const userList = () => 
    handleRequest('get', 'api/v1/user/manage/')
export const changePassword = data => 
    handleRequest('put', 'api/v1/user/change-password/', data)

// Token action
export const tokenList = () => 
    handleRequest('get', 'api/v1/core/apikey/')
export const createToken = name => 
    handleRequest('post', 'api/v1/core/apikey/', name)
export const deleteToken = id => 
    handleRequest('delete', `api/v1/core/apikey/${id}`)

// Info action
export const getDynamicContent = langType => 
    handleRequest('get', `api/v1/core/privacy/${langType}`)
export const getImageFromUrl = url => 
    handleRequest('get', `api/v1/core/download/?url=${url}`)

// Product action
export const getArticleList = (filterArgs = {}) => 
    handleRequest('get', `api/v1/core/filter?page=${filterArgs.page}&product=${filterArgs.productInfo}${filterArgs.country?("&country="+encodeURIComponent(filterArgs.country)):[]}`)
export const composeByInfo = composeInfo => 
    handleRequest('post', 'api/v1/core/compose/', composeInfo)
export const imageComposing = productInfo => 
    handleRequest('post', 'api/v1/core/remove-background/', {
        document_id: productInfo.document_id,
        image_url: productInfo?.render_url
    })
export const createCompose = data =>
    handleRequest('post', 'api/v1/compose/product/', data)
export const updateCompose = data =>
    handleRequest('put', 'api/v1/compose/product/', data)
export const replacePreviewImage = previwInfo =>
    handleRequest('post', 'api/v1/compose/setpreview/', previwInfo)
export const refreshCompose = templateInfo => 
    handleRequest('post', 'api/v1/compose/refresh/', templateInfo)

// Template action
export const getTemplateListbyFilter = (templateArgs = {}) =>
    handleRequest('post', 'api/v1/compose/templates/filter', templateArgs)
export const getPageData = () =>
    handleRequest('get', 'api/v1/compose/pagedata/')
export const createTemplatesTypes = templateInfo =>
    handleRequest('post', 'api/v1/compose/pagedata/', templateInfo)
export const deleteTemplatesTypes = templateInfo =>
    handleRequest('delete', 'api/v1/compose/pagedata/', templateInfo)
export const editTemplatesTypes = templateInfo =>
    handleRequest('put', 'api/v1/compose/pagedata/', templateInfo)
export const getTemplates = (page, dependencies) => {
    let offset;
    isNaN((page - 1) * 15) ? offset = 0 : offset = (page - 1) * 15;
    return handleRequest('post', `api/v1/compose/templates/filter?limit=15&offset=${offset}`, {
        ...dependencies
    });
};
export const getProducts = (page, dependencies) => {
    let offset;
    isNaN((page - 1) * 15) ? offset = 0 : offset = (page - 1) * 15;
    return handleRequest('post', `api/v1/compose/products/filter?limit=15&offset=${offset}`, {
        ...dependencies
    });
};
export const createTemplate = (formData) => 
    handleFormRequest('post', `api/v1/compose/templates/`, formData)
export const updateTemplate = (formData, id) => 
    handleFormRequest('put', `api/v1/compose/templates/${id}/`, formData)

export function calcPosition(type = 'middle-center', posX, posY, templateWidth, templateHeight, sliderScale) {
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