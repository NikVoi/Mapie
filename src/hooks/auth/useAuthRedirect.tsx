import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface Props {
	authenticatedRedirectPath: string
}

const useAuthenticationRedirect = ({ authenticatedRedirectPath }: Props) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	const redirectComponent = isAuthenticated ? (
		<Navigate to={authenticatedRedirectPath} />
	) : null

	return redirectComponent
}

export default useAuthenticationRedirect
