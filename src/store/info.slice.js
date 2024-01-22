import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: 'info',
    initialState:{
        language:localStorage.getItem("i18nextLng") || "en",
        currentTab: localStorage.getItem("currentTab") || "template",
        currentTemplatePage: 1,
        currentProductPage: 1,
        pageData: JSON.parse(localStorage.getItem("pageData")) || {},
        productData: JSON.parse(localStorage.getItem("productData")) || [],
        usedArticleData: JSON.parse(localStorage.getItem("usedArticleData")) || [],
        templateData: JSON.parse(localStorage.getItem("templateData")) || [],
        filterData: JSON.parse(localStorage.getItem("filterData")) || {},
        countryList: JSON.parse(localStorage.getItem('countryList')) || {}
    },
    reducers:{
        initProductData: (state) => {
            state.productData = []
            state.usedArticleData = []
            state.currentProductPage = 1
            localStorage.removeItem('productData')
            localStorage.removeItem('usedArticleData')
        },
        initTemplatetData: (state) => {
            state.templateData = []
            state.currentTemplatePage = 1
            localStorage.removeItem('templateData')
        },
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
            state.currentTemplatePage = action.payload;
        },
        setProductPage: (state, action) => {
            state.currentProductPage = action.payload;
        },
        setProductData: (state, action) => {
            state.productData = [...state.productData, ...action.payload.products];
            state.usedArticleData = [...state.usedArticleData, ...action.payload.articles];
            localStorage.setItem('productData', JSON.stringify(state.productData));
            localStorage.setItem('usedArticleData', JSON.stringify(state.usedArticleData));
        },
        setTemplateData: (state, action) => {
            localStorage.setItem('templateData', JSON.stringify(action.payload.templates));
            state.templateData = action.payload.templates;
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
            localStorage.setItem('filterData', JSON.stringify(state.filterData))
        },
        setCountryList: (state, action) => {
            state.countryList = action.payload
            localStorage.setItem('countryList', JSON.stringify(state.countryList));
        }
    }
})


export const infoActions = {...infoSlice.actions}
export const infoReducer = infoSlice.reducer
export default infoSlice.reducer