/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			comfortaa: ['Comfortaa-Regular', 'sans-serif'],
			comfortaaBold: ['Comfortaa-Bold', 'sans-serif'],
			comfortaaLight: ['Comfortaa-Light', 'sans-serif'],
			comfortaaMedium: ['Comfortaa-Medium', 'sans-serif'],
			comfortaaSemiBold: ['Comfortaa-SemiBold', 'sans-serif']
		},
		extend: {
			colors: {
				primaryDarkGray: '#222222',
				primaryLightGray: '#474747',
				primaryPurple: '#5A00A3',
				primaryRed: '#C42021',
				primaryGreen: '#06F065',
				primaryYellow: '#facc14'
			}
		}
	},
	plugins: []
}
