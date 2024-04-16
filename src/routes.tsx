import { createBrowserRouter } from 'react-router-dom'

import Dashboard from '@Components/Dashboard/Dashboard.tsx'
import Error from '@Components/Error/Error.tsx'
import LogIn from '@Components/LogIn/LogIn.tsx'
import SingUp from '@Components/SingUp/SingUp.tsx'

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
