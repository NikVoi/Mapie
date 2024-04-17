import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@Components': path.resolve(__dirname, './src/Components'),
			'@Constant': path.resolve(__dirname, './src/Constant'),
			'@Assets': path.resolve(__dirname, './src/Assets'),
			'@Hooks': path.resolve(__dirname, './src/Hooks'),
			'@Store': path.resolve(__dirname, './src/Store'),
			'@Utils': path.resolve(__dirname, './src/Utils'),
			'@Types': path.resolve(__dirname, './src/Types'),
			'@API': path.resolve(__dirname, './src/API'),
		},
	},
	plugins: [react()],
})
