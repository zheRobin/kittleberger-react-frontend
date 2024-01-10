import { handleRequest } from 'libs/_utils/request';

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
export const getProductsbyFilter = filterArgs => 
    handleRequest('get', `api/v1/core/filter?page=${filterArgs.page}&product=${filterArgs.productInfo}${filterArgs.country?("&country="+encodeURIComponent(filterArgs.country)):[]}`)
export const composeByInfo = composeInfo => 
    handleRequest('post', 'api/v1/core/compose/', composeInfo)
export const imageComposing = productInfo => 
    handleRequest('post', 'api/v1/core/remove-background/', {
        document_id: productInfo.document_id,
        image_url: productInfo?.render_url
    })
export const getOnlineInfo = templateInfo =>
    handleRequest('post', 'api/v1/compose/product/', templateInfo)
export const replacePreviewImage = previwInfo =>
    handleRequest('post', 'api/v1/compose/setpreview/', previwInfo)
export const refreshCompose = templateInfo => 
    handleRequest('post', 'api/v1/compose/refresh/', templateInfo)
export const updateOnlineInfo = templateInfo =>
    handleRequest('put', 'api/v1/compose/product/', templateInfo)

// Template action
export const getTemplateListbyFilter = templateArgs =>
    handleRequest('post', 'api/v1/compose/templates/filter/', templateArgs)
export const getTemplatesTypes = () =>
    handleRequest('get', 'api/v1/compose/pagedata/')
export const createTemplatesTypes = templateInfo =>
    handleRequest('post', 'api/v1/compose/pagedata/', templateInfo)

export const deleteTemplatesTypes = templateInfo =>
    handleRequest('delete', 'api/v1/compose/pagedata/', templateInfo)

export const editTemplatesTypes = templateInfo =>
    handleRequest('put', 'api/v1/compose/pagedata/', templateInfo)

export const infiniteTemplate = (page,dependencies) => handleRequest('post', `api/v1/compose/templates/filter?limit=15&offset=${(page - 1) * 15}`, dependencies)

export const createTemplate = (formData) => {
    const language = 'en';
    return handleRequest('post', `api/v1/compose/templates?language=${language}`, formData, {
        'Content-Type': 'multipart/form-data'
    })
}

export const updateTemplate = (formData, id) => {
    const language = 'en';
    return handleRequest('put', `api/v1/compose/templates/${id}?language=${language}`, formData, {
        'Content-Type': 'multipart/form-data'
    })
}