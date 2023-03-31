import axios from "axios";

const url = "http://localhost:2020";

interface Idata {
	userName: string;
	email: string;
	password: string;
}

interface Ipredict {
	predictionScoreA: number;
	predictionScoreB: number;
}

export const createUser = async (data: Idata) => {
	return await axios
		.post(`${url}/api/user/create-account`, data)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
};

export const readMatches = async () => {
	return await axios
		.get(`${url}/api/match`)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
};

export const readMatchesSingle = async (id: string) => {
	return await axios
		.get(`${url}/api/match/${id}`)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
};

export const sendPrediction = async (
	id: string,
	matchId: string,
	data: Ipredict,
) => {
	return await axios
		.post(`${url}/api/predict/create-prediction/${id}/${matchId}`, data)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
};
