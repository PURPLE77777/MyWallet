import { useTypedSelector } from './useTypedSelector'

export const useAuth = () => useTypedSelector(({ user }) => user)
