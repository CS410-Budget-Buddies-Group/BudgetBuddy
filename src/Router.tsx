import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';
// import "./css/Router.css"

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Dashboard';

export default function Router() {

	// const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

	return (
		<HashRouter basename='/BudgetBuddy'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/Dash' element={<Dashboard />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</HashRouter>
	);
};