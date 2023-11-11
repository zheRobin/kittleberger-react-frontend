import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { infoReducer } from './info.slice';
import { templateReducer } from './templates.slice';
import { productsReducer } from './products.slice';

export * from './auth.slice';
export * from './info.slice'
export * from './templates.slice'
export * from './products.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoReducer,
        templates: templateReducer,
        products: productsReducer
    },
});
