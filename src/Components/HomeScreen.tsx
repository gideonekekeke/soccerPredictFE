import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { readMatches } from "../Endpoints/Apis";
const HomeScreen = () => {
	const [matchData, setMatchData] = useState([]);
	const matches: any = useQuery({
		queryKey: ["matches"],
		queryFn: readMatches,

		onSuccess: (data: any) => {
			setMatchData(data.data);
		},
	});

	return (
		<Container>
			<Hol>
				<span>Match Days</span>
				<Days style={{ borderBottom: "1px solid coral" }}>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
					<div>March 23</div>
				</Days>
			</Hol>

			<Hol>
				<span>England Fixtures</span>

				{matchData?.map((props: any) => (
					<Link
						style={{ textDecoration: "none", color: "white" }}
						to={`/fixtures/${props._id}`}>
						<Days style={{ borderBottom: "1px solid gray" }}>
							<div>{props?.startTime}</div>
							<Holding>
								<Team>
									{props?.TeamA} <Score>{props?.TeamScoresA}</Score>
								</Team>
								<Versus>V</Versus>
								<Team>
									<Score>{props?.TeamScoresB}</Score>
									{props?.TeamB}
								</Team>
							</Holding>
							{props?.isStart ? <div>Started</div> : <div>Not Started</div>}
						</Days>
					</Link>
				))}
			</Hol>
		</Container>
	);
};

export default HomeScreen;

const Holding = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	font-weight: bold;
	max-width: 300px;
	/* background-color: red; */
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
