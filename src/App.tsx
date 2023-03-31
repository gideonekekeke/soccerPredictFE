import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import pic1 from "./img/1.png";
import pic2 from "./img/2.png";
import Header from "./Components/Header";

function App() {
	return (
		<div className='App'>
			<Header />
			<header className='App-header'>
				<img src={pic2} className='App-logo' alt='logo' />
				<p>SOCCER 4 LIFE</p>
				<AllRoutes />
			</header>
		</div>
	);
}

export default App;
