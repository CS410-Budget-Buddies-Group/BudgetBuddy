import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend,
} from "chart.js";
import '../css/Dashboard.css';
import Navbar from "../components/Navbar";
import { version } from '../../package.json';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Dashboard: React.FC = () => {
	const [activeTab, setActiveTab] = useState("dashboard");

	const [monthlyIncome, setMonthlyIncome] = useState<number[]>(Array(12).fill(0).map((e, i) => Math.random() * 5 + i));
	const [monthlyExpenses, setMonthlyExpenses] = useState<number[]>(Array(12).fill(0).map((e, i) => Math.random() * 5 + i));

	const [showIncome, setShowIncome] = useState(true);
	const [showExpenses, setShowExpenses] = useState(true);
	const [showYearlyTotals, setShowYearlyTotals] = useState(true);

	const totalIncome = monthlyIncome.reduce((acc, val) => acc + val, 0);
	const totalExpenses = monthlyExpenses.reduce((acc, val) => acc + val, 0);
	const savings = totalIncome - totalExpenses;

	const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const chartData = {
		labels: monthLabels,
		datasets: [
			{
				label: "Income",
				data: monthlyIncome,
				borderColor: "#28a745",
				fill: false,
			},
			{
				label: "Expenses",
				data: monthlyExpenses,
				borderColor: "#dc3545",
				fill: false,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	};

	const handleMonthlyChange = (
		type: "income" | "expense",
		index: number,
		value: number
	) => {
		if (type === "income") {
			const newIncome = [...monthlyIncome];
			newIncome[index] = value;
			setMonthlyIncome(newIncome);
		} else {
			const newExpenses = [...monthlyExpenses];
			newExpenses[index] = value;
			setMonthlyExpenses(newExpenses);
		}
	};

	return (

		<div className="page-dashboard">
			<Navbar><h2>Dashboard</h2></Navbar>
			<div className="page-body d-flex flex-1" >
				{/* Sidebar */}
				<div className="sidebar d-flex flex-column gap-4 p-3 h-100">
					<button className={`btn btn-secondary ${activeTab === 'dashboard' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('dashboard')}>Dashboard</button>
					<button className={`btn btn-secondary ${activeTab === 'income' ? 'active' : ''}`} onClick={() => setActiveTab('income')}>Income</button>
					<button className={`btn btn-secondary ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>Expenses</button>
					<button className={`btn btn-secondary ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
					<span className="mt-auto">
						v{version}
					</span>
				</div>

				{/* Main Content */}
				<div className="d-flex flex-grow-1">
					{/* Top Navbar */}

					{/* Content Area */}
					<div className="container-fluid my-4 px-4">
						{activeTab === "dashboard" && (
							<>
								<div className="d-flex flex-row gap-4 flex-wrap">
									{showIncome && (
										// <div className="">
										<div className="card shadow-sm p-3 flex-1">
											<h5>Total Income</h5>
											<span className="fs-4 text-success">${totalIncome.toFixed(2)}</span>
										</div>
										// </div>
									)}
									{showExpenses && (
										// <div className="">
										<div className="card shadow-sm p-3 flex-1">
											<h5>Total Expenses</h5>
											<p className="fs-4 text-danger">${totalExpenses.toFixed(2)}</p>
										</div>
										// </div>
									)}
									{showYearlyTotals && (
										// <div className="">
										<div className="card shadow-sm p-3 flex-1">
											<h5>Savings</h5>
											<p className="fs-4 text-primary">${savings.toFixed(2)}</p>
										</div>
										// </div>
									)}
								</div>
								<div className="flex-row my-4">
									<div className="card shadow-sm p-3">
										<h5 className="mb-3">Monthly Overview</h5>
										<div className="chart-container">
											<Line data={chartData} options={chartOptions} />
										</div>
									</div>
								</div>
							</>
						)}

						{activeTab === "income" && (
							<div className="card p-4 shadow-sm">
								<h5>Enter Monthly Income</h5>
								{monthLabels.map((month, idx) => (
									<div key={month} className="mb-2 form-group">
										<label>
											{month}
											<input
												name={month + '-input'}
												type="number"
												className="form-control"
												value={monthlyIncome[idx]}
												onChange={(e) => handleMonthlyChange("income", idx, Number(e.target.value))}
											/>
										</label>
									</div>
								))}
							</div>
						)}

						{activeTab === "expenses" && (
							<div className="card p-4 shadow-sm">
								<h5>Enter Monthly Expenses</h5>
								{monthLabels.map((month, idx) => (
									<div key={month} className="mb-2">
										<label>
											{month}
											<input
												name={month + '-input'}
												type="number"
												className="form-control"
												value={monthlyExpenses[idx]}
												onChange={(e) => handleMonthlyChange("expense", idx, Number(e.target.value))}
											/>
										</label>

									</div>
								))}
							</div>
						)}

						{activeTab === "settings" && (
							<div className="card p-4 shadow-sm">
								<h5>Display Settings</h5>
								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="showIncome"
										checked={showIncome}
										onChange={() => setShowIncome(!showIncome)}
									/>
									<label className="form-check-label" htmlFor="showIncome">Show Income</label>
								</div>
								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="showExpenses"
										checked={showExpenses}
										onChange={() => setShowExpenses(!showExpenses)}
									/>
									<label className="form-check-label" htmlFor="showExpenses">Show Expenses</label>
								</div>
								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="showYearlyTotals"
										checked={showYearlyTotals}
										onChange={() => setShowYearlyTotals(!showYearlyTotals)}
									/>
									<label className="form-check-label" htmlFor="showYearlyTotals">Show Savings</label>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
