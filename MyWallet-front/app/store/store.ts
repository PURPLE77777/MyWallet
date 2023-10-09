import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	CombinedState,
	combineReducers,
	configureStore
} from '@reduxjs/toolkit'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'

import { IInitialState } from './user/user.interface'
import { userSlice } from './user/user.slice'
import { IWalletInitialState } from './wallet/wallet.interface'
import { walletSlice } from './wallet/wallet.slice'

const rootReducer = combineReducers({
	user: userSlice.reducer,
	wallets: walletSlice.reducer
})

const persistCOnfig: PersistConfig<
	CombinedState<{ user: IInitialState; wallets: IWalletInitialState }>
> = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['user'],
	blacklist: ['wallets']
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
