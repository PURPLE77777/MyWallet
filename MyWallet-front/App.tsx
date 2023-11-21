import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Navigation from '@navigation/Navigation'

import { persistor, store } from '@store/store'

// import { persistor, store } from '@store/store'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SafeAreaProvider>
						<Navigation />
						{/* <StatusBar style='dark' translucent={true} hidden={false} /> */}
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
