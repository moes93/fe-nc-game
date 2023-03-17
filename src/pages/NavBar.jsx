import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<nav >
			<p>nav bar</p>
			<Link to={"/"}>HomePage </Link> 
			<Link to={"/categories"}>Categories </Link> 

			{/* <Link to="/reviews">Reviews </Link>
			<Link to="/users">Users </Link> */}
		</nav>
	);
}