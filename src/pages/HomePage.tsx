import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/HomePage.css";

export default function HomePage() {
	return (
		<div className="home-page">
			<Navbar><h2>Home</h2></Navbar>
			<div className="block d-flex flex-column gap-4 align-items-start">
				<h3>Welcome to the home page!</h3>
				<Link className="btn btn-primary" to="/dash">Dashboard</Link>
			</div>
		</div>
	)
}