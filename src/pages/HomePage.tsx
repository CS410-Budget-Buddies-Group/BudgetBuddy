import Navbar from "../components/Navbar";
import "../css/HomePage.css";

export default function HomePage() {
	return (
		<div className="home-page">
			<Navbar><h2>Home</h2></Navbar>
			<div className="block text-blue-500">
				New Home Page!
			</div>
		</div>
	)
}