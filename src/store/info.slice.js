import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: 'info',
    initialState:{
        language:localStorage.getItem("i18nextLng") || "en",
        currentTab: localStorage.getItem("currentTab") || "template",
        currentTemplatePage: localStorage.getItem("currentTemplatePage") || 1,
        currentProductPage: localStorage.getItem("currentProductPage") || 1,
        pageData: JSON.parse(localStorage.getItem("pageData")) || {},
        productData: JSON.parse(localStorage.getItem("productData")) || [],
        usedArticleData: JSON.parse(localStorage.getItem("usedArticleData")) || [],
        templateData: JSON.parse(localStorage.getItem("templateData")) || [],
        filterData:{}
    },
    reducers:{
        setSelectedLanguage:(state, action) => {
            state.language = action.payload
        },
        setPageData: (state, action) => {
            if (action.payload === undefined) {
                state.pageData = {};
            }else {
                localStorage.setItem('pageData', JSON.stringify(action.payload))
                state.pageData = action.payload;
            }
        },
        setCurrentTab: (state, action) => {
            localStorage.setItem('currentTab', action.payload);
            state.currentTab = action.payload;
        },
        setTemplatePage: (state, action) => {
            localStorage.setItem('currentTemplatePage', action.payload);
            state.currentTemplatePage = action.payload;
        },
        setProductPage: (state, action) => {
            localStorage.setItem('currentProductPage', action.payload);
            state.currentProductPage = action.payload;
        },
        setProductData: (state, action) => {
            localStorage.setItem('productData', JSON.stringify(action.payload.products));
            localStorage.setItem('usedArticleData', JSON.stringify(action.payload.articles));
            state.productData = action.payload.products;
            state.usedArticleData = action.payload.articles;
        },
        setTemplateData: (state, action) => {
            localStorage.setItem('templateData', JSON.stringify(action.payload.templates));
            state.templateData = action.payload.templates;
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        }
    }
})


export const infoActions = {...infoSlice.actions}
export const infoReducer = infoSlice.reducer
export default infoSlice.reducer