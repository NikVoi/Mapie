import styles from './Dashboard.module.scss'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../store/store'

const Dashboard = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)
	const userEmail = useSelector((state: RootState) => state.auth.userEmail)

	if (!isAuthenticated) {
		return <Navigate to='/' />
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
			<button>logout</button>
		</div>
	)
}

export default Dashboard
