import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { infoReducer } from './info.slice';
import { templateReducer } from './templates.slice';
import { composingReducer } from './composing.slice';

export * from './auth.slice';
export * from './info.slice'
export * from './templates.slice'
export * from './composing.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoReducer,
        templates: templateReducer,
        composing: composingReducer
    },
});
