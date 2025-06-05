// ProtectedRoute.jsx
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroPage from './HeroPage';

export type ComponentProps = {
	readonly children?: ReactNode;
};

export default function ProtectedRoute({ children }: ComponentProps) {
	const navigate = useNavigate();

	const [authStatus, setAuthStatus] = useState({
		isAuthenticated: false,
		isLoading: true,
	});

	async function init() {
		setAuthStatus({
			isAuthenticated: true,
			isLoading: false
		});
	}

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		if (!authStatus.isAuthenticated && !authStatus.isLoading) {
			const currentURL = window.location.href;
			console.log('protected url', currentURL);

			if (currentURL.includes('token'))
				navigate('/', { state: { redirectURL: currentURL } });
			else
				navigate('/');
		}

	}, [authStatus, navigate]);

	if (authStatus.isLoading || !authStatus.isAuthenticated) {
		return (
			<HeroPage>
				<span>Authenticating...</span>
			</HeroPage>
		);
	}

	return <>{children}</>;
}