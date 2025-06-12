import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import type { ReactNode } from 'react';

export default function Navbar({ children, homeLink }: { children: ReactNode, readonly homeLink?: Function }) {
	const navigate = useNavigate();

	function goHome() {
		if (homeLink)
			homeLink();
		else
			navigate('/', { 'state': { 'fromInsideApp': true } });
	}

	return (
		<div className="header d-flex align-items-center" >
			<img src="/assets/Chill_Budget_Buddy_Head.png" alt="Budget Buddy Head Logo" />
			<div className='center'>
				{children}
			</div>
			<button className='shadow-click' onClick={goHome}>
				<span className='material-symbols-rounded filled'>cottage</span>
			</button>
		</div>
	)
}