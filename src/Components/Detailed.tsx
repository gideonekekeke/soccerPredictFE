import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { readMatchesSingle, sendPrediction } from "../Endpoints/Apis";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./Global/AuthUser";

const Detailed = () => {
	const { currentUser } = useContext(GlobalContext);
	// console.log(currentUser);
	const [readData, setReadData] = useState([] as any);

	const [predictionScoreA, setPredictionScoreA] = useState<number>(0);
	const [predictionScoreB, setPredictionScoreB] = useState<number>();
	const { id }: any = useParams();
	const matches: any = useQuery({
		queryKey: ["matches", id],
		queryFn: () => readMatchesSingle(id),
		onSuccess: (data: any) => {
			setReadData(data.data);
		},
	});

	const predicting: any = useMutation({
		mutationFn: (data: any) =>
			sendPrediction(currentUser?._id, readData?._id, data),
		onSuccess: (data: any) => {
			alert("prediction placed...");
			// console.log(data);
			// setReadData(data.data);
		},
	});

	const check = readData?.predict?.some((el: any) => {
		return el?.user === currentUser?._id;
	});

	function compareJSON(json1: any, json2: any, condition: any) {
		let resultA = null;
		let resultB = [];

		for (let i = 0; i < json2?.length; i++) {
			if (condition(json1, json2[i])) {
				resultA = json1;
				resultB.unshift(json2[i]);
			} else {
				resultB.push(json2[i]);
			}
		}

		if (resultA) {
			return resultB;
		}

		return null;
	}

	let resutltLeader: any = compareJSON(
		readData,
		readData?.predict,
		(obj1: any, obj2: any) =>
			obj1.TeamScoresA === obj2.predictionScoreA &&
			obj1.TeamScoresB === obj2.predictionScoreB,
	);

	return (
		<Container>
			<Hol>
				<span>Match Days</span>
				<Days
					style={{
						borderBottom: "1px solid coral",
					}}>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
				</Days>
			</Hol>

			<Hol>
				<span>Features</span>
				<Days>
					<div>17:00</div>
					<Holding>
						<Team>
							{readData?.TeamA} <Score>{readData?.TeamScoresA} </Score>
						</Team>

						<Versus>V</Versus>
						<Team>
							<Score>{readData?.TeamScoresB} </Score>
							{readData?.TeamB}
						</Team>
					</Holding>
					<div>Started</div>
				</Days>
				<Main>
					<br />
					<h4>PREDICTION</h4>
					<InputHold>
						<MainInp>
							<span>Team A</span>
							<input
								onChange={(e: any) => {
									setPredictionScoreA(e.target.value);
								}}
								type='number'
							/>
						</MainInp>

						<MainInp>
							<input
								onChange={(e: any) => {
									setPredictionScoreB(e.target.value);
								}}
								type='number'
							/>
							<span>Team B</span>
						</MainInp>
					</InputHold>
					<But
						disabled={check}
						onClick={() => {
							predicting.mutate({
								predictionScoreA,
								predictionScoreB,
							});
						}}>
						Predict
					</But>
					<br />
					<br />
					<br />
					<br />

					<h4>Score Leaderboard</h4>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
						}}>
						{resutltLeader?.map((props: any, i: number) => (
							<Card>
								<h5>{props?.name}</h5>
								<div>
									{readData?.TeamA} {props?.predictionScoreA} v{" "}
									{props?.predictionScoreB} {readData?.TeamB}
								</div>

								{readData?.isStop ? (
									<>{i === 0 ? <h3>winner</h3> : null}</>
								) : null}
							</Card>
						))}
					</div>
				</Main>
			</Hol>
		</Container>
	);
};

export default Detailed;

const Card = styled.div`
	font-size: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border: 1px solid gray;
	padding: 30px;
	border-radius: 10px;
	margin: 10px;
`;

const But = styled.button`
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
	margin-top: 40px;

	:disabled {
		background-color: gray;
	}

	:hover {
		transform: scale(0.98);
	}
`;

const InputHold = styled.div`
	display: flex;
	align-items: center;
	/* width: 100%; */
	input {
		width: 50px;
		height: 30px;
		font-size: 20px;
	}
`;
const MainInp = styled.div`
	margin-right: 30px;
	margin-left: 30px;
`;

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

const Holding = styled.div`
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: bold;
`;
const Team = styled.div`
	display: flex;
	align-items: center;
`;
const Versus = styled.div`
	margin-left: 25px;
	margin-right: 25px;
`;
const Score = styled.div`
	margin-left: 20px;
	margin-right: 20px;
`;

const Hol = styled.div`
	text-align: left;

	span {
		padding: 20px;
		font-size: 16px;
		font-weight: bold;
		color: gray;
	}
`;

const Days = styled.div`
	display: flex;
	justify-content: space-between;
	/* border-bottom: 1px solid coral; */
	font-size: 12px;
	padding: 20px;
`;

const Container = styled.div`
	min-height: 90vh;
	background-color: #3d434e;
	width: 700px;
	/* border: 1px solid silver; */
`;
