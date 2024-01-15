import { createSlice } from "@reduxjs/toolkit";

const composingSlice = createSlice({
    name: 'composing',
    initialState: {
        articleList: JSON.parse(localStorage.getItem('articleList')) || [],
        composingElements: JSON.parse(localStorage.getItem('composingElements')) || [],
        currentListPage: 1,
        comparedListPage: 1,
        renderedCompose: '',
        filterList: []
    },
    reducers:{
        setArticleList: (state, action) => {
            if (action.payload.current_page === 1) {
                state.articleList = action.payload.products
            } else if(state.currentListPage === state.comparedListPage + 1) {
                state.articleList = [...state.articleList, ...action.payload.products]
                state.comparedListPage = action.payload.current_page
            }
            localStorage.setItem('articleList', JSON.stringify(state.articleList));
        },
        setListPage: (state, action) => {
            state.currentListPage = action.payload
        },
        setComposingArticle: (state, action) => {
            state.composingElements = [...state.composingElements, action.payload]
            localStorage.setItem('composingElements', JSON.stringify(state.composingElements));
        },
        updateComposingArticle: (state, action) => {
            state.composingElements = state.composingElements.map((el, index) =>
                el.pos_index === action.payload.pos_index ? { ...el, ...action.payload } : el
            );
            localStorage.setItem('composingElements', JSON.stringify(state.composingElements));
        },
        removeComposingArticle:(state,action) =>{
            const pos_index = action.payload.pos_index
            state.composingElements = state.composingElements.filter((el) => el.pos_index !== pos_index)
            localStorage.setItem('composingElements', JSON.stringify(state.composingElements));
        },
        setRenderedCompose: (state, action) => {
            state.renderedCompose = action.payload
        },
    },
})

export const composingActions = { ...composingSlice.actions}
export const composingReducer = composingSlice.reducer