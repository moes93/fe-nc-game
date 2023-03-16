import React, { useContext } from "react";
import GetReviews from "../components/GetReviews"
import { UserContext } from "../contexts/LoggedInUserContext";

export default function HomePage() {
    const userValueFromContext = useContext(UserContext);
	return (
		<div>
			<h1>Home page</h1>
			<h3>You are logged in as {userValueFromContext.user.username}</h3>
            <GetReviews />
			<h3>
				Feel free to use the links on the navigation bar on the left hand side
				of the screen to navigate through the website!!!
			</h3>
		</div>
	);
}
