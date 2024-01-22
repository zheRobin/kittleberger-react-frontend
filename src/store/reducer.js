import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { infoReducer } from './info.slice';
import { composingReducer } from './composing.slice';

export * from './auth.slice';
export * from './info.slice'
export * from './composing.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoReducer,
        composing: composingReducer
    },
});
