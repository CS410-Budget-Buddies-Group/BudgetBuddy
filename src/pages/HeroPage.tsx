import "../css/HeroPage.css";
import { type ReactNode } from 'react';

export default function HeroPage({ children }: { readonly children: ReactNode }) {
	return (
		<div className="hero-page flex row align-items-center">
			<img src="/assets/Chill_Budget_Buddy_Head.png" alt="Chill Budget Buddy Head" className="hero-page-hero" />
			{children}
		</div>
	);
};