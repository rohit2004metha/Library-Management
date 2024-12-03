// packages
import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// store
import rootReducer from './rootReducer';
// api
import api from './api';


// presist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

// presisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(api.middleware),
    devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;