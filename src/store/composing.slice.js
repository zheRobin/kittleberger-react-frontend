import { createSlice } from "@reduxjs/toolkit";

const composingSlice = createSlice({
    name: 'composing',
    initialState: {
        articleList: JSON.parse(localStorage.getItem('articleList')) || [],
        usedArticlesData: JSON.parse(localStorage.getItem('usedArticlesData')) || [],
        currentListPage: parseInt(localStorage.getItem('articleListPage')) || 1,
        comparedListPage: parseInt(localStorage.getItem('comparedListPage')) || 1,
        filterList: []
    },
    reducers:{
        setArticleList: (state, action) => {
            if (action.payload.current_page === 1) {
                state.articleList = action.payload.products
            } else if(state.currentListPage === state.comparedListPage + 1) {
                state.articleList = [...state.articleList, ...action.payload.products]
                state.comparedListPage = action.payload.current_page
                localStorage.setItem('comparedListPage', action.payload.current_page);
            }
            localStorage.setItem('articleList', JSON.stringify(state.articleList));
        },
        setComposingArticle: (state, action) => {
            state.usedArticlesData = action.payload
        }
    },
})

export const composingActions = { ...composingSlice.actions}
export const composingReducer = composingSlice.reducer