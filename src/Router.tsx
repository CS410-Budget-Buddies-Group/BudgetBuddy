import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Dashboard';

export default function Router() {

	return (
		<HashRouter basename='/BudgetBuddy'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/dash' element={<Dashboard />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</HashRouter>
	);
};