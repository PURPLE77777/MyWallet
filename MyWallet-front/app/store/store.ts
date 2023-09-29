import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { userSlice } from './user/user.slice'
import { walletSlice } from './wallet/wallet.slice'

const rootReducer = combineReducers({
	user: userSlice.reducer,
	wallets: walletSlice.reducer
})

const persistCOnfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['user', 'wallet'],
	blacklist: []
}

const persistedReducer = persistReducer(persistCOnfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
			// serializableCheck: {
			// 	ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			// }
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
