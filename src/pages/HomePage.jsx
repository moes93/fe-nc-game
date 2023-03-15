import React, { useContext } from "react";
import GetReviews from "../components/GetReviews";

export default function HomePage( ){
    return(
        <div>
            <h1>Home Page</h1>
            <h3>You are logged in as</h3>
            <GetReviews />
            <h3>
                Use the links provided on the navagation bar on the left of the screem
            </h3>
        </div>
    )
}