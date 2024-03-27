/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: {
				36: '36rem',
				24: '30rem',
			},

			animation: {
				rotate: 'rotate 1s linear infinite',
			},

			keyframes: {
				rotate: {
					'100%': { transform: 'rotate(360deg)' },
				},
			},
		},
	},
	plugins: [],
}
