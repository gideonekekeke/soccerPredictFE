import React, { useEffect } from "react";
import styled from "styled-components";

import { NavLink, Link } from "react-router-dom";
import log from "../img/2.png";

const Header = () => {
	return (
		<Container>
			<Logo src={log} />
			<ButtonHold to='/signup'>
				<MyButton>Create Account</MyButton>
			</ButtonHold>
		</Container>
	);
};

export default Header;

const Menu = styled.div`
	display: none;
	@media screen and (max-width: 960px) {
		display: block;
		margin-right: 30px;
		font-size: 30px;
		cursor: pointer;
	}
`;

const MyButton = styled.button`
	width: 150px;
	height: 48px;
	border: none;
	outline: none;
	color: white;
	background-color: #1d609b;
	border-radius: 5px;
	transition: all 350ms;
	font-weight: 600;
	font-family: "Montserrat", sans-serif;
	cursor: pointer;
	border-radius: 40px;

	:hover {
		transform: scale(0.98);
	}
`;
const ButtonHold = styled(NavLink)`
	margin-right: 70px;
	text-decoration: none;

	@media screen and (max-width: 790px) {
		display: none;
	}
`;

const Logo = styled.img`
	width: 130px;

	height: 40px;
	margin-left: 70px;
	object-fit: contain;
	/* background-color: red; */

	@media screen and (max-width: 790px) {
		margin-left: 30px;
	}
`;
const NavHolder = styled.div`
	display: flex;
	align-items: center;

	@media screen and (max-width: 790px) {
		margin-right: 10px;
		display: none;
	}
`;
const Nav = styled(Link)`
	margin-right: 25px;
	margin-left: 25px;
	color: #3e4581;
	cursor: pointer;

	transition: all 350ms;
	:hover {
		transform: scale(0.98);
		text-decoration: underline;
	}
`;

const Container = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* position: fixed; */
	/* background-color: #f8f8ff; */
	z-index: 999;
`;
