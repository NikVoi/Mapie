import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@store': path.resolve(__dirname, './src/store'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@types': path.resolve(__dirname, './src/types'),
			'@API': path.resolve(__dirname, './src/API'),
		},
	},
	plugins: [react()],
})
