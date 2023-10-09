import * as userActions from './user/user.actions'
import { userSlice } from './user/user.slice'
import * as walletActions from './wallet/wallet.actions'
import { walletSlice } from './wallet/wallet.slice'

export const rootActions = {
	...userActions,
	...userSlice.actions,
	...walletActions,
	...walletSlice.actions
}
