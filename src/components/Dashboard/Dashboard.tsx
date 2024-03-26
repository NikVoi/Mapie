import styles from './Dashboard.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'
import { RootState } from '../../store/store'

const Dashboard = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)
	const userEmail = useSelector((state: RootState) => state.auth.userEmail)

	if (!isAuthenticated) {
		return <Navigate to='/' />
	}

	const dispatch = useDispatch()

	const handleLogOut = () => {
		dispatch(logout())
	}

	return (
		<div className={styles.Dashboard}>
			Dashboard
			<div> hello {userEmail}</div>
			<div> </div>
			{isAuthenticated ? (
				<div>Пользователь аутентифицирован</div>
			) : (
				<div>Пользователь не аутентифицирован</div>
			)}
			<button onClick={handleLogOut}>logout</button>
		</div>
	)
}

export default Dashboard
