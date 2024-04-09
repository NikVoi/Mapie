import { createBrowserRouter } from 'react-router-dom'

import Dashboard from '@components/Dashboard/Dashboard.tsx'
import Error from '@components/Error/Error.tsx'
import LogIn from '@components/LogIn/LogIn.tsx'
import SingUp from '@components/SingUp/SingUp.tsx'

export const routes = [
	{
		path: '/',
		element: <LogIn />,
		errorElement: <Error />,
	},
	{
		path: '/Sing',
		element: <SingUp />,
		errorElement: <Error />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
		errorElement: <Error />,
	},
]

export const router = createBrowserRouter(routes)
