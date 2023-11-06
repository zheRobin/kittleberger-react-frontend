import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { infoReducer } from './info.slice';

export * from './auth.slice';
export * from './info.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoReducer
    },
});
