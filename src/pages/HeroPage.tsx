import "../css/HeroPage.css";
import { type ReactNode } from 'react';

export default function HeroPage({ children }: { readonly children: ReactNode }) {
	return (
		<div className="hero-page flex row align-items-center">
			<img src="/BudgetBuddy/Chill Budget Buddy Head.png" alt="NL IEM Tracker" className="hero-page-hero" />
			{children}
		</div>
	);
};