import { FC, PropsWithChildren, createContext, useState } from 'react'
import { IAuthContext, UserType } from './auth.interface'

export const AuthContext = createContext({} as IAuthContext)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<UserType>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
