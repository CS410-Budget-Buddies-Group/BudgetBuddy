import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
// import './css/output.css';
import Router from './Router'
// import reportWebVitals from './reportWebVitals';
import 'material-icons/iconfont/material-icons.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router />
	</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
