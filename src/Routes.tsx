import { createBrowserRouter } from 'react-router-dom'

import Dashboard from '@Components/Dashboard/Dashboard.tsx'
import Error from '@Components/Error/Error.tsx'
import LogIn from '@Components/LogIn/LogIn.tsx'
import SingUp from '@Components/SingUp/SingUp.tsx'
import {
	PATH_TO_DASHBOARD,
	PATH_TO_MAIN,
	PATH_TO_SING,
} from './Constant/Routes'

export const routes = [
	{
		path: PATH_TO_MAIN,
		element: <LogIn />,
		errorElement: <Error />,
	},
	{
		path: PATH_TO_SING,
		element: <SingUp />,
		errorElement: <Error />,
	},
	{
		path: PATH_TO_DASHBOARD,
		element: <Dashboard />,
		errorElement: <Error />,
	},
]

export const router = createBrowserRouter(routes)
