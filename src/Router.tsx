import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';
// import "./css/Router.css"

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function Router() {

	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

	return (
		<HashRouter basename='/'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</HashRouter>
	);
};