import { createSlice } from "@reduxjs/toolkit";

const composingSlice = createSlice({
    name: 'composing',
    initialState: {
        currentTemplate: JSON.parse(localStorage.getItem('currentTemplate')) || {},
        articleList: JSON.parse(localStorage.getItem('articleList')) || [],
        composingElements: JSON.parse(localStorage.getItem('composingElements')) || [],
        savedComposing: JSON.parse(localStorage.getItem('savedComposing')) || {},
        currentListPage: parseInt(localStorage.getItem('currentListPage')) || 1,
        renderedCompose: localStorage.getItem('renderedCompose') || '',
        saveStatus: false,
        articleFilter: localStorage.getItem('articleFilter') || '',
    },
    reducers:{
        initComposingState: (state) => {
            const initialState = {
                currentTemplate: {},
                articleList: [],
                composingElements: [],
                savedComposing: {},
                currentListPage: 1,
                renderedCompose: '',
                articleFilter: '',
                saveStatus: false
            };
            localStorage.removeItem('currentTemplate');
            localStorage.removeItem('articleList');
            localStorage.removeItem('composingElements');
            localStorage.removeItem('savedComposing');
            localStorage.removeItem('renderedCompose');
            localStorage.removeItem('articleFilter');
            localStorage.removeItem('currentListPage');
            return initialState;
        },
        setTemplate: (state, action) => {
            state.currentTemplate = action.payload
            localStorage.setItem('currentTemplate', JSON.stringify(state.currentTemplate));
        },
        setArticleList: (state, action) => {
            if (action.payload.current_page === 1) {
                state.articleList = action.payload.products
            } else if(state.currentListPage + 1 === action.payload.current_page) {
                state.articleList = [...state.articleList, ...action.payload.products]
                state.currentListPage = action.payload.current_page
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
        resetComposingArticle: (state, action) => {
            state.composingElements = action.payload
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
            localStorage.setItem('renderedCompose', state.renderedCompose);
        },
        setSavedCompose: (state, action) => {
            state.savedComposing = action.payload
            localStorage.setItem('savedComposing', JSON.stringify(action.payload))
        },
        setSaveStatus: (state, action) => {
            state.saveStatus = action.payload
        },
        setFilterData: (state, action) => {
            state.articleFilter = action.payload
            state.currentListPage = 1
            localStorage.setItem('articleFilter', state.articleFilter);
            localStorage.setItem('currentListPage', state.currentListPage);
        }
    },
})

export const composingActions = { ...composingSlice.actions}
export const composingReducer = composingSlice.reducer