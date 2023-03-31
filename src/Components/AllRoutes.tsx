import React from "react";
import HomeScreen from "./HomeScreen";
import { useRoutes } from "react-router-dom";
import Detailed from "./Detailed";
import SignUp from "./Signup";

const AllRoutes = () => {
	let element = useRoutes([
		{
			path: "/",
			element: <HomeScreen />,
		},

		{
			path: "/fixtures/:id",
			element: <Detailed />,
		},

		{
			path: "/signup",
			element: <SignUp />,
		},
	]);
	return element;
};

export default AllRoutes;
