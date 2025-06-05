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

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Dashboard: React.FC = () => {
	const [activeTab, setActiveTab] = useState("dashboard");

	const [monthlyIncome, setMonthlyIncome] = useState<number[]>(Array(12).fill(0));
	const [monthlyExpenses, setMonthlyExpenses] = useState<number[]>(Array(12).fill(0));

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
		<div className="d-flex">
			{/* Sidebar */}
			<div className="sidebar bg-dark p-3" style={{ height: "100vh" }}>
				<h4 className="mb-4">BudgetBuddy</h4>
				<a href="#" className={`d-block text-light mb-2 ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</a>
				<a href="#" className={`d-block text-light mb-2 ${activeTab === 'income' ? 'active' : ''}`} onClick={() => setActiveTab('income')}>Income</a>
				<a href="#" className={`d-block text-light mb-2 ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>Expenses</a>
				<a href="#" className={`d-block text-light ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</a>
			</div>

			{/* Main Content */}
			<div className="flex-grow-1">
				{/* Top Navbar */}
				<nav className="navbar navbar-expand navbar-light bg-white shadow-sm px-4">
					<div className="container-fluid">
						<span className="navbar-brand">Dashboard</span>
						<div className="d-flex ms-auto align-items-center">
							<span className="me-3">Hi, Kool  Kids 👋</span>
							<img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle" />
						</div>
					</div>
				</nav>

				{/* Content Area */}
				<div className="container-fluid mt-4">
					{activeTab === "dashboard" && (
						<>
							<div className="row g-4">
								{showIncome && (
									<div className="col-md-4">
										<div className="card shadow-sm p-3">
											<h5>Total Income</h5>
											<p className="fs-4 text-success">${totalIncome}</p>
										</div>
									</div>
								)}
								{showExpenses && (
									<div className="col-md-4">
										<div className="card shadow-sm p-3">
											<h5>Total Expenses</h5>
											<p className="fs-4 text-danger">${totalExpenses}</p>
										</div>
									</div>
								)}
								{showYearlyTotals && (
									<div className="col-md-4">
										<div className="card shadow-sm p-3">
											<h5>Savings</h5>
											<p className="fs-4 text-primary">${savings}</p>
										</div>
									</div>
								)}
							</div>
							<div className="row mt-5">
								<div className="col-md-12 col-lg-8">
									<div className="card shadow-sm p-3">
										<h5 className="mb-3">Monthly Overview</h5>
										<div className="chart-container">
											<Line data={chartData} options={chartOptions} />
										</div>
									</div>
								</div>
							</div>
						</>
					)}

					{activeTab === "income" && (
						<div className="card p-4 shadow-sm">
							<h5>Enter Monthly Income</h5>
							{monthLabels.map((month, idx) => (
								<div key={month} className="mb-2">
									<label>{month}</label>
									<input
										type="number"
										className="form-control"
										value={monthlyIncome[idx]}
										onChange={(e) => handleMonthlyChange("income", idx, Number(e.target.value))}
									/>
								</div>
							))}
						</div>
					)}

					{activeTab === "expenses" && (
						<div className="card p-4 shadow-sm">
							<h5>Enter Monthly Expenses</h5>
							{monthLabels.map((month, idx) => (
								<div key={month} className="mb-2">
									<label>{month}</label>
									<input
										type="number"
										className="form-control"
										value={monthlyExpenses[idx]}
										onChange={(e) => handleMonthlyChange("expense", idx, Number(e.target.value))}
									/>
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
	);
};

export default Dashboard;
