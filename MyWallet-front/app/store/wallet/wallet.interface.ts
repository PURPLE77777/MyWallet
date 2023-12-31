import { IWallet } from '@AppTypes/waller.interface'

// export interface IWalletError {
// 	error: string
// 	message: string
// 	statusCode: number
// }

export interface IWalletInitialState {
	selectedWallet: IWallet | null
	wallets: IWallet[] | null
	isLoading: boolean
	error: any
}
