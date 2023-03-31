import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/2.png";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../Endpoints/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
	const [userName, setUserName] = useState("");
	const Navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const posting = useMutation({
		mutationFn: (data: any) => createUser(data),

		onSuccess: (data: any) => {
			console.log(data);
			window.localStorage.setItem("soccerUser", JSON.stringify(data.data));

			toast("🦄 Wow so easy!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			Navigate("/");
		},
	});

	const RegisterUser = async () => {
		posting.mutate({
			userName,
			email,
			password,
		});
	};

	return (
		<Container>
			<Card
				onSubmit={(e) => {
					e.preventDefault();
					RegisterUser();
				}}>
				<Logo src={logo} />
				<h3>Create Account</h3>
				<Input
					value={userName}
					onChange={(e) => {
						setUserName(e.target.value);
					}}
					required
					placeholder='Enter your fullName'
				/>
				<Input
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
					type='email'
					placeholder='Enter your email'
				/>
				<Input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					required
					type='password'
					placeholder='Enter your password'
				/>
				<span>
					Already have an Account ? <Link to='/signin'>SignIn</Link>
				</span>
				<ButtonHold>
					<Button type='submit'>Sign Up</Button>
				</ButtonHold>
			</Card>
		</Container>
	);
};

export default SignUp;

const ButtonHold = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`;
const Button = styled.button`
	height: 40px;
	width: 120px;
	background-color: #005da6;
	border: none;
	outline: none;
	color: white;
	transition: all 350ms;
	cursor: pointer;
	:hover {
		transform: scale(0.98);
		text-decoration: underline;
	}
`;

const Input = styled.input`
	border: none;
	outline: none;
	border-bottom: 1px solid #f1f1f1;
	padding-bottom: 10px;
	transition: all 350ms;
	height: 20px;
	margin-bottom: 15px;
	:hover {
		border-color: silver;
	}
`;

const Logo = styled.img`
	width: 50px;
`;

const Card = styled.form`
	min-height: 300px;
	width: 390px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border-radius: 3px;
	span {
		font-size: 13px;
	}
	h3 {
		font-weight: 600;
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;
	/* background-color: #ebebeb; */
`;
