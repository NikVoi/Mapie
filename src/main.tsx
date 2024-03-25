import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Dashboard from './components/Dashboard/Dashboard.tsx'
import Error from './components/Error/Error.tsx'
import LogIn from './components/LogIn/LogIn.tsx'
import SingUp from './components/SingUp/SingUp.tsx'
import './global.css'
import { store } from './store/store'

const router = createBrowserRouter([
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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
